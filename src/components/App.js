import React from 'react';
import '../App.scss';
import { connect } from 'react-redux';
import { fetchPosts, loadActivePost, dismissPost } from '../actions/index';
import Post from './Post';
import Moment from 'react-moment';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  loadActivePost = (postId) => {
    const activePost = this.props.posts.filter(post => postId === post.id)[0];
    
    if (!this.props.readPosts.includes(postId)) {
      this.props.dispatch(loadActivePost(activePost))
    }
  }

  dismissPost = (e, postId) => {
    if (!this.props.dismissedPosts.includes(postId)) {
      e.target.parentElement.classList.add('hidden');
      // Adding timeout so we can see the animation before removing from state
      setTimeout(() => {
        this.props.dispatch(dismissPost(postId));
      }, 1000);
    }
  }

  render() {
    const { posts, activePost, readPosts } = this.props;

    return(
      <React.Fragment>
        {
          posts.map(post => {
            return(
              <div key={post.id} onClick={() => this.loadActivePost(post.id)}>
                { !readPosts.includes(post.id) &&
                  <div className="bullet"></div>
                }
                {post.author}
                <Moment fromNow>{post.created * 1000}</Moment>
                <img src={post.thumbnail} alt={post.title} />
                {post.title}
                <button onClick={(e) => this.dismissPost(e, post.id)}>&times; Dismiss Post</button>
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
  posts: state.reddit.posts.filter(post => !state.reddit.dismissedPosts.includes(post.id)),
  activePost: state.reddit.activePost,
  readPosts: state.reddit.readPosts,
  dismissedPosts: state.reddit.dismissedPosts
})

export default connect(mapStateToProps)(App);
