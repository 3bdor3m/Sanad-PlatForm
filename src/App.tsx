import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/layout/Layout'

// Eager load only critical/initial pages if desired, but here we lazy load everything
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Booking = lazy(() => import('./pages/Booking'))
const Onboarding = lazy(() => import('./pages/Onboarding'))
const Profile = lazy(() => import('./pages/Profile'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const PlaceholderPage = lazy(() => import('./pages/PlaceholderPage'))

// Simple loading fallback
const PageLoader = () => (
  <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#090E17', color: '#17E596' }}>
    <div className="loader" style={{ width: '40px', height: '40px', border: '3px solid rgba(23, 229, 150, 0.3)', borderTopColor: '#17E596', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const uid = localStorage.getItem('sanad_uid');
  if (!uid) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/start" element={<Onboarding />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/me" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/about" element={<PlaceholderPage />} />
            <Route path="/success-stories" element={<PlaceholderPage />} />
            <Route path="/blog" element={<PlaceholderPage />} />
            <Route path="/what-is-rag" element={<PlaceholderPage />} />
            <Route path="/future-of-automation" element={<PlaceholderPage />} />
            <Route path="/api-docs" element={<PlaceholderPage />} />
            <Route path="/help-center" element={<PlaceholderPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  )
}

export default App
