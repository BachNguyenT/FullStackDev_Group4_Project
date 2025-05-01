import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "@/App";
import { SearchModal } from "@/components/modals";
createRoot(document.getElementById("root")!).render(
  //   <StrictMode>
  <App />
  //    </StrictMode>
);
