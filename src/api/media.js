export default axios => ({
  upload(payload) {
    return axios.post('/my/media', payload, {
      headers: {'Content-Type': 'multipart/form-data'},
    });
  },
  delete(id) {
    return axios.delete(`/my/media/${id}`);
  },
});
