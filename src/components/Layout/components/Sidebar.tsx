import { useState } from "react";
import Button from "@/components/ui/Button";
import Dashboard from "@/assets/Icons/chart-square.svg";

function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div
      className={`flex flex-col bg-white border-r border-gray-200 transition-all duration-300  h-full
      ${sidebarOpen ? "w-100" : "w-18"}
    `}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo / Title (hide text if collapsed) */}
        {sidebarOpen ? (
          <span className="text-purple-600 font-bold text-xl transition-opacity">
            PlanEvnt
          </span>
        ) : null}
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="p-2 bg-purple-100 hover:bg-purple-200 rounded-md"
        >
          {/* Could replace with any icon */}
          <svg
            className="w-5 h-5 text-purple-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* Sidebar Menu */}
      <nav className="flex-1 mt-4">
        <ul>
          <li className="group">
            <Button
              to="/home"
              className="
              items-center w-full px-4 py-2 flex items-center h-[50px] rounded-md text-purple-700 hover:bg-purple-100 transition-colors duration-200"
            >
              <img src={Dashboard}/>
              <span
                className={`ml-3 text-gray-700 ${!sidebarOpen && "hidden"}`}
              >
                Home
              </span>
            </Button>
          </li>
          <li className="group">
            <Button to='/event' className="flex items-center w-full px-4 py-2 hover:bg-gray-100">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 9h10m-10 5h10m-9 5h8"
                />
              </svg>
              <span
                className={`ml-3 text-gray-700 ${!sidebarOpen && "hidden"}`}
              >
                Events
              </span>
            </Button>
          </li>
          <li className="group">
            <Button to='/invitation' className="flex items-center w-full px-4 py-2 hover:bg-gray-100">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8h2a2 2 0 012 2v10H3V10a2 2 0 012-2h2"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 8V6a5 5 0 0110 0v2"
                />
              </svg>
              <span
                className={`ml-3 text-gray-700 ${!sidebarOpen && "hidden"}`}
              >
                Invitations
              </span>
            </Button>
          </li>
          <li className="group">
            <Button to='/account' className="flex items-center w-full px-4 py-2 hover:bg-gray-100">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A13.937 13.937 0 0112 15c2.492 0 4.79.64 6.879 1.804M15 11A3 3 0 119 11a3 3 0 016 0z"
                />
              </svg>
              <span
                className={`ml-3 text-gray-700 ${!sidebarOpen && "hidden"}`}
              >
                Account
              </span>
            </Button>
          </li>
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4">
        {sidebarOpen ? (
          <Button className="flex items-center justify-center w-full py-2 text-white bg-purple-500 hover:bg-purple-600 rounded-md">
            Log out
          </Button>
        ) : null}
      </div>
    </div>
  );
}
export default Sidebar;
