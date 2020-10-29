import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as config from "../config";
import moment from "moment";

import ClientTable from "./make_payment_tables/client";
import StaffTable from "./make_payment_tables/staff";
import BillRentTable from "./make_payment_tables/billRent";
import AdditionalTable from "./make_payment_tables/additional";

import ClientHistoryTable from "./history_tables/client";
import StaffHistoryTable from "./history_tables/staff";

export default function MakePayment() {
  const jwtToken = useSelector((state) => state.user.jwtToken);

  const [selectedType, setSelectedType] = useState("client");
  const [selectedMonth, setSeletedMonth] = useState(moment().format("YYYY-MM"));
  const [selectedDate, setSeletedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [selectedTab, setSelectedTab] = useState("make");

  const [searchNameInput, setSearchNameInput] = useState("");
  return (
    <>
      <div class="right-options">
        <div style={{ width: "200px" }}>
          <select
            class="custom-select w-100"
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
            }}
          >
            <option value="client">Client</option>
            <option value="staff">Stuff</option>
            <option value="bill_rent">Bill/Rent</option>
            <option value="additional">Additional</option>
          </select>
        </div>
        <div
          class="mr-3 mb-md-0 mb-2"
          style={{ width: "200px" }}
          style={selectedTab == "make" ? {} : { display: "none" }}
        >
          <input
            type="month"
            class="form-control w-100"
            value={selectedMonth}
            onChange={(e) => {
              setSeletedMonth(e.target.value);
            }}
          />
        </div>
        <div
          class="mr-3 mb-md-0 mb-2"
          style={{ width: "200px" }}
          style={selectedTab == "history" ? {} : { display: "none" }}
        >
          <input
            type="date"
            class="form-control w-100"
            value={selectedDate}
            onChange={(e) => {
              setSeletedDate(e.target.value);
            }}
          />
        </div>
        <div class="mr-3 mb-md-0 mb-2" style={{ width: "200px" }}>
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="Search"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={searchNameInput}
              onChange={(e) => {
                setSearchNameInput(e.target.value);
              }}
            />
            <div class="input-group-append">
              <span class="input-group-text" id="basic-addon1">
                <i class="fa fa-search"></i>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="tab">
        <ul className="nav">
          <li>
            <a
              data-toggle="tab"
              href="#member-tab"
              className="active"
              onClick={(e) => {
                setSelectedTab("make");
              }}
            >
              Make Payment
            </a>
          </li>
          <li>
            <a
              data-toggle="tab"
              href="#history-tab"
              onClick={(e) => {
                setSelectedTab("history");
              }}
            >
              Payment History
            </a>
          </li>
        </ul>

        <div className="tab-content">
          <div id="member-tab" className="tab-pane fade show active">
            <ClientTable
              display={selectedType == "client"}
              month={selectedMonth}
              searchName={searchNameInput}
            />
            <StaffTable
              display={selectedType == "staff"}
              month={selectedMonth}
              searchName={searchNameInput}
            />
            <BillRentTable
              display={selectedType == "bill_rent"}
              month={selectedMonth}
              searchName={searchNameInput}
            />
            <AdditionalTable
              display={selectedType == "additional"}
              month={selectedMonth}
              searchName={searchNameInput}
            />
          </div>
          <div id="history-tab" className="tab-pane fade">
            <table className="table">
              <ClientHistoryTable
                display={selectedType == "client"}
                date={selectedDate}
                searchName={searchNameInput}
              />
              <StaffHistoryTable
                display={selectedType == "staff"}
                date={selectedDate}
                searchName={searchNameInput}
              />
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
