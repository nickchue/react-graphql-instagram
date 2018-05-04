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
    // request browser notificaion permission
    Notification.requestPermission();

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

      if(Notification.permission === 'granted') {
        try {
          const notification = new Notification('React GraphQL Instagram', {
            body: `New post from ${data.post.user.nickname}`,
            // icon: `https://cdn.pixabay.com/photo/2017/01/10/03/54/icon-1968237_1280.png`,
            // image: `${data.post.image}`,
          })

          // Open the URL when click on the notification
          notification.onclick = (e) => {
            window.open('http://localhost:3000','_blank');
          }
        } catch(err) {
          console.log('err.message');
        }
      }
    }, this);
  }

  render() {
    return (
      <div className="Posts">
        {
          this.state.posts
            .slice(0)
            .reverse()
            .map(post => (
              <Post
                key={post.id}
                nickname={post.user.nickname}
                avatar={post.user.avatar}
                image={post.image}
                image_alt={post.image_alt}
                description={post.description}
              />
            )
          )
        }
      </div>
    );
  }
}

export default Posts;
