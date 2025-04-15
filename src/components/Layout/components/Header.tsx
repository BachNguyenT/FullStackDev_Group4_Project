import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

import { Button } from "@/components/ui/components/Button";
import { useLayout } from "@/context";

function Header() {
  const { sidebarOpen, toggleSidebar } = useLayout();

  return (
    <div className="flex items-center justify-end w-full gap-4">
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

      <Button size="icon" variant="ghost">
        <FontAwesomeIcon icon={faBell} className="text-gray-500 text-5xl" />
      </Button>

      {/* Avatar Circle */}
      <Button size="icon" variant="ghost">
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold overflow-hidden">
          <img src="https://tse1.mm.bing.net/th?id=OIP.UyHfcv3FBLzxXpEd91eNzgHaFb&pid=Api&P=0&h=180"/>
        </div>
      </Button>
    </div>
  );
}

export default Header;
