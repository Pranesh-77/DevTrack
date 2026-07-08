export const TASK_STORAGE_KEY = 'devtrack_tasks';
export const TASKS_CHANGED_EVENT = 'devtrack:tasks-changed';

export const readStoredTasks = (fallbackTasks = []) => {
  if (typeof window === 'undefined') {
    return fallbackTasks;
  }

  const savedTasks = window.localStorage.getItem(TASK_STORAGE_KEY);
  if (!savedTasks) {
    return fallbackTasks;
  }

  try {
    return JSON.parse(savedTasks);
  } catch (error) {
    console.error('Failed to parse tasks from localStorage', error);
    return fallbackTasks;
  }
};

export const writeStoredTasks = (tasks) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks));
  window.dispatchEvent(new Event(TASKS_CHANGED_EVENT));
};

export const removeTasksForProject = (projectId) => {
  if (typeof window === 'undefined') {
    return;
  }

  const currentTasks = readStoredTasks();
  const nextTasks = currentTasks.filter((task) => task.projectId !== projectId);
  writeStoredTasks(nextTasks);
};