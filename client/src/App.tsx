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
  const { user } = useUser();
  
  return (
    <Router>
      <div className="app-container">
        <div className="navbar">
          {user ? (
            <>
              <Link to="/"> Form</Link>
              <Link to="/data"> All Givers</Link>
              <Link to="/calculator"> Calculator</Link>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </>
          ) : (<></>)}
        </div>
        <Routes>
        <Route
          path="/"
          element={
            <FinancialRecordsProvider>
              <Auth />
            </FinancialRecordsProvider>
          }
        />
        <Route path="/dash" element={ <FinancialRecordsProvider> <Dashboard /> </FinancialRecordsProvider>} />
        <Route path="/data" element={ <FinancialRecordsProvider> <Alldata /> </FinancialRecordsProvider>} />
        <Route path="/calculator" element={ <FinancialRecordsProvider> <Calculator /> </FinancialRecordsProvider>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
