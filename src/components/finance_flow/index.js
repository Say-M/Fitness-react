import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Chart } from "react-google-charts";
import Header from "../common/header";
import * as config from "../config";

export default function FinanceFlow() {
  const jwtToken = useSelector((state) => state.user.jwtToken);
  const takaSign = "\u09F3";
  const [dateFrom, setDateFrom] = useState(moment().subtract(9, "days").date());
  const [dateTo, setDateTo] = useState(moment().date() - 1);
  const [monthFrom, setMonthFrom] = useState(
    moment().subtract(9, "days").month() + 1
  );
  const [monthTo, setMonthTo] = useState(moment().month() + 1);
  const [yearFrom, setYearFrom] = useState(moment().subtract(7, "days").year());
  const [yearTo, setYearTo] = useState(moment().year());

  const [initialRange, setInitialRange] = useState();
  const [finalRange, setFinalRange] = useState();

  const [financeSummery, setFinanceSummery] = useState();

  useEffect(
    () => {
      let d = "";
      d += yearFrom;
      d += "-";
      if (monthFrom < 10) d += "0" + monthFrom;
      else d += monthFrom;
      d += "-";
      if (dateFrom < 10) d += "0" + dateFrom;
      else d += dateFrom;
      setInitialRange(d);
    },
    dateFrom,
    monthFrom,
    yearFrom
  );

  useEffect(
    () => {
      let d = "";
      d += yearTo;
      d += "-";
      if (monthTo < 10) d += "0" + monthTo;
      else d += monthTo;
      d += "-";
      if (dateTo < 10) d += "0" + dateTo;
      else d += dateTo;
      setFinalRange(d);
    },
    dateTo,
    monthTo,
    yearTo
  );

  useEffect(
    (e) => {
      const fetchData = () => {
        fetch(
          config.server + "finance?from=" + initialRange + "&to=" + finalRange,
          {
            headers: {
              Authorization: "Bearer " + jwtToken,
            },
          }
        )
          .then((response) => response.json())
          .then((result) => {
            if (result?.ok) {
              console.log(result?.message[0]);
              setFinanceSummery(result?.message[0]);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      };
      if (initialRange && finalRange) {
        fetchData();
      }
    },
    [initialRange, finalRange]
  );

  return (
    <>
      <div className="work">
        {/* <Header title="Finance Flow" icon="icon-members" /> */}
        <div
          className="finance-flow"
          style={{ backgroundColor: "transparent" }}
        >
          <div className="frame">
            <div className="child">
              <div className="content">
                <div className="legend">
                  <div
                    className="legend-indicator"
                    style={{ backgroundColor: "#0376F7" }}
                  ></div>
                  <p>Income</p>
                </div>
                <div id="income_chart" className="chart">
                  <Chart
                    chartType="Bar"
                    loader={<div>Loading Chart</div>}
                    data={[
                      ["x", "y0"],
                      ["Test 1", 400],
                      ["Test 2", 500],
                      ["Test 2", 600],
                      ["Test 2", 700],
                    ]}
                    options={{
                      // Material design options
                      colors: ["#0376F7"],
                      legend: { position: "none" },
                      chartArea: {
                        left: 30,
                        top: 30,
                        width: "90%",
                        height: "80%",
                      },
                      fontSize: 12,
                    }}
                    // // For tests
                    // rootProps={{ "data-testid": "2" }}
                  />
                </div>
              </div>
              <div className="content">
                <div className="legend">
                  <div
                    className="legend-indicator"
                    style={{ backgroundColor: "#FF574C" }}
                  ></div>
                  <p>Expense</p>
                </div>
                <div id="expense_chart" className="chart"></div>
              </div>
              <div className="content">
                <div className="legend">
                  <div
                    className="legend-indicator"
                    style={{ backgroundColor: "#FECA1A" }}
                  ></div>
                  <p>Due</p>
                </div>
                <div id="due_chart" className="chart"></div>
              </div>
            </div>
            <div class="content">
              <div class="legendSet">
                <div class="legend-blk">
                  <div
                    class="legend-indicator"
                    style={{ backgroundColor: "#0376F7" }}
                  ></div>
                  <p>Income</p>
                </div>
                <div class="legend-blk">
                  <div
                    class="legend-indicator"
                    style={{ backgroundColor: "#FF574C" }}
                  ></div>
                  <p>Expanse</p>
                </div>
                <div class="legend-blk">
                  <div
                    class="legend-indicator"
                    style={{ backgroundColor: "#FECA1A" }}
                  ></div>
                  <p>Due</p>
                </div>
              </div>
              <div class="chart" id="curve_chart">
                <Chart
                  width={"100%"}
                  height={"100%"}
                  chartType="LineChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ["Year", "Sales", "Expenses", "Due"],
                    ["jan", 1000, 400, 200],
                    ["Feb", 1170, 460, 300],
                    ["Month", 660, 1120, 100],
                    ["April", 1030, 540, 200],
                  ]}
                  options={{
                    curveType: "function",
                    legend: { position: "none" },
                    chartArea: {
                      left: 50,
                      top: 20,
                      width: "90%",
                      height: "70%",
                    },
                    colors: ["#0376F7", "#FF574C", "#FECA1A"],
                    fontSize: 12,
                    series: {
                      1: { curveType: "function" },
                    },
                  }}
                  rootProps={{ "data-testid": "2" }}
                />
              </div>
            </div>
            <div class="long">
              <div class="chart">
                <div class="legendSet2">
                  <div class="legend-blk">
                    <div
                      class="legend-indicator"
                      style={{ backgroundColor: "#0376F7" }}
                    ></div>
                    <p>Income</p>
                  </div>
                  <div class="legend-blk">
                    <div
                      class="legend-indicator"
                      style={{ backgroundColor: "#FF4439" }}
                    ></div>
                    <p>Expanse</p>
                  </div>
                  <div class="legend-blk">
                    <div
                      class="legend-indicator"
                      style={{ backgroundColor: "#F5AC32" }}
                    ></div>
                    <p>Due</p>
                  </div>
                </div>
                <div id="pi_ratio">
                  <Chart
                    width={"100%"}
                    height={"100%"}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                      ["", ""],
                      ["Income", financeSummery?.income],
                      ["Expense", financeSummery?.expense],
                      ["Due", financeSummery?.due],
                    ]}
                    options={{
                      legend: "none",
                      // pieSliceText: {}
                      pieStartAngle: 0,
                      // is3D: true,
                      fontSize: 12,
                      chartArea: {
                        left: 5,
                        top: 40,
                        width: "100%",
                        height: "100%",
                      },
                      colors: ["#0376F7", "#FF4439", "#F5AC32"],
                      // is3D:true,
                    }}
                    rootProps={{ "data-testid": "1" }}
                  />
                </div>
              </div>
              <div id="incomedata">
                <div class="block head">
                  <p>Income Title</p>
                  <p class="pl-5"> Type</p>
                  <p>Amount</p>
                </div>
                <div class="block">
                  <span>lorem Ipsome di</span> <span>Income</span>{" "}
                  <span>60.000 </span>
                </div>
                <div class="block">
                  <span>lorem Ipsome di</span>
                  <span>60.000 </span>
                  <span>60.000 </span>
                </div>
              </div>
            </div>
          </div>
          <div class="payment-sidebar">
            <div class="row-buttons">
              <button class="btn active">Month</button>
              <button class="btn">Quarter</button>
              <button class="btn">Year</button>
            </div>
            <div class="sections">
              <div class="t1" style={{ backgroundColor: "#0376F7" }}>
                <p class="tr">Income</p>
                <p class="tm">
                  <span style={{ fontSize: "25px" }}>{takaSign} </span>
                  {financeSummery?.income ?? "0000"}
                </p>
              </div>
              <div class="t1" style={{ backgroundColor: "#FF4439" }}>
                <p class="tr">Expanse</p>
                <p class="tm">
                  <span style={{ fontSize: "25px" }}>{takaSign} </span>{" "}
                  {financeSummery?.expense ?? "0000"}
                </p>
              </div>
              <div class="t1" style={{ backgroundColor: "#F5AC32" }}>
                <p class="tr">Due</p>
                <p class="tm">
                  <span style={{ fontSize: "25px" }}>{takaSign} </span>{" "}
                  {financeSummery?.due ?? "00000"}
                </p>
              </div>
              <div class="t1" style={{ backgroundColor: "#3cdb5e" }}>
                <p class="tr">Net Profit</p>
                <p class="tm">
                  <span style={{ fontSize: "25px" }}>{takaSign} </span>{" "}
                  {financeSummery?.total ?? "0000"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
