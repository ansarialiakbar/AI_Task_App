import { useContext, useEffect, useState } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchTasks();

    const interval = setInterval(fetchTasks, 3000);

    return () => clearInterval(interval);
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      
      {/* Navbar */}
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Header Section */}
        <div className="hero rounded-3xl bg-base-100 shadow-xl mb-8">
          <div className="hero-content text-center py-10">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">
                Task Dashboard 🚀
              </h1>

              <p className="py-3 text-base-content/70 max-w-xl">
                Organize your daily tasks, stay productive, and manage your work efficiently.
              </p>

              <div className="stats shadow mt-4">
                <div className="stat place-items-center">
                  <div className="stat-title">Total Tasks</div>
                  <div className="stat-value text-primary">
                    {tasks.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Task Form */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                
                <h2 className="card-title text-2xl mb-2">
                  Add New Task
                </h2>

                <p className="text-sm text-base-content/70 mb-4">
                  Create and manage your tasks easily.
                </p>

                <TaskForm refresh={fetchTasks} />
              </div>
            </div>
          </div>

          {/* Task List */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-xl min-h-full">
              <div className="card-body">

                <div className="flex items-center justify-between mb-4">
                  <h2 className="card-title text-2xl">
                    Your Tasks
                  </h2>

                  <div className="badge badge-primary badge-lg">
                    {tasks.length} Tasks
                  </div>
                </div>

                {loading ? (
                  <div className="flex justify-center py-10">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                  </div>
                ) : tasks.length === 0 ? (
                  <div className="text-center py-16">
                    <h3 className="text-2xl font-semibold mb-2">
                      No Tasks Yet 📋
                    </h3>

                    <p className="text-base-content/60">
                      Add your first task to get started.
                    </p>
                  </div>
                ) : (
                  <TaskList tasks={tasks} />
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}