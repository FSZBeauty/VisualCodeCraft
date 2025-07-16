import { type ProjectRow, type InsertProject } from "@shared/schema";

export interface IStorage {
  getAllProjects(): Promise<ProjectRow[]>;
  getProject(id: number): Promise<ProjectRow | undefined>;
  createProject(project: InsertProject): Promise<ProjectRow>;
  updateProject(id: number, project: InsertProject): Promise<ProjectRow | undefined>;
  deleteProject(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private projects: Map<number, ProjectRow>;
  currentId: number;

  constructor() {
    this.projects = new Map();
    this.currentId = 1;
  }

  async getAllProjects(): Promise<ProjectRow[]> {
    return Array.from(this.projects.values());
  }

  async getProject(id: number): Promise<ProjectRow | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<ProjectRow> {
    const id = this.currentId++;
    const project: ProjectRow = { 
      ...insertProject, 
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: number, insertProject: InsertProject): Promise<ProjectRow | undefined> {
    const existing = this.projects.get(id);
    if (!existing) return undefined;
    
    const updated: ProjectRow = { 
      ...insertProject, 
      id,
      createdAt: existing.createdAt,
      updatedAt: new Date()
    };
    this.projects.set(id, updated);
    return updated;
  }

  async deleteProject(id: number): Promise<boolean> {
    return this.projects.delete(id);
  }
}

export const storage = new MemStorage();
