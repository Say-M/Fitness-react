import React, { useState, useEffect } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import * as config from "../../config";

import FitnessCalculator from "./fitnessCalculator";
import NutritionPlanBasicInfo from "./basicInfoForm";
import NutritionPlanFinal from "./finalNutritionPlan";

export default function NutritionPlan(props) {
  const [displayView, setDisplayView] = useState("calculator"); // calculator ,  basic , final
  const defaultNutritionValue = {
    add_value_selection: "food",
    create_meal_day: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    view_day: "Monday",
    food_nutrition: [],
    suppliment_nutrition: [],
    meals: [],
    avoid_food: [],

  };

  const testval = {
    add_value_selection: "food",
    create_meal_day: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    view_day: "Monday",
    food_nutrition: [],
    suppliment_nutrition: [],
    meals: [
      
        { id: 1, meal_name: "Breakfast", time: "08:00:00" },
        { id: 2, meal_name: "Morning Snacks", time: "11:00:00" },
        { id: 3, meal_name: "Lunch", time: "13:00:00" },
        { id: 4, meal_name: "Evening Snacks", time: "17:00:00" },
        { id: 5, meal_name: "Dinner", time: "20:00:00" },
      
    ],
    avoid_food: [1, 2, 3, 4],
    name: "ssss",
    duration: "4",
    diet_category: "2",
    body_type: "Actomorph",
    trainer_id: "83",
    maintenance_calorie: "222",
    starts_from: "2020-10-16",
    ends_at: "2020-10-16",
    medical_history: [1, 2, 3, 4],
    water_intake: 6,
  };

  const [nutritionForm, setNutritionForm] = useState(testval);
  const updateNutritionForm = (data) => {
    setNutritionForm(Object.assign({}, nutritionForm, data));
  };
  const jwtToken = useSelector((state) => state.user.jwtToken);
  const [bodyTypeList, setBodyTypeList] = useState([]);
  const [dietCategoryList, setDietCategoryList] = useState([]);
  const [suplimentList, setSuplimentList] = useState([]);
  const [mealList, setMealList] = useState([]);
  const [foodList, setFoodList] = useState([]);
  const [trainerList, setTrainerList] = useState([]);
  const [medicalHistoryList, setMedicalHistoryList] = useState([]);
  const [avoidFoodList, setAvoidFoodList] = useState([]);

  useEffect(() => {
    fetchBasicData(jwtToken, "nutrition/body_type", (res) =>
      setBodyTypeList(res)
    );
    fetchBasicData(jwtToken, "nutrition/body_type", (res) =>
      setBodyTypeList(res)
    );
    fetchBasicData(jwtToken, "nutrition/diet_category", (res) =>
      setDietCategoryList(res)
    );
    fetchBasicData(jwtToken, "nutrition/suppliment", (res) => {
      console.log("suppliment", res);
      setSuplimentList(res);
    });
    fetchBasicData(jwtToken, "nutrition/meals", (res) => setMealList(res));
    fetchBasicData(jwtToken, "nutrition/food", (res) => setFoodList(res));
    fetchBasicData(jwtToken, "trainer", (res) => setTrainerList(res));
    fetchBasicData(jwtToken, "nutrition/medical_history", (res) =>
      setMedicalHistoryList(res)
    );
    fetchBasicData(jwtToken, "nutrition/avoid_food", (res) =>
      setAvoidFoodList(res)
    );
  }, []);

  const gotoCalculatorView = (view = "calculator") => {
    setDisplayView("calculator");
  };

  const gotoBasicInfoView = (view = "basic") => {
    setDisplayView("basic");
  };
  const gotoFinalNutritionPlanView = (view = "final") => {
    setDisplayView("final");
  };

  return (
    <div>
      <FitnessCalculator
        display={displayView == "calculator"}
        nextButton={gotoBasicInfoView}
        updateNutritionForm={updateNutritionForm}
      />
      <NutritionPlanBasicInfo
        display={displayView == "basic"}
        bodyTypeList={bodyTypeList}
        dietCategoryList={dietCategoryList}
        mealList={mealList}
        suplimentList={suplimentList}
        trainerList={trainerList}
        medicalHistoryList={medicalHistoryList}
        avoidFoodList={avoidFoodList}
        form={nutritionForm}
        updateForm={updateNutritionForm}
        nextButton={gotoFinalNutritionPlanView}
        prevButton={gotoCalculatorView}
      ></NutritionPlanBasicInfo>

      <NutritionPlanFinal
        display={displayView == "final"}
        form={nutritionForm}
        updateForm={updateNutritionForm}
        foodList = {foodList}
      />
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
