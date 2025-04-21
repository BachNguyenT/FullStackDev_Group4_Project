import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/components/Button";

function Account({ pfp }: { pfp: string }) {
  const [id, setId] = useState<string>();
  const [name, setName] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [birthday, setBirthday] = useState<string>();
  const [userName, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [avatar, setAvatar] = useState<string>(pfp);
  const imageURLRef = useRef<string>(pfp);

  async function fetchAvatar(abortSignal: AbortSignal) {
    try {
      const response = await fetch("http://localhost:3000/get-user-pfp", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          key: "5MLGUGJL4GMe86pG4CfrE241BxDYxkeI",
        },
        credentials: "include",
        signal: abortSignal,
      });

      if (response.status === 200) {
        const blob = await response.blob();
        const objectURL = URL.createObjectURL(blob);
        imageURLRef.current = objectURL;
        setAvatar(objectURL);
      } else if (response.status === 401) {
        alert("Session expired. Please log in again.");
      } else {
        alert("Service temporarily unavailable. Please try again later.");
      }
    } catch (error) {
      alert("Service temporarily unavailable. Please try again later.");
    }
  }

  async function handleDisplayUserInformation() {
    try {
      const response = await fetch(
        "http://localhost:3000/get-user-information",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        setId(data.ID);
        setName(data.Name);
        setPhone(data.PhoneNumber);
        setEmail(data.Email);
        const rawDate = new Date(data.Birthday);
        const formattedDate = rawDate.toISOString().split("T")[0]; // 'YYYY-MM-DD'
        setBirthday(formattedDate);

        setUserName(data.Username);
      } else if (response.status === 401) {
        alert("Session expired. Please log in again.");
      } else {
        alert("Service temporarily unavailable. Please try again later.");
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
      alert("Service temporarily unavailable. Please try again later.");
    }
  }

  function handleChangeAvatar() {
    //
  }
  useEffect(() => {
    const abortController = new AbortController();

    fetchAvatar(abortController.signal);
    handleDisplayUserInformation(); // Call the function here to fetch user data

    return () => {
      if (imageURLRef.current !== pfp) {
        URL.revokeObjectURL(imageURLRef.current);
      }
      abortController.abort();
    };
  }, []);

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
              className="w-40 h-40 rounded-full mb-4 border-2 border-gray-200 shadow-md hover:scale-105 transition-transform duration-200"
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
              onChange={handleChangeAvatar}
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
                      readOnly
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
                      readOnly
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
                      readOnly
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
                      readOnly
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      id="email"
                      value={email}
                      className="border-2 border-gray-300 text-gray-400 rounded-md p-2 mb-4 w-full font-light text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 font-light text-base"
                    >
                      Birthday:
                    </label>
                    <input
                      readOnly
                      onChange={(e) => setBirthday(e.target.value)}
                      type="email"
                      id="email"
                      value={birthday}
                      className="border-2 border-gray-300 text-gray-400 rounded-md p-2 mb-4 w-full font-light text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button>Edit Information</Button>
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
              className="border-2 border-gray-300 text-gray-400 rounded-md p-2 mb-4 w-full font-light text-sm"
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
              id="newPassword"
              className="border-2 border-gray-300 text-gray-400 rounded-md p-2 mb-4 w-full font-light text-sm"
              // onChange={(e) => setNewPassword(e.target.value)}
              // value={newPassword}
            />
          </div>
        </div>
        <h3 className="text-base font-medium">Password Requirements:</h3>
        <p className="text-sm text-gray-400 ml-6">
          At least 8 characters, 1 uppercase letter, 1 lowercase letter and 1
          special character
        </p>
        <div className="flex justify-end mt-4">
          <Button>Change Password</Button>
        </div>
      </div>
    </div>
  );
}

export default Account;
