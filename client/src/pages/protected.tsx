import { Outlet } from "react-router-dom";
import SideBar from "../components/sidebar";
import TopBar from "../components/topbar";
import io from "socket.io-client";
import { useSocket } from "@/components/providers/socket-provider";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserProfile } from "@/components/api/userApi";
import { setUser } from "@/store/slices/userSlice";

const Protected = () => {
  const dispatch = useDispatch();
  const { socket, setSocket } = useSocket();

  const handleSocketConnection = () => {
    const socket = io("http://localhost:3001");
    setSocket(socket);
  };

  const handleUserProfile = async () => {
    const response = await getUserProfile();
    dispatch(setUser(response.data.DATA));
  };

  useEffect(() => {
    // handleSocketConnection();
    handleUserProfile();
    // return () => {
    //   socket?.disconnect();
    // };
  }, []);

  return (
    <div className="flex flex-col h-full">
      <TopBar />
      <div className="flex h-full">
        <SideBar />
        <div className="ms-20 w-full p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default Protected;
