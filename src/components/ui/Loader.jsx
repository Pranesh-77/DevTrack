export const Loader = ({ className = '' }) => (
  <div
    className={['inline-block h-5 w-5 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600 dark:border-slate-800 dark:border-t-blue-400', className].filter(Boolean).join(' ')}
    role="status"
    aria-label="Loading"
  />
);

export default Loader;