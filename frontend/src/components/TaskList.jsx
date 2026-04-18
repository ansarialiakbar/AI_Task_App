export default function TaskList({ tasks }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-4">
        No tasks found
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div key={task._id} className="p-4 bg-white rounded shadow">
          <h3 className="font-bold text-lg">{task.title}</h3>

          <p>
            Status:{" "}
            <span
              className={`font-semibold ${
                task.status === "success"
                  ? "text-green-600"
                  : task.status === "failed"
                  ? "text-red-600"
                  : "text-yellow-600"
              }`}
            >
              {task.status}
            </span>
          </p>

          <p>
            Result:{" "}
            <span className="text-blue-600">
              {task.result || "—"}
            </span>
          </p>

          <p className="text-sm text-gray-500">
            {task.logs || "No logs yet"}
          </p>
        </div>
      ))}
    </div>
  );
}