// src/Login.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/general/Button";
import LoginImage from "@/assets/Pictures/LoginImage.png";
const LOGIN_SUCCESS_TARGET = "/workspace"; // Define the target URL for successful login\
const ADMIN_SUCCESS_TARGET = "/admin"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";


function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usernameCheck, setUCheck] = useState<string>("");
  const [passwordCheck, setPCheck] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // Validate input fields
  const validateUsername = (value: string) => {
    if (value.length === 0) return "Username is required";
    return "";
  };
  const validatePassword = (value: string): string => {
    if (value.length === 0) return "Password is required";
    return "";
  };

  const handleUsernameChange = (value: string) => {
    setUsername(value);
    if (value.length > 0) {
      setUCheck("");
    }
  }
  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (value.length > 0) {
      setPCheck("");
    }
  };
  // Handle blur events for validation
  const handleUsernameBlur = () => {
    setUCheck(validateUsername(username));
  };

  const handlePasswordBlur = () => {
    setPCheck(validatePassword(password));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) {
      handleLogin();
    }
  };
  async function handleLogin() {
    // Clear error messages
    setLoading(true);
    setError("");
    setUCheck("");
    setPCheck("");

    // Front-end validation
    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);

    if (usernameError || passwordError) {
      setUCheck(usernameError);
      setPCheck(passwordError);
      setLoading(false);
      return;
    }

    // Call API if front end validation passed
    try {
      const authRequestResponse = await fetch(
        "http://localhost:3000/user-account/authenticate-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );

      // Handle response
      if (authRequestResponse.status == 200) {
        const data = await authRequestResponse.json();
        if (data.type === "Admin") {
          navigate(ADMIN_SUCCESS_TARGET); // admin dashboard
        } else {
          navigate(LOGIN_SUCCESS_TARGET); // default user dashboard
        }

      } else if (authRequestResponse.status == 401) {
        setError("Invalid username or password.");
        setLoading(false);
      } else {
        setError("Service temporarily unavailable. Please try again later.");
        setLoading(false);
      }
    } catch {
      // Handle API fetch error
      setError("Service temporarily unavailable. Please try again later.");
      setLoading(false);
    }
  }

  useEffect(() => {
    async function verifySession() {
      setLoading(true);

      try {
        // First, check if the session belongs to an admin
        const adminResponse = await fetch("http://localhost:3000/user-account/verify-admin-session", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (adminResponse.status === 200) {
          const resultCode = await adminResponse.text();
          if (resultCode === "0x000") {
            navigate(ADMIN_SUCCESS_TARGET); // Redirect to admin UI
            return;
          }
        }

        // If not an admin, check for a regular user session
        const userResponse = await fetch("http://localhost:3000/user-account/verify-session", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (userResponse.status === 200) {
          const resultCode = await userResponse.text();
          if (resultCode === "0x000") {
            navigate(LOGIN_SUCCESS_TARGET); // Redirect to user UI
            return;
          }
        }

        setLoading(false); // No valid session found
      } catch {
        setLoading(false); // Handle API fetch error
      }
    }

    verifySession();
  }, [navigate]);

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
            onChange={(e) => handleUsernameChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleUsernameBlur}
            className={`mb-2 p-3 w-full rounded-full bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400 ${usernameCheck ? "ring-2 ring-red-400" : ""
              }`}
            aria-label="Username"
            aria-invalid={!!usernameCheck}
            aria-describedby={usernameCheck ? "username-error" : undefined}
            disabled={isLoading}
          />
          {usernameCheck && (
            <p
              id="username-error"
              className="ml-4 mb-2 text-sm text-red-600 flex items-center animate-fade-in"
              aria-live="polite"
            >
              <FontAwesomeIcon
                icon={faExclamationTriangle}
                className="mr-2 text-red-600"
              />
              {usernameCheck}
            </p>
          )}

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handlePasswordBlur}
            className={`mb-2 p-3 w-full rounded-full bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-400 ${passwordCheck ? "ring-2 ring-red-400" : ""
              }`}
            aria-label="Password"
            aria-invalid={!!passwordCheck}
            aria-describedby={passwordCheck ? "password-error" : undefined}
            disabled={isLoading}
          />
          {passwordCheck && (
            <p
              id="password-error"
              className="ml-4 mb-2 text-sm text-red-600 flex items-center animate-fade-in"
              aria-live="polite"
            >
              <FontAwesomeIcon
                icon={faExclamationTriangle}
                className="mr-2 text-red-600"
              />
              {passwordCheck}
            </p>
          )}
          <Button
            variant="link"
            to="/forgot-password"
            className="w-full justify-end text-sm text-purple-500"
            disabled={isLoading}
            animated={false}
          >
            Forgot password?
          </Button>

          <Button
            onClick={handleLogin}
            className="bg-purple-500 text-white py-2 rounded-full mb-2 hover:bg-purple-600 transition"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </Button>

          {error && (
            <p
              className="text-sm text-red-600 flex items-center animate-fade-in mb-2"
              aria-live="polite"
            >
              <FontAwesomeIcon
                icon={faExclamationTriangle}
                className="mr-2 text-red-600"
              />
              {error}
            </p>
          )}

          <Button
            onClick={() => navigate("/register")}
            className="border border-purple-500 text-white py-2 rounded-full"
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
