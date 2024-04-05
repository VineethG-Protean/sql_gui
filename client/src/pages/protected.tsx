import { Outlet } from "react-router-dom";
import SideBar from "../components/sidebar";
import TopBar from "../components/topbar";
import io from "socket.io-client";
import { useSocket } from "@/components/providers/socket-provider";
import { useEffect } from "react";

const Protected = () => {
  const { socket, setSocket } = useSocket();

  const handleSocketConnection = () => {
    const socket = io("http://localhost:3001");
    setSocket(socket);
  };

  useEffect(() => {
    handleSocketConnection();

    return () => {
      socket?.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col">
      <TopBar />
      <div className="flex">
        <SideBar />
        <div className="ms-20 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default Protected;
