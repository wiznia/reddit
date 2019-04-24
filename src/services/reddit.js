class RedditService {
  async getTopPosts() {
    const response = await fetch('https://www.reddit.com/r/all/top.json?limit=50');

    if (!response.ok) {
      throw new Error('Reddit fetch failed');
    }

    const data = await response.json();
    const children = data.data.children;

    return children.map(post => {
      return post.data
    });
  }
}

export default new RedditService();
