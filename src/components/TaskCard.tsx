import Button from './Button';

interface TaskCardProps {
  text: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

function TaskCard({ text, completed, onToggle, onDelete }: TaskCardProps) {
  return (
    <div className="task-card">
      <input type="checkbox" checked={completed} onChange={onToggle} />
      <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>
        {text}
      </span>
      <Button label="Delete" onClick={onDelete} variant="danger" />
    </div>
  );
}

export default TaskCard;