import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { SocketProvider } from "./components/providers/socket-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster"

import AuthGuard from "./guard/auth";
import Login from "./pages/login";
import Home from "./pages/home";
import Protected from "./pages/protected";
import UserManagement from "./pages/user-management";
import Settings from "./pages/settings";
import Database from "./pages/database";
import Verify from "./pages/verify";
import ServerManagement from "./pages/server-management";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/verify/:token",
    element: <Verify />,
  },
  {
    path: "/",
    element: <AuthGuard children={<Protected />} />,
    children: [
      {
        path: "/",
        element: <AuthGuard children={<Home />} />,
      },
      {
        path: "/database",
        element: <AuthGuard children={<Database />} />,
      },
      {
        path: "/user",
        element: <AuthGuard children={<UserManagement />} />,
      },
      {
        path: "/server",
        element: <AuthGuard children={<ServerManagement />} />,
      },
      {
        path: "/settings",
        element: <AuthGuard children={<Settings />} />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SocketProvider>
        <RouterProvider router={router} />
        <Toaster />
      </SocketProvider>
    </ThemeProvider>
  );
}

export default App;
