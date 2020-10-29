import React, { useState, useEffect } from "react";
import { Modal } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import * as config from "../config";
import SelectFeatureList from "./selectFeatureList";

export function EditPackageModal({ modal }) {
  const jwtToken = useSelector((state) => state.user.jwtToken);
  const dispatch = useDispatch();
  const trainingTypeList = useSelector(
    (state) => state.reusableInfo.trainingType
  );
  const [modalShow, setModalShow] = useState(false);
  const [editPackageForm, setEditPackageForm] = useState({
    // package_name: '',
    // package_duration: '',
    package_status: 1,
    // package_amount: ''
  });
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const updatePackageForm = (name) => (e) => {
    setEditPackageForm(
      Object.assign({}, editPackageForm, {
        [name]: e.target.value,
      })
    );
  };

  const modalToggle = () => {
    setModalShow(false);
  };

  useEffect(() => {
    let feature_id = modal?.package.feature_id;

    if (feature_id) {
      feature_id = feature_id.split(",");
      setSelectedFeatures(feature_id);
    } else {
      setSelectedFeatures([]);
    }
    setEditPackageForm(modal.package);
    setModalShow(modal.show);
  }, [modal]);

  const handleEditPackageFormSubmit = (e) => {
    // e.preventDefault()
    const features = selectedFeatures;
    const data = editPackageForm;
    data.package_features = features;
    console.log(data);
    fetch(config.server + "package", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtToken,
      },
      method: "PUT",
      body: JSON.stringify(data),
      mode: "cors",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        dispatch({ type: "PACKAGE_UPDATE_TRUE" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddPackageFormSubmit = (e) => {
    // e.preventDefault()
    const features = selectedFeatures;
    const data = editPackageForm;
    data.package_features = features;
    console.log(data);
    fetch(config.server + "package", {
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
        dispatch({ type: "PACKAGE_UPDATE_TRUE" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const trainingTypeListView = trainingTypeList.map((type, index) => {
    return (
      <option key={index} value={type.training_type_id}>
        {type.training_type}
      </option>
    );
  });

  return (
    <Modal
      id="edit-package"
      centered={true}
      isOpen={modalShow}
      toggle={modalToggle}
    >
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">
          <h3>{modal.action} Package </h3>
        </h5>
        <button
          type="button"
          class="close"
          aria-label="Close"
          onClick={modalToggle}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form action="#" class="modal-form">
          <div class="package-input-grp">
            <label for="package_name">
              Package Name <span>*</span> :
            </label>
            <input
              type="text"
              name=""
              id="package_name"
              placeholder="Enter Package Name"
              value={editPackageForm?.package_name}
              onChange={updatePackageForm("package_name")}
            />
          </div>
          <div class="package-input-grp">
            <label for="package_name">
              Package Duration <span>*</span> :
            </label>
            <select
              name=""
              id=""
              placeholder="Select"
              value={editPackageForm?.package_duration}
              onChange={updatePackageForm("package_duration")}
            >
              <option value={2}>2 Month</option>
              <option value={3}>3 Month</option>
              <option value={4}>4 Month</option>
              <option value={5}>5 Month</option>
              <option value={6}>6 Month</option>
              <option value={7}>7 Month</option>
              <option value={8}>8 Month</option>
              <option value={9}>9 Month</option>
              <option value={10}>10 Month</option>
              <option value={11}>11 Month</option>
              <option value={12}>12 Month</option>
            </select>
          </div>
          <div class="package-input-grp">
            <label for="price">
              Package Fee <span>*</span> :
            </label>
            <input
              type="text"
              name=""
              id="price"
              placeholder="Fee"
              value={editPackageForm?.package_fee}
              onChange={updatePackageForm("package_fee")}
            />
          </div>
          <div class="package-input-grp">
            <label for="admissionprice">
              Admission Fee <span>*</span> :
            </label>
            <input
              type="text"
              name=""
              id="admissionprice"
              placeholder="Fee"
              value={editPackageForm?.admission_fee}
              onChange={updatePackageForm("admission_fee")}
            />
          </div>

          <div class="package-input-grp">
            <label for="package_name">Training Type :</label>
            <select
              name=""
              id=""
              placeholder="Select"
              value={editPackageForm.training_type}
              onChange={updatePackageForm("training_type")}
            >
              {trainingTypeListView}
            </select>
          </div>

          <div class="package-input-grp">
            <label for="textarea">Status :</label>
            <select
              name=""
              id=""
              placeholder="Select"
              value={editPackageForm.package_status}
              onChange={updatePackageForm("package_status")}
            >
              <option value="1">Active</option>
              <option value="0">Inctive</option>
            </select>
          </div>

          <h3>Features</h3>
          <SelectFeatureList
            trainingType={editPackageForm.training_type}
            selectedFeatures={selectedFeatures}
            setSelectedFeature={setSelectedFeatures}
          />
        </form>
      </div>
      <div class="modal-footer centered">
        <button
          type="submit"
          class="btn-danger br-25 "
          onClick={() => {
            modalToggle();
          }}
        >
          <h5 class="mt-1">Cancel</h5>
        </button>
        <button
          type="submit"
          class="btn-primary custom-primary-btn br-25"
          onClick={() => {
            console.log("save click");
            if (modal.action == "Add") handleAddPackageFormSubmit();
            else if (modal.action == "Edit") handleEditPackageFormSubmit();
            modalToggle();
          }}
        >
          <h5 class="mt-1">Save</h5>
        </button>
      </div>
    </Modal>
  );
}
