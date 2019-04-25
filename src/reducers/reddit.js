import Immutable from 'seamless-immutable';

const initialState = Immutable({
  posts: [],
  activePost: [],
  readPosts: [],
  dismissedPosts: [],
  sidebar: false
});

const reddit = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_POSTS':
      return {
        ...state,
        posts: action.posts
      };
    case 'DISMISS_POST':
      return {
        ...state,
        dismissedPosts: [...state.dismissedPosts, action.postId]
      };
    case 'DISMISS_POSTS':
      return {
        ...state,
        dismissedPosts: state.posts.map(post => post.id)
      };
    case 'ACTIVE_POST':
      return {
        ...state,
        activePost: action.post
     }
    case 'READ_POST':
      return {
        ...state,
        readPosts: [...state.readPosts, action.postId]
      }
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        sidebar: action.status
      }
    default:
      return state;
  }
};

export default reddit;
