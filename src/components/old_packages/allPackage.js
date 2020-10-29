import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  const [trainingTypeList, setTrainingTypeList] = useState([]);
  const [selectedTrainingType, setSeletedTrainingType] = useState({});
  const [editPackageModal, setEditPackageModal] = useState({
    show: false,
    package: {},
    action: "",
  });

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
        if(result.ok){
        dispatch({ type: actionTypes.PACKAGE_UPDATE_TRUE });
        }
        else{
          alertShow(result.message)
        }

      })
      .catch((err) => {
        console.log(err);
        alertShow(err)
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
    setTrainingTypeList(trainingType);
  }, [trainingType]);

  const packagesListView = filteredPackageList.map((pkg, index) => {
    return (
      <tr key={index}>
        <td>{pkg.package_name}</td>
        <td>{pkg.admission_fee}</td>
        <td>{pkg.package_fee}</td>
        <td>{pkg.package_duration} Month</td>
        <td class="selectnon">
          <p
            className="active"
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
      <div class="single_div mt-2 pt-1">
        <div class="headholder">
          <h2>All packages</h2>
          <button
            class="btn-primary hoveredbtn px-3"
            onClick={() => {
              setEditPackageModal(
                Object.assign({}, editPackageModal, {
                  show: true,
                  package: {
                    package_status: "1",
                    training_type: trainingTypeList[0].training_type_id,
                    package_duration: 2
                  },
                  action: "Add",
                })
              );
            }}
          >
            + Add Package
          </button>

          <select
            name="#"
            id=""
            class="row-number"
            value={selectedTrainingType}
            onChange={(e) => {
              e.preventDefault();
              setSeletedTrainingType(e.target.value);
            }}
          >
            <option value="">Training Type</option>
            {trainingTypeListView}
          </select>
        </div>
        <div class="holder">
          <table class="table centered-table">
            <thead>
              <tr>
                <th scope="col">Package Name</th>
                <th scope="col">Admission Fee</th>
                <th scope="col">Package Fee</th>
                <th scope="col">Time duration</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
              {packagesListView}
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
      <EditPackageModal modal={editPackageModal} />
    </>
  );
}

export default AllPackage;
