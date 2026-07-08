import { classNames } from '../../utils/helpers';
import { useTheme } from '../../hooks/useTheme';

export const Input = ({ className = '', style = {}, ...props }) => {
  const { isDark } = useTheme();
  return (
    <input
      className={classNames(
        'h-11 w-full rounded-2xl border border-slate-200/80 bg-white px-4 text-sm text-slate-950 outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400/10',
        className
      )}
      style={{ colorScheme: isDark ? 'dark' : 'light', ...style }}
      {...props}
    />
  );
};

export default Input;