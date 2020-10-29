import React, {useEffect, useState} from 'react';
import * as config from "../../../config";
import { useDispatch, useSelector } from "react-redux";

export default function MealView ({form,updateForm, finalFood, setSelectedFoodListDays, setSelectedFoodListMeal, setView}){
      const dayList = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];
    const jwtToken = useSelector((state) => state.user.jwtToken);
      const [foodListByDay, setFoodListByDay] = useState([])

  useEffect(()=>{
    setFoodListByDay(
        finalFood.filter(f=> f.day === form.view_day)
    )
  },[form?.view_day, finalFood])

      const dayListView = dayList.map((day, index) => {
        return (
          <option key={index} value={day}>
            {" "}
            {day}
          </option>
        );
      });

      const getFoodList = (meal_id)=>{
        const foods = foodListByDay.filter(f=>
        {
          if(f.meal_id == meal_id) return f} )
        return foods;
      }

      const foodTableOnMealView = (meal_id)=>{
      const foods = getFoodList(meal_id)
        return(
           foods.map((food, index)=> {
             return (
                 <tr key={index}>
                   <td>
                     <div className="table-items">
                       <span>Name</span>
                       <span className="ml-2 mute-area">{ food?.details?.name }</span>
                     </div>
                   </td>
                   <td>
                     <div className="table-items">
                       <span>Quantity</span>
                       <input
                           value="02"
                           disabled
                           type="number"
                           min="0"
                           className="form-control form-control-sm"
                           style={ {width: "70px"} }
                           value={ food?.quantity }
                       />
                     </div>
                   </td>
                   <td>
                     <div className="table-items">
                       <span>Cal</span>
                       <span className="ml-2 mute-area">{ food?.details?.calorie } cal</span>
                     </div>
                   </td>
                   <td>
                     <div className="table-items">
                       <span>Protine</span>
                       <span className="ml-2 mute-area">{ food?.details?.protein } cal</span>
                     </div>
                   </td>
                   <td>
                     <div className="table-items">
                       <span>Fat</span>
                       <span className="ml-2 mute-area">{ food?.details?.fat } cal</span>
                     </div>
                   </td>
                   <td>
                     <div className="table-items">
                       <span>Carbs</span>
                       <span className="ml-2 mute-area">{ food?.details?.carbohydrate } cal</span>
                     </div>
                   </td>
                 </tr>
             )
           }
        ))
      }



      const mealFoodListView = form?.meals.map((meal,index)=>{
        return(
            <>
              <h3 className="title-bar border-bottom pb-3">
                <span className="bg-fitness-secondary">{meal.meal_name}</span>
                <div className="opt">
                  <div className="time">
                    Time :<span className="bg-fitness-primary">{meal.time}</span>
                  </div>
                  <button className="btn-add hoveredbtn px-3 mb-1"
                  onClick={()=>{
                      setSelectedFoodListMeal([meal])
                      setSelectedFoodListDays([form.view_day])
                      setView('list')
                  }}
                  >+ Add Food</button>
                </div>
              </h3>
              <div className="table-responsive">
                <table className="table table-hover text-nowrap table-borderless">
                  <tbody>
                  {foodTableOnMealView(meal.id)}
                  </tbody>
                </table>
              </div>
              </>

        )
      })

    return (
        <>
        <h3>Meal Day</h3>
        <div class="select">
          <select
            class="custom-select"
            value={form.view_day}
            onChange={(e) => {
              updateForm({ view_day: e.target.value });
            }}
          >
            <option selected disabled>
              Select day
            </option>
            {dayListView}
          </select>
        </div>
          {mealFoodListView}

          <div class="table-responsive">
            <table class="table table-hover text-nowrap table-borderless">

              <tfoot>
                <tr>
                  <td></td>
                  <td></td>
                  <td class="bg-light">
                    <div class="table-items px-2">
                      <span>Cal</span>
                      <span class="px-2 bg-fitness-primary">120cal</span>
                    </div>
                  </td>
                  <td class="bg-light">
                    <div class="table-items px-2">
                      <span>Portion</span>
                      <span class="px-2 bg-fitness-primary">120cal</span>
                    </div>
                  </td>
                  <td class="bg-light">
                    <div class="table-items px-2">
                      <span>Fat</span>
                      <span class="px-2 bg-fitness-primary">120cal</span>
                    </div>
                  </td>
                  <td class="bg-light">
                    <div class="table-items px-2">
                      <span>Carbs</span>
                      <span class="px-2 bg-fitness-primary">120cal</span>
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
        </>
    );
}