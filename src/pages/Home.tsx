import TaskBoard from '../components/TaskBoard';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.welcome}>
        <h1>Welcome to EBE Project</h1>
        <p>Organize your day, one task at a time.</p>
      </div>

      <TaskBoard />
    </div>
  );
}