import React, { useState, useEffect } from "react";

import $ from "jquery";

window.jquery = window.$ = $;

export default function NutritionPlanBasicInfo({
  display,
  bodyTypeList,
  dietCategoryList,
  mealList,
  suplimentList,
  trainerList,
  medicalHistoryList,
  avoidFoodList,
  form,
  updateForm,
  nextButton,
  prevButton,
}) {
  const mealListView = mealList.map((meal, index) => {
    let time = meal.time;
    return (
      <>
        <div key={index} className="nutration-plan-checkbox">
          <div class="custom-control custom-checkbox custom-control-inline">
            <input
              type="checkbox"
              name=""
              id={`#meal-list-${index}`}
              checked={form.meals.some(m=> m.id == meal.id)}
              // checked={form?.meals?.indexOf(meal.id) > -1}
              onClick={(e) => {
                if (form.meals.some((m) => m.id == meal.id)) {
                  let fArray = form?.meals?.filter((item) => item.id != meal.id);
                  updateForm({ meals: fArray });
                } else {
                  if (form?.meals) {
                    const arr = [...form?.meals];
                    arr.push(meal);
                    updateForm({ meals: arr });
                  } else {
                    const arr = [];
                    arr.push(meal);
                    updateForm({ meals: arr });
                  }
                }
              }}
            />
            <label for={`#meal-list-${index}`}>{meal.meal_name}</label>
          </div>
          <span class="mt-2">
            <span class="time">{time}</span>
            <input
              type="time"
              style={{ width: "90px", display: "none" }}
              class="time-input"
            />
            <i class="text-info ml-3 pnt far fa-edit edit-time"></i>
            <i
              style={{ display: "none" }}
              class="text-success ml-3 pnt edit-done fas fa-check"
            ></i>
          </span>
        </div>
      </>
    );
  });
  const supplimentListView = suplimentList.map((meal, index) => {
    return (
      <>
        <div key={index} className="nutration-plan-checkbox">
          <div class="custom-control custom-checkbox custom-control-inline">
            <input
              type="checkbox"
              name=""
              id={`#sup-list-${index}`}
              checked={form?.supliments?.indexOf(meal.id) > -1}
              onClick={(e) => {
                if (form?.supliments?.indexOf(meal.id) > -1) {
                  let fArray = form?.supliments?.filter(
                    (item) => item != meal.id
                  );
                  updateForm({ supliments: fArray });
                } else {
                  if (form?.meals) {
                    const arr = [...form?.supliments];
                    arr.push(meal.id);
                    updateForm({supliments: arr});
                  } else {
                    const arr = [];
                    arr.push(meal.id);
                    updateForm({ supliments: arr });
                  }
                }
              }}
            />
            <label for={`#sup-list-${index}`}>{meal.supliments_name}</label>
          </div>
          <span class="mt-2">
            <span class="time">{meal?.time}</span>
            <input
              type="time"
              style={{ width: "90px", display: "none" }}
              class="time-input"
            />
            <i class="text-info ml-3 pnt far fa-edit edit-time"></i>
            <i
              style={{ display: "none" }}
              class="text-success ml-3 pnt edit-done fas fa-check"
            ></i>
          </span>
        </div>
      </>
    );
  });
  const medicalHisotoryListView = medicalHistoryList.map((meal, index) => {
    return (
      <>
        <div key={index} className="nutration-plan-checkbox">
          <div class="custom-control custom-checkbox custom-control-inline">
            <input
              type="checkbox"
              name=""
              id={`#medical-history-list-${index}`}
              checked={form?.medical_history?.indexOf(meal.id) > -1}
              onClick={(e) => {
                if (form?.medical_history?.indexOf(meal.id) > -1) {
                  let fArray = form?.medical_history?.filter(
                    (item) => item != meal.id
                  );
                  updateForm({ medical_history: fArray });
                } else {
                  if (form?.medical_history) {
                    const arr = [...form?.medical_history];
                    arr.push(meal.id);
                    updateForm({medical_history: arr});
                  } else {
                    const arr = [];
                    arr.push(meal.id);
                    updateForm({ medical_history: arr });
                  }
                }
              }}
            />
            <label for={`#medical-history-list-${index}`}>
              {meal.name}
            </label>
          </div>
        </div>
      </>
    );
  });
  const avoidFoodListView = avoidFoodList.map((meal, index) => {
    return (
      <>
        <div key={index} className="nutration-plan-checkbox">
          <div class="custom-control custom-checkbox custom-control-inline">
            <input
              type="checkbox"
              name=""
              id={`#avoid-food-list-${index}`}
              checked={form?.avoid_food?.indexOf(meal.id) > -1}
              onClick={(e) => {
                if (form?.avoid_food?.indexOf(meal.id) > -1) {
                  let fArray = form?.avoid_food?.filter(
                    (item) => item != meal.id
                  );
                  updateForm({avoid_food: fArray});
                } else {
                  if (form?.avoid_food) {
                    const arr = [...form?.avoid_food];
                    arr.push(meal.id);
                    updateForm({ avoid_food: arr });
                  } else {
                    const arr = [];
                    arr.push(meal.id);
                    updateForm({avoid_food: arr});
                  }
                }
              }}
            />
            <label for={`#avoid-food-list-${index}`}>
              {meal.name}
            </label>
          </div>
        </div>
      </>
    );
  });

  const dietCategoryListView = dietCategoryList.map((diet, index) => {
    return (
      <option key={index} value={diet.id}>
        {diet.diet_category}
      </option>
    );
  });
  const trainerListView = trainerList.map((trainer, index) => {
    return (
      <option key={index} value={trainer.trainer_id}>
        {trainer.firstname + " " + trainer.lastname}
      </option>
    );
  });

  useEffect(() => {
    if ($) {
      $(".nutrationPlanTab").click(function () {
        $("#nutrationPlanTab").fadeIn(200);
        $("#workoutPlanTab").fadeOut(200);
      });
      $(".workoutPlanTab").click(function () {
        $("#workoutPlanTab").fadeIn(200);
        $("#nutrationPlanTab").fadeOut(200);
      });
      $(".expand-icon").click(function () {
        console.log($(this).children());
        $(this).children().toggleClass("fa-chevron-down");
        $(this).children().toggleClass("fa-chevron-up");
        $(this).parent().next().slideToggle(200);
      });
    }
  }, [$]);

  return (
    <div class="row" style={display ? {} : { display: "none" }}>
      <div class="col-md-5">
        <div class="bg-white left-fitness">
          <div class="tab">
            <ul class="nav">
              <li>
                <a
                  data-toggle="tab"
                  href="#nutration-tab"
                  class="active nutrationPlanTab"
                >
                  Nutration Plan
                </a>
              </li>
            </ul>
            <div class="tab-content">
              <div id="nutration-tab" class="tab-pane fade show active">
                <form class="p-4">
                  <div class="form-group row">
                    <label for="body-type" class="col-sm-4 col-form-label">
                      Meal plan name
                    </label>
                    <div class="col-sm-8">
                      <input
                        type="text"
                        min="10"
                        class="form-control"
                        id="bf"
                        placeholder="Enter meal plan name"
                        value={form?.name}
                        onChange={(e) => {
                          updateForm({name:e.target.value});
                        }}
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="body-type" class="col-sm-4 col-form-label">
                      Duration
                    </label>
                    <div class="col-sm-8">
                      <select
                        class="custom-select"
                        value={form?.duration}
                        onChange={(e) => {
                          updateForm({duration:e.target.value});
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
                  </div>
                  <div class="form-group row">
                    <label for="body-type" class="col-sm-4 col-form-label">
                      Category
                    </label>
                    <div class="col-sm-8">
                      <select
                        class="custom-select"
                        value={form?.diet_category}
                        onChange={(e) => {
                          updateForm({diet_category:e.target.value});
                        }}
                      >
                        <option selected disabled>
                          Select category
                        </option>
                        {dietCategoryListView}
                      </select>
                    </div>
                  </div>
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
                        <option selected disabled>
                          Select body type
                        </option>
                        <option value="Actomorph">Actomorph</option>
                        <option value="Mesomorph">Mesomorph</option>
                        <option value="Endomorph">Endomorph</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="bf" class="col-sm-4 col-form-label">
                      Maintance Calorie
                    </label>
                    <div class="col-sm-8">
                      <input
                        type="text"
                        min="10"
                        class="form-control"
                        id="bf"
                        placeholder="Enter Value"
                        value={form?.maintenance_calorie}
                        onChange={(e) => {
                          updateForm({maintenance_calorie:e.target.value});
                        }}
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="goal" class="col-sm-4 col-form-label">
                      Trainer Name
                    </label>
                    <div class="col-sm-8">
                      <select
                        id="goal"
                        class="custom-select"
                        value={form?.trainer_id}
                        onChange={(e) => {
                          updateForm({trainer_id:e.target.value});
                        }}
                      >
                        <option value="">Select trainer</option>
                        {trainerListView}
                      </select>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="bf" class="col-sm-4 col-form-label">
                      Validity (start)
                    </label>
                    <div class="col-sm-8">
                      <input
                        type="date"
                        class="form-control"
                        id="bf"
                        placeholder="Enter Value"
                        value={form?.starts_from}
                        onChange={(e) => {
                          updateForm({starts_from:e.target.value});
                        }}
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="bf" class="col-sm-4 col-form-label">
                      Validity (end)
                    </label>
                    <div class="col-sm-8">
                      <input
                        type="date"
                        class="form-control"
                        id="bf"
                        placeholder="Enter Value"
                        value={form?.ends_at}
                        onChange={(e) => {
                          updateForm({ends_at:e.target.value});
                        }}
                      />
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="goal" class="col-sm-4 col-form-label">
                      Status
                    </label>
                    <div class="col-sm-8">
                      <select id="goal" class="custom-select">
                        <option selected>Select</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                  <div class="border-top text-center pt-3">
                    <button
                      class="btn btn-outline-info mr-2"
                      onClick={(e) => {
                        e.preventDefault();
                        prevButton();
                      }}
                    >
                      Previous
                    </button>
                    <button
                      class="btn btn-primary ml-2"
                      onClick={(e) => {
                        e.preventDefault();
                        nextButton();
                      }}
                    >
                      Next
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-7">
        <div class="bg-white right-fitness">
          <div class="p-5" id="nutrationPlanTab">
            <div class="row">
              <div class="col-sm-6 mt-4 col-md-12 col-lg-6">
                <h2>
                  Meals{" "}
                  <span class="float-right">
                    <i class="fas fa-angle-down"></i>
                  </span>
                </h2>
                {mealListView}
              </div>
              <div class="col-sm-6 mt-4 col-md-12 col-lg-6">
                <h2>
                  Suppliments{" "}
                  <span class="float-right">
                    <i class="fas fa-angle-down"></i>
                  </span>
                </h2>
                {supplimentListView}
              </div>
              <div class="col-sm-6 mt-4 col-md-12 col-lg-6">
                <h2>
                  Medical History{" "}
                  <span class="float-right">
                    <i class="fas fa-angle-down"></i>
                  </span>
                </h2>
                {medicalHisotoryListView}
              </div>
              <div class="col-sm-6 mt-4 col-md-12 col-lg-6">
                <h2>
                  Foods Need to Avoid{" "}
                  <span class="float-right">
                    <i class="fas fa-angle-down"></i>
                  </span>
                </h2>
                {avoidFoodListView}
              </div>
            </div>
          </div>
          <div class="p-5" id="workoutPlanTab" style={{ display: "none" }}>
            <div class="row">
              <div class="col-sm-6 mt-4 col-md-12 col-lg-6">
                <h2>
                  Workout Session{" "}
                  <span class="float-right">
                    <i class="fas fa-angle-down"></i>
                  </span>
                </h2>
                <div class="nutration-plan-checkbox">
                  <div class="custom-control custom-checkbox custom-control-inline">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="customCheck1"
                    />
                    <label class="custom-control-label" for="customCheck1">
                      Empty Stomach
                    </label>
                  </div>
                  <span class="mt-2">
                    <span class="time">7:30 PM</span>
                    <input
                      type="time"
                      style={{ width: "90px", display: "none" }}
                      class="time-input"
                    />
                    <i class="text-info ml-3 pnt far fa-edit edit-time"></i>
                    <i
                      style={{ display: "none" }}
                      class="text-success ml-3 pnt edit-done fas fa-check"
                    ></i>
                  </span>
                </div>
              </div>
              <div class="col-sm-6 mt-4 col-md-12 col-lg-6">
                <h2>
                  Traning Method{" "}
                  <span class="float-right">
                    <i class="fas fa-angle-down"></i>
                  </span>
                </h2>
                <div class="nutration-plan-checkbox">
                  <div class="custom-control custom-checkbox custom-control-inline">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="customCheck1"
                    />
                    <label class="custom-control-label" for="customCheck1">
                      Empty Stomach
                    </label>
                  </div>
                  <span class="mt-2">
                    <span class="time">7:30 PM</span>
                    <input
                      type="time"
                      style={{ width: "80px", display: "none" }}
                      class="time-input"
                    />
                    <i class="text-info ml-3 pnt far fa-edit edit-time"></i>
                    <i
                      style={{ display: "none" }}
                      class="text-success ml-3 pnt edit-done fas fa-check"
                    ></i>
                  </span>
                </div>
              </div>
              <div class="col-sm-6 mt-4 col-md-12 col-lg-6">
                <h2>
                  Instractions{" "}
                  <span class="float-right">
                    <i class="fas fa-angle-down"></i>
                  </span>
                </h2>
                <div class="nutration-plan-checkbox">
                  <div class="custom-control custom-checkbox custom-control-inline">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="customCheck1"
                    />
                    <label class="custom-control-label" for="customCheck1">
                      Empty Stomach
                    </label>
                  </div>
                </div>
                <div class="nutration-plan-checkbox">
                  <div class="custom-control custom-checkbox custom-control-inline">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="customCheck1"
                    />
                    <label class="custom-control-label" for="customCheck1">
                      Empty Stomach
                    </label>
                  </div>
                </div>
                <div class="nutration-plan-checkbox">
                  <div class="custom-control custom-checkbox custom-control-inline">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="customCheck1"
                    />
                    <label class="custom-control-label" for="customCheck1">
                      Empty Stomach
                    </label>
                  </div>
                </div>
              </div>
              <div class="col-sm-6 mt-4 col-md-12 col-lg-6">
                <h2>
                  Foods Need to Avoid{" "}
                  <span class="float-right">
                    <i class="fas fa-angle-down"></i>
                  </span>
                </h2>
                <div class="nutration-plan-checkbox">
                  <div class="custom-control custom-checkbox custom-control-inline">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="customCheck1"
                    />
                    <label class="custom-control-label" for="customCheck1">
                      Empty Stomach
                    </label>
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
