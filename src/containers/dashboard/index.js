import React from "react";
import Navbar from "../../components/Navbar";

const Dashboard = ({ role }) => {
  return (
    <React.Fragment>
      <Navbar role={role} />
      <div>
        <h5>DashBoard</h5>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
