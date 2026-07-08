import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProjects } from '../context/ProjectsContext';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectModal from '../components/modals/ProjectModal';
import ConfirmDeleteModal from '../components/modals/ConfirmDeleteModal';
import StatCard from '../components/ui/StatCard';
import EmptyState from '../components/ui/EmptyState';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import {
  FolderKanban,
  LayoutGrid,
  List,
  Search,
  Plus,
  SlidersHorizontal,
  XCircle
} from 'lucide-react';

export default function Projects() {
  const { projects, deleteProject } = useProjects();
  
  // Layout mode
  const [layout, setLayout] = useState('grid');

  // Search & Filter state
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [progressFilter, setProgressFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Modals state
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingProject, setDeletingProject] = useState(null);

  // Statistics calculation
  const totalProjects = projects.length;
  const activeProjects = projects.filter((p) => p.status === 'active').length;
  const completedProjects = projects.filter((p) => p.status === 'completed').length;
  const avgProgress = totalProjects
    ? Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / totalProjects)
    : 0;

  // Filter & Sort Logic
  const filteredProjects = projects
    .filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || p.priority === priorityFilter;

      let matchesProgress = true;
      if (progressFilter === '0-30') {
        matchesProgress = p.progress <= 30;
      } else if (progressFilter === '31-70') {
        matchesProgress = p.progress > 30 && p.progress <= 70;
      } else if (progressFilter === '71-100') {
        matchesProgress = p.progress > 70;
      }

      return matchesSearch && matchesStatus && matchesPriority && matchesProgress;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortBy === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      if (sortBy === 'progress') {
        return b.progress - a.progress;
      }
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      return 0;
    });

  const handleEdit = (project) => {
    setEditingProject(project);
    setShowProjectModal(true);
  };

  const handleDeleteClick = (project) => {
    setDeletingProject(project);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (deletingProject) {
      deleteProject(deletingProject.id);
      setShowDeleteModal(false);
      setDeletingProject(null);
    }
  };

  const clearFilters = () => {
    setSearch('');
    setStatusFilter('all');
    setPriorityFilter('all');
    setProgressFilter('all');
    setSortBy('newest');
  };

  const hasActiveFilters =
    search !== '' ||
    statusFilter !== 'all' ||
    priorityFilter !== 'all' ||
    progressFilter !== 'all' ||
    sortBy !== 'newest';

  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="flex w-full flex-1 flex-col gap-6 pb-10"
    >
      {/* Top Title & Button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
            Workspace
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Projects
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Every codebase you're building, tracked from idea to deployment.
          </p>
        </div>
        <div>
          <Button
            onClick={() => {
              setEditingProject(null);
              setShowProjectModal(true);
            }}
            className="w-full sm:w-auto"
          >
            <Plus className="h-4 w-4" /> New Project
          </Button>
        </div>
      </div>

      {/* Stats Counter Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Projects" value={totalProjects} helperText="Created in workspace" />
        <StatCard label="Active" value={activeProjects} helperText="Actively in development" />
        <StatCard label="Average Progress" value={`${avgProgress}%`} helperText="Across all milestones" />
        <StatCard label="Completed" value={completedProjects} helperText="Finished and deployed" />
      </div>

      {/* Filters & Workspace toolbar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white/50 p-4 backdrop-blur-sm dark:border-slate-800/80 dark:bg-slate-950/30 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute top-3.5 left-3.5 h-4 w-4 text-slate-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects by name, description..."
            className="pl-10"
          />
        </div>

        {/* Filters dropdown/selections */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-11 rounded-2xl border border-slate-200/80 bg-white px-3 text-xs font-semibold text-slate-600 outline-none transition-all focus:border-blue-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
            title="Filter by status"
          >
            <option value="all">All Statuses</option>
            <option value="planning">Planning</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="completed">Completed</option>
          </select>

          {/* Priority */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="h-11 rounded-2xl border border-slate-200/80 bg-white px-3 text-xs font-semibold text-slate-600 outline-none transition-all focus:border-blue-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
            title="Filter by priority"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          {/* Progress */}
          <select
            value={progressFilter}
            onChange={(e) => setProgressFilter(e.target.value)}
            className="h-11 rounded-2xl border border-slate-200/80 bg-white px-3 text-xs font-semibold text-slate-600 outline-none transition-all focus:border-blue-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
            title="Filter by progress"
          >
            <option value="all">All Progress</option>
            <option value="0-30">0% - 30%</option>
            <option value="31-70">31% - 70%</option>
            <option value="71-100">71% - 100%</option>
          </select>

          {/* Sorting */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-11 rounded-2xl border border-slate-200/80 bg-white px-3 text-xs font-semibold text-slate-600 outline-none transition-all focus:border-blue-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
            title="Sort by"
          >
            <option value="newest">Newest Created</option>
            <option value="oldest">Oldest Created</option>
            <option value="name">Alphabetical</option>
            <option value="progress">Highest Progress</option>
            <option value="dueDate">Due Date</option>
          </select>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex h-11 items-center gap-1.5 rounded-2xl border border-slate-200/80 bg-slate-50 px-3.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400 dark:hover:bg-slate-900"
            >
              <XCircle className="h-4 w-4" /> Clear
            </button>
          )}

          {/* Layout Grid/List Toggle */}
          <div className="ml-0 sm:ml-2 flex items-center rounded-2xl border border-slate-200/80 bg-white p-1 dark:border-slate-800 dark:bg-slate-950">
            <button
              onClick={() => setLayout('grid')}
              className={`rounded-xl p-2 transition-all ${
                layout === 'grid'
                  ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                  : 'text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900'
              }`}
              title="Grid layout"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setLayout('list')}
              className={`rounded-xl p-2 transition-all ${
                layout === 'list'
                  ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                  : 'text-slate-500 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-900'
              }`}
              title="List layout"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid/List */}
      <div>
        {filteredProjects.length === 0 ? (
          <EmptyState
            icon={hasActiveFilters ? SlidersHorizontal : FolderKanban}
            title={hasActiveFilters ? 'No projects match filters' : 'No projects yet'}
            description={
              hasActiveFilters
                ? 'Try adjusting your search query, sorting parameters, or status filters to find your project.'
                : 'Projects will show up here once you start creating them. Give your first one a name and a goal.'
            }
            action={
              hasActiveFilters ? (
                <Button onClick={clearFilters} variant="outline">
                  Reset Filters
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setEditingProject(null);
                    setShowProjectModal(true);
                  }}
                >
                  Create Project
                </Button>
              )
            }
          />
        ) : (
          <motion.div
            layout
            className={
              layout === 'grid'
                ? 'grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'
                : 'flex flex-col gap-4'
            }
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <ProjectCard
                    project={project}
                    layout={layout}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Modals */}
      <ProjectModal
        open={showProjectModal}
        onClose={() => {
          setShowProjectModal(false);
          setEditingProject(null);
        }}
        project={editingProject}
      />

      <ConfirmDeleteModal
        open={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeletingProject(null);
        }}
        onConfirm={handleConfirmDelete}
        projectName={deletingProject ? deletingProject.name : ''}
      />
    </motion.section>
  );
}
