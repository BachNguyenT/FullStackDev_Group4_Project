// import libraries
import { useState, useEffect, useRef } from "react";

// import components
import { Button } from "@/components/general/Button";
import { FetchUserPFPResponse } from "@/Types";

// import icons
import pfpPlaceholder from "@/assets/Icons/avatar-placeholder.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

function AdminAccount({ pfp }: { pfp: string }) {
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [avatar, setAvatar] = useState<string>(pfp);
  const imageURLRef = useRef<string>(pfp);
  const [newAvatar, setNewAvatar] = useState<string>(pfpPlaceholder);
  const newImageURLRef = useRef<string>(pfpPlaceholder);

  const [isEditing, setIsEditing] = useState(false);

  const [passwordMessage, setPasswordMessage] = useState(false);
  const [newPasswordMessage, setNewPasswordMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleFocus = () => {
    setPasswordMessage(false); // Clear any previous error messages
    setNewPasswordMessage(false); // Clear any previous error messages
    setErrorMessage(""); // Clear any previous error messages
  };

  function formatDateToInput(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
  
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
  
  useEffect(() => {
    const abortController = new AbortController();

    fetchAvatar(abortController.signal, undefined);
    handleDisplayUserInformation(); // Call the function here to fetch user data

    return () => {
      if (imageURLRef.current !== pfp) {
        URL.revokeObjectURL(imageURLRef.current);
      }
      abortController.abort();
    };
  }, []);

  async function fetchAvatar(
    abortSignal: AbortSignal,
    userID: string | undefined
  ): Promise<FetchUserPFPResponse> {
    try {
      const searchParams = new URLSearchParams({
        id: userID ? userID : "#SENDER#",
      });

      const response = await fetch(
        `http://localhost:3000/get-user-pfp?${searchParams.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          signal: abortSignal,
        }
      );

      const responsePackage = await response.json();

      if (response.status === 200) {
        let imageURL = undefined;

        if (responsePackage.imageBlob.length > 0) {
          const byteArray = new Uint8Array(responsePackage.imageBlob);
          const blob = new Blob([byteArray]);
          imageURL = URL.createObjectURL(blob);
          setAvatar(imageURL); // Update the avatar state here
          imageURLRef.current = imageURL; // Update the ref
        }

        return {
          status: response.status,
          debugCode: responsePackage.debugCode,
          imageURL: imageURL,
        };
      } else {
        console.error(`Error fetching avatar: ${response.status}`);
        return {
          status: response.status,
          debugCode: responsePackage.debugCode,
          imageURL: undefined,
        };
      }
    } catch (error) {
      console.error("Error in fetchAvatar:", error);
      return {
        status: 500,
        debugCode: "FEx001",
        imageURL: undefined,
      };
    }
  }
  async function handleDisplayUserInformation() {
    try {
      const response = await fetch("http://localhost:3000/get-user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.status === 200) {
        const data = await response.json();
        setId(data.ID);
        setName(data.Name);
        setPhone(data.PhoneNumber);
        setEmail(data.Email);
        const rawDate = formatDateToInput(new Date(data.Birthday));
        const formattedDate = rawDate.split("T")[0]; // 'YYYY-MM-DD'
        setBirthday(formattedDate);

        setUserName(data.Username);
      } else if (response.status === 401) {
        alert("Session expired. Please log in again.");
      } else {
        alert("Service temporarily unavailable. Please try again later.");
      }
    } catch (error) {
      alert("Service temporarily unavailable. Please try again later.");
    }
  }

  const handleSave = () => {
    const formattedBirthday = birthday ? new Date(birthday).toISOString().split("T")[0] : null; // Format as YYYY-MM-DD
  
    const updatedUser = {
      Name: name,
      PhoneNumber: phone,
      Email: email,
      Birthday: formattedBirthday, // Use the formatted date
      Username: userName,
    };
  
    fetch(`http://localhost:3000/update-user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(updatedUser),
    })
      .then((response) => {
        if (response.status === 200) {
          alert("User information updated successfully.");
          setIsEditing(false);
          handleDisplayUserInformation(); // Refresh the user information after saving
        } else if (response.status === 401) {
          alert("Session expired. Please log in again.");
        } else {
          alert("Service temporarily unavailable. Please try again later.");
        }
      })
      .catch(() => {
        alert("Service temporarily unavailable. Please try again later.");
      });
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset the state variables to their original values
    handleDisplayUserInformation();
  };

  const handleChangeAvatar = (file: File | undefined) => {
    if (!file) return;

    const validTypes = ["image/png", "image/jpeg"];
    if (!validTypes.includes(file.type)) {
      alert("Invalid file type. Please upload a PNG or JPEG image.");
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("File size must be smaller than 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(",")[1]; // Remove the data prefix

      // Optional: Show preview
      if (newAvatar !== pfpPlaceholder) {
        URL.revokeObjectURL(newImageURLRef.current);
      }
      const previewURL = URL.createObjectURL(file);
      newImageURLRef.current = previewURL;
      setNewAvatar(previewURL);

      // Send the Base64 string to backend
      fetch("http://localhost:3000/update-user-pfp", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ Pfp: base64String }),
      })
        .then((res) => {
          if (res.status === 200) {
            alert("Avatar updated successfully.");
            setAvatar(previewURL); // Set the new avatar in state
          } else if (res.status === 401) {
            alert("Session expired. Please log in again.");
          } else {
            alert("Service temporarily unavailable. Please try again later.");
          }
        })
        .catch(() => {
          alert("Service temporarily unavailable. Please try again later.");
        });
    };

    reader.readAsDataURL(file);
  };

  const handleChangePassword = () => {
    setPasswordMessage(false); // Clear any previous error messages
    setNewPasswordMessage(false); // Clear any previous error messages
    if (!password || !newPassword) {
      setErrorMessage("Please fill in both current password and new password.");
      setPasswordMessage(!password); // Show error for current password if empty
      setNewPasswordMessage(!newPassword); // Show error for new password if empty
      return;
    }

    if (password === newPassword) {
      setNewPasswordMessage(true); // Show error for new password if same as current password
      setErrorMessage("New password cannot be the same as current password.");
      return;
    }

    const passwordData = {
      CurrentPassword: password,
      NewPassword: newPassword,
    };

    fetch("http://localhost:3000/update-user-password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(passwordData),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.text().then((text) => {
            if (text === "0x000") {
              alert("Password changed successfully.");
              setPassword(newPassword);
              setNewPassword("");
            } else if (text === "0x001") {
              alert("Session expired. Please log in again.");
            } else if (text === "0x002") {
              alert("Invalid session. Please log in again.");
            } else {
              alert("Service temporarily unavailable. Please try again later.");
            }
          });
        } else if (response.status === 400) {
          return response.text().then((text) => {
            if (text === "0x001") {
              setPasswordMessage(true); // Clear any previous error messages
              setErrorMessage("Invalid current password");
            } else {
              setErrorMessage("Invalid request. Please try again.");
            }
          });
        } else if (response.status === 401) {
          return response.text().then((text) => {
            if (text === "0x004") {
              setPasswordMessage(true); // Clear any previous error messages
              setErrorMessage("Current password is incorrect.");
            } else if (text === "Ux003") {
              alert("Session expired. Please log in again.");
            } else {
              alert("Unauthorized request. Please log in again.");
            }
          });
        } else if (response.status === 404) {
          alert("User not found.");
        } else {
          alert("Service temporarily unavailable. Please try again later.");
        }
      })
      .catch(() => {
        alert("Service temporarily unavailable. Please try again later.");
      });
  };

  return (
    <div className="p-4 sm:p-6 md:p-4">
      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">My Account</h2>
      <div className="mb-4 gap-4">
        {/* Account Information */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Avatar */}
          <div className="rounded py-4 w-sm md:w-60 bg-white shadow-md flex flex-col justify-center items-center mr-4">
            <img
              src={avatar}
              alt="Avatar"
              className="w-40 h-40 rounded-full mb-4 border-2 border-gray-200 shadow-md object-cover hover:scale-105 transition-transform duration-200"
            />
            <label
              htmlFor="avatar"
              className="rounded-md shadow p-2 text-sm font-semibold hover:bg-purple-600 hover:text-white cursor-pointer"
            >
              Change Avatar
            </label>
            <input
              id="avatar"
              type="file"
              accept="image/*"
              placeholder="Upload Avatar"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]; // Get the first file from the file input
                if (file) {
                  handleChangeAvatar(file); // Pass the file to the handler
                }
              }}
            />

            <p className="mt-4 font-semibold">ID: {id} </p>
          </div>
          {/* Text Information */}
          <div className="flex rounded bg-white shadow-md w-sm md:w-full">
            <div className="p-4 w-full">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="w-full md:w-1/2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 font-light text-base"
                    >
                      Full Name:
                    </label>
                    <input
                      readOnly={!isEditing}
                      onChange={(e) => setName(e.target.value)}
                      id="name"
                      value={name}
                      className="border-2 border-gray-300 text-gray-400 rounded-md p-2 mb-4 w-full font-light text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block mb-2 font-light text-base"
                    >
                      Phone:
                    </label>
                    <input
                      readOnly={!isEditing}
                      onChange={(e) => setPhone(e.target.value)}
                      type="tel"
                      id="phone"
                      value={phone}
                      className="border-2 border-gray-300 text-gray-400 rounded-md p-2 mb-4 w-full font-light text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="userName"
                      className="block mb-2 font-light text-base"
                    >
                      Username:
                    </label>
                    <input
                      readOnly={!isEditing}
                      onChange={(e) => setUserName(e.target.value)}
                      id="userName"
                      value={userName}
                      className="border-2 border-gray-300 text-gray-400 rounded-md p-2 mb-4 w-full font-light text-sm"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 font-light text-base"
                    >
                      Email:
                    </label>
                    <input
                      readOnly={!isEditing}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      id="email"
                      value={email}
                      className="border-2 border-gray-300 text-gray-400 rounded-md p-2 mb-4 w-full font-light text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="birthday"
                      className="block mb-2 font-light text-base"
                    >
                      Birthday:
                    </label>
                    <input
                      readOnly={!isEditing} // Prevent manual typing when not editing
                      onChange={(e) => setBirthday(e.target.value)}
                      id="birthday"
                      type="date" // Use "date" type to enable the calendar picker
                      value={birthday}
                      className="border-2 border-gray-300 text-gray-400 rounded-md p-2 mb-4 w-full font-light text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                {!isEditing && (
                  <Button onClick={() => setIsEditing(!isEditing)}>
                    Edit Information
                  </Button>
                )}
                {isEditing && (
                  <div className="flex gap-2">
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Change password */}
      <div className="bg-white shadow-md rounded p-4 mb-4 w-sm md:w-full">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="w-full sm:w-1/2">
            <label
              htmlFor="currentPassword"
              className="block mb-2 font-light text-base"
            >
              Current Password:
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              id="currentPassword"
              value={password}
              type="password"
              className={`border-2 rounded-md p-2 mb-4 w-full font-light text-sm ${
                passwordMessage
                  ? "border-red-500 text-gray-700"
                  : "border-gray-300 text-gray-700"
              }`}
              onFocus={handleFocus}
              placeholder="Enter your password"
            />
          </div>
          <div className="w-full sm:w-1/2">
            <label
              htmlFor="newPassword"
              className="block mb-2 font-light text-base"
            >
              New Password:
            </label>
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              id="newPassword"
              value={newPassword}
              type="password" // Keep as password type for security
              className={`border-2 rounded-md p-2 mb-4 w-full font-light text-sm ${
                newPasswordMessage
                  ? "border-red-500 text-gray-700"
                  : "border-gray-300 text-gray-700"
              }`}
              onFocus={handleFocus}
              placeholder="Enter your new password"
            />
          </div>
        </div>
        <div className="flex items-center mb-4">
          {errorMessage && (
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              className="text-red-600 mr-2"
            />
          )}
          <div className="text-red-600">{errorMessage}</div>
        </div>
        <h3 className="text-base font-medium">Password Requirements:</h3>
        <p className="text-sm text-gray-400 ml-6">
          At least 8 characters, 1 uppercase letter, 1 lowercase letter and 1
          special character
        </p>
        <div className="flex justify-end mt-4">
          <Button onClick={handleChangePassword}>Change Password</Button>
        </div>
      </div>
    </div>
  );
}

export default AdminAccount;
