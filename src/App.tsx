import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./assets/css/material-dashboard.css";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import SideNavbar from "./components/sidenavbars/sidenavbar";
import Dashboard from "./views/dashboard/dashboard";
import Footer from "./components/footers/footer";
import ReportProsessedController from "./views/report/controller/reportProcessedController";
import NewsController from "./views/news/controller/newsController";
import Agency from "./views/agency/agency";
import Data from "./views/data/data";
import SignIn from "./views/auth/signin/sign-in";
import AuthRoute from "./Auth";
import NewReportController from "./views/report/controller/newReportController";
import { useCallback, useEffect, useRef, useState } from "react";

function MainApp() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("isAuthenticated") === "true"
  );

  const INACTIVITY_TIMEOUT = 10 * 60 * 1000;
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
    resetTimeout();
  };

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    window.location.href = "/sign-in"; // Redirect to sign-in page
  }, []);

  const resetTimeout = useCallback(() => {
    if (timeoutId.current) clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(handleLogout, INACTIVITY_TIMEOUT);
  }, [handleLogout, INACTIVITY_TIMEOUT]);

  useEffect(() => {
    if (!isAuthenticated && location.pathname !== "/sign-in") {
      localStorage.removeItem("isAuthenticated");
    }

    if (isAuthenticated) {
      const events = ["click", "mousemove", "keypress", "scroll"];
      events.forEach((event) => window.addEventListener(event, resetTimeout));

      resetTimeout();

      return () => {
        if (timeoutId.current) clearTimeout(timeoutId.current);
        events.forEach((event) =>
          window.removeEventListener(event, resetTimeout)
        );
      };
    }
  }, [isAuthenticated, location.pathname, resetTimeout]);

  const isSignInPage = location.pathname === "/sign-in";

  return (
    <>
      {isSignInPage ? (
        <Routes>
          <Route path="/sign-in" element={<SignIn onLogin={handleLogin} />} />
        </Routes>
      ) : (
        <div className="g-sidenav-show bg-gray-100 ">
          <div className="d-flex flex-column min-vh-100">
            <SideNavbar />
            <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg flex-grow-1">
              <Routes>
                <Route
                  path="/"
                  element={
                    <AuthRoute isAuthenticated={isAuthenticated}>
                      <Dashboard />
                    </AuthRoute>
                  }
                />
                <Route
                  path="/laporan-masuk"
                  element={
                    <AuthRoute isAuthenticated={isAuthenticated}>
                      <NewReportController />
                    </AuthRoute>
                  }
                />
                <Route
                  path="/laporan-diproses"
                  element={
                    <AuthRoute isAuthenticated={isAuthenticated}>
                      <ReportProsessedController />
                    </AuthRoute>
                  }
                />
                <Route
                  path="/data"
                  element={
                    <AuthRoute isAuthenticated={isAuthenticated}>
                      <Data />
                    </AuthRoute>
                  }
                />
                <Route
                  path="/berita"
                  element={
                    <AuthRoute isAuthenticated={isAuthenticated}>
                      <NewsController />
                    </AuthRoute>
                  }
                />
                <Route
                  path="/instansi"
                  element={
                    <AuthRoute isAuthenticated={isAuthenticated}>
                      <Agency />
                    </AuthRoute>
                  }
                />
              </Routes>
              <Footer />
            </main>
          </div>
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <>
      <Router>
        <MainApp />
      </Router>
    </>
  );
}

export default App;
