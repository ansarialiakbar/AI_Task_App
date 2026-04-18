import { useState } from "react";
import API from "../api/axios";

export default function TaskForm({ refresh }) {
  const [title, setTitle] = useState("");
  const [input, setInput] = useState("");
  const [operation, setOperation] = useState("uppercase");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/tasks", { title, input, operation });

      setTitle("");
      setInput("");

      // ✅ Call refresh only if exists
      if (refresh) refresh();

    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  return (
    <form className="bg-white p-4 rounded shadow mb-4" onSubmit={handleSubmit}>
      <input
        className="w-full p-2 border mb-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full p-2 border mb-2"
        placeholder="Input text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <select
        className="w-full p-2 border mb-2"
        value={operation}
        onChange={(e) => setOperation(e.target.value)}
      >
        <option value="uppercase">Uppercase</option>
        <option value="lowercase">Lowercase</option>
        <option value="reverse">Reverse</option>
        <option value="wordcount">Word Count</option>
      </select>

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Run Task
      </button>
    </form>
  );
}