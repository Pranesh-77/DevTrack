import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import Badge from '../ui/Badge';
import ProgressBar from '../ui/ProgressBar';
import { COLOR_OPTIONS } from '../../data/projectsData';
import { useProjects } from '../../context/ProjectsContext';
import { formatDate } from '../../utils/helpers';
import {
  MoreVertical,
  Calendar,
  Clock,
  Edit2,
  Trash2,
  ExternalLink,
  Flag,
  CircleDot,
  CheckCircle2,
  CircleDashed,
  PauseCircle
} from 'lucide-react';

export default function ProjectCard({ project, layout = 'grid', onEdit, onDelete }) {
  const navigate = useNavigate();
  const { teamMembers } = useProjects();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // Close menu on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Map team member IDs to member objects
  const assignedMembers = teamMembers.filter((m) => project.teamMembers?.includes(m.id));

  // Find color details
  const colorDetails = COLOR_OPTIONS.find((c) => c.value === project.color) || COLOR_OPTIONS[0];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success" className="capitalize"><CheckCircle2 className="mr-1 h-3.5 w-3.5" />{status}</Badge>;
      case 'active':
        return <Badge variant="primary" className="capitalize"><CircleDot className="mr-1 h-3.5 w-3.5 animate-pulse" />{status}</Badge>;
      case 'paused':
        return <Badge variant="warning" className="capitalize"><PauseCircle className="mr-1 h-3.5 w-3.5" />{status}</Badge>;
      case 'planning':
      default:
        return <Badge variant="default" className="capitalize"><CircleDashed className="mr-1 h-3.5 w-3.5" />{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return <Badge variant="danger" className="capitalize"><Flag className="mr-1 h-3 w-3 fill-rose-500 text-rose-500" />{priority}</Badge>;
      case 'medium':
        return <Badge variant="warning" className="capitalize"><Flag className="mr-1 h-3 w-3 fill-amber-500 text-amber-500" />{priority}</Badge>;
      case 'low':
      default:
        return <Badge variant="default" className="capitalize"><Flag className="mr-1 h-3 w-3" />{priority}</Badge>;
    }
  };

  const formatRelativeTime = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = Math.max(0, now - date);
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins || 1}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays}d ago`;
  };

  const totalMilestones = project.milestones?.length || 0;
  const completedMilestones = project.milestones?.filter((m) => m.completed).length || 0;

  if (layout === 'list') {
    return (
      <div className="group relative flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white/70 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white dark:border-slate-800/80 dark:bg-slate-950/60 dark:hover:border-slate-700 dark:hover:bg-slate-950 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Side: Color tag, Title and description */}
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className={`mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full ${colorDetails.bgClass} ring-4 ring-offset-2 ring-slate-100 dark:ring-offset-slate-950 dark:ring-slate-900`} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <Link
                to={`/projects/${project.id}`}
                className="text-base font-semibold text-slate-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 transition-colors truncate"
              >
                {project.name}
              </Link>
            </div>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-1 max-w-xl">
              {project.description}
            </p>
          </div>
        </div>

        {/* Middle items */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:flex lg:items-center lg:gap-8 shrink-0">
          {/* Status */}
          <div className="flex flex-col gap-1 lg:w-28">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 lg:hidden">Status</span>
            <div>{getStatusBadge(project.status)}</div>
          </div>

          {/* Priority */}
          <div className="flex flex-col gap-1 lg:w-24">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 lg:hidden">Priority</span>
            <div>{getPriorityBadge(project.priority)}</div>
          </div>

          {/* Progress */}
          <div className="flex flex-col gap-1.5 lg:w-36">
            <div className="flex items-center justify-between text-[10px] lg:text-xs">
              <span className="font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 lg:hidden">Progress</span>
              <span className="font-bold text-slate-700 dark:text-slate-300">{project.progress}%</span>
            </div>
            <ProgressBar value={project.progress} />
            <span className="text-[10px] text-slate-400 dark:text-slate-500">
              {completedMilestones}/{totalMilestones} Milestones
            </span>
          </div>

          {/* Due date */}
          <div className="flex flex-col gap-1 lg:w-32">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 lg:hidden">Due Date</span>
            <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              {formatDate(project.dueDate)}
            </div>
          </div>
        </div>

        {/* Right side: Team, Last updated, Menu */}
        <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-3 dark:border-slate-800/80 lg:border-t-0 lg:pt-0 shrink-0">
          {/* Team */}
          <div className="flex -space-x-1.5 overflow-hidden">
            {assignedMembers.slice(0, 3).map((member) => (
              <div
                key={member.id}
                title={`${member.name} (${member.role})`}
                className={`grid h-7 w-7 place-items-center rounded-full text-[10px] font-semibold ring-2 ring-white dark:ring-slate-900 ${member.bgClass}`}
              >
                {member.initials}
              </div>
            ))}
            {assignedMembers.length > 3 && (
              <div className="grid h-7 w-7 place-items-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-500 ring-2 ring-white dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-900">
                +{assignedMembers.length - 3}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500">
              <Clock className="h-3 w-3" />
              {formatRelativeTime(project.updatedAt)}
            </div>

            {/* Menu */}
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setShowMenu(!showMenu)}
                className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900 transition-colors"
              >
                <MoreVertical className="h-4.5 w-4.5" />
              </button>

              {showMenu && (
                <div className="absolute right-0 z-10 mt-1 w-36 rounded-xl border border-slate-200/80 bg-white p-1 shadow-lg dark:border-slate-800 dark:bg-slate-950">
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      navigate(`/projects/${project.id}`);
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Open
                  </button>
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onEdit(project);
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
                  >
                    <Edit2 className="h-3.5 w-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      onDelete(project);
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs font-medium text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/20"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default Grid Layout
  return (
    <Card className="flex flex-col h-full relative p-5 group">
      {/* Menu / Dropdown */}
      <div className="absolute top-4 right-4" ref={menuRef}>
        <button
          type="button"
          onClick={() => setShowMenu(!showMenu)}
          className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900 transition-colors"
        >
          <MoreVertical className="h-4.5 w-4.5" />
        </button>

        {showMenu && (
          <div className="absolute right-0 z-10 mt-1 w-32 rounded-xl border border-slate-200/80 bg-white p-1 shadow-lg dark:border-slate-800 dark:bg-slate-950">
            <button
              onClick={() => {
                setShowMenu(false);
                navigate(`/projects/${project.id}`);
              }}
              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
            >
              <ExternalLink className="h-3.5 w-3.5" /> Open
            </button>
            <button
              onClick={() => {
                setShowMenu(false);
                onEdit(project);
              }}
              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900"
            >
              <Edit2 className="h-3.5 w-3.5" /> Edit
            </button>
            <button
              onClick={() => {
                setShowMenu(false);
                onDelete(project);
              }}
              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs font-medium text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/20"
            >
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </button>
          </div>
        )}
      </div>

      {/* Header Info */}
      <div className="flex items-start gap-3.5 pr-6">
        <div className={`mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full ${colorDetails.bgClass} ring-4 ring-offset-2 ring-slate-100 dark:ring-offset-slate-950 dark:ring-slate-900`} />
        <div>
          <Link
            to={`/projects/${project.id}`}
            className="text-lg font-semibold tracking-tight text-slate-950 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 transition-colors line-clamp-1"
          >
            {project.name}
          </Link>
          <div className="mt-1 flex items-center gap-1.5 text-[10px] text-slate-400 dark:text-slate-500">
            <Clock className="h-3 w-3" />
            Updated {formatRelativeTime(project.updatedAt)}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="mt-3.5 flex-1 text-xs leading-5 text-slate-500 dark:text-slate-400 line-clamp-3">
        {project.description}
      </p>

      {/* Progress */}
      <div className="mt-5 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-500 dark:text-slate-400">Progress</span>
          <span className="font-bold text-slate-950 dark:text-white">{project.progress}%</span>
        </div>
        <ProgressBar value={project.progress} />
        <div className="text-[10px] text-slate-400 dark:text-slate-500">
          {completedMilestones} of {totalMilestones} Milestones Completed
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 border-t border-slate-100 dark:border-slate-900" />

      {/* Footer Info */}
      <div className="flex items-center justify-between">
        {/* Team */}
        <div className="flex -space-x-1.5 overflow-hidden">
          {assignedMembers.slice(0, 3).map((member) => (
            <div
              key={member.id}
              title={`${member.name} (${member.role})`}
              className={`grid h-7 w-7 place-items-center rounded-full text-[10px] font-semibold ring-2 ring-white dark:ring-slate-900 ${member.bgClass}`}
            >
              {member.initials}
            </div>
          ))}
          {assignedMembers.length > 3 && (
            <div className="grid h-7 w-7 place-items-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-500 ring-2 ring-white dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-900">
              +{assignedMembers.length - 3}
            </div>
          )}
        </div>

        {/* Due Date & Badges */}
        <div className="flex items-center gap-2">
          {getPriorityBadge(project.priority)}
          {getStatusBadge(project.status)}
        </div>
      </div>

      {/* Due Date Footnote */}
      <div className="mt-3.5 flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5 text-slate-400" />
          Due {formatDate(project.dueDate)}
        </span>
      </div>
    </Card>
  );
}
