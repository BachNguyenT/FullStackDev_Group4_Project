import Header from "@/components/Layout/components/Header";
import Sidebar from "@/components/Layout/components/Sidebar";
function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen h-screen flex">
      <Sidebar />
      <div className="container">
        <Header />
        <div className="content">{children}</div>
      </div>
    </div>
  );
}
export default DefaultLayout;
