import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  BarChart3,
  Bot,
  CalendarDays,
  Check,
  ChevronDown,
  FolderKanban,
  KanbanSquare,
  LayoutDashboard,
  Menu,
  Moon,
  GitBranch,
  Sparkles,
  Sun,
  X,
  Play,
} from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { classNames } from '../utils/helpers';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/ProgressBar';
import { StatCard } from '../components/ui/StatCard';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const TRUST_STATS = [
  { value: 10000, suffix: '+', label: 'Projects Managed' },
  { value: 5000, suffix: '+', label: 'Developers' },
  { value: 100000, suffix: '+', label: 'Tasks Completed' },
  { value: 99.9, suffix: '%', label: 'Uptime', decimals: 1 },
];

const FEATURES = [
  {
    icon: FolderKanban,
    title: 'Project Management',
    description: 'Keep every project visible from kickoff to launch with clean progress, milestones, and ownership.',
  },
  {
    icon: KanbanSquare,
    title: 'Kanban Boards',
    description: 'Move work through a calm, organized workflow designed for fast-moving product teams.',
  },
  {
    icon: CalendarDays,
    title: 'Calendar Planning',
    description: 'Plan delivery around releases, sprint goals, and deadlines without bouncing between tools.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Understand throughput, velocity, and progress through a dashboard that stays out of your way.',
  },
  {
    icon: GitBranch,
    title: 'GitHub Integration',
    description: 'Connect developer workflows with repo context so execution stays close to the codebase.',
  },
  {
    icon: Bot,
    title: 'AI Assistant',
    description: 'AI assistance is coming soon to streamline planning, summarization, and workflow suggestions.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Maya Chen',
    role: 'Product Engineer at Northstar',
    quote: 'DevTrack makes the planning side feel as deliberate as the product itself. It is clean, fast, and easy to keep organized.',
    initials: 'MC',
  },
  {
    name: 'Jordan Patel',
    role: 'Engineering Manager at Pulsegrid',
    quote: 'The interface feels like a tool built by people who actually ship software. It keeps the team aligned without feeling heavy.',
    initials: 'JP',
  },
  {
    name: 'Ava Brooks',
    role: 'Founding Developer at Alloy',
    quote: 'It has the polish of a premium product but still feels practical enough for daily work. That balance is hard to get right.',
    initials: 'AB',
  },
];

const FAQS = [
  {
    question: 'Is DevTrack free?',
    answer: 'DevTrack is being positioned as a premium SaaS product. The public homepage can preview the platform experience and future plan options.',
  },
  {
    question: 'Can teams collaborate?',
    answer: 'Yes. DevTrack is designed around team visibility, shared project context, and organized execution across the workspace.',
  },
  {
    question: 'Does it support GitHub?',
    answer: 'GitHub integration is part of the product vision and is highlighted on the homepage as a core workflow connection.',
  },
  {
    question: 'Is mobile support planned?',
    answer: 'The layout is already responsive and the product direction includes strong support for laptop, tablet, and mobile workflows.',
  },
];

const DEFAULT_FAQ_INDEX = 0;

function AnimatedCounter({ value, suffix = '', decimals = 0 }) {
  const reduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (reduceMotion) {
      return undefined;
    }

    let animationFrame;
    let startTime;

    const animate = (time) => {
      if (!startTime) {
        startTime = time;
      }

      const progress = Math.min((time - startTime) / 1200, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplayValue(value * eased);

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    animationFrame = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [reduceMotion, value]);

  return (
    <span>
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  );
}

function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="max-w-2xl space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500 dark:text-slate-400">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">{title}</h2>
      <p className="text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">{description}</p>
    </div>
  );
}

function DashboardPreview({ compact = false }) {
  return (
    <Card className="relative overflow-hidden rounded-[2rem] border-slate-200/80 bg-white/90 p-4 shadow-[0_30px_90px_-36px_rgba(15,23,42,0.5)] backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/85 sm:p-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.1),transparent_32%)]" />
      <div className="relative space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 dark:border-slate-800/80">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-rose-400" />
            <div className="h-3 w-3 rounded-full bg-amber-400" />
            <div className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>
          <div className="rounded-full border border-slate-200/80 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            DevTrack Workspace
          </div>
        </div>

        <div className={classNames('grid gap-4', compact ? 'lg:grid-cols-[1fr_0.95fr]' : 'lg:grid-cols-[0.95fr_1.05fr]')}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <StatCard label="Active" value={12} helperText="Projects in motion" className="p-4" />
              <StatCard label="Velocity" value={92} helperText="Team momentum" className="p-4" />
            </div>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-950 dark:text-white">Recent projects</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Fresh progress across the workspace</p>
                </div>
                <Badge variant="primary">Live</Badge>
              </div>

              <div className="mt-4 space-y-3">
                {[
                  { name: 'Northstar Platform', progress: 82, tone: 'bg-blue-500' },
                  { name: 'Atlas Mobile', progress: 64, tone: 'bg-emerald-500' },
                  { name: 'Orbit Design System', progress: 48, tone: 'bg-violet-500' },
                ].map((project) => (
                  <div key={project.name} className="space-y-2 rounded-2xl border border-slate-200/80 bg-white/75 p-3 dark:border-slate-800 dark:bg-slate-950/80">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-slate-900 dark:text-white">{project.name}</span>
                      <span className="text-slate-500 dark:text-slate-400">{project.progress}%</span>
                    </div>
                    <ProgressBar value={project.progress} />
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-950 dark:text-white">Analytics</p>
                  <BarChart3 className="h-4 w-4 text-blue-500" />
                </div>
                <div className="mt-4 flex h-24 items-end gap-2">
                  {[48, 72, 58, 86, 63, 92].map((height, index) => (
                    <div key={index} className="flex-1 rounded-t-2xl bg-gradient-to-t from-blue-600 to-emerald-400" style={{ height: `${height}%` }} />
                  ))}
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-950 dark:text-white">Mini calendar</p>
                  <CalendarDays className="h-4 w-4 text-emerald-500" />
                </div>
                <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[10px] font-medium text-slate-400">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                    <span key={`${day}-${index}`}>{day}</span>
                  ))}
                  {Array.from({ length: 14 }).map((_, index) => (
                    <span
                      key={index}
                      className={classNames(
                        'grid aspect-square place-items-center rounded-lg border text-[11px]',
                        index === 9 ? 'border-blue-500 bg-blue-500 text-white' : 'border-slate-200 bg-slate-50 text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400'
                      )}
                    >
                      {index + 1}
                    </span>
                  ))}
                </div>
              </Card>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-950 dark:text-white">Kanban</p>
                  <KanbanSquare className="h-4 w-4 text-amber-500" />
                </div>
                <div className="mt-4 space-y-2">
                  {['Design review', 'QA pass', 'Release prep'].map((item, index) => (
                    <div key={item} className="rounded-2xl border border-slate-200/80 bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
                      <div className="flex items-center justify-between">
                        <span>{item}</span>
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500 dark:bg-slate-900 dark:text-slate-400">{index + 1}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-950 dark:text-white">Tasks</p>
                  <Check className="h-4 w-4 text-emerald-500" />
                </div>
                <div className="mt-4 space-y-3">
                  {[
                    'Ship onboarding flow',
                    'Review analytics schema',
                    'Prepare release notes',
                  ].map((task, index) => (
                    <div key={task} className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-300">
                      <span className={classNames('grid h-6 w-6 place-items-center rounded-full', index < 2 ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400 dark:bg-slate-900')}>
                        {index < 2 ? <Check className="h-3 w-3" /> : <span className="h-2 w-2 rounded-full bg-current" />}
                      </span>
                      <span>{task}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {!compact ? (
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-950 dark:text-white">Activity timeline</p>
                  <Activity className="h-4 w-4 text-violet-500" />
                </div>
                <div className="mt-4 space-y-3">
                  {[
                    'Sprint planning completed',
                    'Two tasks moved to review',
                    'Release milestone updated',
                  ].map((entry, index) => (
                    <div key={entry} className="flex gap-3 text-xs text-slate-600 dark:text-slate-300">
                      <div className="mt-1 flex flex-col items-center">
                        <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                        {index !== 2 ? <span className="h-full w-px bg-slate-200 dark:bg-slate-800" /> : null}
                      </div>
                      <span className="pb-2">{entry}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ) : null}
          </div>
        </div>
      </div>
    </Card>
  );
}

function FeatureCard({ icon: Icon, title, description, delay }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, delay }}
      className="group rounded-[1.75rem] bg-gradient-to-br from-blue-500/15 via-transparent to-emerald-500/15 p-px"
    >
      <Card className="h-full rounded-[1.72rem] p-6 transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)]">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-[0_16px_30px_-18px_rgba(15,23,42,0.8)] dark:bg-white dark:text-slate-950">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="mt-5 text-lg font-semibold tracking-tight text-slate-950 dark:text-white">{title}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{description}</p>
      </Card>
    </motion.article>
  );
}

function TestimonialCard({ name, role, quote, initials, delay }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, delay }}
    >
      <Card className="h-full rounded-[1.75rem] p-6">
        <div className="flex items-center gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-tr from-blue-600 to-emerald-500 text-sm font-semibold text-white shadow-sm">
            {initials}
          </div>
          <div>
            <p className="font-semibold text-slate-950 dark:text-white">{name}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{role}</p>
          </div>
        </div>
        <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300">“{quote}”</p>
      </Card>
    </motion.article>
  );
}

function ComparisonPanel({ title, items, emphasized = false }) {
  return (
    <Card
      className={classNames(
        'rounded-[1.75rem] p-6',
        emphasized ? 'border-slate-950/10 bg-slate-950 text-white dark:border-white/10 dark:bg-white dark:text-slate-950' : 'bg-white/90 dark:bg-slate-950/80'
      )}
    >
      <p className={classNames('text-xs font-semibold uppercase tracking-[0.24em]', emphasized ? 'text-white/60 dark:text-slate-500' : 'text-slate-500 dark:text-slate-400')}>
        {title}
      </p>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item} className={classNames('flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm', emphasized ? 'border-white/10 bg-white/10 dark:border-slate-200/10 dark:bg-slate-950' : 'border-slate-200/80 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-900/70')}>
            <span className={classNames('grid h-7 w-7 place-items-center rounded-full', emphasized ? 'bg-white text-slate-950 dark:bg-blue-500 dark:text-white' : 'bg-slate-950 text-white dark:bg-white dark:text-slate-950')}>
              <Check className="h-3.5 w-3.5" />
            </span>
            <span className={classNames('font-medium', emphasized ? 'text-white dark:text-slate-950' : 'text-slate-700 dark:text-slate-200')}>
              {item}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <Card className="rounded-[1.5rem] p-0 overflow-hidden">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span className="text-sm font-semibold text-slate-950 dark:text-white">{question}</span>
        <ChevronDown className={classNames('h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200', isOpen ? 'rotate-180' : 'rotate-0')} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-sm leading-7 text-slate-600 dark:text-slate-300">{answer}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Card>
  );
}

function LandingNavbar({ activeSection, mobileOpen, setMobileOpen }) {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/70 backdrop-blur-2xl transition-colors duration-300 dark:border-slate-800/60 dark:bg-slate-950/70">
      <div className="mx-auto flex h-20 w-full max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" className="group flex items-center gap-3 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-emerald-500 text-white shadow-[0_16px_28px_-18px_rgba(37,99,235,0.95)] transition-transform duration-200 group-hover:-translate-y-0.5">
            <LayoutDashboard className="h-4.5 w-4.5" />
          </span>
          <span className="leading-tight">
            <span className="block text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">DevTrack</span>
            <span className="block text-sm font-semibold text-slate-950 dark:text-white">Developer Workflow OS</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              aria-current={activeSection === item.href.slice(1) ? 'page' : undefined}
              className={classNames(
                'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40',
                activeSection === item.href.slice(1)
                  ? 'bg-slate-950 text-white shadow-[0_12px_24px_-18px_rgba(15,23,42,0.8)] dark:bg-white dark:text-slate-950'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white'
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/80 text-slate-500 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-400 dark:hover:text-white"
          >
            {isDark ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </button>

          <Button variant="primary" onClick={() => navigate('/dashboard')} className="hidden sm:inline-flex">
            Dashboard
            <ArrowRight className="h-4 w-4" />
          </Button>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/80 text-slate-500 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-400 dark:hover:text-white lg:hidden"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-slate-950/45 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
              className="absolute right-0 top-0 flex h-full w-[min(88vw,22rem)] flex-col border-l border-slate-200/80 bg-white p-4 shadow-[0_24px_80px_-30px_rgba(15,23,42,0.55)] dark:border-slate-800 dark:bg-slate-950"
            >
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-4 dark:border-slate-800">
                <span className="text-sm font-semibold tracking-[0.24em] text-slate-500 dark:text-slate-400">MENU</span>
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-2xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-4 flex flex-1 flex-col gap-2" aria-label="Mobile primary">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={classNames(
                      'rounded-2xl px-4 py-3 text-sm font-medium transition-colors',
                      activeSection === item.href.slice(1)
                        ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900'
                    )}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="grid gap-3 border-t border-slate-200/80 pt-4 dark:border-slate-800">
                <Button variant="primary" onClick={() => navigate('/dashboard')}>
                  Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={toggleTheme}>
                  {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  Toggle theme
                </Button>
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

export default function Landing() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(DEFAULT_FAQ_INDEX);

  useEffect(() => {
    const ids = ['home', 'features', 'about', 'contact'];
    const observers = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (observers.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0.1 }
    );

    observers.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const navigate = useNavigate();

  const scrollToShowcase = () => {
    document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="relative min-h-dvh overflow-hidden bg-slate-50 text-slate-950 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-[-7rem] h-80 w-80 rounded-full bg-blue-500/12 blur-3xl dark:bg-blue-500/20" />
        <div className="absolute right-[-5rem] top-24 h-96 w-96 rounded-full bg-emerald-500/12 blur-3xl dark:bg-emerald-500/15" />
        <div
          className="absolute inset-0 opacity-[0.4] dark:opacity-[0.22]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(15,23,42,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.035) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <LandingNavbar activeSection={activeSection} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <main className="relative mx-auto flex w-full max-w-[1600px] flex-col px-4 pb-20 sm:px-6 lg:px-8">
        <motion.section
          id="home"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="grid gap-12 py-10 sm:py-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-16"
        >
          <div className="relative z-10 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="primary">Open Source Friendly</Badge>
              <Badge variant="success">GitHub Ready</Badge>
              <Badge variant="warning">AI Powered (Coming Soon)</Badge>
            </div>

            <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
              Manage Development.
              <span className="block bg-gradient-to-r from-blue-600 via-slate-950 to-emerald-500 bg-clip-text text-transparent dark:from-blue-400 dark:via-white dark:to-emerald-400">Build Faster.</span>
              <span className="block">Ship Smarter.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
              DevTrack is a premium developer-focused workspace for teams who want project planning, task execution, and progress visibility in one calm place.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button variant="primary" onClick={() => navigate('/dashboard')} className="w-full sm:w-auto">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={scrollToShowcase} className="w-full sm:w-auto">
                <Play className="h-4 w-4" />
                Live Preview
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-3 py-2 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
                <Check className="h-3.5 w-3.5 text-emerald-500" /> Open Source Friendly
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-3 py-2 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
                <Check className="h-3.5 w-3.5 text-emerald-500" /> GitHub Ready
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-3 py-2 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
                <Sparkles className="h-3.5 w-3.5 text-blue-500" /> AI Powered (Coming Soon)
              </span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.06, ease: 'easeOut' }}
            className="relative"
          >
            <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-blue-500/15 via-transparent to-emerald-500/15 blur-2xl" />
            <DashboardPreview compact />
          </motion.div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="py-8 sm:py-12"
        >
          <Card className="rounded-[2rem] p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {TRUST_STATS.map((stat) => (
                <StatCard
                  key={stat.label}
                  label={stat.label}
                  value={<AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={stat.decimals ?? 0} />}
                  className="p-5"
                />
              ))}
            </div>
          </Card>
        </motion.section>

        <section id="features" className="scroll-mt-28 py-10 sm:py-14">
          <SectionHeader
            eyebrow="Features"
            title="Everything a serious development workspace should feel like"
            description="Designed to reduce friction, increase clarity, and keep the team focused on shipping rather than coordinating across scattered tools."
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {FEATURES.map((feature, index) => (
              <FeatureCard key={feature.title} {...feature} delay={index * 0.05} />
            ))}
          </div>
        </section>

        <section id="about" className="scroll-mt-28 py-10 sm:py-14">
          <SectionHeader
            eyebrow="Why DevTrack"
            title="Traditional tools create friction. DevTrack creates momentum."
            description="A clean comparison between scattered workflows and a single workspace built for planning, execution, and visibility."
          />

          <div className="mt-8 grid items-stretch gap-5 lg:grid-cols-[1fr_auto_1fr]">
            <ComparisonPanel
              title="Traditional Workflow"
              items={['Scattered Notes', 'Multiple Apps', 'No Progress Tracking', 'Manual Planning']}
            />

            <div className="hidden items-center justify-center lg:flex">
              <div className="grid h-14 w-14 place-items-center rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
                VS
              </div>
            </div>

            <ComparisonPanel
              title="DevTrack"
              emphasized
              items={['One Workspace', 'Track Everything', 'Beautiful Dashboard', 'Organized Workflow']}
            />
          </div>

          <div id="showcase" className="mt-8 scroll-mt-28 rounded-[2rem] border border-slate-200/80 bg-white/90 p-4 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.35)] dark:border-slate-800/80 dark:bg-slate-950/80 sm:p-6 lg:p-8">
            <div className="flex flex-col gap-2 border-b border-slate-200/80 pb-4 dark:border-slate-800/80 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Dashboard showcase</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">A preview of the workspace experience</h3>
              </div>
              <p className="max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">Recent projects, task lists, charts, milestones, and activity are presented in a single calm interface.</p>
            </div>
            <div className="mt-6">
              <DashboardPreview />
            </div>
          </div>
        </section>

        <section className="py-10 sm:py-14">
          <SectionHeader
            eyebrow="Testimonials"
            title="Loved by developers who want a cleaner way to plan work"
            description="Fictional voices that reflect the product direction: calm, premium, and practical."
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {TESTIMONIALS.map((testimonial, index) => (
              <TestimonialCard key={testimonial.name} {...testimonial} delay={index * 0.05} />
            ))}
          </div>
        </section>

        <section className="py-10 sm:py-14">
          <SectionHeader
            eyebrow="FAQ"
            title="A few quick questions before you dive in"
            description="The basics are intentionally simple. Expand each item for a concise answer."
          />

          <div className="mt-8 grid gap-3">
            {FAQS.map((item, index) => (
              <FAQItem
                key={item.question}
                question={item.question}
                answer={item.answer}
                isOpen={index === openFaqIndex}
                onToggle={() => setOpenFaqIndex((current) => (current === index ? -1 : index))}
              />
            ))}
          </div>
        </section>

        <section id="contact" className="scroll-mt-28 py-10 sm:py-14">
          <Card className="relative overflow-hidden rounded-[2rem] p-6 sm:p-8 lg:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.12),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.12),transparent_34%)]" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Final CTA</p>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">Ready to organize your development workflow?</h2>
                <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">Start with a premium workspace designed to feel calm, focused, and fast.</p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button variant="primary" onClick={() => navigate('/dashboard')}>
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={() => window.open('https://github.com', '_blank', 'noreferrer')}>
                  <GitBranch className="h-4 w-4" />
                  GitHub
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </main>

      <footer className="relative border-t border-slate-200/80 bg-white/70 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/70">
        <div className="mx-auto grid w-full max-w-[1600px] gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_repeat(3,minmax(0,1fr))] lg:px-8">
          <div className="space-y-4">
            <a href="#home" className="inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-emerald-500 text-white shadow-[0_16px_28px_-18px_rgba(37,99,235,0.95)]">
                <LayoutDashboard className="h-4.5 w-4.5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-slate-950 dark:text-white">DevTrack</span>
                <span className="block text-xs text-slate-500 dark:text-slate-400">Premium developer workspace</span>
              </span>
            </a>
            <p className="max-w-sm text-sm leading-7 text-slate-600 dark:text-slate-300">DevTrack helps teams manage projects, track progress, and plan development with clarity and polish.</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-950 dark:text-white">Quick Links</p>
            <div className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-300">
              {NAV_ITEMS.map((item) => (
                <a key={item.label} href={item.href} className="transition-colors hover:text-slate-950 dark:hover:text-white">
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-950 dark:text-white">Product</p>
            <div className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-300">
              {['Dashboard', 'Projects', 'Tasks', 'Calendar'].map((item) => (
                <a key={item} href={item === 'Dashboard' ? '/dashboard' : `/${item.toLowerCase()}`} className="transition-colors hover:text-slate-950 dark:hover:text-white">
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-950 dark:text-white">Resources</p>
            <div className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-300">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-slate-950 dark:hover:text-white">
                GitHub
              </a>
              <a href="https://linear.app" target="_blank" rel="noreferrer" className="transition-colors hover:text-slate-950 dark:hover:text-white">
                Inspiration
              </a>
              <a href="#contact" className="transition-colors hover:text-slate-950 dark:hover:text-white">
                Contact
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200/80 px-4 py-5 text-sm text-slate-500 dark:border-slate-800/80 dark:text-slate-400 sm:px-6 lg:px-8">
          <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 DevTrack. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#contact" className="transition-colors hover:text-slate-950 dark:hover:text-white">
                Privacy
              </a>
              <a href="#contact" className="transition-colors hover:text-slate-950 dark:hover:text-white">
                Terms
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-slate-950 dark:hover:text-white">
                Social
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}