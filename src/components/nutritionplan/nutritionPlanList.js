import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import * as config from "../config";

import EditImg from "../../material/SVG/edit.svg";
import TrashImg from "../../material/SVG/trash.svg";
import ScaleImg from "../../material/img/scale.PNG";

export default function NutritionPlanList(props) {
  const jwtToken = useSelector((state) => state.user.jwtToken);
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const [viewDetailsFood, setViewDetailsFood] = useState([]);

  useEffect(() => {
    let day = props.form.view_day;
    if (props?.form.add_value_selection == "food"){
      let arr = props.form.food_nutrition.filter(f=>{
        if (f.day == day){
          return f;
        }
      })
      setViewDetailsFood(arr)
    }
  }, [props.form.view_day, props.form.add_value_selection, props.form.food_nutrition, props.form.suppliment_nutrition]);

  const handleSubmitForm = (form) => {
    fetch(config.server + "nutrition", {
      headers: {
        Authorization: "Bearer " + jwtToken,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.ok) {
          props.updateForm("nutrition_id", result.message.nutrition_id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createMealDayView = days.map((day, index) => {
    return (
      <span>
        <input
          type="checkbox"
          name=""
          id="d1"
          checked={props?.form?.create_meal_day?.indexOf(day) > -1}
          onClick={(e) => {
            if (props?.form?.create_meal_day?.indexOf(day) > -1) {
              let fArray = props?.form?.create_meal_day?.filter(
                (item) => item != day
              );
              props.updateForm("create_meal_day", fArray);
            } else {
              if (props?.form?.create_meal_day) {
                const arr = [...props?.form?.create_meal_day];
                arr.push(day);
                props.updateForm("create_meal_day", arr);
              } else {
                const arr = [];
                arr.push(day);
                props.updateForm("create_meal_day", arr);
              }
            }
          }}
        />
        <label for="d1">{day}</label>
      </span>
    );
  });

  const selectDayView = days.map((day, index) => {
    return (
      <option value={day} key={index}>
        {day}
      </option>
    );
  });

  const checkAllDaySelected = (array) => {
    if (array) {
      let res = days.some((day) => array?.indexOf(day) == -1);
      return !res;
    } else {
      return false;
    }
  };

  const mealListView = props.mealList.map((meal, index) => {
    if (props?.form?.meals?.indexOf(meal?.id) > -1) {
      return (
        <option value={meal.id} key={index}>
          {" "}
          {meal.meal_name}{" "}
        </option>
      );
    }
    return null;
  });

  const supplimentListView = props.supplimentList.map((meal, index) => {
    if (props?.form?.supliments?.indexOf(meal?.id) > -1) {
      return (
        <option value={meal.id} key={index}>
          {" "}
          {meal.meal_name}{" "}
        </option>
      );
    }
    return null;
  });

  const viewDetailsFoodView = viewDetailsFood.map((f, index) => {
    return (
      <>
        <div class="column mt-3">
          <div class="body mt-2">
            <label for="">Name</label>
            <input
              type="text"
              class="datainput"
              disabled
              value={f?.details?.name}
            />
            <label for="">Cal</label>
            <input
              type="text"
              class="datainput"
              disabled
              placeholder="20"
              value={f?.details?.calorie}
            />
            <label for="">Protine</label>
            <input
              type="text"
              class="datainput"
              disabled
              placeholder="20"
              value={f?.details?.protein}
            />
            <label for="">Quantity</label>
            <input
              type="text"
              class="datainput"
              disabled
              placeholder="20"
              value={f?.quantity}
            />
            <label for="">Fat</label>
            <input
              type="text"
              class="datainput"
              disabled
              placeholder="20"
              value={f?.details?.fat}
            />
            <label for="">Carbs</label>
            <input
              type="text"
              class="datainput"
              disabled
              placeholder="20"
              value={f?.details?.carbohydrate}
            />
          </div>
        </div>
        <hr />
      </>
    );
  });

  return (
    <div class="nutrationPlan">
      <div class="tab">
        <div class="tab-content">
          <div id="everyday-tab" class="tab-pane p-3 scroll3 fade show active">
            <div class="full">
              <h4 class="regular mt-2">Create meal for: </h4>
            </div>
            <div
              class="container p-4 weekdays"
              style={{ background: "#E6E7E8" }}
            >
              <span>
                <input
                  type="checkbox"
                  name=""
                  id="d1"
                  checked={checkAllDaySelected(props?.form?.create_meal_day)}
                  onClick={(e) => {
                    const arr = props?.form?.create_meal_day
                      ? [...props?.form?.create_meal_day]
                      : [];
                    days.forEach((day) => {
                      if (arr.indexOf(day == -1)) {
                        arr.push(day);
                      }
                    });

                    props.updateForm("create_meal_day", arr);
                  }}
                />
                <label for="d1">Everyday</label>
              </span>
              {createMealDayView}
            </div>
            <div class="full mt-2">
              <h4 class="regular mt-2">Select Day</h4>
              <select
                name=""
                id=""
                class="check"
                value={props.form.view_day}
                onChange={(e) => {
                  props.updateForm("view_day", e.target.value);
                }}
              >
                <option value="">Select day</option>
                {selectDayView}
              </select>
            </div>
            <div class="container p-4 weekdays" style={{ fontSize: "14px" }}>
              <span>
                <input
                  type="checkbox"
                  name=""
                  id="d1"
                  checked={props.form.add_value_selection == "food"}
                  onClick={(e) => {
                    props.updateForm("add_value_selection", "food");
                  }}
                />
                <label for="d1">Meals</label>
              </span>
              <span>
                <input
                  type="checkbox"
                  name=""
                  id="d2"
                  checked={props.form.add_value_selection == "suppliment"}
                  onClick={(e) => {
                    props.updateForm("add_value_selection", "suppliment");
                  }}
                />
                <label for="d2">Suppliment</label>
              </span>
            </div>
            <div class="box9">
              <div
                class="content1"
                style={{
                  display:
                    props?.form?.add_value_selection == "food" ? "" : "none",
                }}
              >
                <h3>Meal</h3>
                <select
                  name=""
                  id=""
                  value={props?.form?.selected_meal}
                  onChange={(e) => {
                    const time = props?.mealList?.filter(
                      (m) => m.id == e.target.value
                    )[0].time;
                    props.setForm(
                      Object.assign({}, props?.form, {
                        selected_meal: e.target.value,
                        selected_meal_time: time,
                      })
                    );
                  }}
                >
                  <option>Select Meal</option>
                  {mealListView}
                </select>
                <input
                  type="time"
                  id="dde1"
                  value={props?.form?.selected_meal_time}
                  onChange={(e) => {
                    props.updateForm("selected_meal_time", e.target.value);
                  }}
                />
              </div>

              <div
                class="content1"
                style={{
                  display:
                    props?.form?.add_value_selection == "suppliment"
                      ? ""
                      : "none",
                }}
              >
                <h3>Suppliment</h3>
                <select
                  name=""
                  id=""
                  value={props?.form?.selected_meal}
                  onChange={(e) => {
                    const time = props?.supplimentList?.filter(
                      (m) => m.id == e.target.value
                    )[0].time;
                    props.setForm(
                      Object.assign({}, props?.form, {
                        selected_meal: e.target.value,
                        selected_meal_time: time,
                      })
                    );
                  }}
                >
                  <option>Select suppliment</option>
                  {supplimentListView}
                </select>
                <input
                  type="time"
                  id="dde1"
                  value={props?.form?.selected_meal_time}
                  onChange={(e) => {
                    props.updateForm("selected_meal_time", e.target.value);
                  }}
                />
              </div>
              <div class="content2 mt-4">
                <h2>Food</h2>
                <button
                  class="btn-primary hoveredbtn px-3 mb-1"
                  onClick={(e) => {
                    if (props?.form?.selected_meal) {
                      props.addFoodModalView(true);
                    } else {
                      alert("Please select meal");
                    }
                  }}
                >
                  + Add Food
                </button>
                <button class="btn-primary orangebtn px-3 mb-1">Edit</button>
              </div>
            </div>
            <div class="nutrationPlan p-4">
              <div class="box3 mb-4">{viewDetailsFoodView}</div>
              <textarea class="" placeholder="Note"></textarea>
              <div class="column mt-3">
                <div class="body">
                  <h2 class="total">Total</h2>
                  <label for="">Cal</label>
                  <input
                    type="text"
                    class="datainput"
                    disabled
                    placeholder="20"
                  />
                  <label for="">Protine</label>
                  <input
                    type="text"
                    class="datainput"
                    disabled
                    placeholder="20"
                  />
                  <label for="">Fat</label>
                  <input
                    type="text"
                    class="datainput"
                    disabled
                    placeholder="20"
                  />
                  <label for="">Carbs</label>
                  <input
                    type="text"
                    class="datainput"
                    disabled
                    placeholder="20"
                  />
                </div>
              </div>
              <button
                type="submit"
                class="btn-primary custom-primary-btn mt-4"
                onClick={(e) => {
                  handleSubmitForm(props?.form);
                }}
              >
                <h5 class="mt-1">
                  {props?.form?.nutrition_id ? "Update" : "Create"}
                  Nutration Plan
                </h5>
              </button>
            </div>

            <div class="double p-4" style={{ display: "none" }}>
              <div class="btns">
                <button class="mt-5">BMI</button>
                <button class="mt-5">BMR</button>
                <button class="mt-5">BF</button>
                <button class="mt-5">CAL</button>
                <button class="mt-5">Macros</button>
              </div>
              <div class="result">
                <p class="header">Result</p>
                <p class="info m-3">
                  BMI = 20.1 Kg/m <sup>2</sup> <span>(Normal)</span>
                </p>
                <div class="resultscale">
                  <img src={ScaleImg} alt="" />
                </div>
                <div class="subinfo">
                  {" "}
                  <div class="circle"></div> lorem ipsome color sity di amorser
                </div>
                <div class="subinfo">
                  {" "}
                  <div class="circle"></div> lorem ipsome color sity di amorser
                </div>
                <div class="subinfo">
                  {" "}
                  <div class="circle"></div> lorem ipsome color sity di amorser
                </div>

                <div class="full2 mt-5">
                  <button class="btn-primary">Save Data</button>
                  <button class="btn-primary">Goto Nutration</button>
                </div>
              </div>
            </div>
          </div>
          <div id="custom-tab" class="tab-pane pb-3 npcustom-tab fade">
            <div class="container weekdays pt-4 px-0">
              <span>
                <input type="checkbox" name="" id="d1" />
                <label for="d1">Sunday</label>
              </span>
              <span>
                <input type="checkbox" name="" id="d2" />
                <label for="d2">Monday</label>
              </span>
              <span>
                <input type="checkbox" name="" id="d3" />
                <label for="d3">TuesDay</label>
              </span>
              <span>
                <input type="checkbox" name="" id="d4" />
                <label for="d4">Wednesday</label>
              </span>
              <span>
                <input type="checkbox" name="" id="d5" />
                <label for="d5">Thurstday</label>
              </span>
              <span>
                <input type="checkbox" name="" id="d6" />
                <label for="d6">Friday</label>
              </span>
              <span>
                <input type="checkbox" name="" id="d7" />
                <label for="d7">Saturday</label>
              </span>
            </div>
            <div class=" meal mt-4">
              <label for="dd1">Meal</label>
              <select name="" id="dd1">
                <option>lorem ipsome</option>
                <option>lorem ipsome</option>
                <option>lorem ipsome</option>
              </select>
            </div>
            <div class="food mt-4">
              <input type="text" name="" id="" placeholder="Food" disabled />
              <button class="btn-primary hoveredbtn px-3 mb-1">
                + Add Food
              </button>
            </div>
            <div class="holder mt-4">
              <label for="f1">Name</label>
              <input type="text" placeholder="Enter Name" />
            </div>
            <div class="holder mt-2">
              <div class="holder">
                <label for="f1">Catagory</label>
                <input type="text" placeholder="Enter Catagory" />
              </div>
              <div class="holder">
                <label for="f1">Quantity</label>
                <input type="text" placeholder="Enter Quantity" />
              </div>
            </div>
            <div class="holder mt-2">
              <div class="holder">
                <label for="f1">Cal</label>
                <input type="text" placeholder="Enter Value" />
              </div>
              <div class="holder">
                <label for="f1">Protien</label>
                <input type="text" placeholder="Enter value" />
              </div>
            </div>
            <div class="holder mt-2">
              <div class="holder">
                <label for="f1">Fat</label>
                <input type="text" placeholder="Enter Value" />
              </div>
              <div class="holder">
                <label for="f1">Carbs</label>
                <input type="text" placeholder="Enter value" />
              </div>
            </div>

            <hr />
            <div class="box-5 mb-3">
              <button type="submit" class="btn-danger br-25 ">
                <h5 class="mt-1">Reset</h5>
              </button>
              <button
                type="submit"
                class="btn-primary custom-primary-btn br-25"
              >
                <h5 class="mt-1">Save</h5>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
