import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './context/ThemeContext'
import { ProjectsProvider } from './context/ProjectsContext'
import { TasksProvider } from './context/TasksContext'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <ProjectsProvider>
        <TasksProvider>
          <App />
        </TasksProvider>
      </ProjectsProvider>
    </ThemeProvider>
  </StrictMode>,
)
