import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/components/providers/theme-provider";

import AuthGuard from "./guard/auth";
import Login from "./pages/login";
import Home from "./pages/home";
import Protected from "./pages/protected";
import User from "./pages/user";
import Settings from "./pages/settings";
import Database from "./pages/database";
import { SocketProvider } from "./components/providers/socket-provider";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
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
        element: <AuthGuard children={<User />} />,
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
      </SocketProvider>
    </ThemeProvider>
  );
}

export default App;
