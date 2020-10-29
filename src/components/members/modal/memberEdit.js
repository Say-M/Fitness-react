import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import * as config from "../../config";

export default function MemberEditModal(props) {
  const jwtToken = useSelector((state) => state.user.jwtToken);
  const [showModal, setShowModal] = useState(false);
  const trainingTypeList = useSelector(
    (state) => state.reusableInfo.trainingType
  );
  const packageList = useSelector((state) => state.reusableInfo.package);
  const [filteredPackageList, setFilteredPackageList] = useState([]);
  const shiftFromRedux = useSelector((state) => state.reusableInfo?.shift);

  const defaultFormValue = {
    training_type: 1,
  };

  const [formData, setFormData] = useState(defaultFormValue);

  const updateFormData = (entry, value) => (e) => {
    setFormData(
      Object.assign({}, formData, {
        [entry]: e.target.value,
      })
    );
  };

  const handleSubmitForm = (form) => {
    fetch(config.server + "client", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtToken,
      },
      method: "PUT",
      body: JSON.stringify(form),
      mode: "cors",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.ok) {
          props.load(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(
    (e) => {
      setFormData(props.member);
    },
    [props.member]
  );

  useEffect(
    (e) => {
      setShowModal(props.showModal);
    },
    [props.showModal]
  );
  const toggle = () => {
    props.closeModal(false);
  };

  useEffect(
    (e) => {
      if (formData.training_type) {
        let arr = packageList.filter(
          (pkg) => pkg.training_type == formData.training_type
        );
        setFilteredPackageList(arr);
        setFormData(
          Object.assign({}, formData, {
            package_id: arr[0]?.package_id,
          })
        );
      } else {
        setFilteredPackageList([]);
      }
    },
    [packageList, trainingTypeList, formData.training_type]
  );

  const packageOptionView = filteredPackageList.map((pkg, index) => {
    return (
      <option value={pkg.package_id} key={index}>
        {" "}
        {pkg.package_name}
      </option>
    );
  });

  const trainingTypeListView = trainingTypeList.map((type, index) => {
    return (
      <option key={index} value={type.training_type_id}>
        {type.training_type}
      </option>
    );
  });

  const shiftOptionView = shiftFromRedux.map((shift, index) => {
    return (
      <option value={shift.shift_id} key={index}>
        {shift.shift_name}
      </option>
    );
  });

  return (
    <>
      <Modal
        isOpen={showModal}
        centered={true}
        toggle={toggle}
        id="show-packages"
        className="p-3"
      >
        <ModalHeader>
          <h5 class="modal-title" id="exampleModalLongTitle">
            <h3>Member </h3>
          </h5>
          <button type="button" class="close" onClick={toggle}>
            <span aria-hidden="true">&times;</span>
          </button>
        </ModalHeader>

        <ModalBody>
          <form class="modal-form">
            <div class="package-input-grp">
              <label for="package_name">Training Type:</label>
              <select
                name=""
                id=""
                placeholder="Select"
                value={formData.training_type}
                onChange={updateFormData("training_type")}
              >
                  <option>Select Training Type</option>
                {trainingTypeListView}
              </select>
            </div>
            <div class="package-input-grp">
              <label for="package_name">Package:</label>
              <select
                name=""
                id=""
                placeholder="Select"
                value={formData.package_id}
                onChange={updateFormData("package_id")}
              >
                  <option>Select Package</option>
                {packageOptionView}
              </select>
            </div>
            <div class="package-input-grp">
              <label for="package_name">Shift :</label>
              <select
                name=""
                id=""
                placeholder="Select"
                value={formData.shift_id}
                onChange={updateFormData("shift_id")}
              >
                  <option >Select Shift</option>
                {shiftOptionView}
              </select>
            </div>
            <div class="package-input-grp">
              <label for="package_name">Workout Plan :</label>
              <select
                name=""
                id=""
                placeholder="Select"
                value={formData.workout_plan_id}
                onChange={updateFormData("workout_plan_id")}
              >
                <option>Select Workout Plan</option>
                {}
              </select>
            </div>
            <div class="package-input-grp">
              <label for="package_name">Fitness Plan :</label>
              <select
                name=""
                id=""
                placeholder="Select"
                value={formData.fitness_plan_id}
                onChange={updateFormData("fitness_plan_id")}
              >
                <option>Select Fitness Plan</option>
                {}
              </select>
            </div>
            <div class="package-input-grp">
              <label for="package_name">Status :</label>
              <select
                name=""
                id=""
                placeholder="Select"
                value={formData.status}
                onChange={updateFormData("status")}
              >
                <option value={1}> Active </option>
                <option value={0}> Inative </option>
              </select>
            </div>
            <div class="modal-footer centered">
              <button
                type="submit"
                class="btn-danger br-25 "
                onClick={() => {
                  toggle();
                }}
              >
                <h5 class="mt-1">Cancel</h5>
              </button>
              <button
                type="submit"
                class="btn-primary custom-primary-btn br-25"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmitForm(formData);
                  toggle();
                }}
              >
                <h5 class="mt-1">Save</h5>
              </button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}
