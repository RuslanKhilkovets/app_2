export default axios => ({
  upload(payload) {
    return axios.post('/my/media', payload);
  },
  delete(id) {
    return axios.delete(`/my/media/${id}`);
  },
});
