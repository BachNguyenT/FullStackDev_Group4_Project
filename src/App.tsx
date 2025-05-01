//import the libraries
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import About from "./pages/info/About";
import PrivacyPolicy from "./pages/info/PrivacyPolicy";
import NotFoundPage from "./pages/others/NotFoundPage";
import Workspace from "./pages/user/Workspace";
import SessionValidator from "./route-protectors/SessionValidator";
import AdminWorkspace from "./pages/admin/AdminWorkspace";

//import the components

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Info pages */}
        <Route path="/terms" element={<PrivacyPolicy />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/not-found-page"
          element={<NotFoundPage returnTo="/workspace" />}
        />

        {/* Workspace Routes */}
        <Route
          path="/workspace/*"
          element={
            <SessionValidator>
              <Workspace />
            </SessionValidator>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <SessionValidator>
              <AdminWorkspace />
            </SessionValidator>
          }
        />

        {/* Resolve invalid paths*/}
        <Route path="*" element={<Navigate to="/not-found-page" />} />
      </Routes>
    </Router>
  );
}

export default App;
