export default axios => ({
  getAll(params) {
    return axios.get('/my/posts', {params});
  },
  getById({postId, params}) {
    return axios.get(`/my/posts/${postId}`, {params});
  },
  add(payload) {
    return axios.post('/my/posts', payload);
  },
  edit({postId, payload}) {
    return axios.patch(`/my/posts/${postId}`, payload);
  },
  delete(postId) {
    return axios.delete(`/my/posts/${postId}`);
  },
  restore(postId) {
    return axios.post(`/my/posts/${postId}/restore`);
  },
});
