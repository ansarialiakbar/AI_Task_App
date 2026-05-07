import { useState } from "react";
import API from "../api/axios";

export default function TaskForm({ refresh }) {
  const [title, setTitle] = useState("");
  const [input, setInput] = useState("");
  const [operation, setOperation] = useState("uppercase");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/tasks", {
        title,
        input,
        operation,
      });

      setTitle("");
      setInput("");
      setOperation("uppercase");

      if (refresh) refresh();

    } catch (err) {
      console.error("Error creating task:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >

      {/* Title */}
      <div>
        <label className="label">
          <span className="label-text font-medium">
            Task Title
          </span>
        </label>

        <input
          type="text"
          placeholder="Enter task title..."
          className="input input-bordered w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      {/* Input Text */}
      <div>
        <label className="label">
          <span className="label-text font-medium">
            Input Text
          </span>
        </label>

        <textarea
          placeholder="Enter your text here..."
          className="textarea textarea-bordered w-full h-32 resize-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />
      </div>

      {/* Operation */}
      <div>
        <label className="label">
          <span className="label-text font-medium">
            Select Operation
          </span>
        </label>

        <select
          className="select select-bordered w-full"
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
        >
          <option value="uppercase">
            🔠 Uppercase
          </option>

          <option value="lowercase">
            🔡 Lowercase
          </option>

          <option value="reverse">
            🔄 Reverse Text
          </option>

          <option value="wordcount">
            📊 Word Count
          </option>
        </select>
      </div>

      {/* Info Alert */}
      <div className="alert alert-info">
        <span>
          AI will process your text based on the selected operation.
        </span>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`btn btn-primary w-full ${
          loading ? "btn-disabled" : ""
        }`}
      >
        {loading ? (
          <>
            <span className="loading loading-spinner loading-sm"></span>
            Processing...
          </>
        ) : (
          "🚀 Run Task"
        )}
      </button>
    </form>
  );
}