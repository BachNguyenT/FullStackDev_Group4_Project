const loginUser = async (username: string, password: string) => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Invalid credentials");
      } else {
        throw new Error("An error occurred. Please try again.");
      }
    }

    const userData = await response.json();
    return userData; // Ensure this includes user details
  } catch (error) {
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export { loginUser };
//Replace '/api/login' with your actual backend login endpoint.
