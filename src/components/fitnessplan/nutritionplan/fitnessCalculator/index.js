import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import * as config from "../../../config";

import { alertShow, successShow } from "../../../common/reduxFunctions";

import FitnessCalculatorForm from "./fitnessCalculatorForm";
import FitnessCalculatorResult from "./fitnessCalculatorResult";
export default function FitnessCalculator({ display, nextButton, updateNutritionForm }) {
  const jwtToken = useSelector((state) => state.user.jwtToken);

  const defaultCalculatorValue = {
    height_inch: 66,
    height_cm: 167,
    weight_kg: 68,
    weight_lbs: 0,
    gender: "Male",
    formula: "miffin_st_jeor",
    neck: 0,
    waist: 0,
    hip: 0,
    age: 26,
    body_type: "Actomorph",
    goal: "maintain_weight",
    activity: "sedentary",
    bf: 0,
    bf_method: "bmi",
  };
  const defaultResultValue = {
    bmi: 0,
    bmi_range_from: 18.5,
    bmi_range_to: 25,
    bmi_healthy_weight_from: 0,
    bmi_healthy_weight_to: 0,
    bmi_ponderal_index: 0,
    bmr: 0,
    maintain_weight_calorie: 0,
    required_calorie: 0,
    choose_diet: "balanced",
    estimation_curb: 0,
    estimation_protein: 0,
    estimation_fat: 0,
    macro_curb_gm: 0,
    macro_curb_cal: 0,
    macro_protein_gm: 0,
    macro_protein_cal: 0,
    macro_fat_gm: 0,
    macro_fat_cal: 0,
    bf_method: "bmi",
    bf: 0,
  };

  const calorie_const = {
    sedentary: 1.2,
    light: 1.37,
    moderate: 1.46,
    active: 1.55,
    very_active: 1.72,
    extra_active: 1.9,
  };

  const goal_cal_val = {
    maintain_weight: 0,
    mild_weight_loss_250: -250,
    weight_loss_500: -500,
    extreme_weight_loss_1000: -1000,
    mild_weight_gain_250: 250,
    weight_gain_500: 500,
    extreme_weight_gain_1000: 1000,
  };

  const [calculatorForm, setCalculatorForm] = useState(defaultCalculatorValue);
  const [resultData, setResultData] = useState(defaultResultValue);

  const updateCalculatorForm = (data) => {
    setCalculatorForm(Object.assign({}, calculatorForm, data));
  };
  const updateResultData = (data) => {
    setResultData(Object.assign({}, resultData, data));
  };

  const calculateResult = (form = calculatorForm) => {
    setResultData(Object.assign({}, resultData, getBMIData(), getBMRData()));
  };

  const getBMIData = (form = calculatorForm) => {
    let bmiData = {
      bmi: 0,
      bmi_range_from: 18.5,
      bmi_range_to: 25,
      bmi_healthy_weight_from: 0,
      bmi_healthy_weight_to: 0,
      bmi_ponderal_index: 0,
      bmi_status: "normal",
      bmi_status_class: "success",
      bf: 0,
    };
    if (form.height_cm > 0) {
      let h = form.height_cm / 100;
      let h2 = h * h;
      let w = form.weight_kg;
      bmiData.bmi = w / h2;
      bmiData.bmi_healthy_weight_from = bmiData.bmi_range_from * h2;
      bmiData.bmi_healthy_weight_to = bmiData.bmi_range_to * h2;
      bmiData.bmi_ponderal_index = w / (h2 * h);
      if (bmiData.bmi < 18) {
        bmiData.bmi_status = "Under Weight";
        bmiData.bmi_status_class = "warning";
      } else if (bmiData.bmi > 25 && bmiData.bmi < 30) {
        bmiData.bmi_status = "Over Weight";
        bmiData.bmi_status_class = "warning";
      } else if (bmiData.bmi > 30) {
        bmiData.bmi_status = "Obesity";
        bmiData.bmi_status_class = "danger";
      }
      bmiData = Object.assign({}, bmiData, getBf(bmiData, form));
    }
    return bmiData;
  };

  const getBMRData = (form = calculatorForm) => {
    const data = {
      bmr: 0,
      sedentary: 0,
      light: 0,
      active: 0,
      very_active: 0,
      extra_active: 0,
    };
    let H = form.height_cm;
    let W = form.weight_kg;
    let F = form.bf;
    let A = form.age;
    if (form.formula == "miffin_st_jeor") {
      if (form.gender == "Male") {
        data.bmr = 10 * W + 6.25 * H - 5 * A + 5;
      } else {
        data.bmr = 10 * W + 6.25 * H - 5 * A - 161;
      }
    }

    data.maintain_weight_calorie = data.bmr * calorie_const[form.activity];
    data.required_calorie =
      data.maintain_weight_calorie + goal_cal_val[form.goal];
    return data;
  };

  const getMicroEstimate = (data = resultData) => {
    let r = data.required_calorie;
    let d = {
      macro_curb_gm: 0,
      macro_curb_cal: 0,
      macro_protein_gm: 0,
      macro_protein_cal: 0,
      macro_fat_gm: 0,
      macro_fat_cal: 0,
    };
    if (data.choose_diet == "balanced") {
      d = {
        macro_curb_gm: Math.round((r * 0.6) / 4),
        macro_curb_cal: Math.round(r * 0.6),
        macro_protein_gm: Math.round((r * 0.3) / 4),
        macro_protein_cal: Math.round(r * 0.3),
        macro_fat_gm: Math.round((r * 0.1) / 9),
        macro_fat_cal: Math.round(r * 0.1),
      };
    }
    return d;
  };

  const getBf = (data, form = resultData) => {
    const adultAge = 25;
    const age = form.age;
    let bf = 0;
    let bf_bmi = 0;
    let bmi = data.bmi;
    if (form.gender == "Male") {
      if (form.age < adultAge) {
        bf_bmi = 1.51 * bmi - 0.7 * age - 2.2;
      } else {
        bf_bmi = 1.2 * bmi + 0.23 * age - 16.2;
      }
    } else {
      if (form.age < adultAge) {
        bf_bmi = 1.51 * bmi - 0.7 * age + 1.4;
      } else {
        bf_bmi = 1.2 * bmi + 0.23 * age - 5.4;
      }
    }
    bf = bf_bmi;
    if (form.bf_method != "bmi") {
      let neck = parseInt(form.neck);
      let waist = parseInt(form.waist);
      let hip = parseInt(form.hip);
      let height = parseInt(form.height_cm);
      if (
        neck > 0 &&
        waist > 0 &&
        (hip > 0) | (form.gender == "Male") &&
        waist - neck > 0
      ) {
        bf = 495;
        if (form.gender == "Male") {
          let wn = 0.19077 * Math.log10(waist - neck);
          let h = 0.15456 * Math.log10(height);
          bf /= 1.0324 - wn + h;
        } else {
          bf /=
            1.29579 -
            0.35004 * Math.log10(waist + hip - neck) +
            0.221 * Math.log10(height);
        }
        bf -= 450;
      } else {
        alertShow("Please provide body fat information properly.");
      }
    }
    const [bf_status, bf_status_class] = getBodyFatCategory(bf);

    return {
      bf: bf,
      bf_bmi: bf_bmi,
      bf_status: bf_status,
      bf_status_class: bf_status_class,
    };
  };

  const getBodyFatCategory = (bf, gender) => {
    let status = "No Fat";
    let status_class = "danger";
    if (gender == "Male") {
      if (bf >= 2 && bf <= 5) {
        status_class = "warning";
        status = "Essential fat";
      } else if (bf > 5 && bf <= 13) {
        status_class = "success";
        status = "Athlete";
      } else if (bf > 13 && bf <= 17) {
        status_class = "primary";
        status = "Fitness";
      } else if (bf > 17 && bf <= 25) {
        status_class = "warning";
        status = "Average";
      } else if (bf > 25) {
        status_class = "danger";
        status = "Obese";
      }
    } else {
      if (bf >= 10 && bf <= 13) {
        status_class = "warning";
        status = "Essential fat";
      } else if (bf > 13 && bf <= 20) {
        status_class = "success";
        status = "Athlete";
      } else if (bf > 20 && bf <= 24) {
        status_class = "primary";
        status = "Fitness";
      } else if (bf > 24 && bf <= 31) {
        status_class = "warning";
        status = "Average";
      } else if (bf > 31) {
        status_class = "danger";
        status = "Obese";
      }
    }
    return [status, status_class];
  };

  useEffect(() => {
    updateResultData(getMicroEstimate());
  }, [resultData.choose_diet, resultData.required_calorie]);

  const skipButtonClick = () => {
    console.log("skip");
    nextButton("basic");
  };
  const resetButtonClick = () => {
    console.log("reset");
    setCalculatorForm(defaultCalculatorValue);
  };
  const calculateButtonClick = (form = calculatorForm) => {
    if ((form.age > 0, form.height_cm > 0, form.weight_kg > 0)) {
      calculateResult(form);
    } else {
      alertShow("Please fill up form");
    }
  };

  return (
    <div className="fitness-calc px-0 container-fluid">
      <div className="row" style={display ? {} : { display: "none" }}>
        <FitnessCalculatorForm
          form={calculatorForm}
          updateForm={updateCalculatorForm}
          skipButtonClick={skipButtonClick}
          resetButtonClick={resetButtonClick}
          calculateButtonClick={calculateButtonClick}
        />
        <FitnessCalculatorResult
          data={resultData}
          updateData={updateResultData}
        />
      </div>
    </div>
  );
}
