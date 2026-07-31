import { useReducer, useState } from 'react';
import { taskReducer } from '../context/taskReducer';
import { useTheme } from '../context/ThemeContext';
import TaskForm from './TaskForm';
import TaskCard from './TaskCard';
import ThemeToggleButton from './ThemeToggleButton';
import Button from './Button';
import styles from './TaskBoard.module.css';

function TaskBoard() {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [showCompleted, setShowCompleted] = useState(true);
  const { theme } = useTheme();

  const visibleTasks = showCompleted
    ? tasks
    : tasks.filter((task) => !task.completed);

  return (
    <div className={`${styles.board} ${theme === 'dark' ? styles.dark : styles.light}`}>
      <div className={styles.header}>
        <h1>Task Board</h1>
        <ThemeToggleButton />
      </div>

      <TaskForm onAddTask={(text) => dispatch({ type: 'ADD_TASK', text })} />

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
            text={task.text}
            completed={task.completed}
            onToggle={() => dispatch({ type: 'TOGGLE_TASK', id: task.id })}
            onDelete={() => dispatch({ type: 'DELETE_TASK', id: task.id })}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskBoard;