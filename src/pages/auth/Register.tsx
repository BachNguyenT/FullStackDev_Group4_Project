import RegisterImage from "@/assets/Pictures/RegisterImage.jpg";
import { Button } from "@/components/ui/components/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function Register() {

  // State variables for form inputs
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Validation states
  const [fullNameCheck, setNameCheck] = useState<string>("");
  const [emailCheck, setEmailCheck] = useState<string>("");
  const [phoneCheck, setPhoneCheck] = useState<string>("");
  const [birthdayCheck, setBirthdayCheck] = useState<string>("");
  const [usernameCheck, setUCheck] = useState<string>("");
  const [passwordCheck, setPCheck] = useState<string>("");
  const [confirmPasswordCheck, setCPCheck] = useState<string>("");
  const [checkboxCheck, setCheckboxCheck] = useState<string>("");
  // Error and loading states
  const [error, setError] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  function handleRegister() {
    // Handle registration logic here
    setLoading(true); // Show loading state
    setError(""); // Clear previous errors
    setNameCheck(""); // Clear previous name errors
    setEmailCheck(""); // Clear previous email errors
    setPhoneCheck(""); // Clear previous phone errors
    setBirthdayCheck(""); // Clear previous birthday errors
    setUCheck(""); // Clear previous username errors
    setPCheck(""); // Clear previous password errors
    setCPCheck(""); // Clear previous confirm password errors

    let check: Boolean = true;
    if (fullName.length == 0) {
      setNameCheck("Full name is required");
      check = false;
    }
    if (email.length == 0) {

      setEmailCheck("Email is required");
      check = false;
    }
    if (phone.length == 0) {
      setPhoneCheck("Phone number is required");
      check = false;
    }
    if (birthday.length == 0) {
      setBirthdayCheck("Birthday is required");
      check = false;
    }
    if (username.length == 0) {
      setUCheck("Username is required");
      check = false;
    }
    if (password.length == 0) {
      setPCheck("Password is required");
      check = false;
    }
    if (confirmPassword.length == 0) {
      setPCheck("Confirm Password is required");
      check = false;
    }
    if (password !== confirmPassword) {
      setPCheck("Passwords do not match");
      check = false;
    }
    if (checkboxCheck.length == 0) {
      setCheckboxCheck("Please agree to the terms and conditions");
      check = false;
    }


    if (check) {
      fetch("http://localhost:3000/register-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "key": "5MLGUGJL4GMe86pG4CfrE241BxDYxkeI"
        },
        credentials: "include",
        body: JSON.stringify({
          fullName: fullName,
          email: email,
          phone: phone,
          birthday: birthday,
          username: username,
          password: password,
        }),
      })
        .then((response) => response.text())
        .then((result) => {
          if (result == "0x000") {
            navigate("/login");
          }
          else if (result == "0x001") {
            setError("Username already exists.");
            setLoading(false);
          }
          else if (result == "0x001") {
            setError("Email already exists.");
            setLoading(false);
          }
          else {
            setError("Service temporarily unavailable. Please try again later.");
            setLoading(false);
          }
        })
        .catch(() => {
          setError("Unexpected error occurred. Please try again later.");
          setLoading(false);
          return;
        });
    }
    else {
      setLoading(false);
      return;
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 to-purple-400 p-4">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl p-10 flex flex-col md:flex-row items-center">
        {/* Illustration Section */}
        <div className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
          <img
            src={RegisterImage}
            alt="Event Planning Illustration"
            className="max-w-full h-auto"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 px-4">
          <h1 className="text-4xl font-semibold text-center text-gray-700 mb-2">
            Plan<span className="text-purple-600 font-bold">Evnt</span>
          </h1>
          <h2 className="text-xl text-center text-gray-600 mb-8">Register</h2>

          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="flex flex-col">
                <label
                  htmlFor="fullName"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Full name
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={isLoading}
                />
                {fullNameCheck && <p className="text-red-500">{fullNameCheck}</p>}
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter email..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  disabled={isLoading}
                />
                {emailCheck && <p className="text-red-500">{emailCheck}</p>}
              </div>

              {/* Phone Number */}
              <div className="flex flex-col">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="text"
                  placeholder="Enter phone number..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  disabled={isLoading}
                />
                {phoneCheck && <p className="text-red-500">{phoneCheck}</p>}  
              </div>

              {/* Birthday */}
              <div className="flex flex-col">
                <label
                  htmlFor="birthday"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Birthday
                </label>
                <input
                  id="birthday"
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                  onChange={(e) => setBirthday(e.target.value)}
                  value={birthday}
                  disabled={isLoading}
                />
                {birthdayCheck && <p className="text-red-500">{birthdayCheck}</p>}
              </div>
            </div>

            {/* Username */}
            <div className="flex flex-col">
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username..."
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                disabled={isLoading}
              />
              {usernameCheck && <p className="text-red-500">{usernameCheck}</p>}
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password..."
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
              />
              {passwordCheck && <p className="text-red-500">{passwordCheck}</p>}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter your password..."
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                disabled={isLoading}
              />
              {confirmPasswordCheck && <p className="text-red-500">{confirmPasswordCheck}</p>}
            </div>
            {/* Checkbox Agreement */}
            <div className="flex items-center justify-center gap-2">
              <input
                id="terms"
                type="checkbox"
                className="accent-purple-500 w-4 h-4"
                onChange={(e) => {
                  if (e.target.checked) {
                    setCheckboxCheck("");
                  } else {
                    setCheckboxCheck("Please agree to the terms and conditions");
                  }
                }}
                disabled={isLoading}

              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                I agree to all the
                <Button to="/terms" variant = "link" className="text-purple-600 underline">
                  Private Policies
                </Button>
              </label>
            </div>
            {/* Submit Button */}
            <Button
            onClick={() => handleRegister()}
            disabled={isLoading}
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-full font-semibold transition"
            > 
            {isLoading ? "Registering..." : "Register"}
            </Button>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="text-center mt-4">
              <Button to ="/login" size="lg" variant="link" className="text-purple-500 hover:text-purple-600">
                Back to Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
