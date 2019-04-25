import React from 'react';

class Post extends React.Component {
  render() {
    const { author, thumbnail, title } = this.props.post;
    return(
      <div className="active-post">
        <h1 className="author">{author}</h1>
        <img src={thumbnail} alt={title} />
        <p className="title">{title}</p>
      </div>
    );
  }
}

export default Post;
