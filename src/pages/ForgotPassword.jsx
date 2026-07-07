import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LoaderCircle, Mail, ShieldCheck } from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const error = useMemo(() => {
    if (!emailPattern.test(email.trim())) {
      return 'Enter a valid email address.';
    }
    return '';
  }, [email]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched(true);
    if (error || loading) {
      return;
    }

    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 850);
  };

  return (
    <AuthLayout
      eyebrow="Password recovery"
      title="Forgot Password?"
      description="Enter the email address associated with your DevTrack account and we’ll show a recovery flow placeholder for the frontend experience."
      footer={
        <div className="flex items-center justify-between border-t border-slate-200/80 pt-4 dark:border-slate-800">
          <Link className="font-medium text-slate-950 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-400" to="/login">
            Back to login
          </Link>
          <span className="text-sm">No backend is connected.</span>
        </div>
      }
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <Card className="rounded-[2rem] p-5 sm:p-8">
          <div className="space-y-2 border-b border-slate-200/80 pb-6 dark:border-slate-800">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">Reset your password</h2>
            <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">We’ll guide the user through a recovery placeholder with no backend attached.</p>
          </div>

          <form className="mt-6 space-y-5" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="forgot-email" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="forgot-email"
                  type="email"
                  value={email}
                  autoComplete="email"
                  aria-invalid={Boolean(touched && error)}
                  aria-describedby="forgot-email-help"
                  className="pl-11"
                  onChange={(event) => setEmail(event.target.value)}
                  onBlur={() => setTouched(true)}
                  placeholder="you@company.com"
                />
              </div>
              <p id="forgot-email-help" className="mt-2 min-h-5 text-xs text-rose-500 dark:text-rose-400">
                {touched && error ? error : '\u00A0'}
              </p>
            </div>

            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : 'Reset Password'}
            </Button>

            <AnimatePresence>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300"
                >
                  Recovery email placeholder sent. Connect your backend later to complete the flow.
                </motion.div>
              ) : null}
            </AnimatePresence>

            <div className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              Frontend-only recovery UI.
            </div>
          </form>
        </Card>
      </motion.div>
    </AuthLayout>
  );
}