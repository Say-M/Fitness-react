import React, { useState, useEffect } from "react";
import MealPlan from './mealPlan';
import $ from "jquery";

window.jquery = window.$ = $;

export default function NutritionPlanFinal({
  display,
  form,
  updateForm,
  foodList,
}) {
  const dayList = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const dayListView = dayList.map((day, index) => {
    return (
      <option key={index} value={day}>
        {" "}
        {day}
      </option>
    );
  });

  const selectDayView = dayList.map((day, index) => {
    return (
      <div class="custom-control custom-checkbox custom-control-inline">
        <input
          type="checkbox"
          className="custom-control-input"
          id={`customCheck-day-${index}`}
        />
        <label class="custom-control-label" for={`customCheck-day-${index}`}>
          {day}
        </label>
      </div>
    );
  });

  return (
    <div class="row" style={display ? {} : { display: "none" }}>
      <div class="col-12">
        <div class="full-fitness bg-white">
          <div class="tab">
            <ul class="nav">
              <li>
                <a data-toggle="tab" href="#meal-plan-tab" class="active">
                  Meal Plan
                </a>
              </li>
              <li>
                <a data-toggle="tab" href="#suppliment-plan-tab">
                  Suppliment Plan
                </a>
              </li>
            </ul>
            <div class="tab-content">

      <div id="meal-plan-tab" class="tab-pane fade show active">
        <MealPlan form={form} updateForm={updateForm} foodList={foodList}
         
        />      </div>
          <div id="suppliment-plan-tab" class="tab-pane fade">
                <div class="full-fitness-section">
                  <div class="meal-section">
                    <div class="diet-choose bg-white">
                      <h3>Choose Your Diet</h3>
                      <div class="col-12 mb-4">
                        <div class="custom-control mr-5 custom-checkbox custom-control-inline">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="customCheck1"
                          />
                          <label
                            class="custom-control-label"
                            for="customCheck1"
                          >
                            Balance
                          </label>
                        </div>
                        <div class="custom-control mr-5 custom-checkbox custom-control-inline">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="customCheck1"
                          />
                          <label
                            class="custom-control-label"
                            for="customCheck1"
                          >
                            Low fat
                          </label>
                        </div>
                        <div class="custom-control mr-5 custom-checkbox custom-control-inline">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="customCheck1"
                          />
                          <label
                            class="custom-control-label"
                            for="customCheck1"
                          >
                            High Protine
                          </label>
                        </div>
                        <div class="custom-control mr-5 custom-checkbox custom-control-inline">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="customCheck1"
                          />
                          <label
                            class="custom-control-label"
                            for="customCheck1"
                          >
                            Low Curb
                          </label>
                        </div>
                        <div class="custom-control mr-5 custom-checkbox custom-control-inline">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="create-own"
                            value="own"
                          />
                          <label class="custom-control-label" for="create-own">
                            Create your own
                          </label>
                        </div>
                      </div>
                      <h3 class="mb-3">Macro Estimation</h3>
                      <div class="col-12">
                        <div class="macron-ranges row">
                          <div class="col-md-3">
                            <div class="macron-data">
                              <p>Carbs</p>
                              <div class="cal-need">
                                <span>325gm</span>
                                <span class="bg-fitness-primary px-1">
                                  1300 cal
                                </span>
                              </div>
                            </div>
                            <p class="own-range">
                              Carbs <input type="range" />
                            </p>
                          </div>
                          <div class="col-md-3">
                            <div class="macron-data">
                              <p>Protine</p>
                              <div class="cal-need">
                                <span>325gm</span>
                                <span class="bg-fitness-primary px-1">
                                  1300 cal
                                </span>
                              </div>
                            </div>
                            <p class="own-range">
                              Protine <input type="range" />
                            </p>
                          </div>
                          <div class="col-md-3">
                            <div class="macron-data">
                              <p>Fat</p>
                              <div class="cal-need">
                                <span>325gm</span>
                                <span class="bg-fitness-primary px-1">
                                  1300 cal
                                </span>
                              </div>
                            </div>
                            <p class="own-range">
                              Fat <input type="range" />
                            </p>
                          </div>
                          <div class="col-md-3">
                            <p class="total-cal">
                              Calories Required
                              <span class="bg-fitness-primary px-2 ml-3 rounded">
                                1200<small>cal</small>
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="tab bottom-tab">
                      <ul class="nav">
                        <li>
                          <a
                            data-toggle="tab"
                            href="#suppliment-tab"
                            class="active"
                          >
                            Suppliment
                          </a>
                        </li>
                        <li>
                          <a data-toggle="tab" href="#suppliment-list-tab">
                            Suppliment List
                          </a>
                        </li>
                      </ul>
                      <div class="tab-content">
                        <div
                          id="suppliment-tab"
                          class="meal-tables bg-white tab-pane fade show active"
                        >
                          <div class="meal-table-section" id="meal-table">
                            <h3>Suppliment Day</h3>
                            <div class="select">
                              <select class="custom-select">
                                <option selected>Select day</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                              </select>
                            </div>
                            <h3 class="title-bar border-bottom pb-3">
                              <span class="bg-fitness-secondary">
                                Before Breakfast
                              </span>
                              <div class="opt">
                                <div class="time">
                                  Time :
                                  <span class="bg-fitness-primary">
                                    7:30 PM
                                  </span>
                                </div>
                                <button class="btn-add hoveredbtn px-3 mb-1">
                                  + Add Food
                                </button>
                              </div>
                            </h3>
                            <div class="table-responsive">
                              <table class="table table-hover text-nowrap table-borderless">
                                <tbody>
                                  <tr>
                                    <td>
                                      <div class="table-items">
                                        <span>Name</span>
                                        <span class="ml-2 mute-area">Egg</span>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="table-items">
                                        <span>Quantity</span>
                                        <input
                                          value="02"
                                          disabled
                                          type="number"
                                          min="0"
                                          class="form-control form-control-sm"
                                          style={{ width: "70px" }}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      <div class="table-items">
                                        <span>Cal</span>
                                        <span class="ml-2 mute-area">
                                          30cal
                                        </span>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="table-items">
                                        <span>Protine</span>
                                        <span class="ml-2 mute-area">
                                          30cal
                                        </span>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="table-items">
                                        <span>Fat</span>
                                        <span class="ml-2 mute-area">
                                          30cal
                                        </span>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="table-items">
                                        <span>Carbs</span>
                                        <span class="ml-2 mute-area">
                                          30cal
                                        </span>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="table-items">
                                        <img
                                          src="../material/SVG/edit.svg"
                                          class="action_icon edit-table"
                                          alt=""
                                        />
                                        <img
                                          style={{ display: "none" }}
                                          src="../material/SVG/update.svg"
                                          class="action_icon edit-done"
                                          alt=""
                                        />
                                        <img
                                          src="../material/SVG/trash.svg"
                                          class="action_icon"
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div class="table-items">
                                        <span>Name</span>
                                        <span class="ml-2 mute-area">Egg</span>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="table-items">
                                        <span>Quantity</span>
                                        <input
                                          value="02"
                                          disabled
                                          type="number"
                                          min="0"
                                          class="form-control form-control-sm"
                                          style={{ width: "70px" }}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      <div class="table-items">
                                        <span>Cal</span>
                                        <span class="ml-2 mute-area">
                                          30cal
                                        </span>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="table-items">
                                        <span>Protine</span>
                                        <span class="ml-2 mute-area">
                                          30cal
                                        </span>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="table-items">
                                        <span>Fat</span>
                                        <span class="ml-2 mute-area">
                                          30cal
                                        </span>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="table-items">
                                        <span>Carbs</span>
                                        <span class="ml-2 mute-area">
                                          30cal
                                        </span>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="table-items">
                                        <img
                                          src="../material/SVG/edit.svg"
                                          class="action_icon edit-table"
                                          alt=""
                                        />
                                        <img
                                          style={{ display: "none" }}
                                          src="../material/SVG/update.svg"
                                          class="action_icon edit-done"
                                          alt=""
                                        />
                                        <img
                                          src="../material/SVG/trash.svg"
                                          class="action_icon"
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div class="table-items">
                                        <span>Name</span>
                                        <span class="ml-2 mute-area">Egg</span>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="table-items">
                                        <span>Quantity</span>
                                        <input
                                          value="02"
                                          disabled
                                          type="number"
                                          min="0"
                                          class="form-control form-control-sm"
                                          style={{ width: "70px" }}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      <div class="table-items">
                                        <span>Cal</span>
                                        <span class="ml-2 mute-area">
                                          30cal
                                        </span>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="table-items">
                                        <span>Protine</span>
                                        <span class="ml-2 mute-area">
                                          30cal
                                        </span>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="table-items">
                                        <span>Fat</span>
                                        <span class="ml-2 mute-area">
                                          30cal
                                        </span>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="table-items">
                                        <span>Carbs</span>
                                        <span class="ml-2 mute-area">
                                          30cal
                                        </span>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="table-items">
                                        <img
                                          src="../material/SVG/edit.svg"
                                          class="action_icon edit-table"
                                          alt=""
                                        />
                                        <img
                                          style={{ display: "none" }}
                                          src="../material/SVG/update.svg"
                                          class="action_icon edit-done"
                                          alt=""
                                        />
                                        <img
                                          src="../material/SVG/trash.svg"
                                          class="action_icon"
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                                <tfoot>
                                  <tr>
                                    <td></td>
                                    <td></td>
                                    <td class="bg-light">
                                      <div class="table-items px-2">
                                        <span>Cal</span>
                                        <span class="px-2 bg-fitness-primary">
                                          120cal
                                        </span>
                                      </div>
                                    </td>
                                    <td class="bg-light">
                                      <div class="table-items px-2">
                                        <span>Portion</span>
                                        <span class="px-2 bg-fitness-primary">
                                          120cal
                                        </span>
                                      </div>
                                    </td>
                                    <td class="bg-light">
                                      <div class="table-items px-2">
                                        <span>Fat</span>
                                        <span class="px-2 bg-fitness-primary">
                                          120cal
                                        </span>
                                      </div>
                                    </td>
                                    <td class="bg-light">
                                      <div class="table-items px-2">
                                        <span>Carbs</span>
                                        <span class="px-2 bg-fitness-primary">
                                          120cal
                                        </span>
                                      </div>
                                    </td>
                                    <td class="bg-light"></td>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
                            <h3 class="title-bar border-bottom pb-3">
                              <span class="bg-fitness-secondary">
                                Before Lunch
                              </span>
                              <div class="opt">
                                <div class="time">
                                  Time :
                                  <span class="bg-fitness-primary">
                                    7:30 PM
                                  </span>
                                </div>
                                <button class="btn-add hoveredbtn px-3 mb-1">
                                  + Add Food
                                </button>
                              </div>
                            </h3>
                            <div class="table-responsive">
                              <table class="table table-hover text-nowrap table-borderless">
                                <tbody>
                                  <tr>
                                    <td>
                                      <div class="table-items">
                                        <span>Name</span>
                                        <span class="ml-2 mute-area">Egg</span>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="table-items">
                                        <span>Quantity</span>
                                        <input
                                          value="02"
                                          disabled
                                          type="number"
                                          min="0"
                                          class="form-control form-control-sm"
                                          style={{ width: "70px" }}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      <div class="table-items">
                                        <span>Cal</span>
                                        <span class="ml-2 mute-area">
                                          30cal
                                        </span>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="table-items">
                                        <span>Protine</span>
                                        <span class="ml-2 mute-area">
                                          30cal
                                        </span>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="table-items">
                                        <span>Fat</span>
                                        <span class="ml-2 mute-area">
                                          30cal
                                        </span>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="table-items">
                                        <span>Carbs</span>
                                        <span class="ml-2 mute-area">
                                          30cal
                                        </span>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="table-items">
                                        <img
                                          src="../material/SVG/edit.svg"
                                          class="action_icon edit-table"
                                          alt=""
                                        />
                                        <img
                                          style={{ display: "none" }}
                                          src="../material/SVG/update.svg"
                                          class="action_icon edit-done"
                                          alt=""
                                        />
                                        <img
                                          src="../material/SVG/trash.svg"
                                          class="action_icon"
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div class="table-items">
                                        <span>Name</span>
                                        <span class="ml-2 mute-area">Egg</span>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="table-items">
                                        <span>Quantity</span>
                                        <input
                                          value="02"
                                          disabled
                                          type="number"
                                          min="0"
                                          class="form-control form-control-sm"
                                          style={{ width: "70px" }}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      <div class="table-items">
                                        <span>Cal</span>
                                        <span class="ml-2 mute-area">
                                          30cal
                                        </span>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="table-items">
                                        <span>Protine</span>
                                        <span class="ml-2 mute-area">
                                          30cal
                                        </span>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="table-items">
                                        <span>Fat</span>
                                        <span class="ml-2 mute-area">
                                          30cal
                                        </span>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="table-items">
                                        <span>Carbs</span>
                                        <span class="ml-2 mute-area">
                                          30cal
                                        </span>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="table-items">
                                        <img
                                          src="../material/SVG/edit.svg"
                                          class="action_icon edit-table"
                                          alt=""
                                        />
                                        <img
                                          style={{ display: "none" }}
                                          src="../material/SVG/update.svg"
                                          class="action_icon edit-done"
                                          alt=""
                                        />
                                        <img
                                          src="../material/SVG/trash.svg"
                                          class="action_icon"
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div class="table-items">
                                        <span>Name</span>
                                        <span class="ml-2 mute-area">Egg</span>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="table-items">
                                        <span>Quantity</span>
                                        <input
                                          value="02"
                                          disabled
                                          type="number"
                                          min="0"
                                          class="form-control form-control-sm"
                                          style={{ width: "70px" }}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      <div class="table-items">
                                        <span>Cal</span>
                                        <span class="ml-2 mute-area">
                                          30cal
                                        </span>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="table-items">
                                        <span>Protine</span>
                                        <span class="ml-2 mute-area">
                                          30cal
                                        </span>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="table-items">
                                        <span>Fat</span>
                                        <span class="ml-2 mute-area">
                                          30cal
                                        </span>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="table-items">
                                        <span>Carbs</span>
                                        <span class="ml-2 mute-area">
                                          30cal
                                        </span>
                                      </div>
                                    </td>
                                    <td>
                                      <div class="table-items">
                                        <img
                                          src="../material/SVG/edit.svg"
                                          class="action_icon edit-table"
                                          alt=""
                                        />
                                        <img
                                          style={{ display: "none" }}
                                          src="../material/SVG/update.svg"
                                          class="action_icon edit-done"
                                          alt=""
                                        />
                                        <img
                                          src="../material/SVG/trash.svg"
                                          class="action_icon"
                                          alt=""
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                                <tfoot>
                                  <tr>
                                    <td></td>
                                    <td></td>
                                    <td class="bg-light">
                                      <div class="table-items px-2">
                                        <span>Cal</span>
                                        <span class="px-2 bg-fitness-primary">
                                          120cal
                                        </span>
                                      </div>
                                    </td>
                                    <td class="bg-light">
                                      <div class="table-items px-2">
                                        <span>Portion</span>
                                        <span class="px-2 bg-fitness-primary">
                                          120cal
                                        </span>
                                      </div>
                                    </td>
                                    <td class="bg-light">
                                      <div class="table-items px-2">
                                        <span>Fat</span>
                                        <span class="px-2 bg-fitness-primary">
                                          120cal
                                        </span>
                                      </div>
                                    </td>
                                    <td class="bg-light">
                                      <div class="table-items px-2">
                                        <span>Carbs</span>
                                        <span class="px-2 bg-fitness-primary">
                                          120cal
                                        </span>
                                      </div>
                                    </td>
                                    <td class="bg-light"></td>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
                            <div class="row border-top nutrationPlan-footer pt-4 text-right">
                              <p class="col-sm-6">
                                Calorie Earned :
                                <span class="text-white p-1 bg-warning rounded">
                                  1,588<small>cal</small>
                                </span>
                              </p>
                              <p class="col-sm-6">
                                Protine :
                                <span class="text-white p-1 bg-warning rounded">
                                  1,588<small>cal</small>
                                </span>
                              </p>
                              <p class="col-sm-6">
                                Fat :
                                <span class="text-white p-1 bg-warning rounded">
                                  1,588<small>cal</small>
                                </span>
                              </p>
                              <p class="col-sm-6">
                                Carbs :
                                <span class="text-white p-1 bg-warning rounded">
                                  1,588<small>cal</small>
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          id="suppliment-list-tab"
                          class="food-list-table tab-pane fade"
                        >
                          <div class="meal-table-section" id="meal-table">
                            <h3 class="title-bar d-inline">Select Day</h3>
                            <div class="mt-3 mb-5 ml-3">
                              <div class="custom-control custom-checkbox custom-control-inline">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customCheck1"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customCheck1"
                                >
                                  Saturdary
                                </label>
                              </div>
                              <div class="custom-control custom-checkbox custom-control-inline">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customCheck1"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customCheck1"
                                >
                                  Sunday
                                </label>
                              </div>
                              <div class="custom-control custom-checkbox custom-control-inline">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customCheck1"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customCheck1"
                                >
                                  Monday
                                </label>
                              </div>
                              <div class="custom-control custom-checkbox custom-control-inline">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customCheck1"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customCheck1"
                                >
                                  Tuesday
                                </label>
                              </div>
                              <div class="custom-control custom-checkbox custom-control-inline">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customCheck1"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customCheck1"
                                >
                                  Wednesday
                                </label>
                              </div>
                              <div class="custom-control custom-checkbox custom-control-inline">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customCheck1"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customCheck1"
                                >
                                  Thursday
                                </label>
                              </div>
                              <div class="custom-control custom-checkbox custom-control-inline">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customCheck1"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customCheck1"
                                >
                                  Friday
                                </label>
                              </div>
                            </div>
                            <h3
                              style={{ position: "static" }}
                              class="title-bar d-inline"
                            >
                              Select Suppliment
                            </h3>
                            <div class="mt-2 ml-3">
                              <div class="custom-control custom-checkbox custom-control-inline">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customCheck1"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customCheck1"
                                >
                                  Breakfast
                                </label>
                              </div>
                              <div class="custom-control custom-checkbox custom-control-inline">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customCheck1"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customCheck1"
                                >
                                  Lunch
                                </label>
                              </div>
                              <div class="custom-control custom-checkbox custom-control-inline">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customCheck1"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customCheck1"
                                >
                                  Dinner
                                </label>
                              </div>
                              <div class="custom-control custom-checkbox custom-control-inline">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customCheck1"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customCheck1"
                                >
                                  Before Bed
                                </label>
                              </div>
                              <div class="custom-control custom-checkbox custom-control-inline">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customCheck1"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customCheck1"
                                >
                                  etc 1
                                </label>
                              </div>
                              <div class="custom-control custom-checkbox custom-control-inline">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customCheck1"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customCheck1"
                                >
                                  etc 2
                                </label>
                              </div>
                              <div class="custom-control custom-checkbox custom-control-inline">
                                <input
                                  type="checkbox"
                                  class="custom-control-input"
                                  id="customCheck1"
                                />
                                <label
                                  class="custom-control-label"
                                  for="customCheck1"
                                >
                                  etc 3
                                </label>
                              </div>
                            </div>
                            <div class="float-right row mb-3 mt-4 bg-white">
                              <div class="col-sm-6 mb-sm-0 mb-2">
                                <div
                                  class="input-group"
                                  style={{ width: "250px" }}
                                >
                                  <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Search"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                  />
                                  <div class="input-group-append">
                                    <span
                                      class="input-group-text"
                                      id="basic-addon1"
                                    >
                                      <i class="fa fa-search"></i>
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div class="col-sm-6">
                                <select
                                  class="custom-select"
                                  style={{ width: "250px" }}
                                >
                                  <option selected>Select Category</option>
                                  <option value="1">One</option>
                                  <option value="2">Two</option>
                                  <option value="3">Three</option>
                                </select>
                              </div>
                            </div>
                            <div class="table-responsive food-table">
                              <table class="table table-hover text-nowrap table-sm text-center table-hover">
                                <thead class="font-weight-bold">
                                  <tr>
                                    <th>
                                      Name{" "}
                                      <i class="fas fa-sort-amount-up-alt"></i>
                                      <i
                                        style={{ display: "none" }}
                                        class="fas fa-sort-amount-down-alt"
                                      ></i>
                                    </th>
                                    <th>
                                      Category{" "}
                                      <i class="fas fa-sort-amount-up-alt"></i>
                                      <i
                                        style={{ display: "none" }}
                                        class="fas fa-sort-amount-down-alt"
                                      ></i>
                                    </th>
                                    <th>
                                      Unit of Measurement{" "}
                                      <i class="fas fa-sort-amount-up-alt"></i>
                                      <i
                                        style={{ display: "none" }}
                                        class="fas fa-sort-amount-down-alt"
                                      ></i>
                                    </th>
                                    <th>
                                      Serving Size{" "}
                                      <i class="fas fa-sort-amount-up-alt"></i>
                                      <i
                                        style={{ display: "none" }}
                                        class="fas fa-sort-amount-down-alt"
                                      ></i>
                                    </th>
                                    <th>
                                      Calorie/100g{" "}
                                      <i class="fas fa-sort-amount-up-alt"></i>
                                      <i
                                        style={{ display: "none" }}
                                        class="fas fa-sort-amount-down-alt"
                                      ></i>
                                    </th>
                                    <th>
                                      Protine/100g{" "}
                                      <i class="fas fa-sort-amount-up-alt"></i>
                                      <i
                                        style={{ display: "none" }}
                                        class="fas fa-sort-amount-down-alt"
                                      ></i>
                                    </th>
                                    <th>
                                      Carbs/100g{" "}
                                      <i class="fas fa-sort-amount-up-alt"></i>
                                      <i
                                        style={{ display: "none" }}
                                        class="fas fa-sort-amount-down-alt"
                                      ></i>
                                    </th>
                                    <th>
                                      Fat/100g{" "}
                                      <i class="fas fa-sort-amount-up-alt"></i>
                                      <i
                                        style={{ display: "none" }}
                                        class="fas fa-sort-amount-down-alt"
                                      ></i>
                                    </th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>Oats</td>
                                    <td>Carbohydrate</td>
                                    <td>gm</td>
                                    <td>100</td>
                                    <td>158</td>
                                    <td>158</td>
                                    <td>158</td>
                                    <td>158</td>
                                    <td>
                                      <span class="badge badge-primary">
                                        + Add
                                      </span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Oats</td>
                                    <td>Carbohydrate</td>
                                    <td>gm</td>
                                    <td>100</td>
                                    <td>158</td>
                                    <td>158</td>
                                    <td>158</td>
                                    <td>158</td>
                                    <td>
                                      <span class="badge badge-primary">
                                        + Add
                                      </span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Oats</td>
                                    <td>Carbohydrate</td>
                                    <td>gm</td>
                                    <td>100</td>
                                    <td>158</td>
                                    <td>158</td>
                                    <td>158</td>
                                    <td>158</td>
                                    <td>
                                      <span class="badge badge-primary">
                                        + Add
                                      </span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Oats</td>
                                    <td>Carbohydrate</td>
                                    <td>gm</td>
                                    <td>100</td>
                                    <td>158</td>
                                    <td>158</td>
                                    <td>158</td>
                                    <td>158</td>
                                    <td>
                                      <span class="badge badge-primary">
                                        + Add
                                      </span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Oats</td>
                                    <td>Carbohydrate</td>
                                    <td>gm</td>
                                    <td>100</td>
                                    <td>158</td>
                                    <td>158</td>
                                    <td>158</td>
                                    <td>158</td>
                                    <td>
                                      <span class="badge badge-primary">
                                        + Add
                                      </span>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Oats</td>
                                    <td>Carbohydrate</td>
                                    <td>gm</td>
                                    <td>100</td>
                                    <td>158</td>
                                    <td>158</td>
                                    <td>158</td>
                                    <td>158</td>
                                    <td>
                                      <span class="badge badge-primary">
                                        + Add
                                      </span>
                                    </td>
                                  </tr>
                                </tbody>
                                <tfoot>
                                  <tr>
                                    <td colspan="8"></td>
                                    <td>
                                      <button class="btn btn-sm btn-primary">
                                        Save
                                      </button>
                                    </td>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
                            <div class="row border-top nutrationPlan-footer pt-4 text-right">
                              <p class="col-sm-6">
                                Calorie Earned :
                                <span class="text-white p-1 bg-warning rounded">
                                  1,588<small>cal</small>
                                </span>
                              </p>
                              <p class="col-sm-6">
                                Protine :
                                <span class="text-white p-1 bg-warning rounded">
                                  1,588<small>cal</small>
                                </span>
                              </p>
                              <p class="col-sm-6">
                                Fat :
                                <span class="text-white p-1 bg-warning rounded">
                                  1,588<small>cal</small>
                                </span>
                              </p>
                              <p class="col-sm-6">
                                Carbs :
                                <span class="text-white p-1 bg-warning rounded">
                                  1,588<small>cal</small>
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
