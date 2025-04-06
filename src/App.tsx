import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { publicRoutes, privateRoutes } from "@/routes";
import { DefaultLayout } from "@/components/Layout";
import { Fragment } from "react";

import Login from "@/pages/auth/Login";
import ProtectedRoute from "@/lib/ProtectedRoute";
import { AuthProvider } from "@/lib/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Route: Login */}
            <Route path="/" element={<Login />} />

            {/* Public Routes */}
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              const Layout = route.layout || Fragment;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
            {/* Private Routes */}
            {privateRoutes.map((route, index) => {
              let Layout = DefaultLayout;
              if (route.layout) {
                Layout = route.layout;
              } else {
                Layout = Fragment;
              }

              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <Page />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
              );
            })}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
