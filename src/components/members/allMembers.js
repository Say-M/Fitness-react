import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as config from "../config";

import MemberEditModal from './modal/memberEdit.js'

import Header from '../common/header'

import NavIcon from "../../material/SVG/nav.svg";
import DefaultPic from "../../material/SVG/persons/abid.svg";
import EditIcon from "../../material/SVG/edit.svg";
import DeleteIcon from "../../material/SVG/trash.svg";

export default function Members() {
  const shiftFromRedux = useSelector((state) => state.reusableInfo?.shift);
  const trainingType = useSelector((state) => state.reusableInfo.trainingType);
  const packageList = useSelector((state) => state.reusableInfo.package);
  const jwtToken = useSelector((state) => state.user.jwtToken);
  const [searchNameInput, setSearchNameInput] = useState("");
  const [seletedTrainingType, setSeletedTrainingType] = useState("all");


  const [memberListLoadState, setMemberListLoadState] = useState(true);
  const [memberList, setMemberList] = useState([]);
  const [allMemberList, setAllMemberList] = useState([]);
  const [filteredMemberList, setFilteredMemberList] = useState([]);

  const [trainerListLoadState, setTrainerListLoadState] = useState(true);
  const [trainerList, setTrainerList] = useState([]);
  const [allTrainerList, setAllTrainerList] = useState([]);
  const [filteredTrainerList, setFilteredTrainerList] = useState([]);

  const [staffListLoadState, setStaffListLoadState] = useState(true);
  const [staffList, setStaffList] = useState([]);
  const [allStaffList, setAllStaffList] = useState([]);
  const [filteredStaffList, setFilteredStaffList] = useState([]);

  const [memberEditModalShow, setMemberEditModalShow] = useState(false)
  const [memberEditDetails, setMemberEditDetails] = useState({})

  useEffect(() => {
    const fetchData = () => {
      fetch(config.server + "client", {
        headers: {
          Authorization: "Bearer " + jwtToken,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.ok && result?.message.length) {
            setAllMemberList(result.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    if (memberListLoadState) {
      fetchData();
      setMemberListLoadState(false);
    }
  }, [memberListLoadState]);


  useEffect(() => {

    const fetchData = () => {
      fetch(config.server + "staff", {
        headers: {
          Authorization: "Bearer " + jwtToken,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.ok && result?.message.length) {
            setAllStaffList(result.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    if (staffListLoadState) {
      fetchData();
      setMemberListLoadState(false);
    }
  }, [staffListLoadState]);


  useEffect(() => {
    const fetchData = () => {
      fetch(config.server + "trainer", {
        headers: {
          Authorization: "Bearer " + jwtToken,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.ok && result?.message.length) {
            setAllTrainerList(result.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    if (trainerListLoadState) {
      fetchData();
      setTrainerListLoadState(false);
    }
  }, [trainerListLoadState]);

  const deleteMember = (member) => (e) => {
    console.log(member);
    fetch(config.server + "client", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtToken,
      },
      method: "DELETE",
      body: JSON.stringify({ client_id: member.client_id }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.ok) {
          setMemberListLoadState(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (seletedTrainingType == 'all') {
      setMemberList(allMemberList)
      setTrainerList(allTrainerList)
    }
    else {
      const marr = allMemberList.filter(member => member.training_type == seletedTrainingType)
      setMemberList(marr)
      const tarr = allTrainerList.filter(member => member.training_type == seletedTrainingType)
      setTrainerList(tarr)

      
    }

  },[allMemberList, seletedTrainingType, allTrainerList])


  useEffect(() => {
    if (searchNameInput.length == 0)
    {
      setFilteredMemberList(memberList);
      setFilteredStaffList(allStaffList);
      setFilteredTrainerList(trainerList);
    }
    else {
      let arr = memberList.filter(
        (member) => (member.firstname + ' ' + member.lastname).toLowerCase().indexOf(searchNameInput.toLowerCase()) > -1
      );
      setFilteredMemberList(arr);
      let sarr = allStaffList.filter(
        (member) => (member.firstname + ' ' + member.lastname).toLowerCase().indexOf(searchNameInput.toLowerCase()) > -1
      );
      setFilteredStaffList(sarr);
      let tarr = trainerList.filter(
        (member) => (member.firstname + ' ' + member.lastname).toLowerCase().indexOf(searchNameInput.toLowerCase()) > -1
      );
      setFilteredTrainerList(tarr);
    }
  }, [searchNameInput, memberList, allStaffList, trainerList]);

  const MemberListView = filteredMemberList.map((member, index) => {
    return (
      <tr key={index}>
        <td>
          <img
            // src={member.image ? config.server + 'info/image/' + member.image : DefaultPic}
            src={member.image ?  member.image : DefaultPic}
            alt=""
            class="member-image-small"
          />
        </td>
        <td>{member?.firstname + " " + member?.lastname}</td>
        <td>{member?.email}</td>
        <td>{member?.phone}</td>
        <td>
          {
            packageList.filter((pkg) => pkg.package_id == member?.package_id)[0]
              ?.package_name
          }
        </td>
        <td>
          {
            shiftFromRedux.filter(
              (shift) => shift.shift_id == member?.shift_id
            )[0]?.shift_name
          }
        </td>
        <td
          class="selectnon"
        >
          <p class="active mt-2" 
            style={
              member?.status == 1 ? {} : { backgroundColor: config.redColorCode }
            }>
            {member?.status == 1 ? "Active" : "Inactive"}
          </p>
        </td>
        <th class=" action_holder">
          <img src={EditIcon} class="action_icon" alt="" 
            onClick={(e)=>{
              setMemberEditModalShow(true)
              setMemberEditDetails(member)
            }}
          />
          <img
            src={DeleteIcon}
            class="action_icon"
            t
            alt=""
            onClick={deleteMember(member)}
          />
        </th>
      </tr>
    );
  });
  const TrainerListView = filteredTrainerList.map((member, index) => {
    return (
      <tr key={index}>
        <td>
          <img
            src={member.image ? member.user_image : DefaultPic}
            alt=""
            class="member-image-small"
          />
        </td>
        <td>{member?.firstname + " " + member?.lastname}</td>
        <td>{member?.email}</td>
        <td>{member?.phone}</td>
        <td>
          {
            member?.designation
          }
        </td>
        <td>
          {
            shiftFromRedux.filter(
              (shift) => shift.shift_id == member?.shift_id
            )[0]?.shift_name
          }
        </td>
        <td
          class="selectnon"
          style={
            member?.status == 1 ? {} : { backgroundColor: config.redColorCode }
          }
        >
          <p class="active mt-2">
            {member?.status == 1 ? "Active" : "Inactive"}
          </p>
        </td>
        <th class=" action_holder">
          <img src={EditIcon} class="action_icon" alt="" />
          <img
            src={DeleteIcon}
            class="action_icon"
            t
            alt=""
            onClick={deleteMember(member)}
          />
        </th>
      </tr>
    );
  });
  const staffListView = filteredStaffList.map((member, index) => {
    return (
      <tr key={index}>
        <td>
          <img
            src={member.image ? member.user_image : DefaultPic}
            alt=""
            class="member-image-small"
          />
        </td>
        <td>{member?.firstname + " " + member?.lastname}</td>
        <td>{member?.email}</td>
        <td>{member?.phone}</td>
        <td>
          {
            member?.designation
          }
        </td>
        {/* <td>
          {
            shiftFromRedux.filter(
              (shift) => shift.shift_id == member?.shift_id
            )[0]?.shift_name
          }
        </td> */}
        <td
          class="selectnon"
          style={
            member?.status == 1 ? {} : { backgroundColor: config.redColorCode }
          }
        >
          <p class="active mt-2">
            {member?.status == 1 ? "Active" : "Inactive"}
          </p>
        </td>
        <th class=" action_holder">
          <img src={EditIcon} class="action_icon" alt="" />
          <img
            src={DeleteIcon}
            class="action_icon"
            t
            alt=""
            onClick={deleteMember(member)}
          />
        </th>
      </tr>
    );
  });

  const trainingTypeListView = trainingType.map((type, index) => {
    return (
      <option key={index} value={type.training_type_id}>
        {type.training_type}
      </option>
    );
  });
  return (
    <div class="work">
      {/* <Header title="Members" icon="icon-admission" /> */}
      <div class="functions admission">
        <div class="payment scroll">
          <div class="headholder">
            <h2></h2>
            <div class="input-form">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="svg_icon2"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
              <input type="text" name="search" id="" placeholder="Search"
              value={searchNameInput}
              onChange={(e) => {
                setSearchNameInput(e.target.value);
              }}
              />
            </div>
            <select name="#" id="" class="row-number"
              value={seletedTrainingType}
              onChange={(e) => {
                setSeletedTrainingType(e.target.value)
              }}
            >
              <option value="all">Training Type</option>
              {trainingTypeListView}
            </select>
            <select name="#" id="" class="row-number">
              <option value="">Row number</option>
            </select>
          </div>
          <div class="tab">
            <ul class="nav">
              <li>
                <a data-toggle="tab" href="#client-tab" class="active">
                  Client
                </a>
              </li>
              <li>
                <a data-toggle="tab" href="#Trainer-tab">
                  Trainer
                </a>
              </li>
              <li>
                <a data-toggle="tab" href="#STuff-tab">
                  Stuff
                </a>
              </li>
            </ul>

            <div class="tab-content">
              <div id="client-tab" class="tab-pane fade show active">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Image</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Contact</th>
                      <th scope="col">Package</th>

                      <th scope="col">Shift</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>{MemberListView}</tbody>
                </table>
              </div>
              <div id="Trainer-tab" class="tab-pane fade">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Image</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Contact</th>
                      <th scope="col">Designation</th>

                      <th scope="col">Shift</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TrainerListView}
                  </tbody>
                </table>
              </div>
              <div id="STuff-tab" class="tab-pane fade">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Image</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Contact</th>
                      <th scope="col">Designation</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>

                    {staffListView}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MemberEditModal showModal={memberEditModalShow} closeModal={setMemberEditModalShow} member={memberEditDetails} load={setMemberListLoadState}/>
    </div>
  );
}
