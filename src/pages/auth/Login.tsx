// src/Login.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/components/Button";
import LoginImage from "@/assets/Pictures/LoginImage.png";
const LOGIN_SUCCESS_TARGET = "/workspace"; // Define the target URL for successful login

function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usernameCheck, setUCheck] = useState<string>("");
  const [passwordCheck, setPCheck] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  async function handleLogin() {
    // Clear error messages
    setLoading(true); 
    setError(""); 
    setUCheck(""); 
    setPCheck(""); 

    // Front-end validation
    let check: Boolean = true;
    if (username.length == 0) {
      setUCheck("Username is required");
      check = false;
    }

    if (password.length == 0) {
      setPCheck("Password is required");
      check = false;
    }

    if (check) {
      // Call API if front end validation passed
      try {
        let authRequestResponse = await fetch("http://localhost:3000/authenticate-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });
        
        // Handle response
        if (authRequestResponse.status == 200) {
          navigate(LOGIN_SUCCESS_TARGET);
        }
        else if (authRequestResponse.status == 401) {
          setError("Invalid username or password.");
              setLoading(false);
        }
        else {
          setError("Service temporarily unavailable. Please try again later.");
          setLoading(false);
        }
      }
      catch {
        // Handle API fetch error
        setError("Service temporarily unavailable. Please try again later.");
        setLoading(false);
      }
    } else {
      // Handle front-end validation error
      setLoading(false);
      return;
    }
  }

  async function checkSession() {
    setLoading(true);
    
    // Call API
    try {
      let checkRequestResponse = await fetch("http://localhost:3000/verify-session", {
        method: "GET",
        credentials: "include", 
        headers: {
          "Content-Type": "application/json",
          key: "5MLGUGJL4GMe86pG4CfrE241BxDYxkeI",
        },
      });

      // Handle response
      if (checkRequestResponse.status == 200) {
        let resultCode = await checkRequestResponse.text();
        if (resultCode === "0x000") {
          navigate(LOGIN_SUCCESS_TARGET);
          return;
        } else if (resultCode === "0x001") {
          setLoading(false); 
          return;
        } else {
          setLoading(false); 
          return;
        }
      } 
      else {
        setLoading(false);
        return; 
      }
    } 
    catch {
      // Handle API fetch error
      setLoading(false);
      return;
    } 
  }

  useEffect(() => {
    checkSession();
  }, []);

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
            disabled={isLoading}
          />

          {usernameCheck && <p>{usernameCheck}</p>}

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 w-full rounded-full bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
            aria-label="Password"
            disabled={isLoading}
          />

          {passwordCheck && <p>{passwordCheck}</p>}

          <Button
            variant="link"
            className="w-full justify-end text-sm text-purple-500"
            disabled={isLoading}
            animated={false}
          >
            Forgot password?
          </Button>

          <Button
            onClick={() => handleLogin()}
            className="bg-purple-500 text-white py-2 rounded-full mb-4 hover:bg-purple-600 transition"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </Button>

          {error && <p>{error}</p>}

          <Button
            onClick={() => navigate("/register")}
            className="border border-purple-500 text-purple-500 py-2 rounded-full"
            disabled={isLoading}
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
