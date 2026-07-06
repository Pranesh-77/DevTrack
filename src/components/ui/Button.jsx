import { classNames } from '../../utils/helpers';

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = 'inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-medium tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-offset-slate-950';
  const variants = {
    primary: 'bg-slate-950 text-white shadow-[0_10px_24px_-14px_rgba(15,23,42,0.9)] hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:ring-slate-950 dark:bg-white dark:text-slate-950 dark:shadow-[0_10px_24px_-14px_rgba(255,255,255,0.18)] dark:hover:bg-slate-100 dark:focus-visible:ring-white',
    secondary: 'bg-blue-600 text-white shadow-[0_10px_24px_-14px_rgba(37,99,235,0.8)] hover:-translate-y-0.5 hover:bg-blue-500 focus-visible:ring-blue-500',
    outline: 'border border-slate-200 bg-white text-slate-700 shadow-sm hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 focus-visible:ring-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:bg-slate-900'
  };

  return (
    <button className={classNames(baseStyle, variants[variant], className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
