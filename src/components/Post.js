import React from 'react';

class Post extends React.Component {
  render() {
    const { author, thumbnail, title } = this.props.post;
    return(
      <React.Fragment>
        <h1 className="author">{author}</h1>
        <img src={thumbnail} alt={title} />
        <p className="title">{title}</p>
      </React.Fragment>
    );
  }
}

export default Post;
