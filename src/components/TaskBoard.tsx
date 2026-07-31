import { useReducer } from 'react';
import { taskReducer } from '../context/taskReducer';
import { useTheme } from '../context/ThemeContext';
import TaskForm from './TaskForm';
import TaskCard from './TaskCard';
import ThemeToggleButton from './ThemeToggleButton';

function TaskBoard() {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const { theme } = useTheme();

  return (
    <div className={`task-board ${theme}`}>
      <div className="task-board-header">
        <h1>Task Board</h1>
        <ThemeToggleButton />
      </div>

      <TaskForm onAddTask={(text) => dispatch({ type: 'ADD_TASK', text })} />

      <div className="task-list">
        {tasks.map((task) => (
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