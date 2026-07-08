import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useProjects } from '../context/ProjectsContext';
import { useTasks } from '../context/TasksContext';
import StatCard from '../components/ui/StatCard';
import { Card } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';
import Button from '../components/ui/Button';
import { ArrowRight, Calendar, CheckCircle2, Clock3, FolderKanban, ListChecks, Sparkles, TrendingUp, Users } from 'lucide-react';
import { formatDate } from '../utils/helpers';

export default function Dashboard() {
  const { projects, teamMembers } = useProjects();
  const { tasks } = useTasks();

  const totalProjects = projects.length;
  const activeProjects = projects.filter((project) => project.status === 'active').length;
  const completedProjects = projects.filter((project) => project.status === 'completed').length;
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === 'completed').length;
  const overdueTasks = tasks.filter((task) => task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed').length;
  const completionRate = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const upcomingTasks = [...tasks]
    .filter((task) => task.status !== 'completed' && task.dueDate)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5);

  const recentProjects = [...projects]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 3);

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="flex w-full flex-1 flex-col gap-6 pb-10"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Overview</p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">Dashboard</h1>
          <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">A live workspace summary across projects, tasks, deadlines, and team load.</p>
        </div>
        <Button asChild>
          <Link to="/tasks"><ListChecks className="h-4 w-4" /> Open Tasks</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Projects" value={totalProjects} helperText={`${activeProjects} active, ${completedProjects} complete`} />
        <StatCard label="Tasks" value={totalTasks} helperText={`${completedTasks} completed, ${overdueTasks} overdue`} />
        <StatCard label="Completion Rate" value={`${completionRate}%`} helperText="Across the current task set" />
        <StatCard label="Team Members" value={teamMembers.length} helperText="Available across the workspace" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="p-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-900">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              <h2 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">Momentum</h2>
            </div>
            <Badge variant="primary">Live snapshot</Badge>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900/30">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Task completion</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">{completionRate}%</p>
              <ProgressBar value={completionRate} className="mt-4 h-3" />
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900/30">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Projects in motion</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">{activeProjects}</p>
              <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">Projects are the main source of progress, milestones, and task movement.</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4 dark:border-slate-900">
            <Clock3 className="h-5 w-5 text-amber-500" />
            <h2 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">Upcoming tasks</h2>
          </div>
          <div className="mt-4 space-y-3">
            {upcomingTasks.length === 0 ? (
              <p className="py-6 text-center text-sm text-slate-400 dark:text-slate-500">No upcoming tasks right now.</p>
            ) : upcomingTasks.map((task) => (
              <Link key={task.id} to={`/tasks/${task.id}`} className="flex items-center justify-between rounded-2xl border border-slate-200/80 p-4 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900/50">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-950 dark:text-white">{task.title}</p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Due {formatDate(task.dueDate)}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400" />
              </Link>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card className="p-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4 dark:border-slate-900">
            <FolderKanban className="h-5 w-5 text-emerald-500" />
            <h2 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">Recent projects</h2>
          </div>
          <div className="mt-4 space-y-3">
            {recentProjects.map((project) => (
              <Link key={project.id} to={`/projects/${project.id}`} className="block rounded-2xl border border-slate-200/80 p-4 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900/50">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-950 dark:text-white">{project.name}</p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Updated {new Date(project.updatedAt).toLocaleDateString()}</p>
                  </div>
                  <Badge variant={project.status === 'completed' ? 'success' : project.status === 'active' ? 'primary' : project.status === 'paused' ? 'warning' : 'default'} className="capitalize">{project.status}</Badge>
                </div>
                <ProgressBar value={project.progress} className="mt-4 h-2.5" />
              </Link>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4 dark:border-slate-900">
            <Users className="h-5 w-5 text-indigo-500" />
            <h2 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">Team load</h2>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {teamMembers.slice(0, 6).map((member) => {
              const assignedTasks = tasks.filter((task) => task.assigneeId === member.id).length;
              const completedAssignedTasks = tasks.filter((task) => task.assigneeId === member.id && task.status === 'completed').length;
              const load = assignedTasks ? Math.round((completedAssignedTasks / assignedTasks) * 100) : 0;
              return (
                <div key={member.id} className="rounded-2xl border border-slate-200/80 p-4 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className={`grid h-10 w-10 place-items-center rounded-full text-sm font-semibold ${member.bgClass}`}>{member.initials}</div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-950 dark:text-white">{member.name}</p>
                      <p className="truncate text-xs text-slate-500 dark:text-slate-400">{member.role}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>{assignedTasks} tasks</span>
                      <span>{load}% complete</span>
                    </div>
                    <ProgressBar value={load} className="mt-2 h-2.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </motion.section>
  );
}
