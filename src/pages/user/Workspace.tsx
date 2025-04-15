import { DefaultLayout } from "@/components/Layout";
import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";

function Workspace() {
  const [profilePic, setProfileImage] = useState("");

  return (
    <DefaultLayout>
      <Routes>
        <Route path="" element={<h1>Dashboard</h1>} />
        <Route path="*" element={<Navigate to="/not-found-page" />} />
      </Routes>
    </DefaultLayout>
  );
}

export default Workspace;
