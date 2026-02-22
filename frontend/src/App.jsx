import { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Assets from './pages/Assets';
import Landing from './pages/Landing';

function ProtectedRoute({ children, isAuthenticated }) {
  return isAuthenticated ? children : <Navigate to="/" replace />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const syncAuth = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };

    window.addEventListener('auth-change', syncAuth);
    window.addEventListener('storage', syncAuth);

    return () => {
      window.removeEventListener('auth-change', syncAuth);
      window.removeEventListener('storage', syncAuth);
    };
  }, []);

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/assets" replace />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/assets" replace />} />

        {/* Protected Routes */}
        <Route
          path="/assets"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Assets />
            </ProtectedRoute>
          }
        />

        {/* Landing page for unauthenticated users */}
        <Route path="/" element={!isAuthenticated ? <Landing /> : <Navigate to="/assets" replace />} />

        {/* 404 fallback */}
        <Route path="*" element={<Navigate to={isAuthenticated ? '/assets' : '/'} replace />} />
      </Routes>
    </Router>
  );
}

export default App;
