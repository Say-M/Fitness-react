import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from 'moment'
import * as config from "../config";
import Header from "../common/header";

import CreateWorkOutPlan from "./createworkoutplan"
import SelectWorkoutPlan from "./selectWorkoutPlan"
import WorkoutPlanList from "./workoutplanlist"

export default function WorkoutPlan(props) {


    return(
        <div className="work">
            {/* <Header title="Workout Plan " icon="icon-monthlyplan" /> */}
            <div className="nutration-div-holder">
                <CreateWorkOutPlan />
                <SelectWorkoutPlan />
                <WorkoutPlanList />
            </div>
        </div>

    )
}