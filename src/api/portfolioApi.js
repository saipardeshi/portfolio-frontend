import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL;

// ✅ Add /api to baseURL so all routes work correctly
const axiosInstance = axios.create({
  baseURL: `${API_BASE}/api`,  // ← FIXED
});

// ✅ Attach token automatically
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Response interceptor — handle 401 globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/login'; // redirect to login
    }
    return Promise.reject(error);
  }
);

// ✅ Auth APIs
export const loginAdmin = (credentials) =>
  axiosInstance.post('/auth/login', credentials);   // → /api/auth/login ✅

export const verifyToken = () =>
  axiosInstance.get('/auth/verify');                 // → /api/auth/verify ✅

// ✅ Public API (no auth needed)
export const getPortfolio = () =>
  axios.get(`${API_BASE}/api/portfolio`);            // → /api/portfolio ✅

// ✅ Admin Update APIs
export const updateHero = (data) =>
  axiosInstance.put('/admin/portfolio/hero', data);          // → /api/admin/portfolio/hero ✅

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