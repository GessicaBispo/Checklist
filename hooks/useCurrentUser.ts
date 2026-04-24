import { User } from '@/types/profile';
import { getMyTasks } from '@/utils/tasks';

export function useCurrentUser(): User {
  const baseUser = {
    id: 'user-1',
    roleId: 'promoter',
    name: 'Gessica Silva',
    email: 'gessica@email.com',
    role: 'Promotora de Merchandising',
  };

  const myTasks = getMyTasks(baseUser);
  const completedTasks = myTasks.filter(task => task.status === 'completed');
  const blockedTasks = myTasks.filter(task => task.status === 'blocked');
  const pendingTasks = myTasks.filter(task =>
    task.status === 'pending' || task.status === 'in_progress'
  );

  const totalTasks = myTasks.length || 1;
  const performance = Math.round((completedTasks.length / totalTasks) * 100);

  const user: User = {
    ...baseUser,
    performance,
    tasksCompleted: completedTasks.length,
    tasksPending: pendingTasks.length,
    tasksBlocked: blockedTasks.length,
  };

  return user;
}
