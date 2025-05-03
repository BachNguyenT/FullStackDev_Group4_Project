// import libraries
import { useEffect, useState, useRef } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

// import components
import { LayoutContext } from "@/context/LayoutContext";
import { AdminSidebar, AdminHeader, Footer } from "@/components/layout";
import { AdminAccount, AdminDashboard, AdminEvent, AdminEventDashboard, AdminViewUsers, AdminViewUserInfo } from "@/pages/admin";
import { fetchUserPFP } from "@/lib/api";

// import icons
import pfpPlaceholder from "@/assets/Icons/avatar-placeholder.svg";
import userDummyPFP from "@/assets/Icons/avatar-placeholder.svg";

function AdminWorkspace() {
  const [avatarURL, setAvatarURL] = useState<string>(userDummyPFP);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const avatarURLRef = useRef<string>(userDummyPFP);
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
        <AdminSidebar />
        <div
          className={`flex flex-col bg-white border-r border-gray-200 h-full ${sidebarOpen ? "w-[65px] md:w-full" : "w-full"
            }`}
        >
          <AdminHeader avatarURL={avatarURL} sidebarOpen={sidebarOpen} />
          <div className="overflow-y-auto overflow-x-scroll h-[calc(100vh-4rem)] bg-gray-50 border-t-1 border-gray-200">
            <Routes>
              {/* Dashboard of the admin workspace */}
              <Route
                path=""
                element={
                  <div>
                    <AdminDashboard /> <Footer />{" "}
                  </div>
                }
              />
              {/* Resolve invalid path */}
              <Route path="*" element={<Navigate to="/not-found-pageAdmin" />} />
              {/* Show all events */}
              <Route
                path="event"
                element={
                  <div>
                    <AdminEvent />
                    <Footer />{" "}
                  </div>
                }
              />
              <Route
                path="event/:eventId"
                element={
                  <div>
                    <AdminEventDashboard />
                    <Footer />{" "}
                  </div>
                }
              />
              {/*Browser events */}
              <Route
                path="user"
                element={
                  <div>
                    <AdminViewUsers />
                    <Footer />{" "}
                  </div>
                }
              />
              {/* Dashboard of a specific user */}
              <Route
                path="user/:userId"
                element={<AdminViewUserInfo />}
              />


              <Route path="account" element={<AdminAccount pfp={avatarURL} />} />
            </Routes>
            <div className="mt-auto "></div>
          </div>
        </div>
      </div>
    </LayoutContext.Provider>
  );
}

export default AdminWorkspace;
