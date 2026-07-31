import useTheme from '../context/theme';

function Dashboard() {
  const { theme } = useTheme();

  return (
    <div className={`dashboard ${theme}`}>
      <h2>Dashboard</h2>
      <p>Current Theme: {theme}</p>
    </div>
  );
}

export default Dashboard;