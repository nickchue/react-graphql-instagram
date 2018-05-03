import React from 'react';
import './Post.css';
// import { Query } from 'react-apollo';
// import gql from 'graphql-tag';

class Post extends React.Component {
  render() {
    return (
      <article className="Post" ref="Post">
        <header>
          <div className="Post-user">
            <div className="Post-user-avatar">
              <img src={this.props.avatar} alt={this.props.name} />
            </div>
            <div className="Post-user-nickname">
              <span>{this.props.name}</span>
            </div>
          </div>
        </header>
        <div className="Post-image">
          <div className="Post-image-bg">
            <img alt={this.props.image_alt ? this.props.image_alt : this.props.description} src={this.props.image} />
          </div>
        </div>
        <div className="Post-caption">
          {this.props.description}
        </div>
      </article>
    )
  }
}

// const GET_POST = gql`
//   {
//     getPost(user_id: 1, post_id: 1) {
//       image
//       image_alt
//       description
//       user {
//         nickname
//         avatar
//       }
//     }
//   }
// `;

// const Post = (props) => {
//   return (
//     <Query
//       query={GET_POST}
//     >
//       {
//         ({loading, error, data}) => {
//           if (loading) return "Loading...";
//           if (error) return `Error! ${error.message}`;

//           let image = data.getPost.image;
//           let image_alt = data.getPost.image_alt;
//           let description = data.getPost.description;
//           let user = data.getPost.user;

//           return (
//             <article className="Post" ref="Post">
//               <header>
//                 <div className="Post-user">
//                   <div className="Post-user-avatar">
//                     <img src={user.avatar} alt={user.nickname} />
//                   </div>
//                   <div className="Post-user-nickname">
//                     <span>{user.nickname}</span>
//                   </div>
//                 </div>
//               </header>
//               <div className="Post-image">
//                 <div className="Post-image-bg">
//                   <img alt={image_alt ? image_alt : description} src={image} />
//                 </div>
//               </div>
//               <div className="Post-caption">
//                 {description}
//               </div>
//             </article>
//           )
//         }
//       }
//     </Query>
//   )
// }

export default Post;
