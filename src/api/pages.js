export default axios => ({
  getInfo(slug) {
    return axios.get(`/pages/${slug}`);
  },
});
