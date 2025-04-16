//import state management
import { useLayoutContext } from "@/context/LayoutContext";

import { faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//import components and libraries
import { Button } from "@/components/ui/components/Button";

//import icons
import Logo from "@/assets/Icons/app-logo.svg";
import LogoFull from "@/assets/Icons/plan-event.svg";
import Dashboard from "@/assets/Icons/chart-square.svg";
import Event from "@/assets/Icons/calendar.svg";
import Invitation from "@/assets/Icons/invitation.svg";
import Account from "@/assets/Icons/user-1.svg";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const { sidebarOpen } = useLayoutContext();
  const navigate = useNavigate();

  return (
    <div
      className={`flex flex-col bg-white border-r border-gray-200 h-full ${
        sidebarOpen ? "w-[300px]" : "[50px]"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-4 py-3">
        {sidebarOpen ? (
          <div>
            <img src={LogoFull} alt="Logo" className="pl-2 w-full h-10" />
          </div>
        ) : (
          <img src={Logo} alt="Logo" className="w-full h-10" />
        )}
      </div>

      {/* Sidebar Menu */}
      <nav className="flex-1 px-4 ">
        <ul>
          <li>
            <Button
              variant="sidebar"
              onClick={() => navigate("workspace")}
              className="w-full h-[50px] my-2 flex items-center justify-start gap-3 px-4 py-2"
              animated={false}
            >
              <img src={Dashboard} alt="Logo" className="w-[24px] h-[24px]" />
              {sidebarOpen && <span className="ml-1 text-base">Dashboard</span>}
            </Button>
          </li>
          <li>
            <Button
              variant="sidebar"
              onClick={() => navigate("/workspace/event")}
              className="w-full h-[50px] my-2 flex items-center justify-start gap-3 px-4 py-2 "
              animated={false}
            >
              <img src={Event} alt="Logo" className="w-[24px] h-[24px]" />
              {sidebarOpen && <span className="ml-1 text-base">Events</span>}
            </Button>
          </li>
          <li>
            <Button
              variant="sidebar"
              onClick={() => navigate("/workspace/invitation")}
              className="w-full h-[50px] my-2 flex items-center justify-start gap-3 px-4 py-2 "
              animated={false}
            >
              <img src={Invitation} alt="Logo" className="w-[24px] h-[24px]" />
              {sidebarOpen && (
                <span className="ml-1 text-base">Invitations</span>
              )}
            </Button>
          </li>
          <li>
            <Button
              variant="sidebar"
              onClick={() => navigate("/workspace/account")}
              className="w-full h-[50px] my-2 flex items-center justify-start gap-3 px-4 py-2 "
              animated={false}
            >
              <img src={Account} alt="Logo" className="w-[24px] h-[24px]" />
              {sidebarOpen && <span className="ml-1 text-base">Account</span>}
            </Button>
          </li>
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="flex p-4 justify-center">
        {sidebarOpen && (
          <Button
            to="/login"
            variant="outline"
            className="hover:bg-purple-600 hover:text-white"
            animated={false}
          >
            <FontAwesomeIcon icon={faArrowAltCircleRight} className="mr-2" />
            Log out
          </Button>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
