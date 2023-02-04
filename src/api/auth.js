import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: process.env.REACT_APP_SERVER_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const signUpApi = async (payload) => {
  const res = await axios.post(
    `${process.env.REACT_APP_SERVER_URL}auth/signup`,
    payload,
    config
  );
  return res;
};

export const signInApi = async (payload) => {
  const res = await axios.post('auth/signin', payload, config);
  return res;
};
