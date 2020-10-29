import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import * as config from "../config";
import Header from "../common/header";
import { fetchBodyType, fetchBasicData } from "./fetchinfo.js";

import BasicInfoNutritionPlan from "./basicInfo";
import CalculateNutrition from "./calculateNutrition";
import NutritionPlanList from "./nutritionPlanList";
import AddFoodModal from "./addFoodModal.js";

export default function NutritionPlan(props) {
  const jwtToken = useSelector((state) => state.user.jwtToken);
  const [bodyTypeList, setBodyTypeList] = useState([]);
  const [dietCategoryList, setDietCategoryList] = useState([]);
  const [suplimentList, setSuplimentList] = useState([]);
  const [mealList, setMealList] = useState([]);
  const [foodList, setFoodList] = useState([]);
  const [trainerList, setTrainerList] = useState([]);
  const [medicalHistoryList, setMedicalHistoryList] = useState([]);
  const [avoidFoodList, setAvoidFoodList] = useState([]);

  const defaultNutritionValue = {
    add_value_selection: 'food',
    create_meal_day: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday', 'Sunday'],
    view_day: 'Monday',
    food_nutrition: [],
    suppliment_nutrition: [],
    meals : [1,2,3,4],

  }

  const [nutritionForm, setNutritionForm] = useState(defaultNutritionValue);
  const [modalShow, setModalShow] = useState(false);

  const updateNutritionForm = (entry, value) => {
    setNutritionForm(
      Object.assign({}, nutritionForm, {
        [entry]: value,
      })
    );
  };

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
    fetchBasicData(jwtToken, "nutrition/suppliment", (res) =>
    { 
      console.log('suppliment', res)
      setSuplimentList(res)
    }
    );
    fetchBasicData(jwtToken, "nutrition/meals", (res) => setMealList(res));
    fetchBasicData(jwtToken, "nutrition/food", (res) => setFoodList(res));
    fetchBasicData(jwtToken, "trainer", (res) => setTrainerList(res));
    fetchBasicData(jwtToken, "nutrition/medical_history", (res) => setMedicalHistoryList(res));
    fetchBasicData(jwtToken, "nutrition/avoid_food", (res) => setAvoidFoodList(res));
  }, []);
  return (
    <div className="work">
      {/* <Header title="Nutrition Plan " icon="icon-monthlyplan" /> */}
      <div className="nutration-div-holder">
        <BasicInfoNutritionPlan
          bodyTypeList={bodyTypeList}
          dietCategoryList={dietCategoryList}
          mealList={mealList}
          suplimentList={suplimentList}
          trainerList={trainerList}
          medicalHistoryList = {medicalHistoryList}
          avoidFoodList={avoidFoodList}
          form={nutritionForm}
          updateForm={updateNutritionForm}

        />
        <CalculateNutrition />
        <NutritionPlanList
          addFoodModalView={setModalShow}
          form={nutritionForm}
          updateForm={updateNutritionForm}
          setForm ={setNutritionForm}
          mealList={mealList}
          supplimentList={suplimentList}
        />
        <AddFoodModal
          show={modalShow}
          setShow={setModalShow}
          foodList={foodList}
          form = {nutritionForm}
          updateForm={updateNutritionForm}

        />
      </div>
    </div>
  );
}
