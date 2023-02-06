import axios from 'axios';

const token = localStorage.getItem('auth');

const postConfig = {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
};

const getConfig = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const createTodoApi = async (payload) => {
  const res = await axios.post(
    `${process.env.REACT_APP_SERVER_URL}todos`,
    payload,
    postConfig
  );

  return res;
};

export const getTodosApi = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}todos`,
    getConfig
  );

  return res;
};
