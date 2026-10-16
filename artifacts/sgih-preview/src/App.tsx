import { useEffect, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Home() {
  const [frameState, setFrameState] = useState<'loading' | 'ready' | 'error'>(
    'loading',
  );
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (frameState !== 'loading') return;
    const timeout = window.setTimeout(() => setFrameState('error'), 20000);
    return () => window.clearTimeout(timeout);
  }, [attempt, frameState]);

  const retry = () => {
    setFrameState('loading');
    setAttempt((current) => current + 1);
  };

  const confirmDashboardResponse = async () => {
    try {
      const response = await fetch('/streamlit/', { cache: 'no-store' });
      setFrameState(response.ok ? 'ready' : 'error');
    } catch {
      setFrameState('error');
    }
  };

  return (
    <main
      className="relative h-[100dvh] min-h-[100dvh] w-full overflow-hidden bg-background"
      aria-busy={frameState === 'loading'}
      data-testid="sgih-dashboard-shell"
    >
      <iframe
        key={attempt}
        className="dashboard-frame absolute inset-0 transition-opacity duration-300"
        src="/streamlit/"
        title="SGIH Service Desk dashboard"
        aria-label="SGIH Service Desk dashboard"
        onLoad={confirmDashboardResponse}
        onError={() => setFrameState('error')}
        style={{ opacity: frameState === 'ready' ? 1 : 0 }}
        data-testid="frame-sgih-dashboard"
      />

      {frameState === 'loading' && (
        <section
          className="absolute inset-0 z-10 flex items-center justify-center bg-[hsl(187_22%_96%)] px-6"
          role="status"
          aria-live="polite"
          data-testid="status-dashboard-loading"
        >
          <div className="shell-noise" aria-hidden="true" />
          <div className="relative flex w-full max-w-sm flex-col items-center text-center">
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-[hsl(184_16%_82%)] bg-[hsl(187_22%_98%)] shadow-sm">
              <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-primary">
                SG
              </span>
            </div>
            <div
              className="mb-5 h-8 w-8 animate-spin rounded-full border-[2px] border-[hsl(184_16%_82%)] border-t-primary motion-reduce:animate-none"
              aria-hidden="true"
            />
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              SGIH Service Desk
            </p>
            <p className="mt-2 text-sm text-foreground">
              Abrindo o painel…
            </p>
          </div>
        </section>
      )}

      {frameState === 'error' && (
        <section
          className="absolute inset-0 z-10 flex items-center justify-center bg-[hsl(187_22%_96%)] px-6"
          role="alert"
          data-testid="status-dashboard-error"
        >
          <div className="shell-noise" aria-hidden="true" />
          <div className="relative w-full max-w-md border-l-2 border-[hsl(37_76%_58%)] py-2 pl-6">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
              SGIH Service Desk
            </p>
            <h1 className="mt-4 font-serif text-4xl leading-tight text-foreground">
              Painel indisponível
            </h1>
            <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
              The dashboard at{' '}
              <span className="font-mono text-xs text-foreground">
                /streamlit/
              </span>{' '}
              não respondeu. Verifique se o serviço está em execução e tente
              novamente.
            </p>
            <button
              type="button"
              onClick={retry}
              className="mt-7 inline-flex min-h-11 items-center justify-center border border-primary bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-[hsl(177_48%_26%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              data-testid="button-retry-dashboard"
            >
              Tentar novamente
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

function Router() {
  return (
    // Keep the boundary outside the route so the shell survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
