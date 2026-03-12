import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'
import './styles/style.css'
import './i18n'

/**
 * Application bootstrap — mounts the React tree into `#root`.
 *
 * Provider order (outermost → innermost):
 *  1. React.StrictMode  — development-time checks
 *  2. HelmetProvider    — manages <head> meta tags across routes
 *  3. App               — contains Router → AuthProvider → Layout → Routes
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)

