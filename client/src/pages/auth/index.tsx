import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";


export const Auth = () => {

  return (
  <div className="sign-in-container"> 
   <SignedOut>
        <SignUpButton />
        <SignInButton />
      </SignedOut>
     
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
};