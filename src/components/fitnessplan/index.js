import React, { useState, useEffect } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import * as config from "../config";
import FitnessPlanIntroduction from "./introduction";
import NutritionPlan from "./nutritionplan";

export default function FitnessPlan(props) {
  const [displayView, setDisplayView] = useState("calculator");
  const path = useRouteMatch();


  return (
    <div className="work">
      <Switch>
        <Route exact path={`${path.path}/`}>
          <FitnessPlanIntroduction />
        </Route>
        <Route path={`${path.path}/nutrition`}>
          <NutritionPlan />
        </Route>
      </Switch>
    </div>
  );
}

function fetchBasicData(token, req, callback) {
  fetch(config.server + req, {
    headers: { Authorization: "Bearer " + token },
  })
    .then((response) => {
      //   console.log(response);
      return response.json();
    })
    .then((result) => {
      console.log(result);
      if (result.ok) {
        callback(result.message);
      } else {
        callback([]);
      }
    })
    .catch((err) => {
      console.log(err);
      callback([]);
    });
}
