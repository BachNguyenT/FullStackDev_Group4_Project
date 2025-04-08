// src/routes/index.tsx

import { Register, Login, Home, Event, Invitation, Account } from "@/pages";
import { DefaultLayout } from "@/components/Layout";
import ProtectedRoute from "./ProtectedRoute"; // This is better than using relative '../routes/...'

// Public routes: accessible without authentication
const publicRoutes = [
  { path: "/register", component: Register, layout: null },
  { path: "/login", component: Login, layout: null },
];

// Private routes: wrapped with ProtectedRoute
const privateRoutes = [
  { path: "/home", component: Home, layout: DefaultLayout },
  { path: "/event", component: Event, layout: DefaultLayout },
  { path: "/invitation", component: Invitation, layout: DefaultLayout },
  { path: "/account", component: Account, layout: DefaultLayout },
];

export { publicRoutes, privateRoutes, ProtectedRoute };
