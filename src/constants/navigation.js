import { LayoutDashboard, FolderKanban, CheckSquare, Calendar, PieChart, Settings } from 'lucide-react';

export const NAVIGATION = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Projects', path: '/projects', icon: FolderKanban },
  { name: 'Tasks', path: '/tasks', icon: CheckSquare },
  { name: 'Calendar', path: '/calendar', icon: Calendar },
  { name: 'Analytics', path: '/analytics', icon: PieChart },
  { name: 'Settings', path: '/settings', icon: Settings },
];
