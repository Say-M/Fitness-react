import React, { useState, useEffect } from "react";

import $ from "jquery";

window.jquery = window.$ = $;

export default function FitnessCalculatorForm({
  form,
  updateForm,
  skipButtonClick,
  resetButtonClick,
  calculateButtonClick,
}) {
  const [heightUnit, setHeightUnit] = useState("inch");
  const [weightUnit, setWeightUnit] = useState("kg");



  const updateHeight = (height) => {
    let inch = 0;
    let cm = 0;
    if (heightUnit == "inch") {
      inch = height;
      cm = 2.54 * height;
    } else {
      cm = height;
      inch = cm / 2.54;
    }
    updateForm({ height_cm: cm, height_inch: inch });
  };
  const updateWeight = (weight) => {
    let kg = 0;
    let lbs = 0;
    if (weightUnit == "kg") {
      kg = weight;
      lbs = 2.20462 * weight;
    } else {
      lbs = weight;
      lbs = weight / 2.20462;
    }
    updateForm({ weight_kg: kg, weight_lbs: lbs });
  };

  const checkAllDigit = (val) => {
    const re = /^[0-9\.]*$/;
    // console.log(val.match(re));
    return val.match(re) != null;
  };

  useEffect(() => {
    if ($) {
      $(".setting-btn").click(function () {
        $("#more-settings").slideToggle(300);
      });
    }
  }, [$]);

  return (
    <div class="col-md-5">
      <div class="bg-white left-fitness">
        <h1 class="bg-fitness-success title">Fitness Calculator</h1>
        <form class="p-4">
          <div class="form-group row">
            <label for="body-type" class="col-sm-4 col-form-label">
              Body Type
            </label>
            <div class="col-sm-8">
              <select
                class="custom-select"
                value={form.body_type}
                onChange={(e) => {
                  updateForm({ body_type: e.target.value });
                }}
              >
                {/* <option disabled value="0">Select body type</option> */}
                <option value="Actomorph">Actomorph</option>
                <option value="Mesomorph">Mesomorph</option>
                <option value="Endomorph">Endomorph</option>
              </select>
            </div>
          </div>
          <div class="form-group row">
            <label for="age" class="col-sm-4 col-form-label">
              Age
            </label>
            <div class="col-sm-8">
              <input
                type="text"
                class="form-control"
                id="age"
                placeholder="Enter Age"
                value={form.age ?? ""}
                onChange={(e) => {
                  let val = e.target.value;
                  if (checkAllDigit(val)) {
                    updateForm({ age: e.target.value });
                  }
                }}
              />
            </div>
          </div>
          <div class="form-group row">
            <label for="gender" class="col-sm-4 col-form-label">
              Gender
            </label>
            <div class="col-sm-8">
              <div class="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  class="custom-control-input"
                  checked={form.gender == "Male"}
                  onClick={(e) => {
                    updateForm({ gender: "Male" });
                  }}
                />
                <label class="custom-control-label" for="male">
                  Male
                </label>
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  class="custom-control-input"
                  checked={form.gender == "Female"}
                  onClick={(e) => {
                    updateForm({ gender: "Female" });
                  }}
                />
                <label class="custom-control-label" for="female">
                  Female
                </label>
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label for="height" class="col-sm-4 col-form-label">
              Height
            </label>
            <div class="col-6 col-sm-4">
              <input
                type="text"
                class="form-control"
                id="height"
                placeholder="Height"
                value={heightUnit == "inch" ? form.height_inch : form.height_cm}
                onChange={(e) => {
                  let val = e.target.value;
                  val = val.length ? val : "";
                  if (checkAllDigit(val)) {
                    updateHeight(val);
                  }
                }}
              />
            </div>
            <div class="col-6 col-sm-4">
              <div class="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  id="inch"
                  name="height"
                  class="custom-control-input"
                  checked={heightUnit == "inch"}
                  onClick={(e) => {
                    setHeightUnit("inch");
                  }}
                />
                <label class="custom-control-label" for="inch">
                  Inch
                </label>
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  id="cm"
                  name="height"
                  class="custom-control-input"
                  checked={heightUnit == "cm"}
                  onClick={(e) => {
                    setHeightUnit("cm");
                  }}
                />
                <label class="custom-control-label" for="cm">
                  cm
                </label>
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label for="weight" class="col-sm-4 col-form-label">
              Weight
            </label>
            <div class="col-6 col-sm-4">
              <input
                type="text"
                class="form-control"
                id="weight"
                placeholder="Weight"
                value={weightUnit == "kg" ? form.weight_kg : form.weight_lbs}
                onChange={(e) => {
                  let val = e.target.value;

                  val = val.length ? val : "";
                  if (checkAllDigit(val)) {
                    updateWeight(val);
                  }
                }}
              />
            </div>
            <div class="col-6 col-sm-4">
              <div class="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  id="kg"
                  name="weight"
                  class="custom-control-input"
                  checked={weightUnit == "kg"}
                  onClick={(e) => {
                    setWeightUnit("kg");
                  }}
                />
                <label class="custom-control-label" for="kg">
                  KG
                </label>
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  id="lbs"
                  name="weight"
                  class="custom-control-input"
                  checked={weightUnit == "lbs"}
                  onClick={(e) => {
                    setWeightUnit("lbs");
                  }}
                />
                <label class="custom-control-label" for="lbs">
                  lbs
                </label>
              </div>
            </div>
          </div>
          {/* <div class="form-group row">
            <label for="bf" class="col-sm-4 col-form-label">
              BF
            </label>
            <div class="col-sm-8">
              <input
                type="text"
                min="10"
                class="form-control"
                id="bf"
                placeholder="Enter BF"
                value={form.bf}
                onChange={(e) => {
                  let val = e.target.value;
                  // val = val.substring(-2)
                  if (checkAllDigit(val)) {
                    updateForm({ bf: e.target.value });
                  }
                }}
              />
            </div>
          </div> */}
          <div class="form-group row">
            <label for="goal" class="col-sm-4 col-form-label">
              Goal
            </label>
            <div class="col-sm-8">
              <select
                id="goal"
                class="custom-select"
                value={form.goal}
                onChange={(e) => {
                  updateForm({ goal: e.target.value });
                }}
              >
                {/* <option value="0">Select Goal</option> */}
                <option value="maintain_weight">Maintain Weight</option>
                <option value="mild_weight_loss_250">
                  Mild weight loss of 0.25 kg (0.5 lb) per week
                </option>
                <option value="weight_loss_500">
                  Weight loss of 0.5 kg (1 lb) per week
                </option>
                <option value="extreme_weight_loss_1000">
                  Extreme weight loss of 1 kg (2 lb) per week
                </option>
                <option value="mild_weight_gain_250">
                  Mild weight gain of 0.25 kg (0.5 lb) per
                </option>

                <option value="weight_gain_500">
                  Weight gain of 0.5 kg (1 lb) per
                </option>
                <option value="extreme_weight_gain_1000">
                  Extreme weight gain of 1 kg (2 lb) per
                </option>
              </select>
            </div>
          </div>
          <div class="form-group row">
            <label for="activity" class="col-sm-4 col-form-label">
              Activity
            </label>
            <div class="col-sm-8">
              <select
                id="activity"
                class="custom-select"
                value={form.activity}
                onChange={(e) => {
                  updateForm({ activity: e.target.value });
                }}
              >
                {/* <option value="0">Select activity</option> */}
                <option value="sedentary">
                  Sedentary: little or no exercise
                </option>
                <option value="light">Light: exercise 1-3 times/week </option>
                <option value="moderate">
                  Moderate: exercise 4-5 times/week
                </option>
                <option value="active">
                  Active: daily exercise or intense 3-4 times/week
                </option>
                <option value="very_active">
                  Very Active: intense exercise 6-7 times/week
                </option>
                <option value="extra_active">
                  Extra Active: very intense exercise daily, or physical job
                </option>
              </select>
            </div>
          </div>
          <div class="from-group row mt-5">
            <div class="col-12">
              <h3 class="font-weight-bold">
                More Settings
                <span class="pnt float-right setting-btn">
                  <i class="fas fa-cogs"></i>
                </span>
              </h3>
              <div class="row" id="more-settings" style={{ display: "none" }}>
                <h3 class="col-12 mt-3 mb-0">BMR estimation formula</h3>
                <div class="col-12">
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      id="customRadioInline1"
                      checked={form.formula == "miffin_st_jeor"}
                      onClick={(e) => {
                        updateForm({ formula: "miffin_st_jeor" });
                      }}
                      name="customRadioInline1"
                      class="custom-control-input"
                    />
                    <label
                      class="custom-control-label"
                      for="customRadioInline1"
                    >
                      Mifflin FT jeor
                    </label>
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      id="customRadioInline2"
                      name="customRadioInline1"
                      class="custom-control-input"
                      checked={form.formula == "revised_harris_benedict"}
                      onClick={(e) => {
                        updateForm({ formula: "revised_harris_benedict" });
                      }}
                    />
                    <label
                      class="custom-control-label"
                      for="customRadioInline2"
                    >
                      Revised Harris-Benedict
                    </label>
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      id="customRadioInline3"
                      name="customRadioInline3"
                      class="custom-control-input"
                      checked={form.formula == "katch_mcardle"}
                      onClick={(e) => {
                        updateForm({ formula: "katch_mcardle" });
                      }}
                    />
                    <label
                      class="custom-control-label"
                      for="customRadioInline3"
                    >
                      Katch-McArdle
                    </label>
                  </div>
                </div>
                <h3 class="col-12 mt-4 mb-0">Body Fat</h3>
                <div class="col-12">
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      id="customRadioInline12"
                      name="customRadioInline12"
                      class="custom-control-input"
                      checked={form.bf_method == "bmi"}
                      onClick={(e) => {
                        updateForm({ bf_method: "bmi" });
                      }}
                    />
                    <label
                      class="custom-control-label"
                      for="customRadioInline12"
                    >
                      BMI Method
                    </label>
                  </div>
                  <div class="custom-control custom-radio custom-control-inline">
                    <input
                      type="radio"
                      id="customRadioInline13"
                      checked={form.bf_method == "us_navy"}
                      onClick={(e) => {
                        updateForm({ bf_method: "us_navy" });
                      }}
                      name="customRadioInline13"
                      class="custom-control-input"
                    />
                    <label
                      class="custom-control-label"
                      for="customRadioInline13"
                    >
                      U.S. Navy Method
                    </label>
                  </div>
                </div>
                <div
                  class="col-4 my-3 custom-number-input"
                  style={
                    form?.bf_method == "us_navy" ? {} : { display: "none" }
                  }
                >
                  <input
                    type="number"
                    class="form-control"
                    id="neck"
                    placeholder="Neck"
                    value={form.neck != 0 ? form.neck : ""}
                    onChange={(e) => {
                      let val = e.target.value;
                      if (checkAllDigit(val)) {
                        updateForm({ neck: val });
                      }
                    }}
                  />
                </div>
                <div
                  class="col-4 my-3 custom-number-input"
                  style={
                    form?.bf_method == "us_navy" ? {} : { display: "none" }
                  }
                >
                  <input
                    type="number"
                    class="form-control"
                    id="waist"
                    placeholder="Waist"
                    value={form.waist != 0 ? form.waist : ""}
                    onChange={(e) => {
                      let val = e.target.value;
                      if (checkAllDigit(val)) {
                        updateForm({ waist: val });
                      }
                    }}
                  />
                </div>
                <div
                  class="col-4 my-3 custom-number-input"
                  style={
                    form?.bf_method == "us_navy" && form?.gender == 'Female' ? {} : { display: "none" }
                  }
                >
                  <input
                    type="number"
                    class="form-control"
                    id="hip"
                    placeholder="Hip"
                    value={form.hip != 0 ? form.hip : ""}
                    onChange={(e) => {
                      let val = e.target.value;
                      if (checkAllDigit(val)) {
                        updateForm({ hip: val });
                      }
                    }}
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-12 border-top text-center pt-3 mt-3">
                  <button
                    class="btn btn-outline-info mr-2"
                    onClick={(e) => {
                      e.preventDefault();
                      skipButtonClick();
                    }}
                  >
                    Skip
                  </button>
                  <button
                    class="btn btn-danger mx-2"
                    onClick={(e) => {
                      e.preventDefault();
                      resetButtonClick();
                    }}
                  >
                    Reset
                  </button>
                  <button
                    class="btn btn-primary ml-2"
                    onClick={(e) => {
                      e.preventDefault();
                      calculateButtonClick();
                    }}
                  >
                    Calculate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
