export type ChecklistItem = {
  text: string;
  completed: boolean;
};

export type TaskStatus =
  | 'pending'
  | 'in_progress'
  | 'blocked'
  | 'completed';

export type RiskLevel = 'low' | 'medium' | 'high';

export type Task = {
  id: string;
  name: string;
  description: string;
  checklist?: string[];
  requiresChecklist: boolean;
  requiresPhoto: boolean;
  requiresVideo: boolean;
  status: TaskStatus;
  riskLevel: RiskLevel;
  dependencies: string[];
  assignedTo?: string;
  assignedRole?: string;
};

export type Workflow = {
  id: string;
  name: string;
  tasks: Task[];
};

export type TaskListItem = Task & {
  workflowId: string;
  workflowName: string;
};

export type OccurrenceType = 'info' | 'error';

export type Occurrence = {
  id: string;
  taskId: string;
  type: OccurrenceType;
  description: string;
  employeeName: string;
  createdAt: string;
  resolved: boolean;
};

export type RouteParams = {
  taskId: string;
};
