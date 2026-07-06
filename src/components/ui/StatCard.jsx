import { Card } from './Card';

export const StatCard = ({ label, value, helperText, className = '' }) => (
  <Card className={['relative overflow-hidden p-5', className].filter(Boolean).join(' ')}>
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
    <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">{value}</p>
    {helperText ? <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{helperText}</p> : null}
  </Card>
);

export default StatCard;