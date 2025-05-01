import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LayoutContext } from "@/context/LayoutContext";
import { useRef } from "react";
import pfpPlaceholder from "@/assets/Icons/avatar-placeholder.svg";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Event from "@/pages/user/Event";
import EventBrowser from "@/pages/user/EventBrowser";
import Invitation from "@/pages/user/Invitation";
import Account from "@/pages/user/Account";
import EventDashboard from "@/pages/user/EventDashboard";
import EventForm from "@/pages/user/EventForm";
import EventEdit from "./EventEdit";
import InvitationDashboardAttendee from "./InvitationDashboardAttendee";
import EventAdd from "./EventAdd";
import DashBoard from "./DashBoard";
import SessionValidator from "@/route-protectors/SessionValidator";
import { fetchUserPFP } from "@/lib/api";

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

    fetchUserPFP(abortController.signal, undefined)
    .then((response) => {
      if (response.status == 200) {
        avatarURLRef.current = response.imageURL ? response.imageURL : pfpPlaceholder;
        setAvatarURL(response.imageURL ? response.imageURL : pfpPlaceholder);
      } else if (response.status == 401) {
        navigate("/login");
      } else {
        alert("Service temporarily unavailable. Please try again later.");
      }
    })

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
          className={`flex flex-col bg-white border-r border-gray-200 h-full ${
            sidebarOpen ? "w-[65px] md:w-full" : "w-full"
          }`}
        >
          <Header avatarURL={avatarURL} sidebarOpen={sidebarOpen} />
          <div className="overflow-y-auto overflow-x-scroll h-[calc(100vh-4rem)] bg-gray-50 border-t-1 border-gray-200">
            <Routes>
              {/* Dashboard of the workspace */}
              <Route path="" element={<div>
                <DashBoard sidebarOpen={sidebarOpen} /> <Footer />{" "}
              </div>} />

              {/* Resolve invalid path */}
              <Route path="*" element={<Navigate to="/not-found-page" />} />

              {/* Show all organizing events */}
              <Route
                path="event"
                element={
                  <div>
                    <Event sidebarOpen={sidebarOpen} />
                    <Footer />{" "}
                  </div>
              }
              />
              {/*Browser events */}
              <Route
                path="event-browser"
                element={
                <div>
                  <EventBrowser sidebarOpen={sidebarOpen} />
                  <Footer />{" "}
                </div>
                }
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

              <Route path="event/:eventId/edit" element={<EventForm />} />
              <Route path="invitation" element={
                <div>
                  <Invitation />
                  <Footer />{" "}
                </div>
            } />
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
