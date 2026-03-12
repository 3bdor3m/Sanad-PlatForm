import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Layout from './components/layout/Layout'
import ErrorBoundary from './components/ErrorBoundary'
import { ROUTES, COLORS } from './constants'

/* ─── Lazy-loaded page chunks ─── */
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Booking = lazy(() => import('./pages/Booking'))
const Onboarding = lazy(() => import('./pages/Onboarding'))
const Profile = lazy(() => import('./pages/Profile'))
const PlaceholderPage = lazy(() => import('./pages/PlaceholderPage'))

/**
 * PageLoader — a minimal branded spinner displayed while lazy-loaded
 * route chunks are being fetched over the network.
 */
const PageLoader = () => (
  <div
    role="status"
    aria-label="جاري تحميل الصفحة"
    style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLORS.NAVY_DEEP,
      color: COLORS.NEON,
    }}
  >
    <div
      style={{
        width: 40,
        height: 40,
        border: `3px solid ${COLORS.NEON}4D`,
        borderTopColor: COLORS.NEON,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }}
    />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
)

const MainLayout = () => (
  <Layout>
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  </Layout>
);

/**
 * App — root component of the Sanad Platform.
 *
 * Wraps the entire application inside:
 * - `Router`        — react-router browser router
 * - `ErrorBoundary` — catches lazy-load & render failures
 */
function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          {/* ── Public routes with normal Layout ── */}
          <Route element={<MainLayout />}>
              <Route path={ROUTES.HOME} element={<Home />} />
              <Route path={ROUTES.BOOKING} element={<Booking />} />
              <Route path={ROUTES.ONBOARDING} element={<Onboarding />} />

              {/* ── Guest-only routes (redirect if authenticated) ── */}
              <Route path={ROUTES.LOGIN} element={<Login />} />

              {/* ── Protected routes inside normal Layout (e.g. Profile) ── */}
              <Route path={ROUTES.PROFILE} element={<Profile />} />

              {/* ── Informational / placeholder pages ── */}
              <Route path={ROUTES.ABOUT} element={<PlaceholderPage />} />
              <Route path={ROUTES.SUCCESS_STORIES} element={<PlaceholderPage />} />
              <Route path={ROUTES.BLOG} element={<PlaceholderPage />} />
              <Route path={ROUTES.WHAT_IS_RAG} element={<PlaceholderPage />} />
              <Route path={ROUTES.FUTURE_OF_AUTOMATION} element={<PlaceholderPage />} />
              <Route path={ROUTES.API_DOCS} element={<PlaceholderPage />} />
              <Route path={ROUTES.HELP_CENTER} element={<PlaceholderPage />} />
            </Route>

          </Routes>
        </ErrorBoundary>
      </Router>
  )
}

export default App
