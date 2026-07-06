import { Search, Bell, Sun, Moon, Menu } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export default function Navbar({ setSidebarOpen }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/75 backdrop-blur-xl transition-colors duration-300 dark:border-slate-800/80 dark:bg-slate-950/75 lg:pl-[260px]">
      <div className="mx-auto flex h-20 w-full max-w-[1600px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl text-slate-500 transition-all duration-200 hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 dark:text-slate-400 dark:hover:bg-slate-900/80 dark:hover:text-white lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="relative hidden w-full max-w-2xl items-center text-slate-400 transition-colors focus-within:text-blue-600 sm:flex">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search anything..."
              className="h-12 w-full rounded-2xl border border-slate-200/80 bg-slate-100/70 pl-11 pr-4 text-sm text-slate-950 outline-none transition-all duration-200 placeholder:text-slate-400 hover:bg-slate-100 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-900/70 dark:text-white dark:hover:bg-slate-900 dark:focus:bg-slate-950"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl text-slate-500 transition-all duration-200 hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 dark:text-slate-400 dark:hover:bg-slate-900/80 dark:hover:text-white"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl text-slate-500 transition-all duration-200 hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 dark:text-slate-400 dark:hover:bg-slate-900/80 dark:hover:text-white">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-950" />
          </button>
          <button className="group inline-flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 px-2.5 py-2 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 dark:border-slate-800 dark:bg-slate-950/80">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-emerald-500 text-[0.7rem] font-semibold text-white shadow-sm">DT</span>
            <span className="hidden pr-1 sm:block">
              <span className="block text-xs font-medium text-slate-500 dark:text-slate-400">Workspace</span>
              <span className="block text-sm font-semibold text-slate-950 dark:text-white">DevTrack</span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
