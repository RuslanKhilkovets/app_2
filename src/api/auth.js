export default axios => ({
  register(payload) {
    return axios.post('/register', payload);
  },
  login(payload) {
    return axios.post('/login', payload);
  },
  logout(payload) {
    return axios.post('/login', payload);
  },
  socialLogin({ provider, payload }) {
    return axios.post(`/socialite/${provider}`, payload);
  },
  verify(payload) {
    return axios.post('/verify', payload);
  },
  resentVerifyCode(payload) {
    return axios.post('/verify/resend', payload);
  },
  remindPassword(payload) {
    return axios.post('/password/forgot', payload);
  },
  checkCode(payload) {
    return axios.post('/password/check', payload);
  },
  resentPasswordCode(payload) {
    return axios.post('/password/resend', payload);
  },
  resetPassword(payload) {
    return axios.post('/password/reset', payload);
  },
});
