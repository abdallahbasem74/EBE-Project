import { Link } from 'react-router-dom';
import Button from './Button';
import styles from './TaskCard.module.css';

interface TaskCardProps {
  id: number;
  text: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

function TaskCard({ id, text, completed, onToggle, onDelete }: TaskCardProps) {
  return (
    <div className={completed ? styles.completed : styles.card}>
      <input type="checkbox" checked={completed} onChange={onToggle} />
      <Link to={`/tasks/${id}`} className={completed ? styles.completedText : styles.text}>
        {text}
      </Link>
      <Button label="Delete" onClick={onDelete} variant="danger" />
    </div>
  );
}

export default TaskCard;