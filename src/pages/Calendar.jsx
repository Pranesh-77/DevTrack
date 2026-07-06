import { motion } from 'framer-motion'
import { CalendarDays } from 'lucide-react'
import EmptyState from '../components/ui/EmptyState'
import Button from '../components/ui/Button'

export default function Calendar() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="flex w-full flex-1 flex-col gap-6 pb-10"
    >
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Planning</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">Calendar</h1>
        <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">Milestones and deadlines, laid out over time.</p>
      </div>
      <EmptyState
        icon={CalendarDays}
        title="Nothing scheduled yet"
        description="Milestones and deadlines from your projects will appear here once you set them."
        action={<Button>Set a milestone</Button>}
      />
    </motion.section>
  )
}
