
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { authContext } from '../../Context/Auth';

export default function ProtectRoute({ children }) {

    const { token ,setToken } = useContext(authContext)


  
  if (localStorage.getItem("tkn") == null) {
    console.log("error from protectRoute");
    return <>
      <Navigate to={'/login'} />

    </>
  }

  return (
    <>
      {children}
    </>
  )
}
