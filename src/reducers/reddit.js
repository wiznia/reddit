import Immutable from 'seamless-immutable';

const initialState = Immutable({
  topPosts: []
});

const reddit = (state = initialState, action = {}) => {
  switch (action.type) {
    case 'LOAD_POSTS':
      return {
        ...state,
        topPosts: action.topPosts
      };
    case 'DISMISS_POST':
      return {
        ...state
      };
    case 'DISMISS_POSTS':
      return {
        ...state
      };
    default:
      return state;
  }
};

export function getTopPosts(state) {
  return state.reddit.topPosts;
}

export default reddit;
