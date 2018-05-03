import React from 'react';
import './Posts.css';
import { Query } from 'react-apollo';
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

const Posts = () => {
  return (
    <Query
      query={GET_ALL_POSTS}
    >
      {
        ({loading, error, data}) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return (
            <div className="Posts">
              {
                data.getPosts.map(post =>
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
          )
        }
      }
    </Query>
  );
}

export default Posts;
