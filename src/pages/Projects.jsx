import { motion } from 'framer-motion'
import { FolderKanban } from 'lucide-react'
import EmptyState from '../components/ui/EmptyState'
import Button from '../components/ui/Button'

export default function Projects() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="flex w-full flex-1 flex-col gap-6 pb-10"
    >
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Workspace</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">Projects</h1>
        <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">Every codebase you're building, tracked from idea to deployment.</p>
      </div>
      <EmptyState
        icon={FolderKanban}
        title="No projects yet"
        description="Projects will show up here once you start creating them. Give your first one a name and a goal."
        action={<Button>New project</Button>}
      />
    </motion.section>
  )
}
