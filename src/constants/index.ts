/**
 * Sanad Platform — Application Constants
 * Centralized source of truth for routes, colors, and shared config values.
 */

/* ──────────────────────── Route Paths ──────────────────────── */

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  BOOKING: '/booking',
  ONBOARDING: '/start',
  PROFILE: '/me',
  ABOUT: '/about',
  SUCCESS_STORIES: '/success-stories',
  BLOG: '/blog',
  WHAT_IS_RAG: '/what-is-rag',
  FUTURE_OF_AUTOMATION: '/future-of-automation',
  API_DOCS: '/api-docs',
  HELP_CENTER: '/help-center',
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

/* ──────────────────────── Brand Colors ──────────────────────── */

export const COLORS = {
  /** Sanad neon green — primary accent */
  NEON: '#17E596',
  /** Ocean blue — secondary accent */
  BLUE: '#0EA5E9',
  /** Deep navy — app background */
  NAVY: '#0A0C1A',
  /** Darker navy — sidebar / page-loader background */
  NAVY_DEEP: '#090E17',
  /** Card surface */
  CARD: '#0F1225',
  /** Subtle border */
  BORDER: 'rgba(255, 255, 255, 0.05)',
  /** Indigo accent */
  INDIGO: '#6366F1',
  /** Purple accent */
  PURPLE: '#8B5CF6',
  /** Warning orange */
  ORANGE: '#F59E0B',
  /** Error red */
  RED: '#EF4444',
} as const;

/* ──────────────────────── Local-storage Keys ──────────────────────── */

export const STORAGE_KEYS = {
  UID: 'sanad_uid',
  TOKEN: 'sanad_token',
  PROFILE_COMPLETED: 'sanad_profile_completed',
  LANGUAGE: 'i18nextLng',
} as const;



/* ──────────────────────── SEO ──────────────────────── */

export const SEO = {
  SITE_NAME_AR: 'سند',
  SITE_NAME_EN: 'Sanad',
  CANONICAL: 'https://sanad.ai/',
  THEME_COLOR: '#17E596',
} as const;
