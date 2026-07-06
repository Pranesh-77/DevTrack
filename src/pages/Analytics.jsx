import { motion } from 'framer-motion'
import { BarChart3 } from 'lucide-react'
import EmptyState from '../components/ui/EmptyState'

export default function Analytics() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="flex w-full flex-1 flex-col gap-6 pb-10"
    >
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Insights</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">Analytics</h1>
        <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">Velocity, completion rates, and trends across your projects.</p>
      </div>
      <EmptyState
        icon={BarChart3}
        title="Analytics will appear here"
        description="Once you have projects and tasks in motion, this space will fill up with real insight into how your team is moving."
      />
    </motion.section>
  )
}
