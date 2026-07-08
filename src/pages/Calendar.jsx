import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '../context/ProjectsContext';
import { useTasks } from '../context/TasksContext';
import { Card } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import EmptyState from '../components/ui/EmptyState';
import { CalendarDays, CalendarRange, Clock3, ListChecks } from 'lucide-react';
import { formatDate } from '../utils/helpers';

export default function Calendar() {
  const { projects } = useProjects();
  const { tasks } = useTasks();

  const upcomingItems = useMemo(() => {
    const projectItems = projects
      .filter((project) => project.dueDate)
      .map((project) => ({
        id: project.id,
        title: project.name,
        date: project.dueDate,
        type: 'project',
        status: project.status,
      }));

    const taskItems = tasks
      .filter((task) => task.dueDate)
      .map((task) => ({
        id: task.id,
        title: task.title,
        date: task.dueDate,
        type: 'task',
        status: task.status,
      }));

    return [...projectItems, ...taskItems].sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 12);
  }, [projects, tasks]);

  const monthDays = useMemo(() => {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const days = [];
    for (let day = 1; day <= end.getDate(); day += 1) {
      days.push(new Date(today.getFullYear(), today.getMonth(), day));
    }
    return { start, days };
  }, []);

  return (
    <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22, ease: 'easeOut' }} className="flex w-full flex-1 flex-col gap-6 pb-10">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Planning</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">Calendar</h1>
        <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">Deadlines from projects and tasks are lined up below so you can scan the month quickly.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="p-5"><div className="flex items-center gap-2 text-slate-500 dark:text-slate-400"><CalendarDays className="h-5 w-5 text-blue-500" /><span className="text-sm font-semibold uppercase tracking-wider">Upcoming items</span></div><p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">{upcomingItems.length}</p></Card>
        <Card className="p-5"><div className="flex items-center gap-2 text-slate-500 dark:text-slate-400"><ListChecks className="h-5 w-5 text-emerald-500" /><span className="text-sm font-semibold uppercase tracking-wider">Task deadlines</span></div><p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">{tasks.filter((task) => task.dueDate).length}</p></Card>
        <Card className="p-5"><div className="flex items-center gap-2 text-slate-500 dark:text-slate-400"><Clock3 className="h-5 w-5 text-amber-500" /><span className="text-sm font-semibold uppercase tracking-wider">Project deadlines</span></div><p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">{projects.filter((project) => project.dueDate).length}</p></Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card className="p-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4 dark:border-slate-900">
            <CalendarRange className="h-5 w-5 text-indigo-500" />
            <h2 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">This month</h2>
          </div>
          <div className="mt-4 grid grid-cols-7 gap-2 text-center text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => <div key={day}>{day}</div>)}
          </div>
          <div className="mt-3 grid grid-cols-7 gap-2">
            {Array.from({ length: monthDays.start.getDay() }).map((_, index) => <div key={`empty-${index}`} className="h-20 rounded-2xl border border-dashed border-slate-100 dark:border-slate-900" />)}
            {monthDays.days.map((day) => {
              const dayKey = day.toISOString().split('T')[0];
              const dayItems = upcomingItems.filter((item) => item.date === dayKey).slice(0, 2);
              return (
                <div key={dayKey} className="h-20 rounded-2xl border border-slate-200/80 p-2 dark:border-slate-800">
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">{day.getDate()}</div>
                  <div className="mt-2 space-y-1">
                    {dayItems.map((item) => <div key={item.id} className="truncate rounded-lg bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600 dark:bg-slate-900 dark:text-slate-300">{item.title}</div>)}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4 dark:border-slate-900">
            <CalendarDays className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">Upcoming deadlines</h2>
          </div>
          <div className="mt-4 space-y-3">
            {upcomingItems.length === 0 ? (
              <EmptyState icon={CalendarDays} title="Nothing scheduled yet" description="Create tasks and project due dates to build out the calendar." />
            ) : upcomingItems.map((item) => (
              <div key={`${item.type}-${item.id}`} className="rounded-2xl border border-slate-200/80 p-4 dark:border-slate-800">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-950 dark:text-white">{item.title}</p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{formatDate(item.date)} · {item.type}</p>
                  </div>
                  <Badge variant={item.status === 'completed' ? 'success' : item.status === 'active' || item.status === 'in-progress' ? 'primary' : item.status === 'review' ? 'warning' : 'default'} className="capitalize">{item.status}</Badge>
                </div>
                {item.type === 'task' ? <Link to={`/tasks/${item.id}`} className="mt-3 inline-flex text-xs font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400">Open task</Link> : <Link to={`/projects/${item.id}`} className="mt-3 inline-flex text-xs font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400">Open project</Link>}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </motion.section>
  );
}
