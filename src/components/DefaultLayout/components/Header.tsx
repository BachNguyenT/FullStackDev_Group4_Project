import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import Notification from "@/assets/Icons/notification.svg";

import { Button } from "@/components/ui/components/Button";
import { useLayoutContext } from "@/context/LayoutContext";
import { useAvatarContext } from "@/context/AvatarContext";
import { useNavigate } from "react-router-dom";

function Header({
  avatarURL,
  sidebarOpen,
}: {
  avatarURL: string;
  sidebarOpen: boolean;
}) {
  const navigate = useNavigate();
  const { toggleSidebar } = useLayoutContext();

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
        className={`justify-end flex flex-row gap-4 ${
          sidebarOpen ? "w-0 md:w-full" : "w-full"
        }`}
      >
        <Button size="icon" variant="ghost">
          <div className="w-full h-full flex items-center justify-center text-white font-semibold ">
            <img src={Notification} />
          </div>
        </Button>

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
