export interface UserCardProps {
  username: string;
  role: string;
}

export default function UserCard({
  username,
  role,
}: UserCardProps) {
  return (
    <div className="user-card">
      <p>Hello {username}</p>
      <p>Your Role: {role}</p>
    </div>
  );
}