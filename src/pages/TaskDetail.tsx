import { useParams, Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

export default function TaskDetail() {
  const { taskId } = useParams();
  const { tasks } = useTasks();

  const task = tasks.find((t) => t.id === Number(taskId));

  if (!task) {
    return (
      <div>
        <h2>Task not found</h2>
        <Link to="/">Back to Board</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Task Details</h2>
      <p>Text: {task.text}</p>
      <p>Status: {task.completed ? 'Completed' : 'Not completed'}</p>
      <Link to="/">Back to Board</Link>
    </div>
  );
}