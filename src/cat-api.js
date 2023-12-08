import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_LHRQcmoVBhX3YZHvL7nrtF4rN9Y05A8EDvVpjKcJJBzOof6luUKwGvnJthT7liq3';
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  return axios.get(`/breeds`).then(({ data }) => data);
}
