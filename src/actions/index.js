import redditService from '../services/reddit';

export const loadActivePost = post => ({
  type: 'ACTIVE_POST',
  post
});

export const dismissPost = postId => ({
  type: 'DISMISS_POST',
  postId
});

export function fetchPosts() {
  return async(dispatch, getState) => {
    try {
      const posts = await redditService.getTopPosts();
      dispatch({ type: 'LOAD_POSTS', posts });
    } catch (error) {
      console.log(error);
    }
  };
}
