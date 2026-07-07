import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Eye, EyeOff, Globe, LoaderCircle, Lock, Mail, User } from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { classNames } from '../utils/helpers';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getPasswordStrength(password) {
  const score = [
    password.length >= 8,
    /[a-z]/.test(password),
    /[A-Z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length;

  if (score <= 1) return { label: 'Weak', value: 20, tone: 'bg-rose-500' };
  if (score === 2 || score === 3) return { label: 'Fair', value: 45, tone: 'bg-amber-500' };
  if (score === 4) return { label: 'Good', value: 75, tone: 'bg-blue-500' };
  return { label: 'Strong', value: 100, tone: 'bg-emerald-500' };
}

export default function Register() {
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const passwordStrength = useMemo(() => getPasswordStrength(form.password), [form.password]);

  const errors = useMemo(() => {
    const nextErrors = {};
    if (form.fullName.trim().length < 2) nextErrors.fullName = 'Enter your full name.';
    if (!emailPattern.test(form.email.trim())) nextErrors.email = 'Enter a valid email address.';
    if (form.password.length < 8) nextErrors.password = 'Password must be at least 8 characters.';
    if (form.confirmPassword !== form.password) nextErrors.confirmPassword = 'Passwords do not match.';
    return nextErrors;
  }, [form.confirmPassword, form.email, form.fullName, form.password]);

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
      eyebrow="Create account"
      title="Create Account."
      description="Set up your DevTrack workspace and start organizing projects, milestones, and progress in a premium product experience."
      footer={
        <div className="flex flex-col gap-3 border-t border-slate-200/80 pt-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
          <p>Already have an account?</p>
          <Link className="font-medium text-slate-950 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-400" to="/login">
            Back to login
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
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">Create your workspace</h2>
            <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">Build your team profile and begin managing work from one place.</p>
          </div>

          <form className="mt-6 space-y-5" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="register-name" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
              <div className="relative">
                <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="register-name"
                  type="text"
                  value={form.fullName}
                  autoComplete="name"
                  aria-invalid={Boolean(showError('fullName'))}
                  aria-describedby="register-name-help"
                  className="pl-11"
                  onChange={(event) => setForm((current) => ({ ...current, fullName: event.target.value }))}
                  onBlur={() => setTouched((current) => ({ ...current, fullName: true }))}
                  placeholder="Jordan Lee"
                />
              </div>
              <p id="register-name-help" className="mt-2 min-h-5 text-xs text-rose-500 dark:text-rose-400">
                {showError('fullName') || '\u00A0'}
              </p>
            </div>

            <div>
              <label htmlFor="register-email" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="register-email"
                  type="email"
                  value={form.email}
                  autoComplete="email"
                  aria-invalid={Boolean(showError('email'))}
                  aria-describedby="register-email-help"
                  className="pl-11"
                  onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  onBlur={() => setTouched((current) => ({ ...current, email: true }))}
                  placeholder="you@company.com"
                />
              </div>
              <p id="register-email-help" className="mt-2 min-h-5 text-xs text-rose-500 dark:text-rose-400">
                {showError('email') || '\u00A0'}
              </p>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label htmlFor="register-password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
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
                  id="register-password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  autoComplete="new-password"
                  aria-invalid={Boolean(showError('password'))}
                  aria-describedby="register-password-help"
                  className="pl-11 pr-11"
                  onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                  onBlur={() => setTouched((current) => ({ ...current, password: true }))}
                  placeholder="Create a strong password"
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
              <div className="mt-3 space-y-2" id="register-password-help">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>Password strength</span>
                  <Badge variant={passwordStrength.label === 'Strong' ? 'success' : passwordStrength.label === 'Good' ? 'primary' : 'warning'}>{passwordStrength.label}</Badge>
                </div>
                <div className="h-2 rounded-full bg-slate-100 ring-1 ring-inset ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
                  <div className={classNames('h-full rounded-full transition-all duration-300', passwordStrength.tone)} style={{ width: `${passwordStrength.value}%` }} />
                </div>
                <p className="min-h-5 text-xs text-rose-500 dark:text-rose-400">{showError('password') || '\u00A0'}</p>
              </div>
            </div>

            <div>
              <label htmlFor="register-confirm" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Confirm Password</label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="register-confirm"
                  type={showPassword ? 'text' : 'password'}
                  value={form.confirmPassword}
                  autoComplete="new-password"
                  aria-invalid={Boolean(showError('confirmPassword'))}
                  aria-describedby="register-confirm-help"
                  className="pl-11"
                  onChange={(event) => setForm((current) => ({ ...current, confirmPassword: event.target.value }))}
                  onBlur={() => setTouched((current) => ({ ...current, confirmPassword: true }))}
                  placeholder="Repeat your password"
                />
              </div>
              <p id="register-confirm-help" className="mt-2 min-h-5 text-xs text-rose-500 dark:text-rose-400">
                {showError('confirmPassword') || '\u00A0'}
              </p>
            </div>

            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : 'Create Account'}
            </Button>

            <Button type="button" variant="outline" className="w-full">
              <Globe className="h-4 w-4" />
              Continue with Google
            </Button>

            <AnimatePresence>
              {submitAttempted && !isValid ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300"
                >
                  Please fix the highlighted fields to continue.
                </motion.div>
              ) : null}
            </AnimatePresence>
          </form>
        </Card>
      </motion.div>
    </AuthLayout>
  );
}