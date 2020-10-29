import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import * as config from "../config";

export default function BasicInfoNutritionPlan(props) {
  const dietCategoryListView = props.dietCategoryList.map((cat, index) => {
    return (
      <option value={cat?.id} key={index}>
        {cat.diet_category}
      </option>
    );
  });

  const bodyTypeListView = props.bodyTypeList.map((body, index) => {
    return (
      <option value={body?.id} key={index}>
        {body.body_type}
      </option>
    );
  });

  const mealListView = props.mealList.map((meal, index) => {
    return (
      <span key={index}>
        <input
          type="checkbox"
          name=""
          id={`#meal-list-${index}`}
          checked={props?.form?.meals?.indexOf(meal.id) > -1}
          onClick={(e) => {
            if (props?.form?.meals?.indexOf(meal.id) > -1) {
              let fArray = props?.form?.meals?.filter(
                (item) => item != meal.id
              );
              props.updateForm("meals", fArray);
            } else {
              if (props?.form?.meals) {
                const arr = [...props?.form?.meals];
                arr.push(meal.id);
                props.updateForm("meals", arr);
              } else {
                const arr = [];
                arr.push(meal.id);
                props.updateForm("meals", arr);
              }
            }
          }}
        />
        <label for={`#meal-list-${index}`}>{meal.meal_name}</label>
      </span>
    );
  });
  const supplimentListView = props.suplimentList.map((meal, index) => {
    return (
      <span key={index}>
        <input
          type="checkbox"
          name=""
          id="d1"
          checked={props?.form?.supliments?.indexOf(meal.id) > -1}
          onClick={(e) => {
            if (props?.form?.supliments?.indexOf(meal.id) > -1) {
              let fArray = props?.form?.supliments?.filter(
                (item) => item != meal.id
              );
              props.updateForm("supliments", fArray);
            } else {
              if (props?.form?.supliments) {
                const arr = [...props?.form?.supliments];
                arr.push(meal.id);
                props.updateForm("supliments", arr);
              } else {
                const arr = [];
                arr.push(meal.id);
                props.updateForm("supliments", arr);
              }
            }
          }}
        />
        <label for="d1">{meal.suppliment_name}</label>
      </span>
    );
  });
  const medicalHistoryListView = props.medicalHistoryList.map((h, index) => {
    return (
      <span key={index}>
        <input
          type="checkbox"
          name=""
          id="d1"
          checked={props?.form?.medical_history?.indexOf(h.id) > -1}
          onClick={(e) => {
            if (props?.form?.medical_history?.indexOf(h.id) > -1) {
              let fArray = props?.form?.medical_history?.filter(
                (item) => item != h.id
              );
              props.updateForm("medical_history", fArray);
            } else {
              if (props?.form?.medical_history) {
                const arr = [...props?.form?.medical_history];
                arr.push(h.id);
                props.updateForm("medical_history", arr);
              } else {
                const arr = [];
                arr.push(h.id);
                props.updateForm("medical_history", arr);
              }
            }
          }}
        />
        <label for="d1">{h.name}</label>
      </span>
    );
  });
  const avoidFoodListView = props.avoidFoodList.map((f, index) => {
    return (
      <span key={index}>
        <input
          type="checkbox"
          name=""
          id="d1"
          checked={props?.form?.avoid_food?.indexOf(f.id) > -1}
          onClick={(e) => {
            if (props?.form?.avoid_food?.indexOf(f.id) > -1) {
              let fArray = props?.form?.avoid_food?.filter(
                (item) => item != f.id
              );
              props.updateForm("avoid_food", fArray);
            } else {
              if (props?.form?.avoid_food) {
                const arr = [...props?.form?.avoid_food];
                arr.push(f.id);
                props.updateForm("avoid_food", arr);
              } else {
                const arr = [];
                arr.push(f.id);
                props.updateForm("avoid_food", arr);
              }
            }
          }}
        />
        <label for="d1">{f.name}</label>
      </span>
    );
  });

  const trainerListView = props.trainerList.map((trainer, index)=>{
  return (
    <option key={index} value={trainer.trainer_id}>
      {trainer.firstname + " " + trainer.lastname}
    </option>
  );
  })

  return (
    <div class="nutrationPlan">
      <div class="tab">
        <ul class="nav nav2">
          <li>
            <a data-toggle="tab" href="#NutrationPlan-tab" class="active">
              Nutration Plan
            </a>
          </li>
          <li>
            <a data-toggle="tab" href="#FitnessCalculator-tab">
              Fitness Calculator
            </a>
          </li>
        </ul>

        <div class="tab-content">
          <div id="NutrationPlan-tab" class="tab-pane scroll2 fade show active">
            <form class=" planinfo">
              <p class="input-typ">Meal Plan Name</p>
              <div class="input-with-error">
                <input
                  type="text"
                  class="input-field"
                  id="input1"
                  placeholder="Enter meal plan name"
                  value={props?.form?.name}
                  onChange={(e) => {
                    props.updateForm("name", e.target.value);
                  }}
                />
                {/* <label class="active">Error text</label> */}
              </div>
              <p class="input-typ">Duration</p>
              <div class="select-box-holder">
                <select
                  name=""
                  id=""
                  value={props?.form?.duration}
                  onChange={(e) => {
                    props.updateForm("duration", e.target.value);
                  }}
                >
                  <option>Select duration</option>
                  <option value={4}>4 Week</option>
                  <option value={8}>8 Week</option>
                  <option value={12}>12 Week</option>
                  <option value={16}>16 Week</option>
                  <option value={20}>20 Week</option>
                  <option value={24}>24 Week</option>
                </select>
              </div>
              <p class="input-typ">Category </p>
              <div class="select-box-holder">
                <select
                  name=""
                  id=""
                  value={props?.form?.diet_category}
                  onChange={(e) => {
                    props.updateForm("diet_category", e.target.value);
                  }}
                >
                  <option>Select diet category</option>
                  {dietCategoryListView}
                </select>
              </div>
              <p class="input-typ">Body Type</p>
              <div class="select-box-holder">
                <select
                  name=""
                  id=""
                  value={props?.form?.body_type}
                  onChange={(e) => {
                    props.updateForm("body_type", e.target.value);
                  }}
                >
                  <option value="">Select body type</option>
                  {bodyTypeListView}
                </select>
              </div>
              <p
                class="collapsebtn"
                data-toggle="collapse"
                href="#meal-collapse"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                {" "}
                Meals
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                    <path d="M119.5 326.9L3.5 209.1c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0L128 287.3l100.4-102.2c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L136.5 327c-4.7 4.6-12.3 4.6-17-.1z" />
                  </svg>
                </span>
              </p>
              <div class="collapse collapseddiv" id="meal-collapse">
                <div class="container weekdays mb-3">{mealListView}</div>
              </div>
              <p
                class="collapsebtn"
                data-toggle="collapse"
                href="#suppliment-collapse"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                {" "}
                Suppliment
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                    <path d="M119.5 326.9L3.5 209.1c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0L128 287.3l100.4-102.2c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L136.5 327c-4.7 4.6-12.3 4.6-17-.1z" />
                  </svg>
                </span>
              </p>
              <div class="collapse collapseddiv" id="suppliment-collapse">
                <div class="container weekdays mb-3">{supplimentListView}</div>
              </div>
              <p class="input-typ">Maintenance Calorie</p>
              <div class="input-with-error">
                <input
                  type="text"
                  class="input-field"
                  id="input1"
                  placeholder="Enter Address"
                  value={props?.form?.maintenance_calorie}
                  onChange={(e) => {
                    props.updateForm("maintenance_calorie", e.target.value);
                  }}
                />
                {/* <label class="active">Error text</label> */}
              </div>
              <p class="input-typ">Trainer Name</p>
              <div class="select-box-holder">
                <select
                  name=""
                  id=""
                  value={props?.form?.trainer_id}
                  onChange={(e) => {
                    props.updateForm("trainer_id", e.target.value);
                  }}
                >
                  <option value="">Select trainer</option>
                  {trainerListView}
                </select>
              </div>
              <p class="input-typ">Validity</p>
              <div class="input-with-error">
                <input
                  type="date"
                  class="input-field"
                  id="input1"
                  value={props?.form?.starts_from}
                  onChange={(e) => {
                    props.updateForm("starts_from", e.target.value);
                  }}
                />
              </div>
              <div class="input-with-error">
                <input
                  type="date"
                  class="input-field"
                  id="input1"
                  value={props?.form?.ends_at}
                  onChange={(e) => {
                    props.updateForm("ends_at", e.target.value);
                  }}
                />
              </div>

              <p class="input-typ">Water Intake</p>
              <div class="select-box-holder">
                <select
                  name=""
                  id=""
                  value={props?.form?.water_intake}
                  onChange={(e) => {
                    props.updateForm("water_intake", e.target.value);
                  }}
                >
                  <option value="">Select water intake</option>
                  <option value={1}>01 Litre</option>
                  <option value={2}>02 Litre</option>
                  <option value={3}>03 Litre</option>
                  <option value={4}>04 Litre</option>
                  <option value={5}>05 Litre</option>
                  <option value={6}>06 Litre</option>
                  <option value={7}>07 Litre</option>
                  <option value={8}>08 Litre</option>
                  <option value={9}>09 Litre</option>
                  <option value={10}>10 Litre</option>
                </select>
              </div>
              <p
                class="collapsebtn"
                data-toggle="collapse"
                href="#medical-collapse"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                {" "}
                Medical History{" "}
                <span>
                  <svg
                    class="hide"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 512"
                  >
                    <path d="M119.5 326.9L3.5 209.1c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0L128 287.3l100.4-102.2c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L136.5 327c-4.7 4.6-12.3 4.6-17-.1z" />
                  </svg>
                </span>
              </p>
              <div class="collapse collapseddiv" id="medical-collapse">
                <div class="container weekdays mb-3">
                  {medicalHistoryListView}
                </div>
              </div>
              <p
                class="collapsebtn"
                data-toggle="collapse"
                href="#food-collapse"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                {" "}
                Food Needs To Avoid
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                    <path d="M119.5 326.9L3.5 209.1c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0L128 287.3l100.4-102.2c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L136.5 327c-4.7 4.6-12.3 4.6-17-.1z" />
                  </svg>
                </span>
              </p>
              <div class="collapse collapseddiv" id="food-collapse">
                <div class="container weekdays mb-3">
                  {avoidFoodListView}
                </div>
              </div>
              <button class="btn-primary custom-primary-btn mt-4 centered2">
                SUBMIT
              </button>
            </form>
          </div>
          <div id="FitnessCalculator-tab" class="tab-pane px-4 fade ">
            <div class="fitnessCalculator">
              <h2 class="mt-4">Body Composition</h2>

              <p class="label">Body Type</p>
              <div class="box">
                <input type="text" />
              </div>
              <p class="label">Age</p>
              <div class="box">
                <input type="text" />
              </div>
              <p class="label">Gender</p>
              <div class="minbox1">
                <input type="radio" id="m12" name="gender" />
                <label for="m12">Male</label>
              </div>
              <div class="minbox2">
                <input type="radio" id="m22" name="gender" />
                <label for="m22">Female</label>
              </div>
              <p class="label">Height</p>
              <div class="minbox1">
                <input type="text" />
              </div>
              <div class="minbox2">
                <input type="text" />
              </div>
              <p class="label">Weight</p>
              <div class="box">
                <input type="text" />
              </div>
              <p class="label">BF</p>
              <div class="box">
                <input type="text" />
              </div>
              <p class="label">Goal</p>
              <div class="box">
                <select>
                  <option value="">Select</option>
                </select>
              </div>
              <p class="label">Activity</p>
              <div class="box">
                <select>
                  <option value="">Select</option>
                </select>
              </div>
              <div class="minbox1">
                <button
                  class="btn-success"
                  data-toggle="modal"
                  data-target="#settings-modal"
                >
                  {/* <!-- <img src="../material/SVG/wrench.svg" alt=""> --> */}
                  Settings
                </button>
              </div>
            </div>
            <hr />
            <div class="full2">
              <button type="submit" class="btn-danger br-25 ">
                <h5 class="mt-1">Reset</h5>
              </button>
              <button
                type="submit"
                class="btn-primary custom-primary-btn br-25"
              >
                <h5 class="mt-1">Calculate</h5>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
