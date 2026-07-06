export const Dropdown = ({ trigger, children, className = '' }) => (
  <div className={['relative inline-block', className].filter(Boolean).join(' ')}>
    {trigger}
    <div className="absolute right-0 mt-2 min-w-48 rounded-2xl border border-slate-200/80 bg-white p-2 shadow-[0_20px_40px_-24px_rgba(15,23,42,0.35)] ring-1 ring-black/5 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950 dark:ring-white/5">
      {children}
    </div>
  </div>
);

export default Dropdown;