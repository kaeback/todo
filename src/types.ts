export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  createdAt: number;
}

export type Filter = 'all' | 'active' | 'completed';
export type Priority = 'low' | 'medium' | 'high';
