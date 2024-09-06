export default axios => ({
  getCategories() {
    return axios.get('/suggest/categories');
  },
  getLocations(params) {
    return axios.get('/suggest/settlements', { params });
  },
});
