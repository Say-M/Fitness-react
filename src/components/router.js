import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  Router,
} from "react-router-dom";

import Dashboard from "./dashboard";
import Admission from "./admission";
import Package from "./packages";
import Members from "./members/allMembers";
import Payment from "./payment";
import Attendance from "./attendance";
import FinanceFlow from "./finance_flow";
import WorkoutPlan from "./workoutplan"
import NutritionPlan from './nutritionplan'
import FitnessPlan from "./fitnessplan"

function AppRouter() {
  return (
    <Switch>
      <Route exact path="/admin/">
        <Dashboard />
      </Route>
      <Route exact path="/admin/admission">
        {" "}
        <Admission />
      </Route>
      <Route path="/admin/package">
        {" "}
        <Package />
      </Route>
      <Route path="/admin/members">
        {" "}
        <Members />
      </Route>
      <Route exact path="/admin/payment">
        {" "}
        <Payment />
      </Route>
      <Route path="/admin/attendance">
        {" "}
        <Attendance />
      </Route>
      <Route exact path="/admin/finance">
        {" "}
        <FinanceFlow />
      </Route>
      <Route exact path="/admin/workoutplan">
        {" "}
        <WorkoutPlan />
      </Route>
      <Route exact path="/admin/nutritionplan">
        {" "}
        <NutritionPlan />
      </Route>

      <Route path="/admin/fitnessplan">
        <FitnessPlan />
      </Route>

      <Redirect to="/admin/" />
    </Switch>
  );
}

export default AppRouter;
