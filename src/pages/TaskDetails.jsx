import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useProjects } from '../context/ProjectsContext';
import { useTasks } from '../context/TasksContext';
import { Card } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import ProgressBar from '../components/ui/ProgressBar';
import { formatDate } from '../utils/helpers';
import { ArrowLeft, Calendar, CheckCircle2, CircleDashed, CircleDot, Edit2, Flag, Trash2, User, FolderKanban } from 'lucide-react';

const STATUS_OPTIONS = [
  { value: 'todo', label: 'Todo', icon: CircleDashed, variant: 'default' },
  { value: 'in-progress', label: 'In Progress', icon: CircleDot, variant: 'primary' },
  { value: 'review', label: 'Review', icon: CircleDot, variant: 'warning' },
  { value: 'completed', label: 'Completed', icon: CheckCircle2, variant: 'success' },
];

export default function TaskDetails() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { projects, teamMembers } = useProjects();
  const { tasks, updateTask, deleteTask } = useTasks();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const foundTask = tasks.find((item) => item.id === taskId);
    if (!foundTask) {
      navigate('/tasks');
      return;
    }
    setTask(foundTask);
  }, [taskId, tasks, navigate]);

  const project = useMemo(() => projects.find((item) => item.id === task?.projectId), [projects, task]);
  const assignee = useMemo(() => teamMembers.find((item) => item.id === task?.assigneeId), [teamMembers, task]);

  if (!task) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center space-y-3">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600 dark:border-slate-800 dark:border-t-blue-400" />
          <p className="text-sm font-medium text-slate-500">Loading task details...</p>
        </div>
      </div>
    );
  }

  const statusMeta = STATUS_OPTIONS.find((option) => option.value === task.status) || STATUS_OPTIONS[0];
  const StatusIcon = statusMeta.icon;

  const handleStatusChange = (event) => {
    updateTask(task.id, { status: event.target.value });
  };

  const handlePriorityChange = (event) => {
    updateTask(task.id, { priority: event.target.value });
  };

  const handleDelete = () => {
    if (window.confirm('Delete this task?')) {
      deleteTask(task.id);
      navigate('/tasks');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <Link to="/tasks" className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-slate-200 bg-white text-slate-500 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-95 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Task Detail</p>
            <h1 className="truncate text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">{task.title}</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleDelete}><Trash2 className="h-4 w-4" /> Delete</Button>
          <Button onClick={() => navigate('/tasks')}><Edit2 className="h-4 w-4" /> Back to Tasks</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Card className="p-6 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={statusMeta.variant} className="capitalize"><StatusIcon className="mr-1 h-3.5 w-3.5" />{statusMeta.label}</Badge>
              <Badge variant={task.priority === 'high' ? 'danger' : task.priority === 'medium' ? 'warning' : 'default'} className="capitalize"><Flag className="mr-1 h-3 w-3" />{task.priority}</Badge>
            </div>
            <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{task.description}</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</label>
                <select value={task.status} onChange={handleStatusChange} className="h-11 w-full rounded-2xl border border-slate-200/80 bg-white px-3 text-sm text-slate-950 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400/10">
                  {STATUS_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Priority</label>
                <select value={task.priority} onChange={handlePriorityChange} className="h-11 w-full rounded-2xl border border-slate-200/80 bg-white px-3 text-sm text-slate-950 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400/10">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-4 dark:border-slate-900">
              <FolderKanban className="h-5 w-5 text-blue-500" />
              <h2 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">Task Progress</h2>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                <span>Status completion</span>
                <span className="capitalize text-slate-950 dark:text-white">{task.status.replace('-', ' ')}</span>
              </div>
              <ProgressBar value={task.status === 'completed' ? 100 : task.status === 'review' ? 75 : task.status === 'in-progress' ? 45 : 15} className="h-3" />
              <p className="text-xs text-slate-400 dark:text-slate-500">Last updated {new Date(task.updatedAt).toLocaleDateString()}</p>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6 space-y-4">
            <h3 className="border-b border-slate-100 pb-2 text-sm font-bold uppercase tracking-wider text-slate-500 dark:border-slate-900 dark:text-slate-400">Task Info</h3>
            <div className="grid grid-cols-2 gap-y-4 text-xs">
              <div className="font-semibold text-slate-500 dark:text-slate-400">Project</div>
              <div className="flex justify-end font-bold text-slate-900 dark:text-white">
                {project ? <Link className="hover:text-blue-600 dark:hover:text-blue-400" to={`/projects/${project.id}`}>{project.name}</Link> : 'Unknown'}
              </div>
              <div className="font-semibold text-slate-500 dark:text-slate-400">Assignee</div>
              <div className="flex justify-end font-bold text-slate-900 dark:text-white">{assignee?.name || 'Unassigned'}</div>
              <div className="font-semibold text-slate-500 dark:text-slate-400">Due Date</div>
              <div className="flex items-center justify-end gap-1 font-bold text-slate-900 dark:text-white"><Calendar className="h-3.5 w-3.5 text-slate-400" />{formatDate(task.dueDate)}</div>
              <div className="font-semibold text-slate-500 dark:text-slate-400">Created</div>
              <div className="text-right font-semibold text-slate-600 dark:text-slate-400">{new Date(task.createdAt).toLocaleDateString()}</div>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h3 className="border-b border-slate-100 pb-2 text-sm font-bold uppercase tracking-wider text-slate-500 dark:border-slate-900 dark:text-slate-400">Links</h3>
            <div className="space-y-2 text-sm">
              <Link to={`/projects/${task.projectId}`} className="block rounded-xl border border-slate-200/80 px-4 py-3 text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900">Open project</Link>
              <Link to="/tasks" className="block rounded-xl border border-slate-200/80 px-4 py-3 text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900">Back to task board</Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}