export const ProgressBar = ({ value = 0, className = '' }) => (
  <div className={['h-2.5 w-full overflow-hidden rounded-full bg-slate-100 ring-1 ring-inset ring-slate-200 dark:bg-slate-900 dark:ring-slate-800', className].filter(Boolean).join(' ')}>
    <div
      className="h-full rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-500 transition-all duration-300"
      style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
    />
  </div>
);

export default ProgressBar;