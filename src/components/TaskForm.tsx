import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { taskSchema, type TaskFormData } from '../context/taskSchema';
import styles from './TaskForm.module.css';

interface TaskFormProps {
  onAddTask: (text: string, priority: 'Low' | 'Medium' | 'High') => void;
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
      // simulate a brief API delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      onAddTask(data.text, data.priority);
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