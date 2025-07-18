// import libraries
import { createContext, useContext } from "react";

const LayoutContext = createContext<{
  sidebarOpen: boolean;
  toggleSidebar: () => void;
} | null>(null);

const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context) throw new Error("useLayout must be used within LayoutProvider");
  return context;
};

export { useLayoutContext, LayoutContext };
