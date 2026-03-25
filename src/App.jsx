import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Portfolio from './pages/Portfolio';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import TechWaveBackground from "./components/TechWaveBackground";
import Loader from "./components/Loader";

const AdminRoute = ({ children }) => {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return <div className="loading-screen">Checking auth...</div>;
  }

  return isAdmin ? children : <Navigate to="/admin/login" replace />;
};

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <AuthProvider>
      <Router>

        {/* Loader */}
        {loading && <Loader onComplete={() => setLoading(false)} />}

        {/* 3D Background */}
        <TechWaveBackground />

        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

      </Router>
    </AuthProvider>
  );
}

export default App;