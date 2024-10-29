import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import logo from "./logo.png";
import "./sign-in-page.css";

export const Auth = () => {
  return (
    <div className="sign-in-page">
      <SignedOut>
      
  
      
    
        <div className="sign-in-container">
          <img src={logo} alt="Cathedral Finances Logo" className="logo" />
          <SignInButton mode="modal">
            <button>LOG IN</button>
          </SignInButton>
        </div>
      </SignedOut>
      
      <SignedIn>
        <Navigate to="/" />
      </SignedIn>
    </div>
  );
};
