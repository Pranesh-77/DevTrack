import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { Card } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import { Bell, CreditCard, MoonStar, Palette, Settings as SettingsIcon, ShieldCheck, SunMedium, UserCircle2 } from 'lucide-react';

export default function Settings() {
  const { isDark, toggleTheme } = useTheme();
  const [displayName, setDisplayName] = useState('DevTrack User');
  const [email, setEmail] = useState('user@devtrack.app');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22, ease: 'easeOut' }} className="flex w-full flex-1 flex-col gap-6 pb-10">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Preferences</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">Settings</h1>
        <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">Tune the workspace shell, theme, and notification behavior without leaving the app.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-4 dark:border-slate-900">
              <UserCircle2 className="h-5 w-5 text-blue-500" />
              <h2 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">Profile</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Display name</label>
                <Input value={displayName} onChange={(event) => setDisplayName(event.target.value)} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Email</label>
                <Input value={email} onChange={(event) => setEmail(event.target.value)} />
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-4 dark:border-slate-900">
              <Palette className="h-5 w-5 text-indigo-500" />
              <h2 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">Appearance</h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-950 dark:text-white">Theme mode</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Switch between the light and dark workspace shells.</p>
              </div>
              <Button variant="outline" onClick={toggleTheme}>{isDark ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />} {isDark ? 'Use light mode' : 'Use dark mode'}</Button>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-4 dark:border-slate-900">
              <Bell className="h-5 w-5 text-amber-500" />
              <h2 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">Notifications</h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-950 dark:text-white">Task and due date reminders</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Receive lightweight reminders for task due dates and overdue work.</p>
              </div>
              <Button variant={notificationsEnabled ? 'primary' : 'outline'} onClick={() => setNotificationsEnabled((value) => !value)}>{notificationsEnabled ? 'Enabled' : 'Disabled'}</Button>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-4 dark:border-slate-900">
              <ShieldCheck className="h-5 w-5 text-emerald-500" />
              <h2 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">Workspace status</h2>
            </div>
            <div className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center justify-between"><span>Theme</span><Badge variant="default">{isDark ? 'Dark' : 'Light'}</Badge></div>
              <div className="flex items-center justify-between"><span>Notifications</span><Badge variant={notificationsEnabled ? 'success' : 'default'}>{notificationsEnabled ? 'On' : 'Off'}</Badge></div>
              <div className="flex items-center justify-between"><span>Billing</span><Badge variant="warning">Mock workspace</Badge></div>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-4 dark:border-slate-900">
              <CreditCard className="h-5 w-5 text-blue-500" />
              <h2 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">Workspace plan</h2>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900/30">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Current plan</p>
              <p className="mt-2 text-xl font-semibold text-slate-950 dark:text-white">DevTrack Pro</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Unlimited projects, task boards, analytics, and calendar views.</p>
            </div>
          </Card>
        </div>
      </div>
    </motion.section>
  );
}
