import { motion } from 'framer-motion'
import { Settings as SettingsIcon } from 'lucide-react'
import EmptyState from '../components/ui/EmptyState'

export default function Settings() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="flex w-full flex-1 flex-col gap-6 pb-10"
    >
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Preferences</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">Settings</h1>
        <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">Manage your account, workspace, and integrations.</p>
      </div>
      <EmptyState
        icon={SettingsIcon}
        title="Settings are on the way"
        description="Account details, workspace preferences, and GitHub connections will live here."
      />
    </motion.section>
  )
}
