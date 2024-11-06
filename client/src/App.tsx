import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { Auth } from "./pages/auth";
import { FinancialRecordsProvider } from "./contexts/financial-record-context";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import { Alldata } from "./pages/all-data";
import { Calculator } from "./pages/dashboard/calculator";
import { useUser } from "@clerk/clerk-react";

// import { dark } from "@clerk/themes";

function App() {
  
  return (
    <Router>
      <div className="app-container">
        <div className="navbar">
        <Link to="/"> Form</Link>
        <Link to="/data"> All Givers</Link>
        <Link to="/calculator"> Calculator</Link>

       

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/"
          element={
            <FinancialRecordsProvider>
              <Dashboard />
              {/* <Alldata /> */}
            </FinancialRecordsProvider>
          }
        />
        <Route path="/data" element={<Alldata />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
