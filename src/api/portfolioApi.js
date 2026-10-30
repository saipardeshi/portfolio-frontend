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

// Key used for browser caching
export const CACHE_KEY = 'portfolio_data_cache';

// Helper to get cached portfolio data immediately (0ms)
export const getCachedPortfolio = () => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

// Helper to save portfolio data to cache
export const setCachedPortfolio = (data) => {
  try {
    if (data) {
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    }
  } catch (err) {
    console.warn('Failed to cache portfolio data:', err);
  }
};

// ✅ Public API with retry logic and 10s timeout (persists to cache on success)
export const getPortfolio = async (retries = 3, delay = 2000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.get(`${API_BASE}/api/portfolio`, {
        timeout: 10000 // 10 second timeout per attempt to prevent indefinite hanging
      });
      if (response?.data) {
        setCachedPortfolio(response.data);
      }
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