import React, { useEffect } from "react";
import {
  checkSession,
  getCurrentUser,
} from "../../context/authContext/localStorage";
import { useAuth } from "../../context/authContext/reducer";
import withDashboardLayout from "../../hoc/withDashboardLayout/withDashboardLayout";

function Dashboard() {
  const { signInSuccess } = useAuth();
  const isLogged = checkSession();

  useEffect(() => {
    if (isLogged) {
      const currentUser = getCurrentUser();
      signInSuccess(currentUser);
    }
  }, []);
  return (
    <>
      <h1>Dashboard</h1>
    </>
  );
}

export default withDashboardLayout(Dashboard);
