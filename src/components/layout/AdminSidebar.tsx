// import libraries
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//import components 
import { Button } from "@/components/general/Button";
import { useLayoutContext } from "@/context/LayoutContext";

// import icons
import { faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "@/assets/Icons/app-logo.svg";
import LogoFull from "@/assets/Icons/plan-event.svg";
import Dashboard from "@/assets/Icons/chart-square.svg";
import Users from "@/assets/Icons/users.svg";
import Event from "@/assets/Icons/calendar.svg";
import Account from "@/assets/Icons/user-1.svg";
import Arrow from "@/assets/Icons/arrow-right.svg";


function AdminSidebar() {
  const { sidebarOpen } = useLayoutContext();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [eventsOpen, setEventsOpen] = useState(false);
  const navigate = useNavigate();

  async function handleLogout() {
    const userConfirmed = window.confirm("Are you sure you want to logout?");
    if (!userConfirmed) {
      return; // Exit if the user clicks "Cancel"
    }

    setLoading(true);
    try {
      let response = await fetch("http://localhost:3000/logout", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.status == 200 || response.status == 401) {
        setLoading(false);
        navigate("/login");
        return;
      } else if (response.status == 500) {
        alert("Service temporarily unavailable. Please try again later.");
        setLoading(false);
        return;
      }
    } catch {
      alert("Service temporarily unavailable. Please try again later.");
      setLoading(false);
      return;
    }
  }

  return (
    <div
      className={`flex flex-col bg-white border-r border-gray-200 h-full ${sidebarOpen ? "w-full md:w-[300px]" : "w-0 md:w-[95px]"
        }`}
    >
      {/* Sidebar Header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        onClick={() => navigate("/workspace")}
      >
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
          {/* Dashboard button */}
          <li>
            <Button
              variant="sidebar"
              onClick={() => navigate("/admin")}
              className="w-full h-[50px] my-2 flex items-center justify-start gap-3 px-4 py-2"
              animated={false}
            >
              <img src={Dashboard} alt="Logo" className="w-[24px] h-[24px]" />
              {sidebarOpen && <span className="ml-1 text-base">Dashboard</span>}
            </Button>
          </li>
          {/* Events button */}
          <li>
            <Button
              variant="sidebar"
              onClick={() => navigate("/admin/event")}
              className="w-full h-[50px] my-2 flex items-center justify-start gap-3 px-4 py-2 "
              animated={false}
            >
              <img src={Event} alt="Logo" className="w-[24px] h-[24px]" />
              {sidebarOpen && (
                <span className="ml-1 text-base">Events</span>
              )}
            </Button>
          </li>
          {/* Users button */}
          <li>
            <Button
              variant="sidebar"
              onClick={() => navigate("/admin/user")}
              className="w-full h-[50px] my-2 flex items-center justify-start gap-3 px-4 py-2 "
              animated={false}
            >
              <img src={Users} alt="Logo" className="w-[24px] h-[24px]" />
              {sidebarOpen && (
                <span className="ml-1 text-base">Users</span>
              )}
            </Button>
          </li>
          {/* Account button */}
          <li>
            <Button
              variant="sidebar"
              onClick={() => navigate("/admin/account")}
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
            disabled={isLoading}
            onClick={() => handleLogout()}
            variant="outline"
            className="hover:bg-purple-600 hover:text-white"
            animated={false}
          >
            <FontAwesomeIcon icon={faArrowAltCircleRight} className="mr-2" />
            {isLoading ? "Loading..." : "Logout"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default AdminSidebar;
