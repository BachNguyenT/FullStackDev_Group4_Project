// src/Login.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import LoginImage from "@/assets/Pictures/LoginImage.png"
//  interface LoginProps {}

interface APIResponse {
  message: string;
}

//  function Login({}: LoginProps) {
function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const userData = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data: APIResponse = await response.json();

      if (response.ok) {
        // Handle successful login
        console.log("Login successful:", data);
        // Redirect or update state as needed
      } else {
        // Handle login error
        console.error("Login failed:", data.message);
        alert("Login failed: " + data.message);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-400 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-10 flex w-[800px]">
        {/* Illustration Section */}
        <div className="w-1/2 flex items-center justify-center">
          <img
            src={LoginImage} // Replace with your local or online image path
            alt="Event Planning Illustration"
            className="w-64 h-64 object-contain"
          />
        </div>

        {/* Form Section */}
        <div className="w-1/2 flex flex-col justify-center">
          <h1 className="text-3xl font-light text-gray-700">
            Plan<span className="font-semibold text-purple-600">Evnt</span>
          </h1>

          <p className="text-purple-600 mt-4 mb-6 text-lg font-medium">Login</p>

          <input
            type="text"
            placeholder="Enter Username"
            className="mb-4 p-3 w-full rounded-full bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <div className="relative mb-4">
            <input
              type="password"
              placeholder="Enter Password"
              className="p-3 w-full rounded-full bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer">
              👁️
            </span>
          </div>

          <div className="text-right text-sm text-purple-500 mb-4 cursor-pointer hover:underline">
            Forgot password?
          </div>

          <button className="bg-purple-500 text-white py-2 rounded-full mb-4 hover:bg-purple-600 transition">
            Login
          </button>

          <button className="border border-purple-500 text-purple-500 py-2 rounded-full hover:bg-purple-50 transition">
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
