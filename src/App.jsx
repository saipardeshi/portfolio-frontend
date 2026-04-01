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
  const [dataReady, setDataReady] = useState(false);

  // Loader completes only when BOTH the animation AND data fetch are done
  const handleLoaderComplete = () => {
    if (dataReady) setLoading(false);
  };

  const handleDataReady = () => {
    setDataReady(true);
    if (!loading) setLoading(false);
  };

  return (
    <AuthProvider>
      <Router>

        {/* Loader — stays until data is ready */}
        {loading && <Loader onComplete={handleLoaderComplete} />}

        {/* 3D Background */}
        {!loading && <TechWaveBackground />}

        <Routes>
          <Route path="/" element={<Portfolio onReady={handleDataReady} />} />
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