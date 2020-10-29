import React, { useState, useEffect } from "react";

export default function SelectWorkoutPlan(props) {
  return (
    <div class="nutrationPlan pt-4 px-4 pb-4">
      <div class="WorkoutContain">
        <h4>Workout Day</h4>
        <div class="weekdays mt-2">
          <span>
            <input type="checkbox" name="" id="d1" />
            <label for="d1">Sunday</label>
          </span>
        </div>

        <h4 class="mt-5">Muscle Group</h4>
        <div class="weekdays mt-2">
          <span>
            <input type="checkbox" name="" id="d12" />
            <label for="d12">Chest</label>
          </span>
        </div>

        <div class="workoutPlancontainer">
          <div class="food mt-5">
            <input
              type="text"
              name=""
              id=""
              placeholder="Excercises"
              disabled
            />
            <button class="btn-primary hoveredbtn px-3 mb-1">
              + Add Excercises
            </button>
          </div>
          <div class="holder mt-2">
            <label for="f1">Name</label>
            <input type="text" placeholder="Enter Name" />
          </div>
          <div class="holder">
            <label for="f1">Set Type</label>
            <input type="text" placeholder="Enter Type" />
          </div>
          <div class="holder ">
            <div class="holder" style={{ width: "50%" }}>
              <label for="f1">MG</label>
              <input type="text" placeholder="Enter Catagory" />
            </div>
            <div class="holder" style={{ width: "50%" }}>
              <label for="f1">ROM</label>
              <select>
                <option value="">select</option>
              </select>
            </div>
          </div>
          <div class="holder ">
            <div class="holder" style={{ width: "50%" }}>
              <label for="f1">Sets</label>
              <select>
                <option value="">select</option>
              </select>
            </div>
            <div class="holder" style={{ width: "50%" }}>
              <label for="f1">Reps</label>
              <select>
                <option value="">select</option>
              </select>
            </div>
          </div>
          <div class="holder ">
            <div class="holder" style={{ width: "50%" }}>
              <label for="f1">Strength</label>
              <select>
                <option value="">select</option>
              </select>
            </div>
            <div class="holder" style={{ width: "50%" }}>
              <label for="f1">RPS</label>
              <select>
                <option value="">select</option>
              </select>
            </div>
          </div>
          <div class="holder mt-2">
            <label for="f1">Note</label>
            <textarea name="" id="" cols="30" rows="10" class="p-2"></textarea>
          </div>
        </div>
        <div class=" box2 mt-4">
          <button type="submit" class="btn-danger br-25 ">
            <h5 class="mt-1">Reset</h5>
          </button>
          <button type="submit" class="btn-primary custom-primary-btn br-25">
            <h5 class="mt-1">Save</h5>
          </button>
        </div>
      </div>
    </div>
  );
}
