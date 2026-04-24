import { LucideIcon } from 'lucide-react-native';

export interface User {
  id: string;
  roleId: string;
  name: string;
  email: string;
  role: string;
  performance: number;
  tasksCompleted: number;
  tasksPending: number;
  tasksBlocked: number;
}

export interface Stat {
  label: string;
  value: number;
  icon: LucideIcon;
  color: string;
  bg: string;
}
