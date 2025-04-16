// NOTICE: This component requires the following context hooks: LayoutContext and AvatarContext

// Import components and libraries
import Header from "@/components/DefaultLayout/components/Header";
import Sidebar from "@/components/DefaultLayout/components/Sidebar";
import Footer from "@/components/DefaultLayout/components/Footer";

function DefaultLayout({ children, useFooter }: { children: React.ReactNode, useFooter : boolean }) {
  return (
      <div className="w-screen h-screen flex overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 transition-all duration-300">
          <Header />
          <div className="overflow-y-auto h-[calc(100vh-4rem)] p-4 bg-gray-50">
            {children}
            <div className="mt-auto ">
              {useFooter && <Footer />}
            </div>
          </div>
        </div>
      </div>
  );
}

export default DefaultLayout;
