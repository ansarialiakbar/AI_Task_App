import { useState } from "react";
import API from "../api/axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/auth/register", { email, password });
    alert("Registered successfully");
    window.location.href = "/login";
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="bg-white p-6 rounded shadow-md w-80" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">Register</h2>

        <input className="w-full p-2 border mb-3 rounded" placeholder="Email"
          onChange={(e) => setEmail(e.target.value)} />

        <input type="password" className="w-full p-2 border mb-3 rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} />

        <button className="w-full bg-green-500 text-white py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}