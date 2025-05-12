// import libraries
import { useState, useEffect, useRef } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

// import components
import { LayoutContext } from "@/context/LayoutContext";
import { Header, Sidebar, Footer } from "@/components/layout";
import { Event, EventBrowser, Invitation, Account, EventDashboard, EventForm, DashBoard } from "@/pages/user";
import SessionValidator from "@/route-protectors/SessionValidator";
import { fetchUserPFP } from "@/lib/api";

// import icons
import pfpPlaceholder from "@/assets/Icons/avatar-placeholder.svg";

function Workspace() {
  const [avatarURL, setAvatarURL] = useState<string>(pfpPlaceholder);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const avatarURLRef = useRef<string>(pfpPlaceholder);
  const navigate = useNavigate();

  function toggleSidebar(): void {
    setSidebarOpen((prevState) => !prevState);
  }

  useEffect(() => {
    const abortController = new AbortController();

    fetchUserPFP(abortController.signal, undefined).then((response) => {
      if (response.status == 200) {
        avatarURLRef.current = response.imageURL
          ? response.imageURL
          : pfpPlaceholder;
        setAvatarURL(response.imageURL ? response.imageURL : pfpPlaceholder);
      } else if (response.status == 401) {
        navigate("/login");
      } else {
        alert("Service temporarily unavailable. Please try again later.");
      }
    });

    return () => {
      if (avatarURLRef.current != pfpPlaceholder) {
        URL.revokeObjectURL(avatarURLRef.current);
      }
      abortController.abort();
    };
  }, []);

  return (
    <LayoutContext.Provider value={{ sidebarOpen, toggleSidebar }}>
      <div className="w-screen h-screen flex overflow-hidden">
        <Sidebar />
        <div
          className={`flex flex-col bg-white border-r border-gray-200 h-full ${sidebarOpen ? "w-[65px] md:w-full" : "w-full"
            }`}
        >
          <Header avatarURL={avatarURL} sidebarOpen={sidebarOpen} />
          <div className="flex flex-col min-w-[200px] overflow-y-auto overflow-x-scroll h-[calc(100vh-4rem)] bg-gray-50 border-t-1 border-gray-200">
            <Routes>
              {/* Dashboard of the workspace */}
              <Route
                path=""
                element={<DashBoard sidebarOpen={sidebarOpen} />}
              />

              {/* Resolve invalid path */}
              <Route path="*" element={<Navigate to="/not-found-page" />} />

              {/* Show all organizing events */}
              <Route
                path="event"
                element={<Event sidebarOpen={sidebarOpen} />}
              />

              {/*Browse events */}
              <Route
                path="event-browser"
                element={<EventBrowser sidebarOpen={sidebarOpen} />}
              />

              {/* Dashboard of a specific event */}
              <Route path="event/:eventId" element={<EventDashboard />} />

              {/* Create new event page */}
              <Route
                path="event/create"
                element={
                  <SessionValidator>
                    <EventForm />
                  </SessionValidator>
                }
              />

              {/* Edit event page */}
              <Route path="event/:eventId/edit" element={<EventForm />} />

              {/* Invitation page */}
              <Route path="invitation" element={<Invitation />} />

              {/* Account page */}
              <Route path="account" element={<Account pfp={avatarURL} />} />
            </Routes>
            <Footer />
          </div>
        </div>
      </div>
    </LayoutContext.Provider>
  );
}

export default Workspace;
