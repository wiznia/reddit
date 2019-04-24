import React from 'react';
import '../App.scss';
import { connect } from 'react-redux';
import { fetchPosts, loadActivePost } from '../actions/index';
import Post from './Post';
import Moment from 'react-moment';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  loadActivePost = (postId) => {
    const { posts, readPosts, dispatch } = this.props;
    const activePost = posts.filter(post => postId === post.id)[0];
    
    if (!readPosts.includes(postId)) {
      dispatch(loadActivePost(activePost))
    }
  }

  render() {
    const { posts, activePost } = this.props;

    return(
      <React.Fragment>
        {
          posts.map(post => {
            return(
              <div key={post.id} onClick={() => this.loadActivePost(post.id)}>
                {post.author}
                <Moment fromNow>{post.created * 1000}</Moment>
                <img src={post.thumbnail} alt={post.title} />
                {post.title}
                <button>&times; Dismiss Post</button>
                {post.num_comments} comments
              </div>
            );
          })
        }
        <Post post={activePost} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.reddit.posts,
  activePost: state.reddit.activePost,
  readPosts: state.reddit.readPosts
})

export default connect(mapStateToProps)(App);
