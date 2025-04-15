import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

import { Button } from "@/components/ui/components/Button";
import { useLayoutContext } from "@/context/LayoutContext";
import { useAvatarContext } from "@/context/AvatarContext";
import { useNavigate } from "react-router-dom";


function Header() {
  const navigate = useNavigate();
  const { toggleSidebar } = useLayoutContext();
  const { avatarURL } = useAvatarContext();

  return (
    <div className="flex items-center justify-end gap-4 m-[16px] transition-all duration-300">
      <span className="w-full justify-start">
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
      </span>

      <Button size="icon" variant="ghost">
        <FontAwesomeIcon icon={faBell} className="text-gray-500 text-5xl" />
      </Button>

      {/* Avatar Circle */}
      <Button size="icon" variant="ghost" onClick={() => navigate("/workspace/account")}>
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold overflow-hidden">
          <img src={avatarURL} />
        </div>
      </Button>
    </div>
  );
}

export default Header;
