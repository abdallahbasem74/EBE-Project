import { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import useTheme from '../context/theme';
import TaskForm from './TaskForm';
import TaskCard from './TaskCard';
import Button from './Button';
import styles from './TaskBoard.module.css';

function TaskBoard() {
  const { tasks, dispatch, status, error } = useTasks();
  const [showCompleted, setShowCompleted] = useState(true);
  const { theme } = useTheme();

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

  if (status === 'error') {
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

<TaskForm onAddTask={(task) => dispatch({ type: 'ADD_TASK', task })} />
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
            onToggle={() => dispatch({ type: 'TOGGLE_TASK', id: task.id })}
            onDelete={() => dispatch({ type: 'DELETE_TASK', id: task.id })}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskBoard; 