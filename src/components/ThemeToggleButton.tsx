import { useTheme } from '../context/ThemeContext';

function ThemeToggleButton() {
  const { toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Toggle Theme
    </button>
  );
}

export default ThemeToggleButton;