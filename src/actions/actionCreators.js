import redditService from '../services/reddit';

export function fetchPosts() {
  return async(dispatch, getState) => {
    try {
      const topPosts = await redditService.getTopPosts();
      dispatch({ type: 'LOAD_POSTS', topPosts });
    } catch (error) {
      console.log(error);
    }
  };
}
