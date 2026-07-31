import Button from './Button';
import styles from './TaskCard.module.css';

interface TaskCardProps {
  text: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

function TaskCard({ text, completed, onToggle, onDelete }: TaskCardProps) {
  return (
    <div className={completed ? styles.completed : styles.card}>
      <input type="checkbox" checked={completed} onChange={onToggle} />
      <span className={completed ? styles.completedText : styles.text}>
        {text}
      </span>
      <Button label="Delete" onClick={onDelete} variant="danger" />
    </div>
  );
}

export default TaskCard;