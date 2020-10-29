import React, { useState, useEffect } from "react";



export default function FitnessCalculatorResult({ data, updateData }) {
  const weight_loose_calorie = (cal) => {
    if (data?.maintain_weight_calorie)
      return (data?.maintain_weight_calorie - cal).toFixed(0);
    else return 0;
  };

  const weight_gain_calorie = (cal) => {
    if (data?.maintain_weight_calorie)
      return (data?.maintain_weight_calorie + cal).toFixed(0);
    else return 0;
  };

  // const updateOwnDiet = ()

  return (
    <div className="col-md-7">
      <div className="bg-white right-fitness">
        <div className="p-5">
          <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <a
                className="nav-item nav-link active"
                id="nav-home-tab"
                data-toggle="tab"
                href="#nav-bmi"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
              >
                BMI
              </a>
              <a
                className="nav-item nav-link"
                id="nav-profile-tab"
                data-toggle="tab"
                href="#nav-bmr"
                role="tab"
                aria-controls="nav-profile"
                aria-selected="false"
              >
                BMR
              </a>
              <a
                className="nav-item nav-link"
                id="nav-contact-tab"
                data-toggle="tab"
                href="#nav-bf"
                role="tab"
                aria-controls="nav-contact"
                aria-selected="false"
              >
                BF
              </a>
              <a
                className="nav-item nav-link"
                id="nav-contact-tab"
                data-toggle="tab"
                href="#nav-cal"
                role="tab"
                aria-controls="nav-contact"
                aria-selected="false"
              >
                Calorie
              </a>
              <a
                className="nav-item nav-link"
                id="nav-contact-tab"
                data-toggle="tab"
                href="#nav-macros"
                role="tab"
                aria-controls="nav-contact"
                aria-selected="false"
              >
                Macronutrients
              </a>
            </div>
          </nav>
          <div className="tab-content custom-tab-content" id="nav-tabContent">
            <div
              className="tab-pane fade show active"
              id="nav-bmi"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
            >
              <h1 className="text-success text-center mt-4">Results</h1>
              <div className="indicator text-nowrap row">
                <div className="col-sm-6 mt-2">
                  Under weight
                  <span className="under">0-18</span>
                </div>
                <div className="col-sm-6 mt-2">
                  Normal
                  <span className="normal">18-24</span>
                </div>
                <div className="col-sm-6 mt-2">
                  Over weight
                  <span className="over">24-30</span>
                </div>
                <div className="col-sm-6 mt-2">
                  Obesity
                  <span className="obesity">30-50</span>
                </div>
              </div>
              <div className="bmi-results">
                <div className="bmi-range">{/* <KoolChart /> */}</div>
                <h3 className="text-center">
                  BMI = {data?.bmi?.toFixed(2)} kg/ms<sup>2</sup>
                  <span className={`text-${data?.bmi_status_class} ml-3`}>
                    ({data?.bmi_status})
                  </span>
                </h3>
                <div className="notes px-4">
                  <ul>
                    <li>
                      <strong>Healthy BMI Range:</strong>{" "}
                      {data?.bmi_range_from?.toFixed(2)} kg/m<sup>2</sup> -{" "}
                      {data?.bmi_range_to?.toFixed(2)} kg/m<sup>2</sup>
                    </li>
                    <li>
                      <strong>Healthy weight for the height :</strong>{" "}
                      {data?.bmi_healthy_weight_from?.toFixed(2)} kgs -{" "}
                      {data?.bmi_healthy_weight_to?.toFixed(2)} kgs
                    </li>
                    <li>
                      <strong>Ponderal Index:</strong>{" "}
                      {data?.bmi_ponderal_index?.toFixed(2)} kg/m<sup>3</sup>
                    </li>
                  </ul>
                  <div className="text-center mt-5">
                    <button className="btn btn-primary">Go to plan</button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="nav-bmr"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
            >
              <h1 className="text-success text-center mt-4">Results</h1>
              <div className="bmi-results">
                <h3>BMR = {data?.bmr} Calories/Day</h3>
                <p>Daily calories needed based on activity level</p>
                <table className="table rounded border text-nowrap table-hover">
                  <thead className="thead-light">
                    <tr className="table-active">
                      <th style={{ width: "70%", padding: "0.2rem 1rem" }}>
                        Activity level
                      </th>
                      <th style={{ padding: "0.2rem 1rem" }}>Calories</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Sedentary: little or no exercise</td>
                      <td>{(data?.bmr * 1.2).toFixed(0)}</td>
                    </tr>
                    <tr>
                      <td>Exercise 1-3 times/week</td>
                      <td>{(data?.bmr * 1.37).toFixed(0)}</td>
                    </tr>
                    <tr>
                      <td>Exercise 4-5 times/week</td>
                      <td>{(data?.bmr * 1.46).toFixed(0)}</td>
                    </tr>
                    <tr>
                      <td>Daily exercise or intense exercise 3-4 times/week</td>
                      <td>{(data?.bmr * 1.55).toFixed(0)}</td>
                    </tr>
                    <tr>
                      <td>Very intense exercise daily, or physical job</td>
                      <td>{(data?.bmr * 1.72).toFixed(0)}</td>
                    </tr>
                    <tr>
                      <td>Intense exercise 6-7 times/week</td>
                      <td>{(data?.bmr * 1.9).toFixed(0)}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="notes mt-5 px-4">
                  <ul>
                    <li>
                      <strong>Exerscise:</strong> 15-30 minutes of elevated
                      heart rate activity.
                    </li>
                    <li>
                      <strong>Intense exercise:</strong> 45-120 minutes of
                      elevated heart rate activity.
                    </li>
                    <li>
                      <strong>Very intense exercise:</strong> 2+ hours of
                      elevated heart rate activity.
                    </li>
                  </ul>
                  <div className="text-center mt-5">
                    <button className="btn btn-primary">Go to plan</button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="nav-bf"
              role="tabpanel"
              aria-labelledby="nav-contact-tab"
            >
              <h1 className="text-success text-center mt-4">Results</h1>
              <div className="bmi-results">
                <h3 className="text-center my-3">
                  Body Fat = {data.bf.toFixed(1)} %
                  <span className={`text-${data?.bf_status_class} ml-3`}>
                    ({data?.bf_status})
                  </span>
                </h3>
                <table className="table bf-table rounded border text-nowrap table-hover">
                  <thead className="thead-light">
                    <tr className="table-active">
                      <th style={{ width: "70%", padding: "0.2rem 1rem" }}>
                        Activity level
                      </th>
                      <th style={{ padding: "0.2rem 1rem" }}>Calories</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Body Fat Category</td>
                      <td>10</td>
                    </tr>
                    <tr>
                      <td>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit.
                      </td>
                      <td>10</td>
                    </tr>
                    <tr>
                      <td>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit.
                      </td>
                      <td>10</td>
                    </tr>
                    <tr>
                      <td>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit.
                      </td>
                      <td>10</td>
                    </tr>
                  </tbody>
                </table>
                <div className="table-responsive">
                  <table className="table table-bordered rounded text-nowrap table-hover">
                    <thead className="thead-light">
                      <tr className="table-active">
                        <th style={{ padding: "0.2rem 1rem" }}>Description</th>
                        <th style={{ padding: "0.2rem 1rem" }}>Women</th>
                        <th style={{ padding: "0.2rem 1rem" }}>Men</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Essential Fat</td>
                        <td>10-13%</td>
                        <td>2-5%</td>
                      </tr>
                      <tr>
                        <td>Athletes</td>
                        <td>14-20%</td>
                        <td>6-13%</td>
                      </tr>
                      <tr>
                        <td>Fitness</td>
                        <td>21-24%</td>
                        <td>14-17%</td>
                      </tr>
                      <tr>
                        <td>Avargae</td>
                        <td>25-31%</td>
                        <td>18-25%</td>
                      </tr>
                      <tr>
                        <td>Obese</td>
                        <td>32+%</td>
                        <td>25+%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="text-center mt-5">
                <button className="btn btn-primary">Go to plan</button>
              </div>
            </div>

            <div
              className="tab-pane fade"
              id="nav-cal"
              role="tabpanel"
              aria-labelledby="nav-contact-tab"
            >
              <h1 className="text-success text-center mt-4">Results</h1>
              <div className="calories-results">
                <h3 className="font-weight-bold">
                  Calories Required :
                  <span>
                    {data?.maintain_weight_calorie?.toFixed(0)} calories/day
                  </span>
                </h3>
                <div className="calories-tab mt-5 row text-center">
                  <div className="col-6 pnt weight-tab weight-loss active">
                    Weight Loss
                  </div>
                  <div className="col-6 pnt weight-tab weight-gain">
                    Weight Gain
                  </div>
                  <div className="col-12 px-0 weight-loss-tab">
                    <ul>
                      <li>
                        <span className="left-table">
                          Mild weight loss 0.25 kg/week
                        </span>
                        <span className="right-table">
                          {weight_loose_calorie(250)} calories/day
                        </span>
                      </li>
                      <li>
                        <span className="left-table">
                          Weight loss 0.5 kg/week
                        </span>
                        <span className="right-table">
                          {weight_loose_calorie(500)} calories/day
                        </span>
                      </li>
                      <li>
                        <span className="left-table">
                          Weight loss 1 kg/week
                        </span>
                        <span className="right-table">
                          {weight_loose_calorie(1000)} calories/day
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div
                    className="col-12 px-0 weight-gain-tab"
                    style={{ display: "none" }}
                  >
                    <ul>
                      <li>
                        <span className="left-table">
                          Mild weight gain 0.25 kg/week
                        </span>
                        <span className="right-table">
                          {weight_gain_calorie(250)} calories/day
                        </span>
                      </li>
                      <li>
                        <span className="left-table">
                          Weight gain 0.5 kg/week
                        </span>
                        <span className="right-table">
                          {weight_gain_calorie(500)} calories/day
                        </span>
                      </li>
                      <li>
                        <span className="left-table">
                          Fast Weight gain 1 kg/week
                        </span>
                        <span className="right-table">
                          {weight_gain_calorie(1000)} calories/day
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <button className="btn btn-primary">Go to plan</button>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="nav-macros"
              role="tabpanel"
              aria-labelledby="nav-contact-macros"
            >
              <h1 className="text-success text-center mt-4">Results</h1>
              <div className="macron-results">
                <h3 className="font-weight-bold mt-5">
                  Calories Required :
                  <span className="ml-5 bg-fitness-primary rounded p-2">
                    {data.required_calorie?.toFixed(0)} cal
                  </span>
                </h3>
                <h3 className="font-weight-bold mt-5">Choose Your Diet</h3>
                <div className="cal-checkbox col-12">
                  <div className="custom-control custom-checkbox custom-control-inline">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck1"
                      checked={data?.choose_diet == "balanced"}
                      onClick={(e) => {
                        updateData({ choose_diet: "balanced" });
                      }}
                    />
                    <label className="custom-control-label" for="customCheck1">
                      Balance
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox custom-control-inline">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck2"
                      checked={data?.choose_diet == "low_fat"}
                      onClick={(e) => {
                        updateData({ choose_diet: "low_fat" });
                      }}
                    />
                    <label className="custom-control-label" for="customCheck2">
                      Low fat
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox custom-control-inline">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck3"
                      checked={data?.choose_diet == "high_protein"}
                      onClick={(e) => {
                        updateData({ choose_diet: "high_protein" });
                      }}
                    />
                    <label className="custom-control-label" for="customCheck3">
                      High Protein
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox custom-control-inline">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck4"
                      checked={data?.choose_diet == "low_curb"}
                      onClick={(e) => {
                        updateData({ choose_diet: "low_curb" });
                      }}
                    />
                    <label className="custom-control-label" for="customCheck4">
                      Low Curb
                    </label>
                  </div>
                  <div className="custom-control mr-5 custom-checkbox custom-control-inline">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="create-own"
                      value="own"
                      checked={data?.choose_diet == "own"}
                      onClick={(e) => {
                        updateData({ choose_diet: "own" });
                      }}
                    />
                    <label className="custom-control-label" for="create-own">
                      Create your own
                    </label>
                  </div>
                </div>
                <h3 className="font-weight-bold mt-5">Macro Estimation</h3>
                <div className="macron-ranges row">
                  <div className="col-sm-4 col-md-6 col-lg-4">
                    <div className="macron-data">
                      <p>Carbs</p>
                      <div className="cal-need">
                        <span>{data?.macro_curb_gm} gm</span>
                        <span className="bg-fitness-primary px-2">
                          {data?.macro_curb_cal} cal
                        </span>
                      </div>
                    </div>
                    <p
                      className="own-range"
                      style={
                        data.choose_diet == "own"
                          ? { display: "flex" }
                          : { display: "none" }
                      }
                    >
                      Carbs <input type="range" />
                    </p>
                  </div>
                  <div className="col-sm-4 col-md-6 col-lg-4">
                    <div className="macron-data">
                      <p>Protine</p>
                      <div className="cal-need">
                        <span>{data?.macro_protein_gm} gm</span>
                        <span className="bg-fitness-primary px-2">
                          {data?.macro_protein_cal} cal
                        </span>
                      </div>
                    </div>
                    <p
                      className="own-range"
                      style={
                        data.choose_diet == "own"
                          ? { display: "flex" }
                          : { display: "none" }
                      }
                    >
                      Protine <input type="range" />
                    </p>
                  </div>
                  <div className="col-sm-4 col-md-6 col-lg-4">
                    <div className="macron-data">
                      <p>Fat</p>
                      <div className="cal-need">
                        <span>{data?.macro_fat_gm} gm</span>
                        <span className="bg-fitness-primary px-2">
                          {data?.macro_fat_cal} cal
                        </span>
                      </div>
                    </div>
                    <p
                      className="own-range"
                      style={
                        data.choose_diet == "own"
                          ? { display: "flex" }
                          : { display: "none" }
                      }
                    >
                      Fat <input type="range" />
                    </p>
                  </div>
                </div>
                <div className="text-center mt-2">
                  <button className="btn btn-primary">Go to plan</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
