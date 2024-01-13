import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import LandingPage from "./LandingPage";
import Header from "./Header";
import Footer from "./Footer";
import DashboardHeader from "./DashboardHeader";
import Profile from "./Profile";

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <LandingPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Header />
                <Login setToken={setToken} />
                <Footer />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <Header />
                <Register />
                <Footer />
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              token ? (
                <ProtectedRoute
                  element={
                    <>
                      <DashboardHeader />
                      <Dashboard />
                      <Footer />
                    </>
                  }
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/profile"
            element={
              token ? (
                <ProtectedRoute
                  element={
                    <>
                      <DashboardHeader />
                      <Profile />
                      <Footer />
                    </>
                  }
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/myappliedjobs"
            element={
              token ? (
                <ProtectedRoute
                  element={
                    <>
                      <DashboardHeader />
                      <Footer />
                    </>
                  }
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
