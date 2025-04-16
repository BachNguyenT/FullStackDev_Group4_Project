import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AvatarContext } from "@/context/AvatarContext";
import { LayoutContext } from "@/context/LayoutContext";
import { useRef } from "react";
import userDummyPFP from "@/assets/Icons/user-dummy.svg";
import Sidebar from "@/components/DefaultLayout/components/Sidebar";
import Header from "@/components/DefaultLayout/components/Header";
import Footer from "@/components/DefaultLayout/components/Footer";

function Workspace() {
  const [avatarURL, setAvatarURL] = useState<string>(userDummyPFP);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const avatarURLRef = useRef<string>(userDummyPFP);

  function toggleSidebar(): void {
    setSidebarOpen((prevState) => !prevState);
  }

  function fillPageData(): void {
    fetch("http://localhost:3000/get-user-pfp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        key: "5MLGUGJL4GMe86pG4CfrE241BxDYxkeI",
      },
      body: JSON.stringify({
        userID: "UID-2",
      }),
      credentials: "include",
    })
      .then((response) => response.blob())
      .then((data) => {
        const img = URL.createObjectURL(data);
        avatarURLRef.current = img; 
        setAvatarURL(img);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    const abortController = new AbortController();

    fillPageData();

    return () => {
      URL.revokeObjectURL(avatarURLRef.current); // Clean up the object URL when the component unmounts
      abortController.abort();
    };
  }, []);

  return (
    <AvatarContext.Provider value={{ avatarURL, setAvatarURL }}>
      <LayoutContext.Provider value={{ sidebarOpen, toggleSidebar }}>
        <div className="w-screen h-screen flex overflow-hidden">
          <Sidebar />
          <div className="flex flex-col flex-1 transition-all duration-300">
            <Header avatarURL={avatarURL}/>
            <div className="overflow-y-auto h-[calc(100vh-4rem)] p-4 bg-gray-50">
              <Routes>
                <Route path="" element={
                <div>
                  Home
                </div>} />
                <Route path="*" element={<Navigate to="/not-found-page" />} />
              </Routes>
              <div className="mt-auto ">
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </LayoutContext.Provider>
    </AvatarContext.Provider>
  );
}

export default Workspace;
