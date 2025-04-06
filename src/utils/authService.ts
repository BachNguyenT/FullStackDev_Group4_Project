import { loginUser } from "@/lib/api";

export const handleLogin = async (username: string, password: string) => {
  try {
    const user = await loginUser(username, password);
    
    // Optionally store token in localStorage
    if (user.token) {
      localStorage.setItem("token", user.token);
    }
    
    return user;
  } catch (err) {
    // Handle different types of errors
    if (err.message === "Invalid credentials") {
      throw new Error("Invalid email or password");
    } else {
      throw new Error("An error occurred. Please try again.");
    }
  }
};