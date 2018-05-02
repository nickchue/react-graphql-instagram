import React from 'react';
import './Post.css';

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

export default Post;
