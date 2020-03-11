import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Button,
  FormControl,
  Form
} from "react-bootstrap";
import {
  Redirect,
  Link,
  BrowserRouter as Router,
  withRouter
} from "react-router-dom";

import { Logout } from "../../utils/userAuth";

const Navigationbar = ({ role, history }) => {
  return (
    <React.Fragment>
      {role && role === "manager" ? (
        <Navbar bg="light" expand="lg">
          <Navbar.Brand onClick={() => history.push("/alldevelopers")}>
            Employee Management System
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Router>
                <Link
                  to="/createprofile"
                  data-testid="createprofile"
                  onClick={() => history.push("/createprofile")}
                >
                  Add Developer
                </Link>
                <Link
                  to="/alldevelopers"
                  data-testid="alldevelopers"
                  onClick={() => history.push("/alldevelopers")}
                >
                  All Developer
                </Link>
              </Router>
            </Nav>
            <Nav>
              <Button
                data-testid="logout"
                onClick={() => Logout(history)}
                variant="outline-info"
              >
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      ) : (
        <Navbar bg="light" expand="lg" inverse fluid>
          <Navbar.Brand onClick={() => history.push("/dashboard")}>
            Employee Management System
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Router>
                <Link
                  data-testid="tasks"
                  to="/tasks"
                  onClick={() => history.push("/tasks")}
                >
                  Tasks
                </Link>
                <Link
                  data-testid="timings"
                  to="/timings"
                  onClick={() => history.push("/timings")}
                >
                  Timings
                </Link>
                <Link
                  to="/swapshift"
                  data-testid="swapshift"
                  onClick={() => history.push("/swapshift")}
                >
                  Swap Requests
                </Link>
              </Router>
            </Nav>
            <Nav>
              <Button
                data-testid="logout"
                onClick={() => Logout(history)}
                variant="outline-info"
              >
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )}
    </React.Fragment>
  );
};

export default withRouter(Navigationbar);
