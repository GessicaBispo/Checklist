import { workflows, occurrences } from '@/data/workflows';
import { User } from '@/types/profile';
import {
  Occurrence,
  Task,
  TaskListItem,
  Workflow,
} from '@/types/tasks';

export function findWorkflowByTaskId(taskId: string): Workflow | undefined {
  return workflows.find(workflow =>
    workflow.tasks.some(task => task.id === taskId)
  );
}

export function findTaskById(taskId: string): Task | undefined {
  return findWorkflowByTaskId(taskId)?.tasks.find(task => task.id === taskId);
}

export function getTaskDependencies(task: Task, workflow: Workflow): Task[] {
  return task.dependencies
    .map(depId => workflow.tasks.find(depTask => depTask.id === depId))
    .filter((dependency): dependency is Task => Boolean(dependency));
}

export function getMyTasks(user: Pick<User, 'id' | 'roleId'>): TaskListItem[] {
  return workflows.flatMap(workflow =>
    workflow.tasks
      .filter(task =>
        task.assignedTo === user.id || task.assignedRole === user.roleId
      )
      .map(task => ({
        ...task,
        workflowId: workflow.id,
        workflowName: workflow.name,
      }))
  );
}

export function getTaskOccurrences(taskId: string): Occurrence[] {
  return occurrences.filter(occurrence => occurrence.taskId === taskId);
}

export function getOpenTaskErrors(taskId: string): Occurrence[] {
  return getTaskOccurrences(taskId).filter(
    occurrence => occurrence.type === 'error' && !occurrence.resolved
  );
}
