import { motion } from 'framer-motion'
import { LayoutDashboard } from 'lucide-react'
import EmptyState from '../components/ui/EmptyState'
import Button from '../components/ui/Button'

export default function Dashboard() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="flex w-full flex-1 flex-col gap-6 pb-10"
    >
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Overview</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">Dashboard</h1>
        <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">Your projects, tasks, and deadlines at a glance.</p>
      </div>
      <EmptyState
        icon={LayoutDashboard}
        title="Your dashboard is warming up"
        description="Once you create your first project, its progress, tasks, and deadlines will show up here."
        action={<Button>Create your first project</Button>}
      />
    </motion.section>
  )
}
