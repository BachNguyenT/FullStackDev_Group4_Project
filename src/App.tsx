//import libraries
import { BrowserRouter as Router, Route, Routes,Navigate } from "react-router-dom";

// import components
import {Login , Register} from "./pages/auth";
import {About , PrivacyPolicy} from "./pages/info";
import {NotFoundPage} from "./pages/others";
import {Workspace} from "./pages/user";
import AdminWorkspace from "./pages/admin/AdminWorkspace";
import SessionValidator from "./route-protectors/SessionValidator";

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
