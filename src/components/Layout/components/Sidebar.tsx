//import state management
import { useLayout } from "@/context";

//import components and libraries
import { Button } from "@/components/ui/components/Button";

function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useLayout();

  return (
    <div
      className={`flex flex-col bg-white border-r border-gray-200 transition-all duration-300 h-full ${
        sidebarOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-4 py-3">
        {sidebarOpen && (
          <span className="text-purple-600 font-bold text-xl">PlanEvnt</span>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 bg-purple-100 hover:bg-purple-200 rounded-md"
        >
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
          <li>
            <Button
              to="/home"
              className="w-full my-2 flex items-center justify-start gap-3 px-4 py-2"
              animated={sidebarOpen}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7m-9 2v6a2 2 0 002 2h4a2 2 0 002-2v-6"
                />
              </svg>
              {sidebarOpen && <span className="ml-3">Home</span>}
            </Button>
          </li>
          <li>
            <Button
              to="/event"
              className="w-full my-2 flex items-center justify-start gap-3 px-4 py-2"
              animated={sidebarOpen}
            >
              <svg
                className="w-5 h-5"
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
              {sidebarOpen && <span className="ml-3">Events</span>}
            </Button>
          </li>
          <li>
            <Button
              to="/invitation"
              className="w-full my-2 flex items-center justify-start gap-3 px-4 py-2"
              animated={sidebarOpen}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M17 8h2a2 2 0 012 2v10H3V10a2 2 0 012-2h2" />
                <path d="M7 8V6a5 5 0 0110 0v2" />
              </svg>
              {sidebarOpen && <span className="ml-3">Invitations</span>}
            </Button>
          </li>
          <li>
            <Button
              to="/account "
              className="w-full my-2 flex items-center justify-start gap-3 px-4 py-2"
              animated={sidebarOpen}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M5.121 17.804A13.937 13.937 0 0112 15c2.492 0 4.79.64 6.879 1.804" />
                <path d="M15 11A3 3 0 119 11a3 3 0 016 0z" />
              </svg>
              {sidebarOpen && <span className="ml-3">Account</span>}
            </Button>
          </li>
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4">
        {sidebarOpen && (
          <Button to="/login" variant="destructive">
            Log out
          </Button>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
