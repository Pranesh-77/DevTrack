import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { NAVIGATION } from '../../constants/navigation';
import { classNames } from '../../utils/helpers';
import { Triangle, Sparkles } from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen }) {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.button
            type="button"
            aria-label="Close navigation drawer"
            className="fixed inset-0 z-40 cursor-default bg-slate-950/40 backdrop-blur-[1px] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        className={classNames(
          'fixed inset-y-0 left-0 z-50 flex w-[260px] -translate-x-full flex-col border-r border-slate-200/80 bg-white/90 shadow-[0_24px_80px_-28px_rgba(15,23,42,0.25)] backdrop-blur-xl transition-transform duration-300 ease-out dark:border-slate-800/80 dark:bg-slate-950/90 dark:shadow-[0_24px_80px_-28px_rgba(0,0,0,0.55)] lg:translate-x-0',
          isOpen ? 'translate-x-0' : '',
        )}
      >
        <div className="flex h-20 items-center justify-between border-b border-slate-200/80 px-5 dark:border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-emerald-500 shadow-[0_12px_24px_-14px_rgba(37,99,235,0.8)]">
              <Triangle className="h-4 w-4 fill-white text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold tracking-[0.18em] text-slate-500 dark:text-slate-400">DEVTRACK</span>
                <Sparkles className="h-3.5 w-3.5 text-blue-500" />
              </div>
              <div className="text-base font-semibold text-slate-950 dark:text-white">Workspace</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {NAVIGATION.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => classNames(
                'group relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40',
                isActive
                  ? 'bg-slate-950 text-white shadow-[0_12px_28px_-18px_rgba(15,23,42,0.9)] dark:bg-white dark:text-slate-950'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-900/80 dark:hover:text-white'
              )}
            >
              {({ isActive }) => (
                <>
                  <span className={classNames(
                    'absolute inset-y-2 left-2 w-1 rounded-full bg-blue-500 transition-opacity duration-200',
                    isActive ? 'opacity-100' : 'opacity-0'
                  )} />
                  <span className={classNames(
                    'grid h-9 w-9 place-items-center rounded-xl transition-colors duration-200',
                    isActive ? 'bg-white/10 dark:bg-slate-950/10' : 'bg-slate-100 dark:bg-slate-900/80'
                  )}>
                    <item.icon className="h-4.5 w-4.5 flex-shrink-0" />
                  </span>
                  <span className="truncate">{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </motion.aside>
    </>
  );
}
