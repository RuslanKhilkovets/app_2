export default axios => ({
  getAll(params) {
    return axios.get('/favorites/posts', { params });
  },
  togglePost(postId) {
    return axios.post(`/favorites/posts/${postId}`);
  },
  getFilters(params) {
    return axios.get('/favorites/filters', { params });
  },
  showFilter(filterId) {
    return axios.get(`/favorites/filters/${filterId}`);
  },
  toggleFilter(filterId) {
    return axios.post(`/favorites/filters/${filterId}`);
  },
  createFilter(payload) {
    return axios.post('/favorites/filter/create', { value: payload });
  },
});
