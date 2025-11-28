import axios from 'axios';


const API = axios.create({ baseURL: 'http://192.168.0.47:3000' });

export const loginUser = async (fullName, password) => {
  const res = await API.get('/users');
  const users = res.data;
  return users.filter(
    u =>
      u.fullName.toLowerCase().replace(/\s/g, '') === fullName.toLowerCase().replace(/\s/g, '') &&
      u.password === password
  );
};

export const registerUser = async (userData) => {
  const res = await API.post('/users', userData);
  return res.data;
};

export const findUserByEmail = async (email) => {
  const res = await API.get(`/users?email=${encodeURIComponent(email)}`);
  return res.data[0];
};


export const updateUserPassword = async (id, newPassword) => {
  const res = await API.patch(`/users/${id}`, { password: newPassword });
  return res.data;
};

