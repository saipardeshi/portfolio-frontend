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

// ✅ Public API with retry logic for Render cold start (free tier sleeps after inactivity)
export const getPortfolio = async (retries = 3, delay = 4000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.get(`${API_BASE}/api/portfolio`); // → /api/portfolio ✅
      return response;
    } catch (err) {
      const isLast = i === retries - 1;
      if (isLast) throw err; // all retries exhausted — throw to caller
      await new Promise(r => setTimeout(r, delay)); // wait before retrying
    }
  }
};

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