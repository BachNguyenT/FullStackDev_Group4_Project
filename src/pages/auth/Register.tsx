import AvatarIcon from "@/assets/Icons/avatar-placeholder.svg";
import { Button } from "@/components/ui/components/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import LogoText from "@/assets/Icons/plan-event-text.svg";
import userDummyPFP from "@/assets/Icons/avatar-placeholder.svg";

function Register() {
  // State variables for form inputs
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isTermsAgreed, setIsTermsAgreed] = useState<boolean>(false);
  const [image, setImage] = useState<string>(userDummyPFP);
  const imageRef = useRef<string>(userDummyPFP);

  // Validation states
  const [fullNameCheck, setNameCheck] = useState<string>("");
  const [emailCheck, setEmailCheck] = useState<string>("");
  const [phoneCheck, setPhoneCheck] = useState<string>("");
  const [birthdayCheck, setBirthdayCheck] = useState<string>("");
  const [usernameCheck, setUCheck] = useState<string>("");
  const [passwordCheck, setPCheck] = useState<string>("");
  const [confirmPasswordCheck, setCPCheck] = useState<string>("");
  const [termsError, setTermsError] = useState<string>("");

  // Error and loading states
  const [generalError, setGeneralError] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  //preview avatar
  const previewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      console.log(previewURL);
      imageRef.current = previewURL; 
      setImage(previewURL);
    }
  };

  useEffect(() => {
    return () => {
      if(imageRef.current !== userDummyPFP) {
        URL.revokeObjectURL(imageRef.current);
      }
    }
  },[]);

  function handleRegister() {
    setLoading(true);
    setGeneralError("");
    setNameCheck("");
    setEmailCheck("");
    setPhoneCheck("");
    setBirthdayCheck("");
    setUCheck("");
    setPCheck("");
    setCPCheck("");
    setTermsError("");

    let check = true;
    if (fullName.length === 0) {
      setNameCheck("Full name is required");
      check = false;
    }
    if (email.length === 0) {
      setEmailCheck("Email is required");
      check = false;
    }
    if (phone.length === 0) {
      setPhoneCheck("Phone number is required");
      check = false;
    }
    if (birthday.length === 0) {
      setBirthdayCheck("Birthday is required");
      check = false;
    }
    if (username.length === 0) {
      setUCheck("Username is required");
      check = false;
    }
    if (password.length === 0) {
      setPCheck("Password is required");
      check = false;
    }
    if (confirmPassword.length === 0) {
      setCPCheck("Confirm Password is required");
      check = false;
    }
    if (password !== confirmPassword) {
      setPCheck("Passwords do not match");
      check = false;
    }
    if (!isTermsAgreed) {
      setTermsError("Please agree to the terms and conditions");
      check = false;
    }

    if (check) {
      
      fetch(image)
      .then((response) => response.blob())
      .then((blob) => blob.arrayBuffer())
      .then((arrayBuffer) => {
        const byteArray = new Uint8Array(arrayBuffer);
        const hexString = Array.from(byteArray)
          .map((byte) => byte.toString(16).padStart(2, "0")) 
          .join("");
        return "\\x" + hexString;
      })
      .then((hexString) => {
        fetch("http://localhost:3000/register-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            key: "5MLGUGJL4GMe86pG4CfrE241BxDYxkeI",
          },
          credentials: "include",
          body: JSON.stringify({
            Name: fullName,
            PhoneNumber: phone,
            Email: email,
            Birthday: birthday,
            Username: username,
            Password: password,
            Pfp: (image == userDummyPFP) ? "" : hexString,
          }),
        })
          .then((response) => {
            return response
              .json()
              .then((data) => ({ status: response.status, data }));
          })
          .then(({ status, data }) => {
            if (status === 200 && data.success && data.code === "0x000") {
              navigate("/login");
            } else {
              // Handle specific errors
              if (status === 400 && data.code === "0x003") {
                if (data.error.includes("Phone number")) {
                  setPhoneCheck(data.error);
                } else if (data.error.includes("Email")) {
                  setEmailCheck(data.error);
                } else if (data.error.includes("Username")) {
                  setUCheck(data.error);
                }
              } else if (status === 400 && data.code === "0x001") {
                setGeneralError(data.error); // Missing fields
              } else if (status === 401 && data.code === "Ux001") {
                setGeneralError("Unauthorized API call");
              } else {
                setGeneralError(data.error || "An unexpected error occurred.");
              }
              setLoading(false);
            }
          })
          .catch((error) => {
            console.error("Fetch error:", error);
            setGeneralError("Failed to connect to the server.");
            setLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 to-purple-400 p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-10 flex flex-col md:flex-row items-center">
        <div className="w-full px-4">
          <img src={LogoText} alt="Logo" className="w-full h-10" />
          <h2 className="text-xl text-center text-gray-600 my-8">Register</h2>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
          >
            <div className="grid grid-cols-1 gap-4">
              {/* image */}
              <div className="flex flex-col">
                <div className="flex flex-col items-center space-y-3">
                  <input
                    id="avatar"
                    onChange={(e) => previewImage(e)}
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="shrink-full">
                    <img
                      src={typeof image === "string" ? image : AvatarIcon}
                      alt="Preview Image"
                      className="h-[150px] w-[150px] rounded-full object-cover text-center border border-gray-300"
                    />
                  </div>
                  <label
                    htmlFor="avatar"
                    className="h-[43px] rounded-md border border-gray-300 px-4 py-[11px] text-sm font-semibold hover:bg-purple-600 hover:text-white"
                  >
                    Upload avatar
                  </label>
                  <p className="flex items-start text-xs text-slate-400">
                    PNG or JPG, Below 2Mb
                  </p>
                </div>
              </div>
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={isLoading}
                />
                {fullNameCheck && (
                  <p className="text-red-500">{fullNameCheck}</p>
                )}
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                  onChange={(e) => setBirthday(e.target.value)}
                  value={birthday}
                  disabled={isLoading}
                />
                {birthdayCheck && (
                  <p className="text-red-500">{birthdayCheck}</p>
                )}
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  disabled={isLoading}
                />
                {usernameCheck && (
                  <p className="text-red-500">{usernameCheck}</p>
                )}
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  disabled={isLoading}
                />
                {passwordCheck && (
                  <p className="text-red-500">{passwordCheck}</p>
                )}
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  disabled={isLoading}
                />
                {confirmPasswordCheck && (
                  <p className="text-red-500">{confirmPasswordCheck}</p>
                )}
              </div>
            </div>

            {/* Checkbox Agreement */}
            <div className="flex items-center justify-center gap-2">
              <input
                id="terms"
                type="checkbox"
                className="accent-purple-500 w-4 h-4"
                checked={isTermsAgreed}
                onChange={(e) => setIsTermsAgreed(e.target.checked)}
                disabled={isLoading}
              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                I agree to all the
                <Button
                  to="/terms"
                  variant="link"
                  className="text-purple-600 underline"
                >
                  Private Policies
                </Button>
              </label>
            </div>
            {termsError && (
              <p className="text-red-500 text-center">{termsError}</p>
            )}

            {/* Submit Button */}
            <Button
              disabled={isLoading}
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-md font-semibold transition"
            >
              {isLoading ? "Registering..." : "Register"}
            </Button>

            {/* Display general error message */}
            {generalError && (
              <p className="text-red-500 text-center mt-2">{generalError}</p>
            )}

            <div className="text-center mt-4">
              <Button
                to="/login"
                size="lg"
                variant="link"
                className="text-purple-500 hover:text-purple-600"
              >
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
