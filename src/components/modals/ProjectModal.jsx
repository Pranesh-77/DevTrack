import { useState, useEffect } from 'react';
import { useProjects } from '../../context/ProjectsContext';
import { COLOR_OPTIONS } from '../../data/projectsData';
import { useTheme } from '../../hooks/useTheme';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Check } from 'lucide-react';

export default function ProjectModal({ open, onClose, project = null }) {
  const { addProject, updateProject, teamMembers } = useProjects();
  const { isDark } = useTheme();
  const todayStr = new Date().toISOString().split('T')[0];
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('planning');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [color, setColor] = useState('blue');
  const [selectedMembers, setSelectedMembers] = useState([]);
  
  // Validation errors
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description);
      setStatus(project.status);
      setPriority(project.priority);
      setDueDate(project.dueDate);
      setColor(project.color);
      setSelectedMembers(project.teamMembers || []);
    } else {
      setName('');
      setDescription('');
      setStatus('planning');
      setPriority('medium');
      setDueDate('');
      setColor('blue');
      setSelectedMembers([]);
    }
    setErrors({});
  }, [project, open]);

  const toggleMember = (memberId) => {
    setSelectedMembers((prev) =>
      prev.includes(memberId) ? prev.filter((id) => id !== memberId) : [...prev, memberId]
    );
  };

  const validate = () => {
    const tempErrors = {};
    if (!name.trim()) {
      tempErrors.name = 'Project name is required';
    } else if (name.trim().length < 3) {
      tempErrors.name = 'Name must be at least 3 characters';
    }

    if (!description.trim()) {
      tempErrors.description = 'Description is required';
    } else if (description.trim().length < 10) {
      tempErrors.description = 'Description must be at least 10 characters';
    }

    if (!dueDate) {
      tempErrors.dueDate = 'Due date is required';
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(dueDate);
      selectedDate.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        tempErrors.dueDate = 'Due date cannot be earlier than today.';
      }
    }

    if (selectedMembers.length === 0) {
      tempErrors.teamMembers = 'Please assign at least one team member';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const data = {
      name: name.trim(),
      description: description.trim(),
      status,
      priority,
      dueDate,
      color,
      teamMembers: selectedMembers,
    };

    if (project) {
      updateProject(project.id, data);
    } else {
      addProject(data);
    }
    
    onClose();
  };

  return (
    <Modal open={open} title={project ? 'Edit Project' : 'Create New Project'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="mt-2 space-y-4">
        {/* Name */}
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Project Name
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Acme Redesign"
          />
          {errors.name && <p className="text-xs text-rose-500">{errors.name}</p>}
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="A brief summary of what this project aims to build..."
            rows={3}
            className="w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition-all duration-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400/10"
            style={{ colorScheme: isDark ? 'dark' : 'light' }}
          />
          {errors.description && <p className="text-xs text-rose-500">{errors.description}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Status */}
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-11 w-full rounded-2xl border border-slate-200/80 bg-white px-3 text-sm text-slate-950 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400/10"
              style={{ colorScheme: isDark ? 'dark' : 'light' }}
            >
              <option value="planning" className="bg-white text-slate-950 dark:bg-slate-950 dark:text-white">Planning</option>
              <option value="active" className="bg-white text-slate-950 dark:bg-slate-950 dark:text-white">Active</option>
              <option value="paused" className="bg-white text-slate-950 dark:bg-slate-950 dark:text-white">Paused</option>
              <option value="completed" className="bg-white text-slate-950 dark:bg-slate-950 dark:text-white">Completed</option>
            </select>
          </div>

          {/* Priority */}
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="h-11 w-full rounded-2xl border border-slate-200/80 bg-white px-3 text-sm text-slate-950 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400/10"
              style={{ colorScheme: isDark ? 'dark' : 'light' }}
            >
              <option value="low" className="bg-white text-slate-950 dark:bg-slate-950 dark:text-white">Low</option>
              <option value="medium" className="bg-white text-slate-950 dark:bg-slate-950 dark:text-white">Medium</option>
              <option value="high" className="bg-white text-slate-950 dark:bg-slate-950 dark:text-white">High</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Due Date */}
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Due Date
            </label>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={todayStr}
            />
            {errors.dueDate && <p className="text-xs text-rose-500">{errors.dueDate}</p>}
          </div>

          {/* Color */}
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Theme Color
            </label>
            <div className="flex h-11 items-center gap-2 rounded-2xl border border-slate-200/80 bg-white px-3 dark:border-slate-800 dark:bg-slate-950">
              {COLOR_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setColor(opt.value)}
                  className={`relative h-6 w-6 rounded-full transition-transform hover:scale-110 active:scale-95 ${opt.bgClass}`}
                  title={opt.name}
                >
                  {color === opt.value && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Assign Team Members
          </label>
          <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto pr-1">
            {teamMembers.map((member) => {
              const isSelected = selectedMembers.includes(member.id);
              return (
                <button
                  key={member.id}
                  type="button"
                  onClick={() => toggleMember(member.id)}
                  className={`flex items-center gap-2 rounded-xl border p-1.5 text-left transition-all duration-200 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/50 dark:border-blue-400 dark:bg-blue-950/20'
                      : 'border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900/50'
                  }`}
                >
                  <div className={`grid h-6 w-6 place-items-center rounded-lg text-[10px] font-bold ${member.bgClass}`}>
                    {member.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                      {member.name}
                    </p>
                    <p className="text-[9px] text-slate-500 dark:text-slate-400 truncate">
                      {member.role}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
          {errors.teamMembers && <p className="text-xs text-rose-500">{errors.teamMembers}</p>}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-900">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {project ? 'Save Changes' : 'Create Project'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
