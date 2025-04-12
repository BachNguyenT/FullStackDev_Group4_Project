// src/routes/index.tsx

import {
  Register,
  Login,
  PrivacyPolicy,
  About,
  Home,
  Event,
  EventDashboardHost,
  EventEdit,
  EventAdd,
  Invitation,
  InvitationDashboardAttendee,
  Account,
} from "@/pages";
import { DefaultLayout,NotFooterLayout } from "@/components/Layout";
import ProtectedRoute from "./ProtectedRoute"; // This is better than using relative '../routes/...'

// Public routes: accessible without authentication
const publicRoutes = [
  { path: "/register", component: Register, layout: null },
  { path: "/login", component: Login, layout: null },
  { path: "/terms", component: PrivacyPolicy, layout: null },
  { path: "/about", component: About, layout: null },
];

// Private routes: wrapped with ProtectedRoute
const privateRoutes = [
  { path: "/home", component: Home, layout: DefaultLayout },

  //Event router pages
  { path: "/event", component: Event, layout: DefaultLayout },
  { path: "/event/:eventId/dashboard", component: EventDashboardHost, layout: DefaultLayout,},
  { path: "/event/:eventId/edit", component: EventEdit, layout:NotFooterLayout ,},
  { path: "/event/addNewEvent", component: EventAdd, layout: NotFooterLayout},



  //Invitation router pages
  { path: "/invitation", component: Invitation, layout: DefaultLayout },
  { path: "/invitation/:invitationId/dashboard", component: InvitationDashboardAttendee, layout: DefaultLayout,},



  //Account router pages
  { path: "/account", component: Account, layout: DefaultLayout },
];

export { publicRoutes, privateRoutes, ProtectedRoute };
