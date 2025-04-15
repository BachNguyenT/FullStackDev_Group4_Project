import { Route, Routes, Navigate } from "react-router-dom";
import DefaultLayout from "@/components/Layout/DefaultLayout/DefaultLayout";
import NotFoundPage from "../others/NotFoundPage";

function Home() {
  return (
    <div>
      <DefaultLayout>
        <Routes>
          <Route path="" element={<h1>Dashboard</h1>} />
          <Route path="about" element={<h1>About</h1>} />
          <Route path="terms" element={<h1>Terms</h1>} />
          <Route path="*" element={<Navigate to="/not-found-page" />} />
        </Routes>
      </DefaultLayout>
    </div>
  );
}

export default Home;
