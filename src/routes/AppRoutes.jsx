import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import NotFound from '../pages/NotFound';
import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Landing from '../pages/Landing';
import Dashboard from '../pages/Dashboard';
import Projects from '../pages/Projects';
import Tasks from '../pages/Tasks';
import Calendar from '../pages/Calendar';
import Analytics from '../pages/Analytics';
import Settings from '../pages/Settings';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/forgot-password" element={<ForgotPassword />} />
      
      <Route element={<MainLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}