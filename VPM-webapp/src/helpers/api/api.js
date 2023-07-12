import axios from 'axios';

const prodConnection = '34.219.165.235:5000';
const devConnection = 'localhost:5000';

export const axiosAuth = axios.create({
  baseURL: `http://${devConnection || prodConnection}/api/auth/`,
});
export const axiosUser = axios.create({
  baseURL: `http://${devConnection || prodConnection}/api/user/`,
});
export const axiosCriteria = axios.create({
  baseURL: `http://${devConnection || prodConnection}/api/criteria`,
});
export const axiosArea = axios.create({
  baseURL: `http://${devConnection || prodConnection}/api/area`,
});
export const axiosActivity = axios.create({
  baseURL: `http://${devConnection || prodConnection}/api/activity`,
});
export const axiosSubArea = axios.create({
  baseURL: `http://${devConnection || prodConnection}/api/subarea`,
});
export const axiosVector = axios.create({
  baseURL: `http://${devConnection || prodConnection}/api/vector`,
});
export const axiosValuesEquip = axios.create({
  baseURL: `http://${devConnection || prodConnection}/api/values`,
});
