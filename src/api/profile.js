export default axios => ({
  getInfo() {
    return axios.get('/my/profile/edit');
  },
  update(payload) {
    return axios.patch('/my/profile', payload);
  },
  updatePassword(payload) {
    return axios.patch('/my/profile/password', payload);
  },
  updateEmail(payload) {
    return axios.patch('/my/profile/email', payload);
  },
  delete() {
    return axios.delete('/my/profile');
  },
  verifyPassword() {
    return axios.post('/my/profile/password/verify');
  },
});
