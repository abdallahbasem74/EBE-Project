import { useState } from 'react';
import Button from './Button';

interface TaskFormProps {
  onAddTask: (text: string) => void;
}

function TaskForm({ onAddTask }: TaskFormProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTask(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
      />
      <Button label="Add" onClick={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)} />
    </form>
  );
}

export default TaskForm;