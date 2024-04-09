import { setToken } from "@/components/api/authApi";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Verify = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    console.log(token);
    // navigate("/");
  }, []);

  return (
    <div className="flex justify-center items-center h-screen w-screen"></div>
  );
};

export default Verify;
