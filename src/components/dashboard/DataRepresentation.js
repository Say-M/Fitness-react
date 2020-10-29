import React from 'react'; 
import { Chart } from 'react-google-charts'

function DataRepresentation() {


    return (
      <div className="data_presentation">
        <div className="segment">
          <div className="header">Attandance</div>
          <div className="body" id="attandance">
            <Chart
              width={"100%"}
              height={"100%"}
              chartType="PieChart"
              // loader={<div>Loading Chart</div>}
              data={[
                ["Task", "Hours per Day"],
                ["Work", 60],
                ["Eat", 40],
              ]}
              options={{
                pieHole: 0.8,
              }}
            ></Chart>
          </div>
          <div className="footer">Online</div>
        </div>
        <div className="segment">
          <div className="header">Finance Flow</div>
          <div className="body" id="finance_flow">
            <Chart
              width={"100%"}
              height={"100%"}
              chartType="Line"
              data={[
                ["Year", "Sales", "Expenses"],
                [1, 1000, 1100],
                [2, 1170, 1260],
                [3, 1000, 1000],
                [4, 1170, 960],
                [5, 1000, 1200],
                [6, 1170, 1060],
              ]}
                        options={{
                            series: {
                                1: {
                                    curveType: "none"
                                }
                            }
              }}
            ></Chart>
          </div>
          <div className="footer">Month of april</div>
        </div>
        <div className="segment">
          <div className="header">Packages</div>
          <div className="body" id="No_of_packages">
            <Chart
                        width={"100%"}
                        height={"100%"}
                        chartType="ColumnChart"
                        data={[
                            ["Element", "Density", { role: "style" }],
                            ["1", 18.94, "color:#FCAB10"],
                            ["2", 20.49, "color:#39B54A"],
                            ["3", 39.3, "color:#BDCCD4"],
                            ["4", 31.45, "color: #F8333C"],
                        ]}
                        options={{
                            bar: { groupWidth: "70%" },
                            legend: { position: "none" },
                            // width: '80',
                            // width_units: '%'
                        }}
                        columns={[0, 1,
                            {
                                calc: "stringify",
                                sourceColumn: 1,
                                type: "string",
                                role: "annotation"
                            },
                            2]}
            ></Chart>
          </div>
          <div className="footer">No of user</div>
        </div>
      </div>
    );
}

export default DataRepresentation;