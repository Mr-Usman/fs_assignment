import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import FallBack from "./components/fallbackUI";

const Signin = lazy(() => import("./containers/signin"));
const Dashboard = lazy(() => import("./containers/dashboard"));
const CreateProfile = lazy(() => import("./containers/createProfile"));
const EditProfile = lazy(() => import("./containers/editProfile"));
const GetAllDevelopers = lazy(() => import("./containers/getAllUsers"));
const SwapShifts = lazy(() => import("./containers/swapShifts"));
const ApproveDrops = lazy(() => import("./containers/approveDrops"));
const AssignTask = lazy(() => import("./containers/assignTask"));
const AssignShift = lazy(() => import("./containers/assignShift"));

const developerTasks = lazy(() => import("./containers/developer/task"));
const userShiftTiming = lazy(() =>
  import("./containers/developer/shiftTiming")
);
const matchUsers = lazy(() => import("./containers/developer/matchUsers"));
const swapShift = lazy(() => import("./containers/developer/swapShift"));

const Routes = () => {
  return (
    <React.Fragment>
      <Router>
        <Suspense fallback={<FallBack />}>
          <Switch>
            <Route exact path="/signin" component={Signin}></Route>
            <PrivateRoute component={Dashboard} path="/dashboard" exact />
            <PrivateRoute
              component={CreateProfile}
              path="/createprofile"
              exact
            />
            <PrivateRoute component={EditProfile} path="/editprofile" exact />
            <PrivateRoute
              component={SwapShifts}
              path="/userSwappedShifts"
              exact
            />
            <PrivateRoute component={ApproveDrops} path="/approvedrops" exact />
            <PrivateRoute component={AssignShift} path="/assignshift" exact />
            <PrivateRoute component={AssignTask} path="/assigntask" exact />
            <PrivateRoute
              component={GetAllDevelopers}
              path="/alldevelopers"
              exact
            />
            <PrivateRoute component={developerTasks} path="/tasks" exact />
            <PrivateRoute component={userShiftTiming} path="/timings" exact />
            <PrivateRoute component={matchUsers} path="/matchusers" exact />
            <PrivateRoute component={swapShift} path="/swapshift" exact />
          </Switch>
        </Suspense>
      </Router>
    </React.Fragment>
  );
};

export default Routes;
