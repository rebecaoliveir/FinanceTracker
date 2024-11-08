import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  useClerk
} from "@clerk/clerk-react";
import { Navigate, useNavigate } from "react-router-dom";
import logo from "./logo.png";
import "./sign-in-page.css";

export const Auth = () => {
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };
  return (
    <div className="sign-in-page">
      <SignedOut>
        <div className="sign-in-container">
          <img src={logo} alt="Cathedral Finances Logo" className="logo" />
          <SignInButton mode="modal">
            <button onClick={handleLogout}>LOG IN</button>
          </SignInButton>
        </div>
      </SignedOut>
      
      <SignedIn>
        <Navigate to="/dash" />
      </SignedIn>
    </div>
  );
};
