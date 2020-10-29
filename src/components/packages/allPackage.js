import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "reactstrap";
import { EditPackageModal } from "./editModal";
import * as config from "../config";
import * as actionTypes from "../../redux/actionTypes";
import StoreSVG from "../../material/SVG/store.svg";
import EditSVG from "../../material/SVG/edit.svg";
import TrashSVG from "../../material/SVG/trash.svg";

import { alertShow } from "../common/reduxFunctions";

function AllPackage(props) {
  const jwtToken = useSelector((state) => state.user.jwtToken);
  const packages = useSelector((state) => state.reusableInfo?.package);
  const trainingType = useSelector((state) => state.reusableInfo.trainingType);
  const dispatch = useDispatch();
  const [packagesList, setPackageList] = useState([]);
  const [filteredPackageList, setFilteredPackageList] = useState([]);
  const [nameFilteredPackageList, setNameFilteredPackageList] = useState([]);
  const [nameFilterInput, setNameFilterInput] = useState("");
  const [trainingTypeList, setTrainingTypeList] = useState([]);
  const [selectedTrainingType, setSeletedTrainingType] = useState({});
  const [editPackageModal, setEditPackageModal] = useState({
    show: false,
    package: {},
    action: "",
  });
  const [viewSinglePackageModal, setViewSinglePackageModal] = useState({
    show: false,
    toggle: ()=>{
      setViewSinglePackageModal(Object.assign({},viewSinglePackageModal, {show: false}))
    
    },
    package: {}
  })

  const updateViewSinglePackageModal = (pkg) =>{
    setViewSinglePackageModal(Object.assign({}, viewSinglePackageModal, {package: pkg}, {show: true}));
  }

  const packageDelete = (pkg) => (e) => {
    fetch(config.server + "package", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtToken,
      },
      method: "DELETE",
      body: JSON.stringify({ package_id: pkg.package_id }),
      mode: "cors",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.ok) {
          dispatch({ type: actionTypes.PACKAGE_UPDATE_TRUE });
        } else {
          alertShow(result.message);
        }
      })
      .catch((err) => {
        console.log(err);
        alertShow(err);
      });
  };

  useEffect(() => {
    setPackageList(packages);
  }, [packages]);

  useEffect(() => {
    if (trainingTypeList.length) {
      setSeletedTrainingType(trainingTypeList[0].training_type_id);
    }
  }, [trainingTypeList]);

  useEffect(() => {
    const filtered = packagesList.filter((pkg) => {
      if (pkg.training_type == selectedTrainingType) return pkg;
    });
    setFilteredPackageList(filtered);
  }, [selectedTrainingType, trainingTypeList, packagesList]);

  useEffect(() => {
    let filtered = [];
    if (nameFilterInput.length == 0) filtered = filteredPackageList;
    else {
      filtered = filteredPackageList.filter((pkg) => {
        if (pkg?.package_name?.toLowerCase() == nameFilterInput.toLowerCase())
          return pkg;
      });
    }
    setNameFilteredPackageList(filtered);
  }, [nameFilterInput, filteredPackageList]);

  useEffect(() => {
    setTrainingTypeList(trainingType);
  }, [trainingType]);

  const packagesListView = nameFilteredPackageList.map((pkg, index) => {
    return (
      <tr key={index}>
        <td className="pnt" onClick={()=>updateViewSinglePackageModal(pkg)}>{pkg.package_name}</td>
        <td className="pnt">{pkg.admission_fee}</td>
        <td className="pnt">{pkg.package_fee}</td>
        <td className="pnt">{pkg.package_duration} Month</td>
        <td class="selectnon">
          <p
            className="active rounded mt-2"
            style={
              pkg.package_status == 0
                ? { backgroundColor: config.redColorCode }
                : null
            }
          >
            {" "}
            {pkg.package_status == 1 ? "Active" : "Inactive"}{" "}
          </p>
        </td>
        <td class=" action_holder">
          <img
            src={EditSVG}
            alt="Edit"
            class="action_icon"
            onClick={() => {
              setEditPackageModal(
                Object.assign({}, editPackageModal, {
                  show: true,
                  package: pkg,
                  action: "Edit",
                })
              );
            }}
          ></img>
          <img
            src={TrashSVG}
            alt="Delete"
            class="action_icon"
            onClick={packageDelete(pkg)}
          >
            {/* <use xlinkHref={`${StoreSVG}#icon-trash`}></use> */}
          </img>
        </td>
      </tr>
    );
  });

  const trainingTypeListView = trainingTypeList.map((type, index) => {
    return (
      <option key={index} value={type.training_type_id}>
        {type.training_type}
      </option>
    );
  });

  return (
    <>
      <div class="p-4 container-fluid payment-sec">
        <div class="right-options">
          <div class="package-btn mt-2">
            <button
              class="btn-add px-3 rounded package"
              onClick={() => {
                setEditPackageModal(
                  Object.assign({}, editPackageModal, {
                    show: true,
                    package: {
                      package_status: "1",
                      training_type: trainingTypeList[0].training_type_id,
                      package_duration: 2,
                    },
                    action: "Add",
                  })
                );
              }}
            >
              + Add Package
            </button>
          </div>
          <select
            class="custom-select mt-2"
            style={{ width: "220px" }}
            value={selectedTrainingType}
            onChange={(e) => {
              e.preventDefault();
              setSeletedTrainingType(e.target.value);
            }}
          >
            <option value="" disabled>
              Training Type
            </option>
            {trainingTypeListView}
          </select>
          <div class="mt-2">
            <div class="input-group" style={{ width: "220px" }}>
              <input
                type="text"
                class="form-control"
                placeholder="Search"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={nameFilterInput}
                onChange={(e) => {
                  setNameFilterInput(e.target.value);
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
        <div class="holder">
          <div className="tab">
            <ul class="nav">
              <li>
                <a
                  data-toggle="tab"
                  id="package"
                  href="#all-package-tab"
                  class="active"
                >
                  Package Lists
                </a>
              </li>
            </ul>
            <div class="tab-content">
              <div id="all-package-tab" class="tab-pane fade show active">
                <div class="table-responsive">
                  <table class="table text-nowrap table-hover table-sm">
                    <thead>
                      <tr>
                        <th scope="col">Package Name</th>
                        <th scope="col">Admission Fee</th>
                        <th scope="col">Package Fee</th>
                        <th scope="col">Time duration</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>{packagesListView}</tbody>
                  </table>
                </div>{" "}
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
      <EditPackageModal modal={editPackageModal} />
      <SinglePackageModal modal={viewSinglePackageModal} />
    </>
  );
}

export default AllPackage;


function SinglePackageModal({modal}) {
 
  return (
    <>
      <Modal
        centered={modal.show}
        isOpen={modal.show}
        toggle={modal.toggle}
        id="packageModal"
      >
        <div class="modal-content border-0">
          <div class="modal-body p-0">
            <div class="package-card">
              <div class="package-header">
                <h1 class="package-type bg-package-silver">
                  {modal?.package?.package_name}
                </h1>
                <p>For {modal?.package?.package_duration} months</p>
              </div>
              <div class="package-body">
                <ul>
                  <li>
                    <span>Admission Fee </span>
                    <span class="ml-3">
                      {" "}
                      {modal?.package?.admission_fee} taka
                    </span>
                  </li>
                  <li>
                    <span>Package Fee </span>
                    <span class="ml-3">
                      {" "}
                      {modal?.package?.package_fee} taka
                    </span>
                  </li>
                </ul>
              </div>
              <div class="pack-footer">
                <h2>Features</h2>
                <div>
                  <i class="fas fa-check text-primary"></i> <span>Feature</span>
                </div>
                <div>
                  <i class="fas fa-check text-primary"></i> <span>Feature</span>
                </div>
                <div>
                  <i class="fas fa-check text-primary"></i> <span>Feature</span>
                </div>
                <div>
                  <i class="fas fa-check text-primary"></i> <span>Feature</span>
                </div>
                <div>
                  <i class="fas fa-check text-primary"></i> <span>Feature</span>
                </div>
                <div>
                  <i class="fas fa-check text-primary"></i> <span>Feature</span>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#appPackageModal"
            >
              View All
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
