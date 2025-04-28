import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LayoutContext } from "@/context/LayoutContext";
import { useRef } from "react";
import userDummyPFP from "@/assets/Icons/avatar-placeholder.svg";
import Sidebar from "@/components/DefaultLayout/components/Sidebar";
import Header from "@/components/DefaultLayout/components/Header";
import Footer from "@/components/DefaultLayout/components/Footer";
import Event from "@/pages/user/Event";
import EventBrowser from "@/pages/user/EventBrowser";
import Invitation from "@/pages/user/Invitation";
import Account from "@/pages/user/Account";
import EventDashboard from "@/pages/user/EventDashboard";
import EventForm from "./EventForm";
import DashBoard from "./DashBoard";
import SessionValidator from "@/route-protectors/SessionValidator";

function Workspace() {
  const [avatarURL, setAvatarURL] = useState<string>(userDummyPFP);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const avatarURLRef = useRef<string>(userDummyPFP);
  const navigate = useNavigate();

  function toggleSidebar(): void {
    setSidebarOpen((prevState) => !prevState);
  }

  async function fetchPFP(abortSignal: AbortSignal) {
    // Call API
    try {
      const response = await fetch("http://localhost:3000/get-user-pfp", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        signal: abortSignal,
      });

      // Handle response
      if (response.status == 200) {
        const blob = await response.blob();
        const objectURL = URL.createObjectURL(blob);
        avatarURLRef.current = objectURL;
        setAvatarURL(objectURL);
        return;
      } else if (response.status == 401) {
        alert("Session expired. Please log in again.");
        navigate("/login");
        return;
      } else {
        alert("Service temporarily unavailable. Please try again later.");
        return;
      }
    } catch {
      // Handle API call error
      alert("Service temporarily unavailable. Please try again later.");
      return;
    }
  }

  useEffect(() => {
    const abortController = new AbortController();

    fetchPFP(abortController.signal);

    return () => {
      if (avatarURLRef.current != userDummyPFP) {
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
          className={`flex flex-col bg-white border-r border-gray-200 h-full ${
            sidebarOpen ? "w-[65px] md:w-full" : "w-full"
          }`}
        >
          <Header avatarURL={avatarURL} sidebarOpen={sidebarOpen} />
          <div className="overflow-y-auto overflow-x-scroll h-[calc(100vh-4rem)] bg-gray-50 border-t-1 border-gray-200">
            <Routes>
              {/* Dashboard of the workspace */}
              <Route
                path=""
                element={
                  <div>
                    <DashBoard sidebarOpen={sidebarOpen} /> <Footer />{" "}
                  </div>
                }
              />
              {/* Resolve invalid path */}
              <Route path="*" element={<Navigate to="/not-found-page" />} />
              {/* Show all events */}
              <Route
                path="event"
                element={<Event sidebarOpen={sidebarOpen} />}
              />
              {/*Browser events */}
              <Route
                path="event-browser"
                element={<EventBrowser sidebarOpen={sidebarOpen} />}
              />
              {/* Dashboard of a specific event */}
              <Route
                path="event/:eventId"
                element={
                  <SessionValidator>
                    <EventDashboard />
                  </SessionValidator>
                }
              />

              {/* Create new event page */}
              <Route
                path="event/create"
                element={
                  <SessionValidator>
                    <EventForm />
                  </SessionValidator>
                }
              />

              <Route path="event/:eventId/edit" element={<EventForm />} />
              <Route path="invitation" element={<Invitation />} />
              {/* <Route
                path="invitation/:ivitationId"
                element={<InvitationDashboardAttendee />}
              /> */}
              <Route path="account" element={<Account pfp={avatarURL} />} />
            </Routes>
            <div className="mt-auto "></div>
          </div>
        </div>
      </div>
    </LayoutContext.Provider>
  );
}

export default Workspace;
