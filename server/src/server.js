import express from 'express';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';
import cors from 'cors';
import Pusher from 'pusher';
import bodyParser from 'body-parser';
import Multipart from 'connect-multiparty';
import dotenv from 'dotenv';

dotenv.load();

const schema = buildSchema(`
  type User {
    id: Int!
    nickname: String!
    avatar: String!
  }
  type Post {
    id: Int!
    user: User!
    description:String!
    image: String!
    image_alt: String
  }
  type Query {
    getUser(id: Int): User!
    getPost(user_id: Int, post_id: Int): Post!
    getPosts(user_id: Int): [Post]
  }
`);

const usersList = {
  1: {
    id: 1,
    nickname: "Nick Chue",
    avatar: "https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429_960_720.png"
  },
};
const postsList = {
  1: {
    1: {
      id: 1,
      user: usersList[1],
      description: "[Edited] This is my first instagram post!",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg",
      image_alt: "My First Post!"
    },
    2: {
      id: 2,
      user: usersList[1],
      description: "This is my second instagram post!",
      image: "https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?cs=srgb&dl=animal-avian-beak-349758.jpg&fm=jpg",
      image_alt: "My Second Post!"
    }
  }
};

const root = {
  getUser: ({ id }) => {
    return usersList[id]
  },
  getPost: ({ user_id , post_id }) => {
    return postsList[user_id][post_id];
  },
  getPosts: ({ user_id }) => {
    return Object.values(postsList[user_id]);
  }
}

console.log(process.env.PUSHER_APP_ID);

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  encrypted: process.env.PUSHER_ENCRYPTED
});

const app = express();
app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

const multipartMiddleware = new Multipart();

app.post('/new-post', multipartMiddleware, (req, res) => {
  const post = {
    user : {
      nickname: req.body.nickname,
      avatar: req.body.avatar
    },
    image: req.body.image,
    image_alt: req.body.image_alt,
    caption: req.body.caption
  }

  pusher.trigger('post-channel', 'new-post', {
    post
  });

  return res.json({ status: 'Post created' })
});

app.listen(4000);
