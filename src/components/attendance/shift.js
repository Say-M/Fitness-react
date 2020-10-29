import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "reactstrap";
import * as config from '../config'

import StoreIcon from '../../material/SVG/store.svg'
import EditSVG from "../../material/SVG/edit.svg";
import TrashSVG from "../../material/SVG/trash.svg";

export default function Shift(props) {
  const dispatch = useDispatch()
  const jwtToken = useSelector(state=>state.user.jwtToken)
  const shiftFromRedux = useSelector((state) => state.reusableInfo?.shift);
  const [shiftList, setShiftList] = useState([]);
  const [shiftFormModalShow, setShiftFormModalShow] = useState(false);
  const [shiftModalActionName, setShiftModalActionName] = useState("");
  const toggleShiftFormModal = () => {
    setShiftFormModalShow(false);
  };
  const [shiftForm, setShiftForm] = useState({});

  const updateShiftForm = (entry) => (e) => {
    setShiftForm(
      Object.assign({}, shiftForm, {
        [entry]: e.target.value,
      })
    );
  };

    const submitShiftFormModal = (data,method) => {
		console.log(data)
		fetch(config.server + 'shift', {
			headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + jwtToken
			},
			method: method,
			body: JSON.stringify(data),
			mode: 'cors'
		})
			.then(response => response.json())
			.then(result => {
				console.log(result)
				dispatch({ type: "SHIFT_UPDATE_TRUE" });
			})
			.catch(err => {
				console.log(err);
			})
    } 
    
  
    const shiftDelete = (pkg) => (e) => {
      fetch(config.server + "shift", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + jwtToken
        },
        method: "DELETE",
        body: JSON.stringify({ shift_id: pkg.shift_id }),
        mode: "cors",
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          dispatch({ type: "SHIFT_UPDATE_TRUE" });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
  useEffect(() => {
    setShiftList(shiftFromRedux);
  }, [shiftFromRedux]);
    


  const shiftListView = shiftList.map((shift, index) => {
    return (
      <tr key={shift.shift_id} className="centered">
        <td>{shift.shift_name}</td>
        <td>{shift.shift_start_time}</td>
        <td>{shift.shift_end_time}</td>
        <td class="selectnon">
          <p
            className="active"
            style={
              shift.shift_status == 0
                ? { backgroundColor: config.redColorCode }
                : null
            }
          >
            {" "}
            {shift.shift_status == 1 ? "Active" : "Inactive"}{" "}
          </p>
        </td>
        <td class=" action_holder">
        <img
            src={EditSVG}
            alt="Edit"
            class="action_icon"
                  onClick={() => {
                    setShiftFormModalShow(true);
                    setShiftModalActionName("PUT");
                    setShiftForm(shift);
                  }}
          />
          <img
            src={TrashSVG}
            alt="Delete"
            class="action_icon"
            onClick={shiftDelete(shift)}
          />
        </td>
      </tr>
    );
  });

  return (
    <>
      <div className="multiple_div_holder">
        <div className="box large">
          <div className="headholder p-2">
            <h2>Shift</h2>
            <button
              className="btn-primary px-3 hoveredbtn"
              onClick={() => {
                setShiftFormModalShow(true);
                setShiftModalActionName("POST");
                setShiftForm({
                  shift_status: 1,
                });
              }}
            >
              + Add Shift
            </button>
          </div>

          <div className="tableholder fx">
            <table className="table p-5">
              <thead>
                <tr className="centered">
                  <th scope="col">Name</th>
                  <th scope="col">Start Time</th>
                  <th scope="col">End Time</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
                          </thead>
                          <tbody>
                              {shiftListView}
                          </tbody>
            </table>
          </div>
        </div>
        <div className="box small">
          <div className="headholder">
            <h2>Attendance Summery</h2>
          </div>
          <div className="tableholder">
            <table className="p-4 mt-4">
              <tr>
                <td>Present</td>
                <td className="success">{props?.attendanceSummary?.present}</td>
              </tr>
              <tr>
                <td>Absent</td>
                <td className="warning">{props?.attendanceSummary?.absent}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>

      <Modal
        isOpen={shiftFormModalShow}
        centered={true}
        toggle={toggleShiftFormModal}
      >
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">
            <h3>Add Shift </h3>
          </h5>
          <button
            type="button"
            class="close"
            aria-label="Close"
            onClick={toggleShiftFormModal}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form class="modal-form">
            <div class="package-input-grp">
              <label for="Shift_name">
                Shift Name <span>*</span> :
              </label>
              <input
                type="text"
                name=""
                id="Shift_name"
                placeholder="Enter Shift Name"
                value={shiftForm.shift_name}
                onChange={updateShiftForm("shift_name")}
              />
              {/* <div class="error">
                            You can't use number in this
                        </div> */}
            </div>
            <div class="package-input-grp">
              <label for="Shift_name">
                Start Time <span>*</span> :
              </label>
              <input
                type="time"
                name=""
                id="Shift_name"
                value={shiftForm.shift_start_time}
                onChange={updateShiftForm("shift_start_time")}
              />
              {/* <div class="error">
                            You can't use number in this
                        </div> */}
            </div>
            <div class="package-input-grp">
              <label for="Shift_name">
                End Time <span>*</span> :
              </label>
              <input
                type="time"
                name=""
                id="Shift_name"
                value={shiftForm.shift_end_time}
                onChange={updateShiftForm("shift_end_time")}
              />
              {/* <div class="error">
                            You can't use number in this
                        </div> */}
            </div>
            <div class="package-input-grp">
              <label for="package_name">Status :</label>
              <select
                name=""
                id=""
                placeholder="Select"
                value={shiftForm.shift_status}
                onChange={updateShiftForm("shift_status")}
              >
                <option value="1">Active</option>
                <option value="0">Inctive</option>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer centered">
                  <button type="submit" class="btn-danger br-25 "
                  onClick={toggleShiftFormModal}
                  >
            <h5 class="mt-1">Cancel</h5>
          </button>
                  <button type="submit" class="btn-success br-25"
                      onClick={(e) => {
                          e.preventDefault()
                          submitShiftFormModal(shiftForm, shiftModalActionName);
                          toggleShiftFormModal()
                  }}
                  >
            <h5 class="mt-1">Save</h5>
          </button>
        </div>
      </Modal>
    </>
  );
}
