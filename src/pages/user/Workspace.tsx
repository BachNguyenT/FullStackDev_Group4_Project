import DefaultLayout from "@/components/DefaultLayout/DefaultLayout.tsx";
import { Route, Routes, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AvatarContext, useAvatarContext,  } from "@/context/AvatarContext";
import { LayoutContext } from "@/context/LayoutContext";
import userDummyPFP from "@/assets/Icons/user-dummy.svg";

function Workspace() {
  const [avatarURL, setAvatarURL] = useState<string>(userDummyPFP);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  function toggleSidebar() : void {
    setSidebarOpen((prevState) => !prevState);
  }

  function fillPageData() : void {
    fetch("http://localhost:3000/get-user-pfp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        key: "5MLGUGJL4GMe86pG4CfrE241BxDYxkeI"
      },
      body: JSON.stringify({
        userID: "UID-2"
      }),
      credentials: "include"
    })
    .then((response) => response.blob())
    .then((data) => {
      const img = URL.createObjectURL(data);
      console.log(img);
      setAvatarURL(img);
    })
    .catch((err) => { console.log(err) })
  }

  useEffect(() => {
    const abortController = new AbortController();

    fillPageData();

    return () => {
      console.log(avatarURL);
      URL.revokeObjectURL(avatarURL); // Clean up the object URL when the component unmounts
      setAvatarURL(userDummyPFP); // Reset to default image
      abortController.abort();
    };
  }, []);

  return (
    <AvatarContext.Provider value={{ avatarURL, setAvatarURL }}>
        <LayoutContext.Provider value={{ sidebarOpen, toggleSidebar }}>
          <DefaultLayout useFooter={true}>
            <Routes>
              <Route path="" element={<h1>Dashboard</h1>} />
              <Route path="*" element={<Navigate to="/not-found-page" />} />
            </Routes>
          </DefaultLayout>
        </LayoutContext.Provider>
    </AvatarContext.Provider>
  );
}

export default Workspace;
