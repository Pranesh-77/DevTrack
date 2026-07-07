import { motion } from 'framer-motion';
import { AlertTriangle, Home, LayoutDashboard } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-dvh overflow-hidden bg-slate-50 text-slate-950 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/12 blur-3xl dark:bg-blue-500/20" />
        <div className="absolute inset-0 opacity-[0.35] dark:opacity-[0.18]" style={{ backgroundImage: 'linear-gradient(rgba(15,23,42,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.035) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      </div>

      <main className="relative mx-auto flex min-h-dvh w-full max-w-[1600px] items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full max-w-2xl"
        >
          <Card className="rounded-[2rem] p-6 text-center sm:p-8 lg:p-10">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-[1.75rem] bg-gradient-to-br from-blue-600 via-blue-500 to-emerald-500 text-white shadow-[0_20px_40px_-24px_rgba(37,99,235,0.95)]">
              <AlertTriangle className="h-9 w-9" />
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.26em] text-slate-500 dark:text-slate-400">Page not found</p>
            <h1 className="mt-3 text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-7xl">404</h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
              The page you were looking for does not exist, but your workspace is still right where it should be.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button variant="primary" onClick={() => navigate('/')}>
                <Home className="h-4 w-4" />
                Back to Home
              </Button>
              <Button variant="outline" onClick={() => navigate('/dashboard')}>
                <LayoutDashboard className="h-4 w-4" />
                Go to Dashboard
              </Button>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}