import axios from 'axios';

export const API = axios.create({ baseURL: 'http://192.168.16.15:3000' });


export const loginUser = async (fullName: string, password: string) => {
  const res = await API.get('/users');
  return res.data.filter(
    (u: any) =>
      u.fullName.toLowerCase().replace(/\s/g, '') === fullName.toLowerCase().replace(/\s/g, '') &&
      u.password === password
  );
};

export const registerUser = async (userData: any) => {
  const res = await API.post('/users', userData);
  return res.data;
};


export const findUserByEmail = async (email: string) => {
  const res = await API.get(`/users?email=${encodeURIComponent(email)}`);
  return res.data[0];
};

export const updateUserPassword = async (id: string, newPassword: string) => {
  const res = await API.patch(`/users/${id}`, { password: newPassword });
  return res.data;
};


export const getAgencyByUserId = async (userId: string) => {
  const res = await API.get(`/agencies?userId=${userId}`);
  return res.data[0] || null;
};

export const addAgency = async (agencyData: any) => {
  const res = await API.post('/agencies', agencyData);
  return res.data;
};

export const getAgencyById = async (agencyId: string) => {
  const res = await API.get(`/agencies/${agencyId}`);
  return res.data;
};

export const updateAgencyById = async (agencyId: string, updatedData: any) => {
  const res = await API.patch(`/agencies/${agencyId}`, updatedData);
  return res.data;
};


export const fetchAgencyCars = async (agencyId: string) => {
  const res = await API.get(`/agencyCars?agencyId=${agencyId}`);
  return res.data;
};

export const addAgencyCar = async (agencyId: string, carData: any) => {
  const res = await API.post('/agencyCars', { ...carData, agencyId });
  return res.data;
};
export const addNotification = async (notificationData: any) => {
  const res = await API.post('./notifications', notificationData);
  return res.data;
};


export const getCarDetailById = async (id: string | number) => {
  const res = await API.get(`/carDetails/${id}`);
  return res.data;
};

