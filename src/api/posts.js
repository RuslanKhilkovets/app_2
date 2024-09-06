export default axios => ({
  getAll(params) {
    return axios.get('/posts', { params });
  },
  getById(postId) {
    return axios.get(`/posts/${postId}`);
  },
});
