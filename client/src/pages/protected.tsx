import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";

import { setUser } from "@/store/slices/userSlice";
import { getUserProfile } from "@/components/api/userApi";

import SideBar from "../components/sidebar";
import TopBar from "../components/topbar";
import { useSocket } from "@/components/providers/socket-provider";

const Protected = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { socket } = useSocket();

  const handleUserProfile = async () => {
    const response = await getUserProfile();
    dispatch(setUser(response.data.DATA));
  };

  useEffect(() => {
    handleUserProfile();
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") socket?.disconnect();
  }, [location]);

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
