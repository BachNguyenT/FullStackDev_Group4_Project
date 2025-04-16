import { useState, useEffect } from "react";
import { Button } from "@/components/ui/components/Button"
function Account() {
  const [id, setId] = useState<string>("JD123");
  const [name, setName] = useState<string>("Name");
  const [phone, setPhone] = useState<string>("Phone");
  const [email, setEmail] = useState<string>("Email");
  const [birthday, setBirthday] = useState<string>("Birthday");
  const [userName, setUserName] = useState<string>("Username");
  const [password, setPassword] = useState<string>("Password");
  const [newPassword, setNewPassword] = useState<string>("New Password");
  const [avatar, setAvatar] = useState<string>("https://b.fssta.com/uploads/application/nba/headshots/1120.vresize.350.350.medium.27.png")

  const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setAvatar(previewURL);
    }
  }

  useEffect(() => {
    // clean up function to revoke the object URL
    return () => {
      if (typeof avatar === "string") {
        URL.revokeObjectURL(avatar);
      }
    }
  }, [avatar]);

  return (
    <div className="p-4 sm:p-6 md:p-4">
      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">My Account</h2>
      <div className="mb-4 gap-4">
        {/* Account Information */}
        <div className="flex ">
          {/* Avatar */}
          <div className="rounded w-60 bg-white shadow-md flex flex-col justify-center items-center mr-4">
            <img
              src={avatar}
              alt="Avatar"
              className="w-40 h-40 rounded-full mb-4 border-2 border-gray-200 shadow-md hover:scale-105 transition-transform duration-200"
            />
            <label htmlFor="avatar" className="rounded-md shadow p-2 text-sm font-semibold hover:bg-purple-600 hover:text-white">Change Avatar</label>
            <input
              id="avatar"
              type="file"
              accept="image/*"
              placeholder="Upload Avatar"
              onChange={handleChangeAvatar}
              className="hidden"
            />
            <p className="mt-4 font-semibold">UID: {id}</p>
          </div>
          {/* Text Information */}
          <div className="flex rounded bg-white shadow-md flex--1 flex-1">
            <div className="w-full p-4">
              <div className="flex justify-between gap-6">
                <div className="w-1/2">
                  <div>
                    <label htmlFor="name" className="block mb-2 font-light text-base">
                      Full Name:
                    </label>
                    <input
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      id="name"
                      value={name}
                      className="border-2 border-gray-300 text-gray-400 rounded-md p-2 mb-4 w-full font-light text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block mb-2 font-light text-base">
                      Phone:
                    </label>
                    <input
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                      type="tel"
                      id="phone"
                      value={phone}
                      className="border-2 border-gray-300 text-gray-400 rounded-md p-2 mb-4 w-full font-light text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="userName" className="block mb-2 font-light text-base">
                      UserName:
                    </label>
                    <input
                      onChange={(e) => {
                        setUserName(e.target.value);
                      }}
                      id="userName"
                      value={userName}
                      className="border-2 border-gray-300 text-gray-400 rounded-md p-2 mb-4 w-full font-light text-sm"
                    />
                  </div>
                </div>
                <div className="w-1/2">
                  <div>
                    <label htmlFor="email" className="block mb-2 font-light text-base">
                      Email:
                    </label>
                    <input
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      type="email"
                      id="email"
                      value={email}
                      className="border-2 border-gray-300 text-gray-400 rounded-md p-2 mb-4 w-full font-light text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="birthday"
                      className="block mb-2 font-light text-base text-gray-700"
                    >
                      Birthday:
                    </label>
                    <input
                      type="date"
                      id="birthday"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      className="border-2 border-gray-300 text-gray-700 rounded-md p-2 mb-4 w-full font-light text-sm focus:outline-none focus:border-blue-500"
                      aria-required="true"
                      placeholder="YYYY-MM-DD"
                      max={new Date().toISOString().split("T")[0]} // Prevent future dates
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button>Save</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Change password */}
      <div className="bg-white shadow-md rounded p-4 mb-4">

        <div className="flex justify-between">
          <div className="w-1/3">
            <label htmlFor="currentPassword" className="block mb-2 font-light text-base">
              Current Password:
            </label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              id="currentPassword"
              value={password}
              className="border-2 border-gray-300 text-gray-400 rounded-md p-2 mb-4 w-full font-light text-sm"
            />
          </div>
          <div className="w-1/3">
            <label htmlFor="newPassword" className="block mb-2 font-light text-base">
              New Password:
            </label>
            <input
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              id="newPassword"
              value={newPassword}
              className="border-2 border-gray-300 text-gray-400 rounded-md p-2 mb-4 w-full font-light text-sm"
            />
          </div>
        </div>
        <h3 className="text-base font-medium">Password Requirements:</h3>
        <p className="text-sm text-gray-400 ml-6">At least 8 characters, 1 uppercase letter, 1 lowercase letter and 1 special character</p>
        <div className="flex justify-end mt-4">
          <Button>Change Password</Button>
        </div>
      </div>
    </div>

  );
}
export default Account;