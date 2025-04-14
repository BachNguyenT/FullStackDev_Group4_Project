import { useState } from "react";

function Account() {
  const [name, setName] = useState<string>("Name");
  const [phone, setPhone] = useState<string>("Phone");
  const [email, setEmail] = useState<string>("Email");
  const [birthday, setBirthday] = useState<string>("Birthday");
  const [userName, setUserName] = useState<string>("Username");

  return (
    <div>
      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">My Account</h2>
      {/* Account Information */}
      <div className="flex h-100 items-center bg-white shadow-md rounded-lg p-4 mb-4">
        {/* Avatar */}
        <div className="w-60 h-60 flex justify-center items-center">
          <img
            src="https://b.fssta.com/uploads/application/nba/headshots/1120.vresize.350.350.medium.27.png"
            alt="Avatar"
            className="w-60 h-60 rounded-full mb-4 border-2 border-gray-200 shadow-md hover:scale-105 transition-transform duration-200"
          />
        </div>
        {/* Text Information */}
        <div className="flex flex-1 justify-around items-center mb-4">
          <div>
            <div className="w-80">
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
                  className="border-2 border-gray-300 rounded-md p-2 mb-4 w-full font-light text-sm"
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
                  id="phone"
                  value={phone}
                  className="border-2 border-gray-300 rounded-md p-2 mb-4 w-full font-light text-sm"
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
                  className="border-2 border-gray-300 rounded-md p-2 mb-4 w-full font-light text-sm"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="w-80">
              <label htmlFor="email" className="block mb-2 font-light text-base">
                Email:
              </label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                id="email"
                value={email}
                className="border-2 border-gray-300 rounded-md p-2 mb-4 w-full font-light text-sm"
              />
            </div>

            <div>
              <label htmlFor="birthday" className="block mb-2 font-light text-base">
                Birthday:
              </label>
              <input
                onChange={(e) => {
                  setBirthday(e.target.value);
                }}
                id="birthday"
                value={birthday}
                className="border-2 border-gray-300 rounded-md p-2 mb-4 w-full font-light text-sm"
              />
            </div>
          </div>
        </div>



      </div>

    </div>

  );
}
export default Account;