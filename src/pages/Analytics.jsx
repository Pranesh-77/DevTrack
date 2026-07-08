import { motion } from 'framer-motion';
import { useProjects } from '../context/ProjectsContext';
import { useTasks } from '../context/TasksContext';
import { Card } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import StatCard from '../components/ui/StatCard';
import ProgressBar from '../components/ui/ProgressBar';
import { BarChart3, CalendarDays, Clock3, TrendingUp } from 'lucide-react';

export default function Analytics() {
  const { projects } = useProjects();
  const { tasks } = useTasks();

  const taskBuckets = [
    { label: 'Todo', value: tasks.filter((task) => task.status === 'todo').length },
    { label: 'In Progress', value: tasks.filter((task) => task.status === 'in-progress').length },
    { label: 'Review', value: tasks.filter((task) => task.status === 'review').length },
    { label: 'Completed', value: tasks.filter((task) => task.status === 'completed').length },
  ];

  const priorityBuckets = [
    { label: 'Low', value: tasks.filter((task) => task.priority === 'low').length },
    { label: 'Medium', value: tasks.filter((task) => task.priority === 'medium').length },
    { label: 'High', value: tasks.filter((task) => task.priority === 'high').length },
  ];

  const projectCompletionAverage = projects.length
    ? Math.round(projects.reduce((sum, project) => sum + (project.progress || 0), 0) / projects.length)
    : 0;

  const overdueTasks = tasks.filter((task) => task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed').length;

  return (
    <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22, ease: 'easeOut' }} className="flex w-full flex-1 flex-col gap-6 pb-10">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Insights</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">Analytics</h1>
        <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">A lightweight snapshot of work distribution, task health, and project progress.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Projects" value={projects.length} helperText="Tracked in the workspace" />
        <StatCard label="Tasks" value={tasks.length} helperText={`${overdueTasks} are overdue`} />
        <StatCard label="Avg. Progress" value={`${projectCompletionAverage}%`} helperText="Average project completion" />
        <StatCard label="Completed" value={tasks.filter((task) => task.status === 'completed').length} helperText="Finished tasks total" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4 dark:border-slate-900">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">Task status mix</h2>
          </div>
          <div className="mt-5 space-y-4">
            {taskBuckets.map((bucket) => {
              const width = tasks.length ? Math.round((bucket.value / tasks.length) * 100) : 0;
              return (
                <div key={bucket.label} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700 dark:text-slate-300">{bucket.label}</span>
                    <span className="font-semibold text-slate-950 dark:text-white">{bucket.value}</span>
                  </div>
                  <ProgressBar value={width} className="h-3" />
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4 dark:border-slate-900">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            <h2 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">Priority distribution</h2>
          </div>
          <div className="mt-5 space-y-3">
            {priorityBuckets.map((bucket) => {
              const width = tasks.length ? Math.round((bucket.value / tasks.length) * 100) : 0;
              return (
                <div key={bucket.label} className="rounded-2xl border border-slate-200/80 p-4 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <Badge variant={bucket.label === 'High' ? 'danger' : bucket.label === 'Medium' ? 'warning' : 'default'} className="capitalize">{bucket.label}</Badge>
                    <span className="text-sm font-semibold text-slate-950 dark:text-white">{bucket.value}</span>
                  </div>
                  <ProgressBar value={width} className="mt-3 h-2.5" />
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-4 dark:border-slate-900">
          <Clock3 className="h-5 w-5 text-amber-500" />
          <h2 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">Project completion overview</h2>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {projects.slice(0, 6).map((project) => (
            <div key={project.id} className="rounded-2xl border border-slate-200/80 p-4 dark:border-slate-800">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-slate-950 dark:text-white">{project.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Due {project.dueDate}</p>
                </div>
                <Badge variant={project.status === 'completed' ? 'success' : project.status === 'active' ? 'primary' : project.status === 'paused' ? 'warning' : 'default'} className="capitalize">{project.status}</Badge>
              </div>
              <ProgressBar value={project.progress} className="mt-4 h-3" />
            </div>
          ))}
        </div>
      </Card>
    </motion.section>
  );
}
