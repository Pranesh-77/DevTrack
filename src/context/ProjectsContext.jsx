import { createContext, useState, useEffect, useContext } from 'react';
import { MOCK_PROJECTS, MOCK_TEAM_MEMBERS } from '../data/projectsData';
import { removeTasksForProject } from '../utils/taskStore';

const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('devtrack_projects');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse projects from localStorage', e);
        }
      }
    }
    return MOCK_PROJECTS;
  });

  // Keep localStorage in sync
  useEffect(() => {
    localStorage.setItem('devtrack_projects', JSON.stringify(projects));
  }, [projects]);

  // Utility to recalculate progress and update updatedAt
  const calcProjectProgress = (project) => {
    const total = project.milestones?.length || 0;
    if (total === 0) return 0;
    const completed = project.milestones.filter(m => m.completed).length;
    return Math.round((completed / total) * 100);
  };

  const addProject = (projectData) => {
    const newId = `proj-${Date.now()}`;
    const now = new Date().toISOString();
    const newProject = {
      ...projectData,
      id: newId,
      milestones: projectData.milestones || [],
      notes: projectData.notes || [],
      activities: [
        { id: `act-${Date.now()}`, content: `Project "${projectData.name}" was created.`, createdAt: now },
        ...(projectData.activities || [])
      ],
      createdAt: now,
      updatedAt: now,
    };
    
    // Add default progress if no milestones
    newProject.progress = calcProjectProgress(newProject);

    setProjects((prev) => [newProject, ...prev]);
    return newProject;
  };

  const updateProject = (projectId, projectData) => {
    const now = new Date().toISOString();
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          const updated = {
            ...p,
            ...projectData,
            updatedAt: now,
          };
          updated.progress = calcProjectProgress(updated);
          
          // Add activity for edit
          updated.activities = [
            { id: `act-${Date.now()}`, content: `Project settings updated.`, createdAt: now },
            ...(p.activities || [])
          ];
          
          return updated;
        }
        return p;
      })
    );
  };

  const deleteProject = (projectId) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
    removeTasksForProject(projectId);
  };

  const addMilestone = (projectId, milestoneData) => {
    const now = new Date().toISOString();
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          const newMilestone = {
            id: `m-${Date.now()}`,
            completed: false,
            ...milestoneData,
          };
          const updatedMilestones = [...(p.milestones || []), newMilestone];
          const updated = {
            ...p,
            milestones: updatedMilestones,
            updatedAt: now,
          };
          updated.progress = calcProjectProgress(updated);
          updated.activities = [
            { id: `act-${Date.now()}`, content: `Added milestone "${milestoneData.title}"`, createdAt: now },
            ...(p.activities || [])
          ];
          return updated;
        }
        return p;
      })
    );
  };

  const updateMilestone = (projectId, milestoneId, milestoneData) => {
    const now = new Date().toISOString();
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          const updatedMilestones = p.milestones.map((m) => {
            if (m.id === milestoneId) {
              return { ...m, ...milestoneData };
            }
            return m;
          });
          const updated = {
            ...p,
            milestones: updatedMilestones,
            updatedAt: now,
          };
          updated.progress = calcProjectProgress(updated);
          return updated;
        }
        return p;
      })
    );
  };

  const toggleMilestone = (projectId, milestoneId) => {
    const now = new Date().toISOString();
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          let milestoneTitle = '';
          let isCompleted = false;
          const updatedMilestones = p.milestones.map((m) => {
            if (m.id === milestoneId) {
              milestoneTitle = m.title;
              isCompleted = !m.completed;
              return { ...m, completed: !m.completed };
            }
            return m;
          });
          const updated = {
            ...p,
            milestones: updatedMilestones,
            updatedAt: now,
          };
          updated.progress = calcProjectProgress(updated);
          updated.activities = [
            { 
              id: `act-${Date.now()}`, 
              content: `Milestone "${milestoneTitle}" marked as ${isCompleted ? 'completed' : 'incomplete'}.`, 
              createdAt: now 
            },
            ...(p.activities || [])
          ];
          return updated;
        }
        return p;
      })
    );
  };

  const deleteMilestone = (projectId, milestoneId) => {
    const now = new Date().toISOString();
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          const milestone = p.milestones.find((m) => m.id === milestoneId);
          const milestoneTitle = milestone ? milestone.title : '';
          const updatedMilestones = p.milestones.filter((m) => m.id !== milestoneId);
          const updated = {
            ...p,
            milestones: updatedMilestones,
            updatedAt: now,
          };
          updated.progress = calcProjectProgress(updated);
          updated.activities = [
            { id: `act-${Date.now()}`, content: `Milestone "${milestoneTitle}" deleted.`, createdAt: now },
            ...(p.activities || [])
          ];
          return updated;
        }
        return p;
      })
    );
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        teamMembers: MOCK_TEAM_MEMBERS,
        addProject,
        updateProject,
        deleteProject,
        addMilestone,
        updateMilestone,
        toggleMilestone,
        deleteMilestone,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
};
