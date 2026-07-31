import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import TaskDetail from "./pages/TaskDetail";
import Navbar from "./components/Navbar";
import "./App.css";
import TaskBoard from "./components/TaskBoard";
import useTheme from "./context/theme";

function App() {
  const { theme } = useTheme();
  return (
    <BrowserRouter>
      <main className={theme}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<TaskBoard />} />
          <Route path="/tasks/:taskId" element={<TaskDetail />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
export default App;