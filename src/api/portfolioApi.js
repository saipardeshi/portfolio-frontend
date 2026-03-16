import axios from 'axios';

const API_BASE = '/api';

const axiosInstance = axios.create({ baseURL: API_BASE });

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginAdmin = (credentials) =>
  axiosInstance.post('/auth/login', credentials);

export const verifyToken = () =>
  axiosInstance.get('/auth/verify');

export const getPortfolio = () =>
  axios.get(`${API_BASE}/portfolio`);

export const updateHero = (data) =>
  axiosInstance.put('/admin/portfolio/hero', data);

export const updateAbout = (data) =>
  axiosInstance.put('/admin/portfolio/about', data);

export const updateSkills = (data) =>
  axiosInstance.put('/admin/portfolio/skills', data);

export const updateExperiences = (data) =>
  axiosInstance.put('/admin/portfolio/experiences', data);

export const updateProjects = (data) =>
  axiosInstance.put('/admin/portfolio/projects', data);

export const updateEducations = (data) =>
  axiosInstance.put('/admin/portfolio/educations', data);

export const updateCertificates = (data) =>
  axiosInstance.put('/admin/portfolio/certificates', data);

export const updateContact = (data) =>
  axiosInstance.put('/admin/portfolio/contact', data);