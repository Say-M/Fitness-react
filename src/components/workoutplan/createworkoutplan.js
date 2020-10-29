import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import * as config from "../config";

export default function CreateWorkOutPlan(props) {
  const jwtToken = useSelector((state) => state.user.jwtToken);
  const dispatch = useDispatch();
  const trainingTypeList = useSelector(
    (state) => state.reusableInfo.trainingType
  );
  const [instructionList, setInstractionList] = useState([
    { id: 1, value: "worm1", title: "worm1" },
    { id: 2, value: "worm2", title: "worm1" },
    { id: 3, value: "worm3", title: "worm1" },
    { id: 4, value: "worm4", title: "worm1" },
    { id: 5, value: "worm5", title: "worm1" },
    { id: 6, value: "worm6", title: "worm1" },
    { id: 7, value: "worm7", title: "worm1" },
  ]);
  const [selectedInstructions, setSelectedInstractions] = useState([]);

  const trainingTypeListView = trainingTypeList.map((type, index) => {
    return (
      <option key={index} value={type.training_type_id}>
        {type.training_type}
      </option>
    );
  });

  const instructionListView = instructionList.map((instruction, index) => {
    return (
      <span key={index}>
        <input
          type="checkbox"
          name=""
          id={`instraction-${index}`}
          value={instruction.value}
          checked={selectedInstructions.indexOf(instruction.value) > -1}
          onChange={(e) => {
            setSelectedInstractions((ins) => [...ins, instruction.value]);
          }}
        />
        <label for={`instraction-${index}`}>{instruction.title}</label>
      </span>
    );
  });

  return (
    <div class="nutrationPlan p-4">
      <h1 class="mb-4">Workout Plan</h1>
      <div class="workoutformholder">
        <p class="label">Name</p>
        <input
          type="text"
          class="input"
          name=""
          id=""
          placeholder="Enter Workout Plan name"
        />
        <p class="label">Training Type</p>
        <select name="" id="" class="input">
          <option value="">Select Training Type</option>
          {trainingTypeListView}
        </select>
        <p class="label">Body Type</p>
        <select name="" id="" class="input">
          <option value="">select</option>
        </select>
        <p class="label">Duration</p>
        <select name="" id="" class="input">
          <option value="">select</option>
        </select>
        <p class="label">Difficulty</p>
        <select name="" id="" class="input">
          <option value="">select</option>
        </select>
        <p class="label">Trainer Name</p>
        <select name="" id="" class="input">
          <option value="">select</option>
        </select>
        <p class="label">Workout Period</p>
        <select name="" id="" class="input">
          <option value="">select</option>
        </select>
        <p class="label">Validity</p>
        <input type="date" name="" id="" class="input1" />
        <input type="date" name="" id="" class="input2" />
        <p class="label">Status</p>
        <select name="" id="" class="input">
          <option value="">select</option>
        </select>
      </div>
      <h4 class="mt-3">Instructions</h4>
      <div class="weekdays mt-3">{instructionListView}</div>
      <button type="submit" class="btn-primary custom-primary-btn mt-5">
        <h5 class="mt-1">Proceed</h5>
      </button>
    </div>
  );
}
