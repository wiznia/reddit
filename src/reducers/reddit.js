import Immutable from 'seamless-immutable';

const initialState = Immutable({
  posts: [],
  activePost: [],
  readPosts: [],
  dismissedPosts: []
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
        ...state
      };
    case 'ACTIVE_POST':
      return {
        ...state,
        activePost: action.post,
        readPosts: [...state.readPosts, action.post.id]
     }
    default:
      return state;
  }
};

export default reddit;
