import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import * as config from "../config";

export default function CalculateNutrition(props){

  return (
    <div class="nutrationPlan p-4">
      <div class="full">
        <h4 class="regular">Choose your Diet</h4>
      </div>
      <div class="container p-4 weekdays" style={{ background: "#E6E7E8" }}>
        <span>
          <input type="checkbox" name="" id="d1" />
          <label for="d1">lorem ipsome</label>
        </span>
        <span>
          <input type="checkbox" name="" id="d2" />
          <label for="d2">lorem ipsome</label>
        </span>
        <span>
          <input type="checkbox" name="" id="d3" />
          <label for="d3">lorem ipsome</label>
        </span>
        <span>
          <input type="checkbox" name="" id="d4" />
          <label for="d4">lorem ipsome</label>
        </span>
        <span>
          <input type="checkbox" name="" id="d5" />
          <label for="d5">lorem ipsome</label>
        </span>
        <span>
          <input type="checkbox" name="" id="d5" />
          <label for="d5">lorem ipsome</label>
        </span>
      </div>
      <div class="full">
        <h4 class="regular mt-4">Macro Estimation</h4>
      </div>

      <div class="box8">
        <p class="name">Carbs</p>
        <div class="data1">
          <p>325g</p>
          <p class="selectedbtn p-1">1300 cal</p>
        </div>
        <div class="data2">
          <p>325g</p>
          <p class="selectedbtn p-1">1300 cal</p>
        </div>
        <div class="slider">
          <div class="indicator" style={{ left: "20%" }}></div>
        </div>
      </div>

      <div class="box8">
        <p class="name">Fat</p>
        <div class="data1">
          <p>325g</p>
          <p class="selectedbtn p-1">1300 cal</p>
        </div>
        <div class="data2">
          <p>325g</p>
          <p class="selectedbtn p-1">1300 cal</p>
        </div>
        <div class="slider">
          <div class="indicator" style={{ left: "20%" }}></div>
        </div>
      </div>

      <div class="box8">
        <p class="name">Protine</p>
        <div class="data1">
          <p>325g</p>
          <p class="selectedbtn p-1">1300 cal</p>
        </div>
        <div class="data2">
          <p>325g</p>
          <p class="selectedbtn p-1">1300 cal</p>
        </div>
        <div class="slider">
          <div class="indicator" style={{ left: "20%" }}></div>
        </div>
      </div>

      <div class="full">
        <h3 class="regular">Total Calorie Required</h3>{" "}
        <h3 class="maxtext">2110 cal</h3>
      </div>
      <div class="full mt-3">
        <h3 class="regular">Calorie Pending</h3>{" "}
        <h3 class="mintext">1800 cal</h3>
      </div>
    </div>
  );
}
