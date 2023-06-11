import axios from 'axios';

const prodConnection = '34.219.165.235:5000';
const devConnection = 'localhost:5000';

export const axiosAuth = axios.create({
  baseURL: `http://${devConnection || prodConnection}/api/auth/`,
});
export const axiosUser = axios.create({
  baseURL: `http://${devConnection || prodConnection}/api/user/`,
});
