import "./App.css";
import { useTheme } from "./context/ThemeContext";
import ThemeToggleButton from "./components/ThemeToggleButton";
import UserCard from "./components/UserCard";
import type { UserCardProps } from "./components/UserCard";

const staticUsers: UserCardProps[] = [
  {
    username: "Abdallah Basem",
    role: "Frontend Developer",
  },
  {
    username: "Ahmed Hassan",
    role: "Backend Developer",
  },
];

function App() {
  const { theme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <h1>Our Team</h1>

      <ThemeToggleButton />

      <div className="users-container">
        {staticUsers.map((user) => (
          <UserCard
            key={user.username}
            {...user}
          />
        ))}
      </div>
    </div>
  );
}

export default App;