export interface Task {
  id: number;
  text: string;
  completed: boolean;
  priority: 'Low' | 'Medium' | 'High';
}

export type TaskAction =
  | { type: 'ADD_TASK'; text: string; priority: 'Low' | 'Medium' | 'High' }
  | { type: 'TOGGLE_TASK'; id: number }
  | { type: 'DELETE_TASK'; id: number };

export function taskReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case 'ADD_TASK':
      return [
        ...state,
        { id: Date.now(), text: action.text, completed: false, priority: action.priority },
      ];
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