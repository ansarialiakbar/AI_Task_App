import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useContext(AuthContext);

  return (
    <div className="navbar bg-base-100 shadow-lg px-6 sticky top-0 z-50">

      {/* Left */}
      <div className="flex-1">
        <Link
          to="/"
          className="text-2xl font-bold text-primary tracking-wide"
        >
          🚀 AI Task App
        </Link>
      </div>

      {/* Center */}
      <div className="hidden md:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <Link className="font-medium">Dashboard</Link>
          </li>

          <li>
            <Link className="font-medium">Tasks</Link>
          </li>
        </ul>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">

        {/* User Avatar */}
        <div className="avatar placeholder hidden sm:flex">
          <div className="bg-primary text-primary-content rounded-full w-10">
            <span className="text-sm font-bold">A</span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="btn btn-primary btn-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
}