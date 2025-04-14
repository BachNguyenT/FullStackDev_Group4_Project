//import the libraries
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Landing, Login } from "./pages";
import SessionValidator from "./utils/SessionValidator";

//import the components

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/landing' element={<SessionValidator><Landing /></SessionValidator>} />
      </Routes>
    </Router>
  );
}

export default App;
