//import state management
import { useState } from "react";
import { LayoutContext } from "@/context";

// import components and libraries

import Header from "@/components/Layout/components/Header";
import Sidebar from "@/components/Layout/components/Sidebar";
import Footer from "@/components/Layout/components/Footer";

function DefaultLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <LayoutContext.Provider value={{ sidebarOpen, toggleSidebar }}>
      <div className="w-screen h-screen flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Header */}
        <div className="flex flex-col flex-1 transition-all duration-300">
          <Header />

          {/* Children */}
          <div className="overflow-y-auto h-[calc(100vh-4rem)] p-4 bg-gray-50">
            {children}
            {/* Footer */}
            <div className="mt-auto ">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </LayoutContext.Provider>
  );
}

export default DefaultLayout;
