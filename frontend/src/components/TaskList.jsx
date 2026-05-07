export default function TaskList({ tasks }) {

  if (!tasks || tasks.length === 0) {
    return (
      <div className="hero bg-base-200 rounded-2xl py-12">
        <div className="hero-content text-center">
          <div>
            <h2 className="text-3xl font-bold mb-2">
              No Tasks Found 📋
            </h2>

            <p className="text-base-content/70">
              Create your first AI task to get started.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">

      {tasks.map((task) => (
        <div
          key={task._id}
          className="card bg-base-100 shadow-lg border border-base-200 hover:shadow-2xl transition-all duration-300"
        >

          <div className="card-body">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

              <div>
                <h2 className="card-title text-2xl">
                  {task.title}
                </h2>

                <p className="text-sm text-base-content/60">
                  AI Task Processing
                </p>
              </div>

              {/* Status Badge */}
              <div>
                {task.status === "success" && (
                  <div className="badge badge-success badge-lg gap-2">
                    ✅ Success
                  </div>
                )}

                {task.status === "failed" && (
                  <div className="badge badge-error badge-lg gap-2">
                    ❌ Failed
                  </div>
                )}

                {task.status !== "success" &&
                  task.status !== "failed" && (
                    <div className="badge badge-warning badge-lg gap-2">
                      ⏳ Pending
                    </div>
                  )}
              </div>
            </div>

            {/* Divider */}
            <div className="divider my-1"></div>

            {/* Result Section */}
            <div>
              <h3 className="font-semibold mb-2 text-lg">
                Result
              </h3>

              <div className="bg-base-200 rounded-xl p-4 break-words">
                <p className="text-primary font-medium">
                  {task.result || "No result available"}
                </p>
              </div>
            </div>

            {/* Logs Section */}
            <div>
              <h3 className="font-semibold mb-2 text-lg">
                Logs
              </h3>

              <div className="mockup-code text-sm">
                <pre>
                  <code>
                    {task.logs || "No logs yet"}
                  </code>
                </pre>
              </div>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}