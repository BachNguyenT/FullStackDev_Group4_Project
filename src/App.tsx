//import the libraries
import { Fragment } from "react";
import { DefaultLayout } from "@/components/Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Login, NotFoundPage } from "@/pages";
import { privateRoutes, publicRoutes } from "@/routes";

import SessionValidator from "./utils/SessionValidator";

//import the components

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />


        {/* Public Routes */}
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          let Layout = DefaultLayout; // Default layout for all public routes
          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = ({ children }: { children: React.ReactNode }) => <Fragment>{children}</Fragment>;
          }
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


        {privateRoutes.map((route, index) => {
          const Page = route.component;
          let Layout = DefaultLayout; // Default layout for all private routes
          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = ({ children }: { children: React.ReactNode }) => <>{children}</>;
          }
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <SessionValidator>
                  <Layout>
                    <Page />
                  </Layout>
                </SessionValidator>
              }
            />
          );
        })}

        {/* Redirect to login if no route matches */}
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </Router>
  );
}

export default App;
