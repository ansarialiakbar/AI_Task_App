import { useContext, useEffect, useState } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const {token} = useContext(AuthContext);
  const navigate = useNavigate();

  //  Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  // Load tasks on page load
useEffect(() => {
  if (!token) {
    navigate("/login");
    return;
  }
  fetchTasks();

  const interval = setInterval(fetchTasks, 3000); // polling
  return () => clearInterval(interval);
}, [token]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="p-6 max-w-3xl mx-auto">
        {/*  Pass refresh function */}
        <TaskForm refresh={fetchTasks} />

        {/*  Pass tasks as props */}
        <TaskList tasks={tasks} />
      </div>
    </div>
  );
}