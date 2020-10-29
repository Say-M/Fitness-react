import React, { useState, useEffect } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom'
import { Modal } from "reactstrap";
import * as config from "../config";
import $ from "jquery";

import DefaultPic from "../../material/SVG/persons/abid.svg";
import UpdateIcon from "../../material/SVG/update.svg";

window.jquery = window.$ = $;

export default function AttendanceReport(props) {
  const jwtToken = useSelector((state) => state.user.jwtToken);
  const shiftFromRedux = useSelector((state) => state.reusableInfo?.shift);
  const [selectedMemberType, setSelectedMemberType] = useState("trainee");
  const [loadMember, setLoadMember] = useState(true);
  const [memberList, setMemberList] = useState([]);
  const [filteredMemberList, setFilteredMemberList] = useState([]);
  const [searchDate, setSearchDate] = useState(moment().format("YYYY-MM-DD"));
  const [filterName, setFilterName] = useState("");

  const updateFilteredMemberList = (entry, index) => (e) => {
    let arr = [...filteredMemberList];
    let obj = arr[index];
    obj = Object.assign({}, obj, {
      [entry]: e.target.value,
      change: true,
    });
    arr[index] = obj;
    setFilteredMemberList(arr);
  };

  useEffect(() => {
    const fetchData = () => {
      fetch(
        config.server +
          "attendance?time=" +
          searchDate +
          "&member_type=" +
          selectedMemberType,
        {
          headers: {
            Authorization: "Bearer " + jwtToken,
          },
        }
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result?.ok) {
            setMemberList(result.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (loadMember) {
      fetchData();
      setLoadMember(false);
    }
  }, [searchDate, loadMember, selectedMemberType]);

  useEffect(() => {
    let presentList = memberList.filter((member) => member.status);
    props.setAttendanceSummary(
      Object.assign({}, props.attendanceSummary, {
        present: presentList.length,
        absent: memberList.length - presentList.length,
      })
    );
  }, [memberList]);

  useEffect(() => {
    if (filterName.length == 0) {
      setFilteredMemberList(memberList);
    } else {
      setFilteredMemberList(
        memberList.filter((member) => {
          let name = member?.firstname + member?.lastname;

          if (name.toLowerCase().indexOf(filterName.toLowerCase()) > -1) {
            return member;
          }
        })
      );
    }
  }, [memberList, filterName]);

  var side_bar = false;
  var recentActivities = false;
  var upcommingActivities = false;
  useEffect(() => {
    if ($) {
      // $(".multiselect").SumoSelect();
      let multiInput = [];
      $(".multiselect").on("change", function () {
        multiInput = $(this).val();
        multiInput.sort();
        multiInput.forEach((value) => {
          if (value === "6") {
            // console.log(value);
            $(".haveClass").show();
          } else {
            $(".haveClass").hide();
          }
        });
      });
      $(".opt label").click(function () {
        let text = this.innerHTML;
        $(".multiText").innerHTML += text;
      });
    }
  }, [$]);

  const updateAttendance = (data) => {
    console.log(data);
    data.time = searchDate;
    fetch(config.server + "attendance", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtToken,
      },
      method: "POST",
      body: JSON.stringify(data),
      mode: "cors",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setLoadMember(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filteredMemberListView = filteredMemberList.map((member, index) => {
    return (
      <tr key={index}>
        <td>
          <img
            src={member.image ? member.image : DefaultPic}
            alt=""
            className="member-image-small"
          />
        </td>
        <td>
          <Link to={`./report/${selectedMemberType}/${member.member_id}`}>
            {member?.firstname + member?.lastname}
          </Link>
        </td>
        <td>{selectedMemberType}</td>
        <td>
          {shiftFromRedux.filter(
            (shift) => shift.shift_id == member?.shift_id
          )[0]?.shift_name ?? "N/A"}
        </td>
        <td>
          <select
            name=""
            id=""
            className="selectbox"
            style={
              member.status && member.status == 1
                ? null
                : { backgroundColor: config.redColorCode }
            }
            value={member.status ? member.status : 0}
            onChange={updateFilteredMemberList("status", index)}
          >
            <option value="0">Absent</option>
            <option value="1">Present</option>
          </select>
        </td>
        <td>
          <input
            type="time"
            name=""
            id=""
            className="px-2 time-input"
            value={member.in_time ? member.in_time : "00-00"}
            onChange={updateFilteredMemberList("in_time", index)}
          />
        </td>
        <td>
          <input
            type="time"
            name=""
            id=""
            className="px-2 time-input"
            value={member.out_time ? member.out_time : "00-00"}
            onChange={updateFilteredMemberList("out_time", index)}
          />
        </td>
        <td className="action_holder">
          <img
            className="action_icon"
            src={UpdateIcon}
            alt="update"
            style={member?.change == true ? null : { display: "none" }}
            onClick={() => {
              updateAttendance(member);
            }}
          ></img>
        </td>
      </tr>
    );
  });

  return (
    <div className="p-4 container-fluid payment-sec">
      <div class="right-options-attn">
        <select
          multiple
          class="custom-select multiselect rounded"
          style={{ width: "200px" }}
        >
          <optgroup label="User Type">
            <option value="1">Trainer</option>
            <option value="2">Stuff</option>
            <option value="6">Client</option>
          </optgroup>
          <optgroup label="Training Type" class="cls">
            <option value="3">Yoga</option>
            <option value="4">Maneger</option>
            <option value="5">Newibe</option>
          </optgroup>
        </select>
        <div class="time" style={{ width: "200px" }}>
          <input
            type="date"
            width="100%"
            class="form-control"
            value={searchDate}
            onChange={(e) => {
              setSearchDate(e.target.value);
              setLoadMember(true);
            }}
          />
        </div>
        <div>
          <div class="input-group" style={{ width: "200px" }}>
            <input
              type="text"
              class="form-control"
              placeholder="Search"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={filterName}
              onChange={(e) => {
                setFilterName(e.target.value);
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
      <div class="clearfix"></div>
      <div class="tab">
        <ul class="nav">
          <li>
            <a
              data-toggle="tab"
              id="package"
              href="#attendence-report-tab"
              class="active"
            >
              Attendence Report
            </a>
          </li>
        </ul>
        <div class="tab-content">
          <div id="attendence-report-tab" class="tab-pane fade show active">
            <div class="table-responsive">
              <table class="table table-hover text-center text-nowrap">
                <thead>
                  <tr>
                    <th scope="col">Photo</th>
                    <th scope="col">Name</th>
                    <th scope="col">User Type</th>
                    <th scope="col">Shift</th>
                    <th scope="col">Status</th>
                    <th scope="col">In Time</th>
                    <th scope="col">Out Time</th>
                    <th scope="col">Action</th>

                  </tr>
                </thead>
                <tbody>{filteredMemberListView} </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
}
