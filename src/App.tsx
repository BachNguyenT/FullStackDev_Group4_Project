//import the libraries
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { About, Login, NotFoundPage, Register } from "@/pages";
import  Test  from "@/test.tsx";
import Home from "./pages/user/Home";

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
        <Route path="/terms" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route path="/not-found-page" element={<NotFoundPage returnTo="/home"/>} />

        {/* Protected Routes */}
        <Route path="/home/*" element={<Home />} />

        {/* Workspace Routes */}
        <Route path="/workspace/*" element={<Test />} />

        {/* Resolve invalid paths*/}
        <Route path="*" element={<Navigate to="/not-found-page" />} />
      </Routes>
    </Router>
  );
}

export default App;
