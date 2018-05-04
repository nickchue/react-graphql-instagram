import React from 'react';
import './Posts.css';
import gql from 'graphql-tag';
import Post from '../Post';

const GET_ALL_POSTS = gql`
  {
    getPosts(user_id: 1) {
      id
      image
      image_alt
      description
      user {
        nickname
        avatar
      }
    }
  }
`;

class Posts extends React.Component {
  constructor() {
    super();

    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    this.props.apollo_client
      .query({
        query: GET_ALL_POSTS
      })
      .then(response => {
        this.setState({ posts: response.data.getPosts })
      });

    this.posts_channel = this.props.pusher.subscribe('posts-channel');

    this.posts_channel.bind('new-post', data => {
      this.setState({ posts: this.state.posts.concat(data.post) });
    }, this);
  }

  render() {
    return (
      <div className="Posts">
        {
          this.state.posts.map(post =>
            <Post
              key={post.id}
              nickname={post.user.nickname}
              avatar={post.user.avatar}
              image={post.image}
              image_alt={post.image_alt}
              description={post.description}
            />
          )
        }
      </div>
    );
  }
}

export default Posts;
