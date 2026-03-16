// =============================================
// ADMIN LOGIN PAGE
// Only you know this page exists (/admin/login)
// JWT token stored in localStorage on success
// =============================================
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/global.css';
import '../styles/Admin.css';


const AdminLogin = () => {
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  // if (isAdmin) {
  //   navigate('/admin');
  //   return null;
  // }
  useEffect(() => {
  if (isAdmin) {
    navigate('/admin');
  }
}, [isAdmin, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Call login from AuthContext - posts to /api/auth/login
      await login(form.username, form.password);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        {/* Lock icon */}
        <div className="admin-login__icon">🔐</div>

        <h1 className="admin-login__title">Admin Panel</h1>
        <p className="admin-login__subtitle">Portfolio management — restricted access</p>

        {/* Error message */}
        {error && <div className="admin-login__error">{error}</div>}

        {/* Login form */}
        <form className="admin-login__form" onSubmit={handleSubmit}>
          <div className="admin-login__group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Enter admin username"
              value={form.username}
              onChange={handleChange}
              required
              autoComplete="username"
            />
          </div>

          <div className="admin-login__group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="admin-login__submit"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login to Dashboard →'}
          </button>
        </form>

        {/* Back to portfolio link */}
        <Link to="/" className="admin-login__back">
          ← Back to Portfolio
        </Link>
      </div>
    </div>
  );
};

export default AdminLogin;