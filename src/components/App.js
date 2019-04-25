import React from 'react';
import '../App.scss';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import Post from './Post';
import Moment from 'react-moment';
import { Swipeable } from 'react-swipeable'

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(actions.fetchPosts());
  }

  loadActivePost = (e, postId) => {
    const activePost = this.props.posts.filter(post => postId === post.id)[0];

    // Prevent post from being selected as active when clicking the dismiss button
    if (e.target.classList.contains('posts__list-button') || e.target.parentElement.classList.contains('posts__list-button')) {
      return;
    }
    
    this.props.dispatch(actions.loadActivePost(activePost));
    if (!this.props.readPosts.includes(postId)) {
      e.currentTarget.classList.add('posts__list-post_read');
      this.props.dispatch(actions.readPost(activePost.id));
    }
  }

  dismissPost = (e, postId) => {
    if (!this.props.dismissedPosts.includes(postId)) {
      e.currentTarget.parentElement.parentElement.classList.add('posts__list-post_hidden');
      // Adding timeout so we can see the animation before removing from state
      setTimeout(() => {
        this.props.dispatch(actions.dismissPost(postId));
      }, 300);
    }
  }

  dismissPosts = (e) => {
    e.currentTarget.previousElementSibling.classList.add('posts__list_hidden');
    setTimeout(() => {
      this.props.dispatch(actions.dismissPosts());
    }, 300);
  }

  toggleSidebar = (status) => {
    this.props.dispatch(actions.toggleSidebar(status));
  }

  render() {
    const { posts, activePost, readPosts, sidebar } = this.props;

    return(
      <React.Fragment>
        <Swipeable className={`posts ${sidebar ? 'posts_active' : ''}`} trackMouse onSwipedRight={() => this.toggleSidebar(true)} onSwipedLeft={() => this.toggleSidebar(false)}>
          <div className="posts__title">Reddit Posts</div>
          <div className="posts__list">
            {
              posts.map(post => {
                const classes = readPosts.includes(post.id) ? 'posts__list-post_read' : '';
                return(
                  <div className={`posts__list-post ${classes}`} key={post.id} onClick={(e) => this.loadActivePost(e, post.id)}>
                    <div className="posts__list-top">
                      { !readPosts.includes(post.id) &&
                        <div className="posts__list-bullet"></div>
                      }
                      <h3 className="posts__list-author">{post.author}</h3>
                      <Moment className="posts__list-time" fromNow>{post.created * 1000}</Moment>
                    </div>
                    <div className="posts__list-main">
                      { post.thumbnail === 'default' || post.thumbnail === 'self' ? (
                        <div></div>
                      ) : (
                        <img className="posts__list-image" src={post.thumbnail} alt={post.title} />
                      )}
                      <p className="posts__list-title">{post.title}</p>
                    </div>
                    <div className="posts__list-bottom">
                      <button className="posts__list-button" onClick={(e) => this.dismissPost(e, post.id)}><span>&times;</span> Dismiss Post</button>
                      <div className="posts__list-comments">{post.num_comments} comments</div>
                    </div>
                  </div>
                );
              })
            }
          </div>
          <button className="posts__dismiss" onClick={(e) => this.dismissPosts(e)}>Dismiss All</button>
        </Swipeable>
        <Post post={activePost} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.reddit.posts.filter(post => !state.reddit.dismissedPosts.includes(post.id)),
  activePost: state.reddit.activePost,
  readPosts: state.reddit.readPosts,
  dismissedPosts: state.reddit.dismissedPosts,
  sidebar: state.reddit.sidebar
})

export default connect(mapStateToProps)(App);
