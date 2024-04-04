import React, { ReactNode, useEffect, useState } from "react";

const AuthGuard: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState<boolean>(true); //set to false

  useEffect(() => {
    /* 
        Logic to check authenticated state

        if(yes) setAuthenticated(true)
        else    setAuthenticated(false) -> redirect to login page
    */
  }, []);

  return <>{authenticated && children}</>;
};

export default AuthGuard;
