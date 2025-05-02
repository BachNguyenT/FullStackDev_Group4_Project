// import libraries
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

// import components
import { Button } from "@/components/general/Button";
import {NotificationBoard} from "@/components/general";
import { useLayoutContext } from "@/context/LayoutContext";

// import Icons
import Notification from "@/assets/Icons/notification.svg";

function Header({
  avatarURL,
  sidebarOpen,
}: {
  avatarURL: string;
  sidebarOpen: boolean;
}) {
  const navigate = useNavigate();
  const { toggleSidebar } = useLayoutContext();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current as NodeJS.Timeout | undefined);
    setNotificationOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setNotificationOpen(false);
    }, 500);
  };
  return (
    <div className="flex items-center m-[16px] transition-all duration-300">
      <button
        onClick={toggleSidebar}
        className="p-2 hover:bg-purple-200 rounded-md"
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
            d={"M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>
      <span
        className={`justify-end flex flex-row gap-4 ${sidebarOpen ? "w-0 md:w-full" : "w-full"
          }`}
      >
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Button size="icon" variant="ghost">
            <div className="w-full h-full flex items-center justify-center text-white font-semibold ">
              <img src={Notification} />
            </div>
          </Button>

          {notificationOpen && (
            <div className="absolute top-16 right-4 z-50">
              <NotificationBoard />
            </div>)}
        </div>
        {/* Avatar Circle */}
        <Button
          size="icon"
          variant="ghost"
          onClick={() => navigate("/workspace/account")}
        >
          <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold overflow-hidden">
            <img src={avatarURL} />
          </div>
        </Button>
      </span>
    </div>
  );
}

export default Header;
