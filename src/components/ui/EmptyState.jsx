import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { classNames } from '../../utils/helpers';

export const EmptyState = ({ icon: Icon, title, description, action, className = '' }) => (
  <motion.section
    whileHover={{ y: -2 }}
    transition={{ duration: 0.2 }}
    className={classNames(
      'overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/90 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.35)] backdrop-blur-sm dark:border-slate-800/80 dark:bg-slate-950/80',
      className
    )}
  >
    <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
      <div className="flex flex-col justify-center">
        <span className="inline-flex w-fit items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium tracking-wide text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          Getting started
        </span>
        <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-3xl">{title}</h3>
        {description ? <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">{description}</p> : null}
        {action ? <div className="mt-6">{action}</div> : null}
      </div>

      <div className="relative flex min-h-56 items-center justify-center rounded-[1.5rem] border border-dashed border-slate-200 bg-gradient-to-br from-slate-50 via-white to-blue-50/70 p-6 dark:border-slate-800 dark:from-slate-900 dark:via-slate-950 dark:to-blue-950/20">
        <div className="absolute inset-4 rounded-[1.25rem] bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_55%)]" />
        <div className="relative flex flex-col items-center gap-4 text-center">
          <div className="grid h-20 w-20 place-items-center rounded-[1.75rem] bg-white shadow-[0_20px_50px_-32px_rgba(15,23,42,0.5)] ring-1 ring-slate-200/80 dark:bg-slate-950 dark:ring-slate-800/80">
            {Icon ? <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" /> : <ArrowRight className="h-8 w-8 text-blue-600 dark:text-blue-400" />}
          </div>
          <div className="max-w-xs space-y-1">
            <p className="text-sm font-medium text-slate-900 dark:text-white">Illustration area</p>
            <p className="text-xs leading-6 text-slate-500 dark:text-slate-400">A soft visual anchor that keeps the empty state light, polished, and consistent with the rest of the workspace.</p>
          </div>
        </div>
      </div>
    </div>
  </motion.section>
);

export default EmptyState;