import { Link } from "react-router-dom";
import styles from "./Navbar.module.css"
import ThemeToggleButton from "./ThemeToggleButton";

export default function Navbar() {
  return <nav className={styles.navbar}>
    <div className={styles.sideContainer}>
        <Link to="/" className={styles.logo}>EBE PROJECT</Link>
    </div>
    <div className={styles.gap}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/tasks">Task Board</Link>
    </div>
    <div className={styles.sideContainer}>
        <ThemeToggleButton />
    </div>
  </nav>;
}
