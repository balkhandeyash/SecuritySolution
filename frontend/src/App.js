import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Dashboard from "./modules/Dashboard";
import Login from "./modules/Login";
import Register from "./modules/Register";
import ProtectedRoute from "./modules/ProtectedRoute";
import LandingPage from "./modules/LandingPage";
import Header from "./modules/Header";
import Footer from "./modules/Footer";
import DashboardHeader from "./modules/DashboardHeader";
import Profile from "./modules/Profile";

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
