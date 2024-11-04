import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { Auth } from "./pages/auth";
import { FinancialRecordsProvider } from "./contexts/financial-record-context";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import { Alldata } from "./pages/all-data";
// import { dark } from "@clerk/themes";

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="navbar">
          <Link to="/"> Dashboard</Link>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <FinancialRecordsProvider>
                 <Dashboard />
              
             {/*  <Alldata /> */}
              </FinancialRecordsProvider>
            }
          />
          <Route path="/auth" element={<Auth />} />
          <Route path="/data" element={<Alldata />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
