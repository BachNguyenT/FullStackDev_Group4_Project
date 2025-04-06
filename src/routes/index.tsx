import Home from "@/pages/auth/user/Home";
import Event from "@/pages/auth/user/Event";
import Invitation from "@/pages/auth/user/Invitation";
import Account from "@/pages/auth/user/Account";
import Register from "@/pages/auth/Register";
import { DefaultLayout } from "@/components/Layout";

const publicRoutes = [];

// This is a list of routes that require authentication
const privateRoutes = [
  { path: "/home", component: Home, layout: DefaultLayout},
  { path: "/event", component: Event },
  { path: "/invitation", component: Invitation },
  { path: "/account", component: Account },
  { path: "/register", component: Register, layout: null },
];

export { publicRoutes, privateRoutes };
