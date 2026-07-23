import "./App.css";
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
  return (
    <div className="app">
      <h1>Our Team</h1>

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