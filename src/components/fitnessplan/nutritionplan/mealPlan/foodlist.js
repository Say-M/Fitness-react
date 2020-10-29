import React, { useState, useEffect } from "react";

export default function MealFoodList({ dayList, form, updateForm, foodList, finalDiet, setFinalDiet, selectedMeal, selectedDays, setSelectedDays, setSelectedMeal, setView }) {
  const [foodSearchInput, setFoodSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [foodCategoryList, setFoodCategoryList] = useState([]);
  const [foodListByCategory, setFoodListByCategory] = useState([]);
  const [foodListByNameFilter, setFoodListByNameFilter] = useState([]);

  const [addedFoods, setAddedFoods] = useState([])
  const addFoodToForm = (food)=>{
        const arr = [...addedFoods]
        selectedDays.forEach(day=>{
            selectedMeal.forEach(m=>{
                if(!arr.some(a=> a.id == food.id && a.day == day && a.meal_id== m.id)){
                arr.push({
                    id: food.id,
                    day: day,
                    meal_id: m.id,
                    meal_time: m.time,
                    quantity: 100,
                    details: food
                })
            }
            })
        })
    setAddedFoods(arr)
  }

  const removeFoodFromForm = (food)=>{
      const arr = [...addedFoods];
    const finalArr = arr.filter(a => 
        !(a.id == food.id && selectedDays.some(d=>d==a.day) && selectedMeal.some(m=>a.meal_id == m.id))
        )
      setAddedFoods(finalArr)
  }

  useEffect(() => {
    if (selectedCategory == "all") setFoodListByCategory(foodList);
    else {
      setFoodListByCategory(
        foodList.filter((food) => food.category == selectedCategory)
      );
    }
  }, [selectedCategory, foodList]);

  useEffect(() => {
    let search = foodSearchInput.trim();
    if (!search.length) setFoodListByNameFilter(foodListByCategory);
    else {
      setFoodListByNameFilter(
        foodListByCategory.filter(
          (food) => food.name.toLowerCase().indexOf(search.toLowerCase()) > -1
        )
      );
    }
  }, [foodSearchInput, foodListByCategory]);

  const checkAddedOrNot = (food)=>{
      return addedFoods.some(
        (a) =>
          a.id == food.id &&
          selectedDays.some((d) => d == a.day) &&
          selectedMeal.some((m) => a.meal_id == m.id)
      );
  }
  
  const foodListView = foodListByNameFilter.map((food, index) => {
    const addedStatus = checkAddedOrNot(food) 
    return (
      <tr key={food.id}>
        <td>{food.name}</td>
        <td>{food.category}</td>
        <td>{food.unit}</td>
        <td>{food.unit_size}</td>
        <td>{food.calorie}</td>
        <td>{food.protein}</td>
        <td>{food.carbohydrate}</td>
        <td>{food.fat}</td>
        <td>
          <span
            class="badge badge-primary"
            onClick={(e) => addFoodToForm(food)}
            style={addedStatus ? { display: "none" } : {}}
          >
            + Add
          </span>
          <span
            class="badge badge-danger"
            onClick={(e) => removeFoodFromForm(food)}
            style={addedStatus ? {} : { display: "none" }}
          >
            - Remove
          </span>
        </td>
      </tr>
    );
  });

  useEffect(() => {
    let cat = new Set();
    foodList.map((f) => {
      cat.add(f.category);
    });
    cat = Array.from(cat);
    setFoodCategoryList(cat);
  }, [foodList]);

  const foodCategoryListView = foodCategoryList.map((cat, index) => {
    return (
      <option key={index} value={cat}>
        {cat}
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
          checked={selectedDays.indexOf(day) > -1}
          onClick={e=>{
              if (selectedDays.indexOf(day) == -1)
                setSelectedDays([...selectedDays, day]);
                else{
                    setSelectedDays(selectedDays.filter(d => d != day))
                }
          }}
        />
        <label class="custom-control-label" for={`customCheck-day-${index}`}>
          {day}
        </label>
      </div>
    );
  });
  const selectMealView = form.meals.map((meal, index) => {
    return (
      <div class="custom-control custom-checkbox custom-control-inline">
        <input
          type="checkbox"
          class="custom-control-input"
          id={`customCheck-meal-select${index}`}
          checked={selectedMeal.some(m=> m.id == meal.id)}
          onClick={(e) => {
              if(!selectedMeal.some(m=> m.id == meal.id)){
                  setSelectedMeal([...selectedMeal, meal])
              }
              else{
                  setSelectedMeal(selectedMeal.filter(m=> m.id != meal.id))
              }
          }}
        />
        <label
          class="custom-control-label"
          for={`customCheck-meal-select${index}`}
        >
          {meal.meal_name}
        </label>
      </div>
    );
  });

  useEffect(()=>{
      setAddedFoods(finalDiet)
  },[finalDiet])
  
  
  return (
    <div class="meal-table-section" id="meal-table">
      <h3 class="title-bar d-inline">Select Day</h3>
      <div class="mt-3 mb-5 ml-3">{selectDayView}</div>
      <h3 style={{ postion: "static" }} class="title-bar d-inline">
        Select Meal
      </h3>
      <div class="mt-2 ml-3">{selectMealView}</div>
      <div class="float-right row mb-3 mt-4 bg-white">
        <div class="col-sm-6 mb-sm-0 mb-2">
          <div class="input-group" style={{ width: "250px" }}>
            <input
              type="text"
              class="form-control"
              placeholder="Search"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={foodSearchInput}
              onChange={(e) => {
                setFoodSearchInput(e.target.value);
              }}
            />
            <div class="input-group-append">
              <span class="input-group-text" id="basic-addon1">
                <i class="fa fa-search"></i>
              </span>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <select
            class="custom-select"
            style={{ width: "250px" }}
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
            }}
          >
            <option value="all">Any</option>
            {foodCategoryListView}
          </select>
        </div>
      </div>
      <div class="table-responsive food-table">
        <table class="table table-hover text-nowrap table-sm text-center table-hover">
          <thead class="font-weight-bold">
            <tr>
              <th>
                Name <i class="fas fa-sort-amount-up-alt"></i>
                <i
                  style={{ display: "none" }}
                  class="fas fa-sort-amount-down-alt"
                ></i>
              </th>
              <th>
                Category <i class="fas fa-sort-amount-up-alt"></i>
                <i
                  style={{ display: "none" }}
                  class="fas fa-sort-amount-down-alt"
                ></i>
              </th>
              <th>
                Unit of Measurement <i class="fas fa-sort-amount-up-alt"></i>
                <i
                  style={{ display: "none" }}
                  class="fas fa-sort-amount-down-alt"
                ></i>
              </th>
              <th>
                Serving Size <i class="fas fa-sort-amount-up-alt"></i>
                <i
                  style={{ display: "none" }}
                  class="fas fa-sort-amount-down-alt"
                ></i>
              </th>
              <th>
                Calorie/100g <i class="fas fa-sort-amount-up-alt"></i>
                <i
                  style={{ display: "none" }}
                  class="fas fa-sort-amount-down-alt"
                ></i>
              </th>
              <th>
                Protine/100g <i class="fas fa-sort-amount-up-alt"></i>
                <i
                  style={{ display: "none" }}
                  class="fas fa-sort-amount-down-alt"
                ></i>
              </th>
              <th>
                Carbs/100g <i class="fas fa-sort-amount-up-alt"></i>
                <i
                  style={{ display: "none" }}
                  class="fas fa-sort-amount-down-alt"
                ></i>
              </th>
              <th>
                Fat/100g <i class="fas fa-sort-amount-up-alt"></i>
                <i
                  style={{ display: "none" }}
                  class="fas fa-sort-amount-down-alt"
                ></i>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{foodListView}</tbody>
          <tfoot>
            <tr>
              <td colspan="8"></td>
              <td>
                <button class="btn btn-sm btn-primary"
                onClick={()=>{
                    setFinalDiet(addedFoods)
                    setSelectedMeal([])
                    setSelectedDays([])
                    setView('view')
                }}
                >Save</button>
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
  );
}
