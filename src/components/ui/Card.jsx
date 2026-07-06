import { classNames } from '../../utils/helpers';

export const Card = ({ children, className = '' }) => (
  <div className={classNames(
    'rounded-3xl border border-slate-200/80 bg-white/85 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_40px_-30px_rgba(15,23,42,0.18)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_12px_32px_-18px_rgba(15,23,42,0.25)] dark:border-slate-800/80 dark:bg-slate-950/80 dark:shadow-[0_1px_2px_rgba(0,0,0,0.2),0_20px_40px_-28px_rgba(0,0,0,0.65)] dark:hover:border-slate-700',
    className
  )}>
    {children}
  </div>
);

export default Card;
