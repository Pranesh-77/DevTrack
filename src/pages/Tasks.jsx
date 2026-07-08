import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useProjects } from '../context/ProjectsContext';
import { useTasks } from '../context/TasksContext';
import { TASK_STATUSES } from '../data/tasksData';
import { Card } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import StatCard from '../components/ui/StatCard';
import { formatDate } from '../utils/helpers';
import { ChevronRight, KanbanSquare, ListChecks, Plus, Search, SlidersHorizontal, Trash2, Edit2, CircleDot, CircleDashed, CheckCircle2, PauseCircle, Flag, Calendar, User, GripVertical, LayoutList, LayoutGrid } from 'lucide-react';

const STATUS_META = {
  todo: { label: 'Todo', icon: CircleDashed, badge: 'default' },
  'in-progress': { label: 'In Progress', icon: CircleDot, badge: 'primary' },
  review: { label: 'Review', icon: PauseCircle, badge: 'warning' },
  completed: { label: 'Completed', icon: CheckCircle2, badge: 'success' },
};

const PRIORITY_OPTIONS = ['all', 'low', 'medium', 'high'];

const defaultForm = {
  title: '',
  description: '',
  projectId: '',
  status: 'todo',
  priority: 'medium',
  dueDate: '',
  assigneeId: '',
};

export default function Tasks() {
  const { projects, teamMembers } = useProjects();
  const { tasks, addTask, updateTask, deleteTask, moveTask } = useTasks();
  const [view, setView] = useState('kanban');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [projectFilter, setProjectFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [draggedTaskId, setDraggedTaskId] = useState('');
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState(defaultForm);

  const projectById = useMemo(() => new Map(projects.map((project) => [project.id, project])), [projects]);
  const teamById = useMemo(() => new Map(teamMembers.map((member) => [member.id, member])), [teamMembers]);

  const filteredTasks = tasks.filter((task) => {
    const project = projectById.get(task.projectId);
    const assignee = teamById.get(task.assigneeId);
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase()) ||
      (project?.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (assignee?.name || '').toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    const matchesProject = projectFilter === 'all' || task.projectId === projectFilter;
    return matchesSearch && matchesStatus && matchesPriority && matchesProject;
  });

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter((task) => task.status === 'completed').length,
    dueSoon: tasks.filter((task) => {
      if (!task.dueDate) return false;
      const dueDate = new Date(task.dueDate);
      const now = new Date();
      const sevenDays = 1000 * 60 * 60 * 24 * 7;
      return dueDate >= now && dueDate - now <= sevenDays;
    }).length,
    overdue: tasks.filter((task) => task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed').length,
  };

  const tasksByStatus = useMemo(
    () =>
      TASK_STATUSES.reduce((acc, status) => {
        acc[status.value] = filteredTasks.filter((task) => task.status === status.value);
        return acc;
      }, {}),
    [filteredTasks]
  );

  const openCreateModal = () => {
    setEditingTask(null);
    setErrors({});
    setForm({ ...defaultForm, projectId: projects[0]?.id || '' });
    setShowModal(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setForm({
      title: task.title,
      description: task.description,
      projectId: task.projectId,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
      assigneeId: task.assigneeId,
    });
    setErrors({});
    setShowModal(true);
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.title.trim()) nextErrors.title = 'Task title is required';
    if (!form.description.trim()) nextErrors.description = 'Task description is required';
    if (!form.projectId) nextErrors.projectId = 'Choose a project';
    if (!form.dueDate) nextErrors.dueDate = 'Due date is required';
    if (!form.assigneeId) nextErrors.assigneeId = 'Assign a teammate';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    const payload = {
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
    };

    if (editingTask) {
      updateTask(editingTask.id, payload);
    } else {
      addTask(payload);
    }

    setShowModal(false);
    setEditingTask(null);
  };

  const handleDragStart = (taskId) => setDraggedTaskId(taskId);
  const handleDropStatus = (status) => {
    if (draggedTaskId) {
      moveTask(draggedTaskId, status);
      setDraggedTaskId('');
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="flex w-full flex-1 flex-col gap-6 pb-10"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">Workspace</p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">Tasks</h1>
          <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">Track the work inside each project, move cards through your board, and keep due dates visible.</p>
        </div>
        <Button onClick={openCreateModal} className="w-full sm:w-auto"><Plus className="h-4 w-4" /> New Task</Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Tasks" value={taskStats.total} helperText="All task items in the workspace" />
        <StatCard label="Completed" value={taskStats.completed} helperText="Marked done across all projects" />
        <StatCard label="Due Soon" value={taskStats.dueSoon} helperText="Due within the next 7 days" />
        <StatCard label="Overdue" value={taskStats.overdue} helperText="Past due and still open" />
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white/50 p-4 backdrop-blur-sm dark:border-slate-800/80 dark:bg-slate-950/30 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute top-3.5 left-3.5 h-4 w-4 text-slate-400" />
          <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search tasks, projects, or people..." className="pl-10" />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="h-11 rounded-2xl border border-slate-200/80 bg-white px-3 text-xs font-semibold text-slate-600 outline-none transition-all focus:border-blue-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
            <option value="all">All Statuses</option>
            {TASK_STATUSES.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}
          </select>

          <select value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value)} className="h-11 rounded-2xl border border-slate-200/80 bg-white px-3 text-xs font-semibold text-slate-600 outline-none transition-all focus:border-blue-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
            {PRIORITY_OPTIONS.map((option) => <option key={option} value={option}>{option === 'all' ? 'All Priorities' : option.charAt(0).toUpperCase() + option.slice(1)}</option>)}
          </select>

          <select value={projectFilter} onChange={(event) => setProjectFilter(event.target.value)} className="h-11 rounded-2xl border border-slate-200/80 bg-white px-3 text-xs font-semibold text-slate-600 outline-none transition-all focus:border-blue-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
            <option value="all">All Projects</option>
            {projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}
          </select>

          <div className="flex items-center rounded-2xl border border-slate-200/80 bg-white p-1 dark:border-slate-800 dark:bg-slate-950">
            <button type="button" onClick={() => setView('kanban')} className={`rounded-xl p-2 transition-all ${view === 'kanban' ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950' : 'text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900'}`} title="Kanban view"><KanbanSquare className="h-4 w-4" /></button>
            <button type="button" onClick={() => setView('list')} className={`rounded-xl p-2 transition-all ${view === 'list' ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950' : 'text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900'}`} title="List view"><LayoutList className="h-4 w-4" /></button>
          </div>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <EmptyState icon={ListChecks} title="No tasks match your filters" description="Relax the search or filters, then create a task to get the board moving again." action={<Button onClick={openCreateModal}>Create Task</Button>} />
      ) : view === 'kanban' ? (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
          {TASK_STATUSES.map((status) => {
            const ColumnIcon = STATUS_META[status.value].icon;
            const columnTasks = tasksByStatus[status.value] || [];
            return (
              <Card key={status.value} className="p-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-900">
                  <div className="flex items-center gap-2">
                    <ColumnIcon className="h-4 w-4 text-slate-500" />
                    <h2 className="text-sm font-semibold text-slate-950 dark:text-white">{status.label}</h2>
                  </div>
                  <Badge variant={STATUS_META[status.value].badge}>{columnTasks.length}</Badge>
                </div>
                <div className="mt-4 space-y-3 min-h-40" onDragOver={(event) => event.preventDefault()} onDrop={() => handleDropStatus(status.value)}>
                  <AnimatePresence>
                    {columnTasks.map((task) => {
                      const project = projectById.get(task.projectId);
                      const assignee = teamById.get(task.assigneeId);
                      return (
                        <motion.div key={task.id} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} draggable onDragStart={() => handleDragStart(task.id)} className="group cursor-grab rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <Link to={`/tasks/${task.id}`} className="line-clamp-1 text-sm font-semibold text-slate-950 transition-colors hover:text-blue-600 dark:text-white dark:hover:text-blue-400">{task.title}</Link>
                              <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500 dark:text-slate-400">{task.description}</p>
                            </div>
                            <GripVertical className="h-4 w-4 shrink-0 text-slate-300 dark:text-slate-700" />
                          </div>
                          <div className="mt-4 flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                            <Badge variant={task.priority === 'high' ? 'danger' : task.priority === 'medium' ? 'warning' : 'default'} className="capitalize"><Flag className="mr-1 h-3 w-3" />{task.priority}</Badge>
                            <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> {formatDate(task.dueDate)}</span>
                          </div>
                          <div className="mt-4 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2 min-w-0">
                              <div className="grid h-7 w-7 place-items-center rounded-full bg-slate-100 text-[10px] font-semibold text-slate-600 dark:bg-slate-900 dark:text-slate-300">{assignee?.initials || '?'}</div>
                              <div className="min-w-0">
                                <p className="truncate text-xs font-medium text-slate-900 dark:text-white">{assignee?.name || 'Unassigned'}</p>
                                <p className="truncate text-[10px] text-slate-400 dark:text-slate-500">{project?.name || 'No project'}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <button type="button" onClick={() => openEditModal(task)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-900 dark:hover:text-slate-200" title="Edit task"><Edit2 className="h-3.5 w-3.5" /></button>
                              <button type="button" onClick={() => deleteTask(task.id)} className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/20 dark:hover:text-rose-400" title="Delete task"><Trash2 className="h-3.5 w-3.5" /></button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTasks.map((task) => {
            const project = projectById.get(task.projectId);
            const assignee = teamById.get(task.assigneeId);
            return (
              <Card key={task.id} className="p-4">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link to={`/tasks/${task.id}`} className="text-base font-semibold text-slate-950 hover:text-blue-600 dark:text-white dark:hover:text-blue-400">{task.title}</Link>
                      <Badge variant={STATUS_META[task.status].badge} className="capitalize">{STATUS_META[task.status].label}</Badge>
                    </div>
                    <p className="mt-1 max-w-3xl text-sm text-slate-500 dark:text-slate-400">{task.description}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                      <span className="inline-flex items-center gap-1.5"><Flag className="h-3.5 w-3.5" />{task.priority}</span>
                      <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{formatDate(task.dueDate)}</span>
                      <span className="inline-flex items-center gap-1.5"><User className="h-3.5 w-3.5" />{assignee?.name || 'Unassigned'}</span>
                      <span className="inline-flex items-center gap-1.5"><ChevronRight className="h-3.5 w-3.5" />{project?.name || 'No project'}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="h-9" onClick={() => openEditModal(task)}><Edit2 className="h-4 w-4" /> Edit</Button>
                    <Button variant="outline" className="h-9 border-rose-200 text-rose-600 hover:bg-rose-50 dark:border-rose-950 dark:text-rose-400 dark:hover:bg-rose-950/20" onClick={() => deleteTask(task.id)}><Trash2 className="h-4 w-4" /> Delete</Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <Modal open={showModal} onClose={() => setShowModal(false)} title={editingTask ? 'Edit Task' : 'Create Task'}>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Title</label>
            <Input value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} placeholder="Task title" />
            {errors.title ? <p className="text-xs text-rose-500">{errors.title}</p> : null}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Description</label>
            <textarea value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} rows={4} className="w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-400 dark:focus:ring-blue-400/10" />
            {errors.description ? <p className="text-xs text-rose-500">{errors.description}</p> : null}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Project</label>
              <select value={form.projectId} onChange={(event) => setForm((current) => ({ ...current, projectId: event.target.value }))} className="h-11 w-full rounded-2xl border border-slate-200/80 bg-white px-3 text-sm text-slate-950 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400/10">
                <option value="">Select a project</option>
                {projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}
              </select>
              {errors.projectId ? <p className="text-xs text-rose-500">{errors.projectId}</p> : null}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Assignee</label>
              <select value={form.assigneeId} onChange={(event) => setForm((current) => ({ ...current, assigneeId: event.target.value }))} className="h-11 w-full rounded-2xl border border-slate-200/80 bg-white px-3 text-sm text-slate-950 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400/10">
                <option value="">Select a teammate</option>
                {teamMembers.map((member) => <option key={member.id} value={member.id}>{member.name}</option>)}
              </select>
              {errors.assigneeId ? <p className="text-xs text-rose-500">{errors.assigneeId}</p> : null}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</label>
              <select value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))} className="h-11 w-full rounded-2xl border border-slate-200/80 bg-white px-3 text-sm text-slate-950 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400/10">
                {TASK_STATUSES.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Priority</label>
              <select value={form.priority} onChange={(event) => setForm((current) => ({ ...current, priority: event.target.value }))} className="h-11 w-full rounded-2xl border border-slate-200/80 bg-white px-3 text-sm text-slate-950 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400/10">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Due date</label>
              <Input type="date" value={form.dueDate} onChange={(event) => setForm((current) => ({ ...current, dueDate: event.target.value }))} />
              {errors.dueDate ? <p className="text-xs text-rose-500">{errors.dueDate}</p> : null}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-900">
            <Button type="button" variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit">{editingTask ? 'Save changes' : 'Create task'}</Button>
          </div>
        </form>
      </Modal>
    </motion.section>
  );
}
