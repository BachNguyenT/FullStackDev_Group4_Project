import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LayoutContext } from "@/context/LayoutContext";
import { useRef } from "react";
import userDummyPFP from "@/assets/Icons/avatar-placeholder.svg";
import Sidebar from "@/components/DefaultLayout/components/Sidebar";
import Header from "@/components/DefaultLayout/components/Header";
import Footer from "@/components/DefaultLayout/components/Footer";
import Event from "@/pages/user/Event";
import Invitation from "@/pages/user/Invitation";
import Account from "@/pages/user/Account";
import EventDashboardHost from "@/pages/user/EventDashboardHost";
import EventEdit from "./EventEdit";
import InvitationDashboardAttendee from "./InvitationDashboardAttendee";

function Workspace() {
  const [avatarURL, setAvatarURL] = useState<string>(userDummyPFP);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const avatarURLRef = useRef<string>(userDummyPFP);

  function toggleSidebar(): void {
    setSidebarOpen((prevState) => !prevState);
  }

  async function fetchPFP () {
    try {
      const response = await fetch("http://localhost:3000/get-user-pfp", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          key: "5MLGUGJL4GMe86pG4CfrE241BxDYxkeI",
        },
        credentials: "include"
      });
      
      if (response.ok) {
        const imageBlob = await response.blob();
        const imageURL = URL.createObjectURL(imageBlob);
        avatarURLRef.current = imageURL;
        setAvatarURL(imageURL);
        return;
      }
    }
    catch {
      return;
    }
  }



  useEffect(() => {
    const abortController = new AbortController();

    fetchPFP();

    return () => {
      URL.revokeObjectURL(avatarURLRef.current); // Clean up the object URL when the component unmounts
      abortController.abort();
    };
  }, []);

  return (
      <LayoutContext.Provider value={{ sidebarOpen, toggleSidebar }}>
        <div className="w-screen h-screen flex overflow-hidden">
          <Sidebar />
          <div className="flex flex-col flex-1 transition-all duration-300">
            <Header avatarURL={avatarURL} />
            <div className="overflow-y-auto h-[calc(100vh-4rem)] px-1 py-2  bg-gray-50">
              <Routes>
                <Route path="" element={<div>Name</div>} />
                <Route path="*" element={<Navigate to="/not-found-page" />} />
                <Route
                  path="event"
                  element={<Event sidebarOpen={sidebarOpen} />}
                />
                <Route
                  path="event/${eventId}/dashboard"
                  element={<EventDashboardHost />}
                />
                <Route path="event/${eventId}/edit" element={<EventEdit />} />
                <Route path="invitation" element={<Invitation />} />
                <Route
                  path="invitation/${invitation.id}/dashboard"
                  element={<InvitationDashboardAttendee />}
                />

                <Route path="account" element={<Account />} />
              </Routes>
              <div className="mt-auto ">
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </LayoutContext.Provider>
  );
}

export default Workspace;
