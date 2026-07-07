import { useTheme } from '../../hooks/useTheme';
import { classNames } from '../../utils/helpers';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { ArrowRight, GitBranch, LayoutDashboard, ShieldCheck, Sparkles, Sun, Moon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const highlights = [
  {
    icon: LayoutDashboard,
    title: 'Structured planning',
    description: 'Keep projects, tasks, and milestones in one premium workspace.',
  },
  {
    icon: GitBranch,
    title: 'Developer-first flow',
    description: 'Built around the daily rhythm of product teams shipping software.',
  },
  {
    icon: ShieldCheck,
    title: 'Trusted by teams',
    description: 'A calm, polished interface designed for focus and clarity.',
  },
];

export default function AuthLayout({
  eyebrow,
  title,
  description,
  children,
  footer,
  compact = false,
}) {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="relative min-h-dvh overflow-hidden bg-slate-50 text-slate-950 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-28 top-[-6rem] h-80 w-80 rounded-full bg-blue-500/12 blur-3xl dark:bg-blue-500/20" />
        <div className="absolute right-[-8rem] top-20 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl dark:bg-emerald-500/15" />
        <div
          className="absolute inset-0 opacity-[0.35] dark:opacity-[0.18]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(15,23,42,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.035) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <header className="relative z-10 mx-auto flex w-full max-w-[1600px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="group inline-flex items-center gap-3 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-emerald-500 text-white shadow-[0_16px_28px_-18px_rgba(37,99,235,0.95)] transition-transform duration-200 group-hover:-translate-y-0.5">
            <LayoutDashboard className="h-4.5 w-4.5" />
          </span>
          <span>
            <span className="block text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">DevTrack</span>
            <span className="block text-sm font-semibold text-slate-950 dark:text-white">Developer Workflow OS</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/80 text-slate-500 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-400 dark:hover:text-white"
          >
            {isDark ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </button>
          <Button variant="outline" className="hidden sm:inline-flex" onClick={() => navigate('/dashboard')}>
            Dashboard
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <main className="relative z-10 mx-auto grid w-full max-w-[1600px] gap-10 px-4 pb-10 pt-4 sm:px-6 lg:grid-cols-[0.96fr_1.04fr] lg:items-center lg:px-8 lg:py-10">
        <section className={classNames('flex flex-col justify-center', compact ? 'lg:max-w-xl' : '')}>
          <Badge variant="primary" className="w-fit">Premium auth experience</Badge>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.26em] text-slate-500 dark:text-slate-400">{eyebrow}</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
            {description}
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {highlights.map((item) => (
              <Card key={item.title} className="rounded-[1.5rem] p-4">
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                    <item.icon className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <h2 className="text-sm font-semibold text-slate-950 dark:text-white">{item.title}</h2>
                    <p className="mt-1 text-xs leading-6 text-slate-500 dark:text-slate-400">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <Sparkles className="h-4 w-4 text-blue-500" />
            Designed to match the DevTrack landing page and product shell.
          </div>
        </section>

        <section className="flex justify-center lg:justify-end">
          <div className="w-full max-w-[520px]">{children}</div>
        </section>
      </main>

      {footer ? (
        <footer className="relative z-10 mx-auto w-full max-w-[1600px] px-4 pb-8 text-sm text-slate-500 dark:text-slate-400 sm:px-6 lg:px-8">
          {footer}
        </footer>
      ) : null}
    </div>
  );
}