import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { taskSchema, type TaskFormData } from '../context/taskSchema';
import styles from './TaskForm.module.css';

interface TaskFormProps {
  onAddTask: (task: { id: number; text: string; completed: boolean; priority: 'Low' | 'Medium' | 'High' }) => void;
}

function TaskForm({ onAddTask }: TaskFormProps) {
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: { text: '', priority: 'Medium' },
  });

  const onSubmit = async (data: TaskFormData) => {
  setSubmissionStatus('submitting');
  try {
    const response = await fetch('http://localhost:3001/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: data.text,
        completed: false,
        priority: data.priority,
      }),
    });

    if (!response.ok) throw new Error('Failed to add task');

    const newTask = await response.json();
    onAddTask(newTask); // pass the whole server-created task, including its real id
    setSubmissionStatus('success');
    reset();
  } catch {
    setSubmissionStatus('error');
  }
};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.fieldGroup}>
        <input
          type="text"
          placeholder="Add a new task..."
          className={styles.input}
          {...register('text')}
        />
        {errors.text && <p className={styles.error}>{errors.text.message}</p>}
      </div>

      <div className={styles.fieldGroup}>
        <select className={styles.select} {...register('priority')}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        {errors.priority && <p className={styles.error}>{errors.priority.message}</p>}
      </div>

      <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
        {isSubmitting ? 'Adding...' : 'Add'}
      </button>

      {submissionStatus === 'error' && (
        <p className={styles.error}>Something went wrong. Try again.</p>
      )}
    </form>
  );
}

export default TaskForm;