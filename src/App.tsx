//import the libraries
import { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//import the components
import { Login } from "@/pages";
import { DefaultLayout } from "@/components/Layout";
import { AuthProvider } from "@/context";
import { publicRoutes, privateRoutes, ProtectedRoute } from "@/routes";

function App() {
  return (
    //<AuthProvider>
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
              Layout = ({ children }: { children: React.ReactNode }) => (
                <Fragment>{children}</Fragment>
              );
            }

            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  //<ProtectedRoute>
                  <Layout>
                    <Page />
                  </Layout>
                  //</ProtectedRoute>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
    //</AuthProvider>
  );
}

export default App;
