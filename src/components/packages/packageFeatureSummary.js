import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import StoreSVG from "../../material/SVG/store.svg";
import EditSVG from "../../material/SVG/edit.svg";
import TrashSVG from "../../material/SVG/trash.svg";
import * as config from "../config";

function PackageFeatureSummary() {
  const jwtToken = useSelector((state) => state.user.jwtToken);
  const activePackage = useSelector(
    (state) => state.reusableInfo?.activePackage
  );
  const draftPackage = useSelector((state) => state.reusableInfo.draftPackage);
  const trainingType = useSelector((state) => state.reusableInfo.trainingType);
  const [trainingTypeList, setTrainingTypeList] = useState([]);
  const dispatch = useDispatch();
  const [featurePackageList, setFiturePackageList] = useState([]);
  const [updateFeatueDataStatus, setUpdateFeatureDataStatus] = useState(true);
  const [addFeatureForm, setAddFeatureForm] = useState({});
  const [addFeatureFormModal, setAddfeatureFormModal] = useState(false);
  const toggleFeatureFormModal = () => {
    setAddfeatureFormModal(false);
  };
  const [modalSubmitAction, setModalSubmitAction] = useState({
    title: "",
    action: () => {},
  });

  const updateAddFeatureForm = (entry) => (e) => {
    setAddFeatureForm(
      Object.assign({}, addFeatureForm, { [entry]: e.target.value })
    );
  };

  const handleAddFeatureSubmit = (data) => {
    console.log(data);
    fetch(config.server + "feature", {
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
        setUpdateFeatureDataStatus(true);
        dispatch({ type: "FEATURE_LIST_GET_STATUS_TRUE" });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEditFeatureSubmit = (data) => {
    console.log(data);
    fetch(config.server + "feature", {
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
        setUpdateFeatureDataStatus(true);
        dispatch({ type: "FEATURE_LIST_GET_STATUS_TRUE" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const fetchData = () => {
      fetch(config.server + "feature", {
        headers: {
          Authorization: "Bearer " + jwtToken,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.ok) {
            setFiturePackageList(result.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (updateFeatueDataStatus) {
      fetchData();
      setUpdateFeatureDataStatus(false);
    }
  }, [updateFeatueDataStatus]);

  const featureDelete = (pkg) => (e) => {
    fetch(config.server + "feature", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtToken,
      },
      method: "DELETE",
      body: JSON.stringify({ feature_id: pkg.feature_id }),
      mode: "cors",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setUpdateFeatureDataStatus(true);
        dispatch({ type: "FEATURE_LIST_GET_STATUS_TRUE" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const featurePackageView = featurePackageList.map((pkg, index) => {
    return (
      <tr key={index} className="centered">
        <td>
          <p>{pkg.feature_name}</p>
        </td>
        <td>
          {
            trainingTypeList?.filter(
              (type) => type.training_type_id == pkg?.training_type
            )[0]?.training_type
          }
        </td>
        <td class="selectnon">
          <p
            className="active rounded mt-2"
            style={
              pkg.feature_status == 0
                ? { backgroundColor: config.redColorCode }
                : null
            }
          >
            {" "}
            {pkg.feature_status == 1 ? "Active" : "Inactive"}{" "}
          </p>
        </td>
        <td class=" action_holder">
          <img
            src={EditSVG}
            alt="Edit"
            class="action_icon"
            onClick={() => {
              setAddfeatureFormModal(true);
              setModalSubmitAction(
                Object.assign({}, modalSubmitAction, {
                  title: "Edit Feature",
                  action: handleEditFeatureSubmit,
                })
              );
              setAddFeatureForm(
                Object.assign({}, addFeatureForm, {
                  feature_name: pkg.feature_name,
                  feature_status: pkg.feature_status,
                  feature_id: pkg.feature_id,
                  training_type: pkg.training_type,
                })
              );
            }}
          ></img>
          <img
            src={TrashSVG}
            alt="Delete"
            class="action_icon"
            onClick={featureDelete(pkg)}
          ></img>
        </td>
      </tr>
    );
  });

  useEffect(() => {
    setTrainingTypeList(trainingType);
  }, [trainingType]);

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
              class="btn-add px-3 rounded feature"
              data-toggle="modal"
              data-target="#add-shift-modal"
              onClick={(e) => {
                setAddfeatureFormModal(true);
                setModalSubmitAction(
                  Object.assign({}, modalSubmitAction, {
                    title: "Add Feature",
                    action: handleAddFeatureSubmit,
                  })
                );
                setAddFeatureForm(
                  Object.assign({}, addFeatureForm, {
                    feature_name: "",
                    feature_status: 1,
                    training_type: trainingTypeList[0].training_type_id,
                  })
                );
              }}
            >
              + Add Feature
            </button>
          </div>
          <select class="custom-select mt-2" style={{ width: "220px" }}>
            <option selected="">Select Category</option>
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
                id="feature"
                href="#package-feature-tab"
                class="active"
              >
                Packages Feature
              </a>
            </li>
          </ul>
        </div>
        <div class="tab-content">
          <div id="package-feature-tab" class="tab-pane fade show active">
            <div class="table-responsive">
              <table class="table table-hover text-nowrap table-sm">
                <thead>
                  <tr>
                    <th scope="col">Feature Title</th>
                    <th scope="col">Training Type</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>{featurePackageView}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* <-- Modal section -->  */}
      <Modal
        isOpen={addFeatureFormModal}
        toggle={toggleFeatureFormModal}
        centered={true}
      >
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">
            <h3>{modalSubmitAction.title} </h3>
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={toggleFeatureFormModal}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form action="#" class="modal-form">
            <div class="package-input-grp">
              <label for="Shift_name">
                Feature Title <span>*</span> :
              </label>
              <input
                type="text"
                name=""
                id="Shift_name"
                placeholder="Feature title"
                value={addFeatureForm.feature_name}
                onChange={updateAddFeatureForm("feature_name")}
              />
              {/* <div class="error">You can't use number in this</div> */}
            </div>
            <div class="package-input-grp">
              <label for="package_name">Training Type :</label>
              <select
                name=""
                id=""
                placeholder="Select"
                value={addFeatureForm.training_type}
                onChange={updateAddFeatureForm("training_type")}
              >
                {trainingTypeListView}
              </select>
            </div>
            <div class="package-input-grp">
              <label for="package_name">Status :</label>
              <select
                name=""
                id=""
                placeholder="Select"
                value={addFeatureForm.feature_status}
                onChange={updateAddFeatureForm("feature_status")}
              >
                <option value="1">Active</option>
                <option value="0">Inctive</option>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer centered">
          <button
            type="submit"
            class="btn-danger br-25 "
            onClick={toggleFeatureFormModal}
          >
            <h5 class="mt-1">Cancel</h5>
          </button>
          <button
            type="submit"
            class="btn-primary custom-primary-btn br-25"
            onClick={() => {
              modalSubmitAction.action(addFeatureForm);
              toggleFeatureFormModal();
            }}
          >
            <h5 class="mt-1">Save</h5>
          </button>
        </div>
      </Modal>
    </>
  );
}

export default PackageFeatureSummary;
