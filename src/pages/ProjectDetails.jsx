import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProjects } from '../context/ProjectsContext';
import { COLOR_OPTIONS } from '../data/projectsData';
import { Card } from '../components/ui/Card';
import { formatDate } from '../utils/helpers';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Paperclip,
  Activity,
  MessageSquare,
  Milestone,
  Flag,
  User,
  ExternalLink,
  ChevronRight,
  Sparkles,
  FileText
} from 'lucide-react';

export default function ProjectDetails() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const {
    projects,
    teamMembers,
    addMilestone,
    updateMilestone,
    toggleMilestone,
    deleteMilestone
  } = useProjects();

  const [project, setProject] = useState(null);

  // Milestone inline form states
  const [showAddMilestone, setShowAddMilestone] = useState(false);
  const [newMilestoneTitle, setNewMilestoneTitle] = useState('');
  const [newMilestoneDueDate, setNewMilestoneDueDate] = useState('');
  const [milestoneErrors, setMilestoneErrors] = useState({});

  // Milestone inline edit states
  const [editingMilestoneId, setEditingMilestoneId] = useState(null);
  const [editMilestoneTitle, setEditMilestoneTitle] = useState('');
  const [editMilestoneDueDate, setEditMilestoneDueDate] = useState('');

  // Fetch project details
  useEffect(() => {
    const found = projects.find((p) => p.id === projectId);
    if (found) {
      setProject(found);
    } else {
      // If project not found, redirect back to projects
      navigate('/projects');
    }
  }, [projectId, projects, navigate]);

  if (!project) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center space-y-3">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600 dark:border-slate-800 dark:border-t-blue-400" />
          <p className="text-sm font-medium text-slate-500">Loading project details...</p>
        </div>
      </div>
    );
  }

  // Map team members
  const assignedMembers = teamMembers.filter((m) => project.teamMembers?.includes(m.id));
  const colorDetails = COLOR_OPTIONS.find((c) => c.value === project.color) || COLOR_OPTIONS[0];

  // Milestone stats
  const milestones = project.milestones || [];
  const totalMilestones = milestones.length;
  const completedMilestones = milestones.filter((m) => m.completed).length;

  const handleAddMilestoneSubmit = (e) => {
    e.preventDefault();
    const tempErrors = {};
    if (!newMilestoneTitle.trim()) {
      tempErrors.title = 'Milestone title is required';
    }
    if (!newMilestoneDueDate) {
      tempErrors.dueDate = 'Due date is required';
    }

    if (Object.keys(tempErrors).length > 0) {
      setMilestoneErrors(tempErrors);
      return;
    }

    addMilestone(project.id, {
      title: newMilestoneTitle.trim(),
      dueDate: newMilestoneDueDate,
    });

    setNewMilestoneTitle('');
    setNewMilestoneDueDate('');
    setShowAddMilestone(false);
    setMilestoneErrors({});
  };

  const handleEditMilestoneClick = (milestone) => {
    setEditingMilestoneId(milestone.id);
    setEditMilestoneTitle(milestone.title);
    setEditMilestoneDueDate(milestone.dueDate);
  };

  const handleSaveEditMilestone = (milestoneId) => {
    if (!editMilestoneTitle.trim() || !editMilestoneDueDate) return;

    updateMilestone(project.id, milestoneId, {
      title: editMilestoneTitle.trim(),
      dueDate: editMilestoneDueDate,
    });

    setEditingMilestoneId(null);
    setEditMilestoneTitle('');
    setEditMilestoneDueDate('');
  };

  const handleDeleteMilestoneClick = (milestoneId) => {
    if (confirm('Are you sure you want to delete this milestone?')) {
      deleteMilestone(project.id, milestoneId);
    }
  };

  // Mock Attachments
  const mockAttachments = [
    { name: 'Branding Guidelines.pdf', size: '2.4 MB', type: 'pdf' },
    { name: 'Wireframes Design v2.fig', size: '14.8 MB', type: 'figma' },
    { name: 'API Specification.yaml', size: '420 KB', type: 'yaml' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Back navigation & Title bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/projects"
            className="grid h-10 w-10 place-items-center rounded-2xl border border-slate-200 bg-white text-slate-500 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-95 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className={`h-3 w-3 rounded-full ${colorDetails.bgClass}`} />
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Project Detail
              </p>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
              {project.name}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
            Progress Status:
          </span>
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            {project.progress}% Complete
          </span>
        </div>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        {/* Left Column (Main Info) */}
        <div className="space-y-6">
          {/* Project Overview Card */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
              Overview
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              {project.description}
            </p>

            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                <span>Milestone Completion Progress</span>
                <span className="text-slate-950 dark:text-white">{project.progress}%</span>
              </div>
              <ProgressBar value={project.progress} className="h-3" />
              <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500">
                <span>
                  {completedMilestones} of {totalMilestones} milestones completed
                </span>
                <span>Target: {formatDate(project.dueDate)}</span>
              </div>
            </div>
          </Card>

          {/* Milestones CRUD Section */}
          <Card className="p-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-900">
              <div className="flex items-center gap-2">
                <Milestone className="h-5 w-5 text-blue-500" />
                <h2 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
                  Milestones Checklist
                </h2>
              </div>
              <Button
                variant="outline"
                onClick={() => setShowAddMilestone(!showAddMilestone)}
                className="h-8 rounded-xl px-3 py-1 text-xs"
              >
                {showAddMilestone ? 'Cancel' : 'Add Milestone'}
              </Button>
            </div>

            {/* Inline Add Milestone Form */}
            {showAddMilestone && (
              <form
                onSubmit={handleAddMilestoneSubmit}
                className="mt-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-900 dark:bg-slate-950/20 space-y-3"
              >
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Milestone Title
                    </label>
                    <Input
                      placeholder="e.g. API Integration"
                      value={newMilestoneTitle}
                      onChange={(e) => setNewMilestoneTitle(e.target.value)}
                      className="h-9 text-xs"
                    />
                    {milestoneErrors.title && (
                      <p className="text-[10px] text-rose-500">{milestoneErrors.title}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Due Date
                    </label>
                    <Input
                      type="date"
                      value={newMilestoneDueDate}
                      onChange={(e) => setNewMilestoneDueDate(e.target.value)}
                      className="h-9 text-xs"
                    />
                    {milestoneErrors.dueDate && (
                      <p className="text-[10px] text-rose-500">{milestoneErrors.dueDate}</p>
                    )}
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <Button
                    type="submit"
                    className="h-8 rounded-xl px-4 py-1 text-xs font-semibold"
                  >
                    Add
                  </Button>
                </div>
              </form>
            )}

            {/* Milestones list */}
            <div className="mt-4 divide-y divide-slate-100 dark:divide-slate-900">
              {milestones.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-400 dark:text-slate-500">
                  No milestones configured for this project. Add one to track progress.
                </div>
              ) : (
                milestones.map((milestone) => (
                  <div
                    key={milestone.id}
                    className="group flex flex-col justify-between py-3 sm:flex-row sm:items-center gap-3"
                  >
                    {editingMilestoneId === milestone.id ? (
                      /* Editing Row */
                      <div className="flex-1 space-y-2">
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                          <Input
                            value={editMilestoneTitle}
                            onChange={(e) => setEditMilestoneTitle(e.target.value)}
                            className="h-9 text-xs"
                          />
                          <Input
                            type="date"
                            value={editMilestoneDueDate}
                            onChange={(e) => setEditMilestoneDueDate(e.target.value)}
                            className="h-9 text-xs"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleSaveEditMilestone(milestone.id)}
                            className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 hover:text-emerald-500"
                          >
                            <Check className="h-3.5 w-3.5" /> Save
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingMilestoneId(null)}
                            className="flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-slate-600"
                          >
                            <X className="h-3.5 w-3.5" /> Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Display Row */
                      <>
                        <div className="flex items-start gap-3">
                          <button
                            type="button"
                            onClick={() => toggleMilestone(project.id, milestone.id)}
                            className={`mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded border transition-colors ${
                              milestone.completed
                                ? 'border-emerald-500 bg-emerald-500 text-white dark:border-emerald-400 dark:bg-emerald-400'
                                : 'border-slate-300 hover:border-slate-400 dark:border-slate-700'
                            }`}
                          >
                            {milestone.completed && <Check className="h-3 w-3 stroke-[3]" />}
                          </button>
                          <div>
                            <p
                              className={`text-xs font-semibold transition-colors ${
                                milestone.completed
                                  ? 'text-slate-400 line-through dark:text-slate-600'
                                  : 'text-slate-900 dark:text-white'
                              }`}
                            >
                              {milestone.title}
                            </p>
                            <p className="mt-0.5 flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500">
                              <Calendar className="h-3.5 w-3.5" /> Due {formatDate(milestone.dueDate)}
                            </p>
                          </div>
                        </div>

                        {/* Actions buttons */}
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={() => handleEditMilestoneClick(milestone)}
                            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-500 dark:hover:bg-slate-900 dark:hover:text-white transition-colors"
                            title="Edit milestone"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteMilestoneClick(milestone.id)}
                            className="rounded-lg p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:text-slate-500 dark:hover:bg-rose-950/20 dark:hover:text-rose-400 transition-colors"
                            title="Delete milestone"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Timeline representation of milestones */}
          <Card className="p-6">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-4 dark:border-slate-900">
              <Flag className="h-5 w-5 text-emerald-500" />
              <h2 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
                Milestone Timeline
              </h2>
            </div>

            <div className="relative mt-6 pl-6 border-l border-slate-200 dark:border-slate-800 space-y-6">
              {milestones.length === 0 ? (
                <div className="text-xs text-slate-400 dark:text-slate-500">
                  No timeline data available. Create milestones to build a timeline path.
                </div>
              ) : (
                milestones.map((milestone) => (
                  <div key={milestone.id} className="relative">
                    {/* timeline node */}
                    <div
                      className={`absolute -left-[30px] top-0.5 grid h-4 w-4 place-items-center rounded-full border-2 ${
                        milestone.completed
                          ? 'border-emerald-500 bg-emerald-500 text-white dark:border-emerald-400 dark:bg-emerald-400'
                          : 'border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-950'
                      }`}
                    >
                      {milestone.completed && <Check className="h-2 w-2 stroke-[4]" />}
                    </div>

                    <div className="space-y-0.5">
                      <h4
                        className={`text-xs font-semibold leading-none ${
                          milestone.completed
                            ? 'text-slate-500 dark:text-slate-500'
                            : 'text-slate-900 dark:text-white'
                        }`}
                      >
                        {milestone.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500">
                        Target date: {formatDate(milestone.dueDate)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Notes Section (Read only/Mock) */}
          <Card className="p-6">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-4 dark:border-slate-900">
              <MessageSquare className="h-5 w-5 text-indigo-500" />
              <h2 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
                Project Notes
              </h2>
            </div>

            <div className="mt-4 space-y-3">
              {project.notes?.length === 0 ? (
                <div className="py-4 text-center text-xs text-slate-400 dark:text-slate-500">
                  No notes on this project yet.
                </div>
              ) : (
                project.notes?.map((note) => (
                  <div
                    key={note.id}
                    className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-900 dark:bg-slate-900/10"
                  >
                    <div className="flex items-center justify-between text-[10px] font-semibold text-slate-400 dark:text-slate-500">
                      <span>{note.author}</span>
                      <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                      {note.content}
                    </p>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Attachments Section */}
          <Card className="p-6">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-4 dark:border-slate-900">
              <Paperclip className="h-5 w-5 text-orange-500" />
              <h2 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
                Asset Attachments
              </h2>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {mockAttachments.map((file) => (
                <div
                  key={file.name}
                  className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-white p-3 dark:border-slate-800 dark:bg-slate-950"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-500 dark:bg-blue-950/30 dark:text-blue-400">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                        {file.name}
                      </p>
                      <p className="text-[9px] text-slate-400 dark:text-slate-500">{file.size}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:text-slate-500 dark:hover:bg-slate-900"
                    title="Download attachment placeholder"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column (Sidebar information) */}
        <div className="space-y-6">
          {/* Project Details Sidebar */}
          <Card className="p-6 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-100 pb-2 dark:border-slate-900">
              Project Information
            </h3>

            <div className="grid grid-cols-2 gap-y-4 text-xs">
              <div className="font-semibold text-slate-500 dark:text-slate-400">Status</div>
              <div className="font-bold flex justify-end">
                <Badge variant={project.status === 'completed' ? 'success' : project.status === 'active' ? 'primary' : project.status === 'paused' ? 'warning' : 'default'} className="capitalize">
                  {project.status}
                </Badge>
              </div>

              <div className="font-semibold text-slate-500 dark:text-slate-400">Priority</div>
              <div className="font-bold flex justify-end">
                <Badge variant={project.priority === 'high' ? 'danger' : project.priority === 'medium' ? 'warning' : 'default'} className="capitalize">
                  {project.priority}
                </Badge>
              </div>

              <div className="font-semibold text-slate-500 dark:text-slate-400">Due Date</div>
              <div className="font-bold text-slate-900 dark:text-white text-right flex items-center justify-end gap-1">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                {formatDate(project.dueDate)}
              </div>

              <div className="font-semibold text-slate-500 dark:text-slate-400">Created At</div>
              <div className="font-semibold text-slate-600 dark:text-slate-400 text-right">
                {new Date(project.createdAt).toLocaleDateString()}
              </div>

              <div className="font-semibold text-slate-500 dark:text-slate-400">Last Updated</div>
              <div className="font-semibold text-slate-600 dark:text-slate-400 text-right">
                {new Date(project.updatedAt).toLocaleDateString()}
              </div>
            </div>
          </Card>

          {/* Assigned Team Sidebar */}
          <Card className="p-6 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-100 pb-2 dark:border-slate-900">
              Assigned Team ({assignedMembers.length})
            </h3>

            <div className="space-y-3">
              {assignedMembers.map((member) => (
                <div key={member.id} className="flex items-center gap-3">
                  <div className={`grid h-8 w-8 place-items-center rounded-full text-xs font-semibold ${member.bgClass}`}>
                    {member.initials}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {member.name}
                    </h4>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Activity Log */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-1.5 border-b border-slate-100 pb-2 dark:border-slate-900">
              <Activity className="h-4.5 w-4.5 text-blue-500" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Recent Activity
              </h3>
            </div>

            <div className="relative pl-4 border-l border-slate-100 dark:border-slate-900 space-y-4 text-xs max-h-60 overflow-y-auto pr-1">
              {project.activities?.length === 0 ? (
                <div className="text-slate-400 dark:text-slate-500 text-[11px]">No activity logs found.</div>
              ) : (
                project.activities?.map((activity) => (
                  <div key={activity.id} className="relative">
                    {/* Activity node */}
                    <div className="absolute -left-[20.5px] top-1 h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-800" />
                    <div>
                      <p className="text-slate-600 dark:text-slate-300 font-medium">
                        {activity.content}
                      </p>
                      <span className="text-[9px] text-slate-400 dark:text-slate-500">
                        {new Date(activity.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
