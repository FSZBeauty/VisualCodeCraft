import { Block } from "@shared/schema";

export interface StoredProject {
  id: string;
  name: string;
  blocks: Block[];
  createdAt: string;
  updatedAt: string;
}

export const projectStorage = {
  save: (project: StoredProject): void => {
    const projects = projectStorage.getAll();
    const index = projects.findIndex(p => p.id === project.id);
    
    if (index >= 0) {
      projects[index] = { ...project, updatedAt: new Date().toISOString() };
    } else {
      projects.push(project);
    }
    
    localStorage.setItem('visual-ide-projects', JSON.stringify(projects));
  },

  get: (id: string): StoredProject | null => {
    const projects = projectStorage.getAll();
    return projects.find(p => p.id === id) || null;
  },

  getAll: (): StoredProject[] => {
    const stored = localStorage.getItem('visual-ide-projects');
    return stored ? JSON.parse(stored) : [];
  },

  delete: (id: string): void => {
    const projects = projectStorage.getAll();
    const filtered = projects.filter(p => p.id !== id);
    localStorage.setItem('visual-ide-projects', JSON.stringify(filtered));
  },

  clear: (): void => {
    localStorage.removeItem('visual-ide-projects');
  },
};
