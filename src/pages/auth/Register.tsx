import AvatarIcon from "@/assets/Icons/avatar-placeholder.svg";
import { Button } from "@/components/general/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import LogoText from "@/assets/Icons/plan-event-text.svg";
import userDummyPFP from "@/assets/Icons/avatar-placeholder.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

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
  const [termsCheck, setTermsCheck] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  // Navigation hook
  const navigate = useNavigate();

  // Validate input fields
  const validateFullName = (value: string) => {
    if (value.length === 0) return "Full name is required";
    if (!/^[a-zA-Z\s]{2,}$/.test(value)) return "Invalid name format";
    return "";
  };

  const validateEmail = (value: string) => {
    if (value.length === 0) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email format";
    return "";
  };

  const validatePhone = (value: string) => {
    if (value.length === 0) return "Phone number is required";
    if (!/^\+?\d{10,}$/.test(value)) return "Invalid phone number format";
    return "";
  };

  const validateBirthday = (value: string) => {
    if (value.length === 0) return "Birthday is required";
    const today = new Date();
    const birthDate = new Date(value);
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 13) return "You must be at least 13 years old";
    return "";
  };

  const validateUsername = (value: string) => {
    if (value.length === 0) return "Username is required";
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(value))
      return "Username must be 3-20 characters, letters, numbers, or underscores";
    return "";
  };

  const validatePassword = (value: string) => {
    if (value.length === 0) return "Password is required";
    if (value.length < 8) return "Password must be at least 8 characters";
    return "";
  };

  const validateConfirmPassword = (value: string) => {
    if (value.length === 0) return "Confirm Password is required";
    if (value !== password) return "Passwords do not match";
    return "";
  };

  const validateTerms = (value: boolean) => {
    if (!value) return "Please agree to the terms and conditions";
    return "";
  };

  // Input change handlers
  const handleFullNameChange = (value: string) => {
    setFullName(value);
    setNameCheck("");
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setEmailCheck("");
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    setPhoneCheck("");
  };

  const handleBirthdayChange = (value: string) => {
    setBirthday(value);
    setBirthdayCheck("");
  };

  const handleUsernameChange = (value: string) => {
    setUsername(value);
    setUCheck("");
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPCheck("");
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    setCPCheck("");
  };

  // Blur handlers
  const handleFullNameBlur = () => {
    setNameCheck(validateFullName(fullName));
  };

  const handleEmailBlur = () => {
    setEmailCheck(validateEmail(email));
  };

  const handlePhoneBlur = () => {
    setPhoneCheck(validatePhone(phone));
  };

  const handleBirthdayBlur = () => {
    setBirthdayCheck(validateBirthday(birthday));
  };

  const handleUsernameBlur = () => {
    setUCheck(validateUsername(username));
  };

  const handlePasswordBlur = () => {
    setPCheck(validatePassword(password));
  };

  const handleConfirmPasswordBlur = () => {
    setCPCheck(validateConfirmPassword(confirmPassword));
  };

  const handleTermsBlur = () => {
    setTermsCheck(validateTerms(isTermsAgreed));
  };

  function handleSetImage(file: File | undefined) {
    if (file) {
      const validTypes = ["image/png", "image/jpeg"];
      if (!validTypes.includes(file.type)) {
        setErrorMessage("Invalid file type. Please upload a PNG or JPEG image.");
        return;
      }

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        setErrorMessage("File size must be smaller than 5MB.");
        return;
      }

      if (image !== userDummyPFP) {
        URL.revokeObjectURL(imageRef.current);
      }
      const previewURL = URL.createObjectURL(file);
      imageRef.current = previewURL;
      setImage(previewURL);
    }
  }

  useEffect(() => {
    return () => {
      if (imageRef.current !== userDummyPFP) {
        URL.revokeObjectURL(imageRef.current);
      }
    };
  }, []);


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) =>{
    if(e.key === "Enter" && !isLoading){
        handleRegister();
    }
  }

  async function handleRegister() {
    setLoading(true);
    setErrorMessage("");
    setNameCheck("");
    setEmailCheck("");
    setPhoneCheck("");
    setBirthdayCheck("");
    setUCheck("");
    setPCheck("");
    setCPCheck("");
    setTermsCheck("");

    // Front-end validation
    const fullNameError = validateFullName(fullName);
    const emailError = validateEmail(email);
    const phoneError = validatePhone(phone);
    const birthdayError = validateBirthday(birthday);
    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);
    const confirmPasswordError = validateConfirmPassword(confirmPassword);
    const termsError = validateTerms(isTermsAgreed);

    if (
      fullNameError ||
      emailError ||
      phoneError ||
      birthdayError ||
      usernameError ||
      passwordError ||
      confirmPasswordError ||
      termsError
    ) {
      setNameCheck(fullNameError);
      setEmailCheck(emailError);
      setPhoneCheck(phoneError);
      setBirthdayCheck(birthdayError);
      setUCheck(usernameError);
      setPCheck(passwordError);
      setCPCheck(confirmPasswordError);
      setTermsCheck(termsError);
      setLoading(false);
      return;
    }

    try {
      const getImage = await fetch(image);
      const imageBlob = await getImage.blob();
      const imageArrayBuffer = await imageBlob.arrayBuffer();
      const imageByteArray = new Uint8Array(imageArrayBuffer);
      const imageHexString = Array.from(imageByteArray)
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");

      const registerResult = await fetch(
        "http://localhost:3000/register-user",
        {
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
            Pfp: image == userDummyPFP ? "" : "\\x" + imageHexString,
          }),
        }
      );

      if (registerResult.ok) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        if (registerResult.status === 422) {
          const verificationResult = await registerResult.json();
          // verificationResult is an array: [phoneStatus, emailStatus, usernameStatus]
          // 0x001 means field is taken, 0x002 means field is available
          if (verificationResult[0] === "0x001") {
            setPhoneCheck("Phone number already exists!");
          }
          if (verificationResult[1] === "0x001") {
            setEmailCheck("Email already exists!");
          }
          if (verificationResult[2] === "0x001") {
            setUCheck("Username already exists!");
          }
          // If no specific field errors, show generic error
          if (
            verificationResult[0] !== "0x001" &&
            verificationResult[1] !== "0x001" &&
            verificationResult[2] !== "0x001"
          ) {
            setErrorMessage("An error occurred while registering. Please try again.");
          }
        } else {
          setErrorMessage("An error occurred while registering. Please try again.");
        }
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Service temporarily unavailable. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 to-purple-400 p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-10 flex flex-col items-center">
        <div className="w-full px-4">
          <img src={LogoText} alt="Logo" className="w-full h-10 mx-auto" />
          <h2 className="text-xl text-center text-gray-600 my-8">Register</h2>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
          >
            <div className="grid grid-cols-1 gap-4">
              {/* Image Upload */}
              <div className="flex flex-col">
                <div className="flex flex-col items-center space-y-3">
                  <input
                    id="avatar"
                    onChange={(e) => handleSetImage(e.target.files?.[0])}
                    onKeyDown = {handleKeyDown}
                    type="file"
                    accept="image/png,image/jpeg"
                    className="hidden"
                  />
                  <div className="shrink-0">
                    <img
                      src={image}
                      alt="Preview Image"
                      className="h-[150px] w-[150px] rounded-full object-cover border border-gray-300"
                    />
                  </div>
                  <label
                    htmlFor="avatar"
                    className="h-[43px] rounded-md border border-gray-300 px-4 py-[11px] text-sm font-semibold hover:bg-purple-600 hover:text-white cursor-pointer"
                  >
                    Upload avatar
                  </label>
                  <p className="text-xs text-slate-400">
                    PNG or JPEG, Below 5MB
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
                  onChange={(e) => handleFullNameChange(e.target.value)}
                  onKeyDown = {handleKeyDown}
                  onBlur={handleFullNameBlur}
                  aria-invalid={!!fullNameCheck}
                  aria-describedby={fullNameCheck ? "fullName-error" : undefined}
                  disabled={isLoading}
                />
                {fullNameCheck && (
                  <p
                    id="fullName-error"
                    className="mt-1 text-sm text-red-600 flex items-center animate-fade-in"
                  >
                    <FontAwesomeIcon
                      icon={faExclamationTriangle}
                      className="mr-2 text-red-600"
                    />
                    {fullNameCheck}
                  </p>
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
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  onKeyDown = {handleKeyDown}
                  onBlur={handleEmailBlur}
                  aria-invalid={!!emailCheck}
                  aria-describedby={emailCheck ? "email-error" : undefined}
                  disabled={isLoading}
                />
                {emailCheck && (
                  <p
                    id="email-error"
                    className="mt-1 text-sm text-red-600 flex items-center animate-fade-in"
                  >
                    <FontAwesomeIcon
                      icon={faExclamationTriangle}
                      className="mr-2 text-red-600"
                    />
                    {emailCheck}
                  </p>
                )}
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
                  type="tel"
                  placeholder="Enter phone number..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                  value={phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  onBlur={handlePhoneBlur}
                  onKeyDown = {handleKeyDown}
                  aria-invalid={!!phoneCheck}
                  aria-describedby={phoneCheck ? "phone-error" : undefined}
                  disabled={isLoading}
                />
                {phoneCheck && (
                  <p
                    id="phone-error"
                    className="mt-1 text-sm text-red-600 flex items-center animate-fade-in"
                  >
                    <FontAwesomeIcon
                      icon={faExclamationTriangle}
                      className="mr-2 text-red-600"
                    />
                    {phoneCheck}
                  </p>
                )}
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
                  value={birthday}
                  onChange={(e) => handleBirthdayChange(e.target.value)}
                  onBlur={handleBirthdayBlur}
                  onKeyDown = {handleKeyDown}
                  aria-invalid={!!birthdayCheck}
                  aria-describedby={birthdayCheck ? "birthday-error" : undefined}
                  max={new Date().toISOString().split("T")[0]}
                  disabled={isLoading}
                />
                {birthdayCheck && (
                  <p
                    id="birthday-error"
                    className="mt-1 text-sm text-red-600 flex items-center animate-fade-in"
                  >
                    <FontAwesomeIcon
                      icon={faExclamationTriangle}
                      className="mr-2 text-red-600"
                    />
                    {birthdayCheck}
                  </p>
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
                  value={username}
                  onChange={(e) => handleUsernameChange(e.target.value)}
                  onBlur={handleUsernameBlur}
                  onKeyDown = {handleKeyDown}
                  aria-invalid={!!usernameCheck}
                  aria-describedby={usernameCheck ? "username-error" : undefined}
                  disabled={isLoading}
                />
                {usernameCheck && (
                  <p
                    id="username-error"
                    className="mt-1 text-sm text-red-600 flex items-center animate-fade-in"
                  >
                    <FontAwesomeIcon
                      icon={faExclamationTriangle}
                      className="mr-2 text-red-600"
                    />
                    {usernameCheck}
                  </p>
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
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  onBlur={handlePasswordBlur}
                  onKeyDown = {handleKeyDown}
                  aria-invalid={!!passwordCheck}
                  aria-describedby={passwordCheck ? "password-error" : undefined}
                  disabled={isLoading}
                />
                {passwordCheck && (
                  <p
                    id="password-error"
                    className="mt-1 text-sm text-red-600 flex items-center animate-fade-in"
                  >
                    <FontAwesomeIcon
                      icon={faExclamationTriangle}
                      className="mr-2 text-red-600"
                    />
                    {passwordCheck}
                  </p>
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
                  value={confirmPassword}
                  onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                  onBlur={handleConfirmPasswordBlur}
                  onKeyDown = {handleKeyDown}
                  aria-invalid={!!confirmPasswordCheck}
                  aria-describedby={
                    confirmPasswordCheck ? "confirmPassword-error" : undefined
                  }
                  disabled={isLoading}
                />
                {confirmPasswordCheck && (
                  <p
                    id="confirmPassword-error"
                    className="mt-1 text-sm text-red-600 flex items-center animate-fade-in"
                  >
                    <FontAwesomeIcon
                      icon={faExclamationTriangle}
                      className="mr-2 text-red-600"
                    />
                    {confirmPasswordCheck}
                  </p>
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
                onBlur={handleTermsBlur}
                onKeyDown = {handleKeyDown}
                disabled={isLoading}
              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                I agree to the
                <Button
                  to="/terms"
                  variant="link"
                  className="text-purple-600 underline mx-1"
                >
                  Terms and Conditions
                </Button>
              </label>
            </div>
            {termsCheck && (
              <p
                id="terms-error"
                className="text-sm text-red-600 text-center flex items-center justify-center animate-fade-in"
              >
                <FontAwesomeIcon
                  icon={faExclamationTriangle}
                  className="mr-2 text-red-600"
                />
                {termsCheck}
              </p>
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
            {errorMessage && (
              <p
                id="general-error"
                className="text-sm text-red-600 text-center flex items-center justify-center animate-fade-in"
              >
                <FontAwesomeIcon
                  icon={faExclamationTriangle}
                  className="mr-2 text-red-600"
                />
                {errorMessage}
              </p>
            )}

            <div className="text-center mt-4">
              <Button
                onClick={() => navigate("/login")}
                size="lg"
                variant="link"
                className="text-purple-500 hover:text-purple-600"
              >
                Already have an account? Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;