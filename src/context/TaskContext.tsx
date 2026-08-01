import { createContext, useContext, useReducer, useEffect, useState, type ReactNode } from 'react';
import { taskReducer, type Task, type TaskAction } from './taskReducer';

interface TaskContextType {
  tasks: Task[];
  dispatch: React.Dispatch<TaskAction>;
  status: 'idle' | 'loading' | 'success' | 'error';
  error: string | null;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');

    fetch('http://localhost:3001/tasks')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Task[]) => {
        if (!cancelled) {
          dispatch({ type: 'SET_TASKS', tasks: data });
          setStatus('success');
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          setStatus('error');
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, dispatch, status, error }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}