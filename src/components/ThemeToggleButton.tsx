import { useSelector, useDispatch } from 'react-redux';
import { selectTheme, toggleTheme } from '../features/theme/themeSlice';
import Button from './Button';

function ThemeToggleButton() {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  return <Button label="Toggle Theme" onClick={() => dispatch(toggleTheme())} />;
}

export default ThemeToggleButton;