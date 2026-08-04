import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, toggleTask, deleteTask, selectAllTasks, selectTasksStatus, selectTasksError } from '../features/tasks/tasksSlice';
import { selectTheme } from '../features/theme/themeSlice';
import TaskForm from './TaskForm';
import TaskCard from './TaskCard';
import Button from './Button';
import styles from './TaskBoard.module.css';

function TaskBoard() {
  const dispatch = useDispatch();
  const tasks = useSelector(selectAllTasks);
  const status = useSelector(selectTasksStatus);
  const error = useSelector(selectTasksError);
  const theme = useSelector(selectTheme);
  const [showCompleted, setShowCompleted] = useState(true);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks() as any);
    }
  }, [status, dispatch]);

  const visibleTasks = showCompleted
    ? tasks
    : tasks.filter((task) => !task.completed);

  if (status === 'loading') {
    return (
      <div className={`${styles.board} ${theme === 'dark' ? styles.dark : styles.light}`}>
        <p>Loading your tasks...</p>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className={`${styles.board} ${theme === 'dark' ? styles.dark : styles.light}`}>
        <p>Error loading tasks: {error}</p>
        <p>Make sure json-server is running (npm run server).</p>
      </div>
    );
  }

  return (
    <div className={`${styles.board} ${theme === 'dark' ? styles.dark : styles.light}`}>
      <div className={styles.header}>
        <h1>Task Board</h1>
      </div>

      <TaskForm />

      <Button
        label={showCompleted ? 'Hide Completed' : 'Show Completed'}
        onClick={() => setShowCompleted((prev) => !prev)}
      />

      <div className={styles.taskList}>
        {visibleTasks.length === 0 && (
          <p className={styles.emptyState}>No tasks yet — add one above!</p>
        )}

        {visibleTasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            text={task.text}
            completed={task.completed}
            priority={task.priority}
            onToggle={() => dispatch(toggleTask(task.id))}
            onDelete={() => dispatch(deleteTask(task.id))}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskBoard;