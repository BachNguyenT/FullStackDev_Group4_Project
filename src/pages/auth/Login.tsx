// src/Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks"; 
import {Button} from "@/components/ui/components/Button";
import LoginImage from "@/assets/Pictures/LoginImage.png";

function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error message
    setLoading(true); // Set loading state

    try {
      await login(username, password);
      navigate("/home"); // Redirect to home page on successful login
    } catch (err) {
      setError("Invalid username or password"); // Set error message on failure
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-400 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-10 flex w-[800px]">
        <div className="w-1/2 flex items-center justify-center">
          <img
            src={LoginImage}
            alt="Event Planning Illustration"
            className="w-64 h-64 object-contain"
          />
        </div>
        <div className="w-1/2 flex flex-col justify-center">
          <h1 className="text-3xl font-light text-gray-700">
            Plan<span className="font-semibold text-purple-600">Evnt</span>
          </h1>
          <p className="text-purple-600 mt-4 mb-6 text-lg font-medium">Login</p>
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4 p-3 w-full rounded-full bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
            aria-label="Username"
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 w-full rounded-full bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
            aria-label="Password"
          />
          <Button variant="link" className = "w-full justify-end text-sm text-purple-500 " animated = {false}>
            Forgot password?
          </Button>
          <button
            onClick={handleSubmit}
            className="bg-purple-500 text-white py-2 rounded-full mb-4 hover:bg-purple-600 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <p>{error}</p>}
          <Button
            to="/register"
            className="border border-purple-500 text-purple-500 py-2 rounded-full"
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;