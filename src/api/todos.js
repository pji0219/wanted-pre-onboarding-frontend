import axios from 'axios';

const token = localStorage.getItem('auth');

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
};

export const createTodoApi = async (payload) => {
  const res = await axios.post(
    `${process.env.REACT_APP_SERVER_URL}todos`,
    payload,
    config
  );

  return res;
};

export const getTodosApi = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}todos`,
    config
  );

  return res;
};

export const updateTodoApi = async (id, body) => {
  const res = await axios.put(
    `${process.env.REACT_APP_SERVER_URL}todos/${id}`,
    body,
    config
  );

  return res;
};

export const deleteTodoApi = async (id) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_SERVER_URL}todos/${id}`,
    config
  );

  return res;
};
