import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  LoaderCircle,
} from "lucide-react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import AuthLayout from '../components/auth/AuthLayout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '', remember: true });
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const errors = useMemo(() => {
    const nextErrors = {};
    if (!emailPattern.test(form.email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }
    if (form.password.trim().length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.';
    }
    return nextErrors;
  }, [form.email, form.password]);

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitAttempted(true);
    if (!isValid || loading) {
      return;
    }

    setLoading(true);
    window.setTimeout(() => setLoading(false), 900);
  };

  const showError = (field) => (touched[field] || submitAttempted) && errors[field];

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Welcome Back."
      description="Sign in to DevTrack and continue managing projects, milestones, and tasks from one calm workspace."
      footer={
        <div className="flex flex-col gap-3 border-t border-slate-200/80 pt-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
          <p>Need a new workspace account?</p>
          <Link className="font-medium text-slate-950 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-400" to="/register">
            Create account
          </Link>
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
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">Log in to your account</h2>
            <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">Use your DevTrack credentials to resume your workflow.</p>
          </div>

          <form className="mt-6 space-y-5" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="login-email" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="login-email"
                  type="email"
                  value={form.email}
                  autoComplete="email"
                  aria-invalid={Boolean(showError('email'))}
                  aria-describedby="login-email-help"
                  className="pl-11"
                  onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  onBlur={() => setTouched((current) => ({ ...current, email: true }))}
                  placeholder="you@company.com"
                />
              </div>
              <p id="login-email-help" className="mt-2 min-h-5 text-xs text-rose-500 dark:text-rose-400">
                {showError('email') || '\u00A0'}
              </p>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label htmlFor="login-password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                <button
                  type="button"
                  className="text-xs font-medium text-slate-500 transition-colors hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 dark:text-slate-400 dark:hover:text-white"
                  onClick={() => setShowPassword((current) => !current)}
                >
                  {showPassword ? 'Hide' : 'Show'} password
                </button>
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  autoComplete="current-password"
                  aria-invalid={Boolean(showError('password'))}
                  aria-describedby="login-password-help"
                  className="pl-11 pr-11"
                  onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                  onBlur={() => setTouched((current) => ({ ...current, password: true }))}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 inline-flex -translate-y-1/2 items-center justify-center rounded-xl p-2 text-slate-400 transition-colors hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 dark:hover:text-white"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((current) => !current)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p id="login-password-help" className="mt-2 min-h-5 text-xs text-rose-500 dark:text-rose-400">
                {showError('password') || '\u00A0'}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <label className="inline-flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={(event) => setForm((current) => ({ ...current, remember: event.target.checked }))}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-950"
                />
                Remember me
              </label>
              <Link className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-950 dark:text-slate-300 dark:hover:text-white" to="/forgot-password">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : 'Login'}
            </Button>

            <div className="relative py-1">
              <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-slate-200 dark:bg-slate-800" />
              <span className="relative mx-auto block w-fit rounded-full bg-white px-3 text-xs font-medium uppercase tracking-[0.22em] text-slate-400 dark:bg-slate-950">
                or continue with
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Button type="button" variant="outline" className="w-full">
                <FcGoogle className="h-5 w-5" />
                Continue with Google
              </Button>
              <Button type="button" variant="outline" className="w-full">
                <FaGithub className="h-4 w-4" />
                Continue with GitHub
              </Button>
            </div>

            <AnimatePresence>
              {submitAttempted && !isValid ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300"
                >
                  Please review the highlighted fields before continuing.
                </motion.div>
              ) : null}
            </AnimatePresence>
          </form>
        </Card>
      </motion.div>
    </AuthLayout>
  );
}