import React from 'react';
import { connect } from 'react-redux';
import * as topPostsAction from '../actions/actionCreators';
import * as topPosts from '../reducers/reddit';
import Moment from 'react-moment';

class List extends React.Component {
  componentDidMount() {
    this.props.dispatch(topPostsAction.fetchPosts());
  }
  
  render() {
    const { posts } = this.props;
    const postsArray = Object.keys(posts).map(post => {
      return posts[post].data
    });

    return(
      <React.Fragment>
        {
          postsArray.map(post => {
            return(
              <div key={post.id}>
                {post.title}
                <Moment fromNow>{post.created * 1000}</Moment>
              </div>
            );
          })
        }
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: topPosts.getTopPosts(state)
  }
}

export default connect(mapStateToProps)(List);
