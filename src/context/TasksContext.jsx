import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { MOCK_TASKS } from '../data/tasksData';
import { readStoredTasks, writeStoredTasks, TASKS_CHANGED_EVENT } from '../utils/taskStore';

const TasksContext = createContext(null);

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => readStoredTasks(MOCK_TASKS));

  useEffect(() => {
    writeStoredTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    const handleTasksChanged = () => {
      setTasks(readStoredTasks(MOCK_TASKS));
    };

    window.addEventListener(TASKS_CHANGED_EVENT, handleTasksChanged);
    window.addEventListener('storage', handleTasksChanged);

    return () => {
      window.removeEventListener(TASKS_CHANGED_EVENT, handleTasksChanged);
      window.removeEventListener('storage', handleTasksChanged);
    };
  }, []);

  const addTask = (taskData) => {
    const now = new Date().toISOString();
    const newTask = {
      id: `task-${Date.now()}`,
      title: taskData.title.trim(),
      description: taskData.description.trim(),
      projectId: taskData.projectId,
      status: taskData.status,
      priority: taskData.priority,
      dueDate: taskData.dueDate,
      assigneeId: taskData.assigneeId || '',
      createdAt: now,
      updatedAt: now,
    };

    setTasks((currentTasks) => [newTask, ...currentTasks]);
    return newTask;
  };

  const updateTask = (taskId, taskData) => {
    const now = new Date().toISOString();
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              ...taskData,
              updatedAt: now,
            }
          : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
  };

  const moveTask = (taskId, status) => {
    updateTask(taskId, { status });
  };

  const value = useMemo(
    () => ({
      tasks,
      addTask,
      updateTask,
      deleteTask,
      moveTask,
      getTaskById: (taskId) => tasks.find((task) => task.id === taskId),
      getTasksByProjectId: (projectId) => tasks.filter((task) => task.projectId === projectId),
    }),
    [tasks]
  );

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
};