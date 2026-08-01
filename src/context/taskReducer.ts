export interface Task {
  id: number;
  text: string;
  completed: boolean;
  priority: 'Low' | 'Medium' | 'High';
}

export type TaskAction =
  | { type: 'SET_TASKS'; tasks: Task[] }
  | { type: 'ADD_TASK'; task: Task }
  | { type: 'TOGGLE_TASK'; id: number }
  | { type: 'DELETE_TASK'; id: number };

export function taskReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case 'SET_TASKS':
      return action.tasks;
    case 'ADD_TASK':
      return [...state, action.task];
    case 'TOGGLE_TASK':
      return state.map((t) =>
        t.id === action.id ? { ...t, completed: !t.completed } : t
      );
    case 'DELETE_TASK':
      return state.filter((t) => t.id !== action.id);
    default:
      return state;
  }
}