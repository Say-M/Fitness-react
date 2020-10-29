import React, {useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import MealFoodList from './foodlist'
import MealView from './mealView'
import * as config from "../../../config";

export default function MealPlan({form, updateForm, foodList}){
  const jwtToken = useSelector((state) => state.user.jwtToken);
  const [view, setView] = useState('view') //view list

  const dayList = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [selectedFoodListDays, setSelectedFoodListDays] = useState([]);
  const [selectedFoodListMeal, setSelectedFoodListMeal] = useState([]);

  const defaultFinalDietValue = [
      // {"id":1,"day":"Monday","meal_id":1,"meal_time":"08:00:00","quantity":100,"details":{"id":1,"name":"Oats","category":"Carbohydrate","type":"Plants","unit":"gm","unit_size":100,"calorie":68,"protein":2.4,"carbohydrate":12,"fat":1.4}},{"id":1,"day":"Monday","meal_id":2,"meal_time":"11:00:00","quantity":100},{"id":1,"day":"Tuesday","meal_id":1,"meal_time":"08:00:00","quantity":100},{"id":1,"day":"Tuesday","meal_id":2,"meal_time":"11:00:00","quantity":100},{"id":1,"day":"Wednesday","meal_id":1,"meal_time":"08:00:00","quantity":100},{"id":1,"day":"Wednesday","meal_id":2,"meal_time":"11:00:00","quantity":100},{"id":2,"day":"Monday","meal_id":1,"meal_time":"08:00:00","quantity":100,"details":{"id":2,"name":"Rice","category":"Carbohydrate","type":"Plants","unit":"gm","unit_size":100,"calorie":10,"protein":18,"carbohydrate":34,"fat":2}},{"id":2,"day":"Monday","meal_id":2,"meal_time":"11:00:00","quantity":100},{"id":2,"day":"Tuesday","meal_id":1,"meal_time":"08:00:00","quantity":100},{"id":2,"day":"Tuesday","meal_id":2,"meal_time":"11:00:00","quantity":100},{"id":2,"day":"Wednesday","meal_id":1,"meal_time":"08:00:00","quantity":100},{"id":2,"day":"Wednesday","meal_id":2,"meal_time":"11:00:00","quantity":100},{"id":4,"day":"Monday","meal_id":1,"meal_time":"08:00:00","quantity":100,"details":{"id":4,"name":"Bread","category":"Carbohydrate","type":"Fruit","unit":"gm","unit_size":100,"calorie":265,"protein":49,"carbohydrate":9,"fat":3.2}},{"id":4,"day":"Monday","meal_id":2,"meal_time":"11:00:00","quantity":100},{"id":4,"day":"Tuesday","meal_id":1,"meal_time":"08:00:00","quantity":100},{"id":4,"day":"Tuesday","meal_id":2,"meal_time":"11:00:00","quantity":100},{"id":4,"day":"Wednesday","meal_id":1,"meal_time":"08:00:00","quantity":100},{"id":4,"day":"Wednesday","meal_id":2,"meal_time":"11:00:00","quantity":100},{"id":6,"day":"Monday","meal_id":1,"meal_time":"08:00:00","quantity":100,"details":{"id":6,"name":"Milk","category":"Protein","type":"Drinks","unit":"gm","unit_size":100,"calorie":42,"protein":3.4,"carbohydrate":5,"fat":1}},{"id":6,"day":"Monday","meal_id":3,"meal_time":"13:00:00","quantity":100},{"id":6,"day":"Monday","meal_id":5,"meal_time":"20:00:00","quantity":100},{"id":6,"day":"Friday","meal_id":1,"meal_time":"08:00:00","quantity":100},{"id":6,"day":"Friday","meal_id":3,"meal_time":"13:00:00","quantity":100},{"id":6,"day":"Friday","meal_id":5,"meal_time":"20:00:00","quantity":100},{"id":6,"day":"Saturday","meal_id":1,"meal_time":"08:00:00","quantity":100},{"id":6,"day":"Saturday","meal_id":3,"meal_time":"13:00:00","quantity":100},{"id":6,"day":"Saturday","meal_id":5,"meal_time":"20:00:00","quantity":100},{"id":5,"day":"Monday","meal_id":1,"meal_time":"08:00:00","quantity":100,"details":{"id":5,"name":"Beef","category":"Protein","type":"Meat","unit":"gm","unit_size":100,"calorie":250,"protein":26,"carbohydrate":0,"fat":15}},{"id":5,"day":"Monday","meal_id":3,"meal_time":"13:00:00","quantity":100},{"id":5,"day":"Monday","meal_id":5,"meal_time":"20:00:00","quantity":100},{"id":5,"day":"Friday","meal_id":1,"meal_time":"08:00:00","quantity":100},{"id":5,"day":"Friday","meal_id":3,"meal_time":"13:00:00","quantity":100},{"id":5,"day":"Friday","meal_id":5,"meal_time":"20:00:00","quantity":100},{"id":5,"day":"Saturday","meal_id":1,"meal_time":"08:00:00","quantity":100},{"id":5,"day":"Saturday","meal_id":3,"meal_time":"13:00:00","quantity":100},{"id":5,"day":"Saturday","meal_id":5,"meal_time":"20:00:00","quantity":100},{"id":3,"day":"Monday","meal_id":1,"meal_time":"08:00:00","quantity":100,"details":{"id":3,"name":"Banana","category":"Carbohydrate","type":"Fruit","unit":"nos","unit_size":1,"calorie":78,"protein":46,"carbohydrate":28,"fat":89}},{"id":3,"day":"Monday","meal_id":3,"meal_time":"13:00:00","quantity":100},{"id":3,"day":"Monday","meal_id":5,"meal_time":"20:00:00","quantity":100},{"id":3,"day":"Friday","meal_id":1,"meal_time":"08:00:00","quantity":100},{"id":3,"day":"Friday","meal_id":3,"meal_time":"13:00:00","quantity":100},{"id":3,"day":"Friday","meal_id":5,"meal_time":"20:00:00","quantity":100},{"id":3,"day":"Saturday","meal_id":1,"meal_time":"08:00:00","quantity":100},{"id":3,"day":"Saturday","meal_id":3,"meal_time":"13:00:00","quantity":100},{"id":3,"day":"Saturday","meal_id":5,"meal_time":"20:00:00","quantity":100}
  ]

  const [finalDiet, setFinalDiet] = useState(defaultFinalDietValue)

  const dayListView = dayList.map((day, index) => {
    return (
      <option key={index} value={day}>
        {" "}
        {day}
      </option>
    );
  });

  const handleUpdateToServer = () => {
    const formData = {...form};
    formData.nutrition_plan = [...finalDiet]
    console.log(formData)
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
            updateForm("nutrition_id", result.message.nutrition_id);
          }
        })
        .catch((err) => {
          console.log(err);
        });
  };

    return (
      <div class="full-fitness-section">
        <div class="meal-section">
          <div class="diet-choose bg-white">
            <h3>Choose Your Diet</h3>
            <div class="col-12 mb-4">
              <div class="custom-control mr-5 custom-checkbox custom-control-inline">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="customCheck151"
                  checked={form?.choose_diet == "balanced"}
                  onClick={(e) => {
                    updateForm({ choose_diet: "balanced" });
                  }}
                />
                <label class="custom-control-label" for="customCheck151">
                  Balance
                </label>
              </div>
              <div class="custom-control mr-5 custom-checkbox custom-control-inline">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="customCheck52"
                  checked={form?.choose_diet == "low_fat"}
                  onClick={(e) => {
                    updateForm({ choose_diet: "low_fat" });
                  }}
                />
                <label class="custom-control-label" for="customCheck52">
                  Low fat
                </label>
              </div>
              <div class="custom-control mr-5 custom-checkbox custom-control-inline">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="customCheck53"
                  checked={form?.choose_diet == "low_protein"}
                  onClick={(e) => {
                    updateForm({ choose_diet: "low_protein" });
                  }}
                />
                <label class="custom-control-label" for="customCheck53">
                  High Protein
                </label>
              </div>
              <div class="custom-control mr-5 custom-checkbox custom-control-inline">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="customCheck154"
                  checked={form?.choose_diet == "low_curb"}
                  onClick={(e) => {
                    updateForm({ choose_diet: "low_curb" });
                  }}
                />
                <label class="custom-control-label" for="customCheck154">
                  Low Curb
                </label>
              </div>
              <div class="custom-control mr-5 custom-checkbox custom-control-inline">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="create-own1"
                  value="own"
                  checked={form?.choose_diet == "own"}
                  onClick={(e) => {
                    updateForm({ choose_diet: "own" });
                  }}
                />
                <label class="custom-control-label" for="create-own1">
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
                      <span class="bg-fitness-primary px-1">1300 cal</span>
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
                      <span class="bg-fitness-primary px-1">1300 cal</span>
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
                      <span class="bg-fitness-primary px-1">1300 cal</span>
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
            <button
                style={{
                        position: "fixed",
                        bottom:"2rem",
                        left: "50%",
                        zIndex: 11
                }}
                className="btn float-right shadow btn-lg btn-primary px-5 ml-3"

                onClick={()=>{
                  handleUpdateToServer()
                }}
            >
              Create
            </button>
            <ul class="nav">
              <li
                  onClick={()=>setView('view')}
              >
                <a  href="#meal-tab" className={view=="view"?'active':''}>
                  Meal
                </a>
              </li>
              <li
              onClick={()=>setView('list')}
              >
                <a  href="#food-list-tab" className={view=="list"?'active':''}>
                  Food List
                </a>
              </li>
            </ul>
            <div class="tab-content">

              {
                view == "view" ?
                <div
                    id="meal-tab"
                    class="meal-tables bg-white tab-pane fade show active "
                >
                  <div className="meal-table-section " id="meal-table">
                    <MealView
                        form={ form }
                        finalFood={ finalDiet }
                        updateForm={ updateForm }
                        setSelectedFoodListMeal={setSelectedFoodListMeal}
                        setSelectedFoodListDays={setSelectedFoodListDays}
                        setView={setView}
                    />
                  </div>

                </div>
                    :
                <div id="food-list-tab" class="food-list-table tab-pane fade show active">
                <MealFoodList
                foodList={ foodList }
                dayList={ dayList }
                form={ form }
                updateForm={ updateForm }
                finalDiet={ finalDiet }
                setFinalDiet={ setFinalDiet }
                selectedMeal={selectedFoodListMeal}
                setSelectedMeal={setSelectedFoodListMeal}
                selectedDays={selectedFoodListDays}
                setSelectedDays={setSelectedFoodListDays}
                setView={setView}
                />
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
}