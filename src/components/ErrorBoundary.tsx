import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { COLORS } from '../constants';

interface Props {
  /** Optional custom fallback UI; receives the error and a retry callback. */
  fallback?: (error: Error, retry: () => void) => ReactNode;
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary — catches runtime errors in its children tree and
 * renders a recovery UI instead of crashing the whole app.
 *
 * @example
 * ```tsx
 * <ErrorBoundary>
 *   <Suspense fallback={<PageLoader />}>
 *     <LazyPage />
 *   </Suspense>
 * </ErrorBoundary>
 * ```
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // TODO: integrate with an error-tracking service (e.g. Sentry)
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  /** Resets the boundary so the user can retry without a full page reload. */
  handleRetry = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.handleRetry);
      }

      return (
        <div
          dir="rtl"
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.NAVY,
            color: '#fff',
            fontFamily: 'Cairo, sans-serif',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: `linear-gradient(135deg, ${COLORS.NEON}33, ${COLORS.BLUE}33)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 24,
              fontSize: 28,
            }}
          >
            ⚠️
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 8 }}>
            حدث خطأ غير متوقع
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', maxWidth: 400, marginBottom: 24 }}>
            نعتذر عن هذا الخطأ. يمكنك إعادة المحاولة أو العودة للصفحة الرئيسية.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={this.handleRetry}
              style={{
                padding: '10px 28px',
                borderRadius: 12,
                backgroundColor: COLORS.NEON,
                color: COLORS.NAVY,
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.875rem',
              }}
            >
              إعادة المحاولة
            </button>
            <button
              onClick={() => (window.location.href = '/')}
              style={{
                padding: '10px 28px',
                borderRadius: 12,
                backgroundColor: 'rgba(255,255,255,0.08)',
                color: '#fff',
                fontWeight: 600,
                border: '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer',
                fontSize: '0.875rem',
              }}
            >
              الصفحة الرئيسية
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
