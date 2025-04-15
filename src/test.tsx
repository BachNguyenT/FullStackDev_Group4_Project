import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from "react-router-dom";

function Test () {
    return (
        <div>
            <h1>Test</h1>
            <Routes>
                <Route path="about" element={<h1>About</h1>} />
                <Route path="terms" element={<h1>Terms</h1>} />
                <Route path="*" element={<Navigate to="/home"/>} />
            </Routes>
        </div>
    );
}

export default Test;