import useTheme from '../context/theme';
import Button from './Button';

function ThemeToggleButton() {
  const { toggleTheme } = useTheme();

  return <Button label="Toggle Theme" onClick={toggleTheme} />;
}

export default ThemeToggleButton;