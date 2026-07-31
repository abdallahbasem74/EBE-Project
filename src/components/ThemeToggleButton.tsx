import { useTheme } from '../context/ThemeContext';
import Button from './Button';

function ThemeToggleButton() {
  const { toggleTheme } = useTheme();

  return <Button label="Toggle Theme" onClick={toggleTheme} />;
}

export default ThemeToggleButton;