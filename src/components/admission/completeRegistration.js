import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import * as config from "../config";

export default function CompleteRegistraion({
  form,
  updateForm,
  existingData,
  display,
  handleSubmit,
  backButton,
}) {
  const jwtToken = useSelector((state) => state.user.jwtToken);
  const shiftFromRedux = useSelector((state) => state.reusableInfo?.shift);
  const trainingType = useSelector((state) => state.reusableInfo.trainingType);
  const packageList = useSelector((state) => state.reusableInfo.package);
  const [filteredPackageList, setFilteredPackageList] = useState([]);
  // const [existingData, setExistingData] = useState({});
  // const [
  //   completeRegistrationFormData,
  //   setCompleteRegistrationFormData,
  // ] = useState({});

  // const updateRegForm = (entry, value) => {
  //   setCompleteRegistrationFormData(
  //     Object.assign({}, completeRegistrationFormData, {
  //       [entry]: value,
  //     })
  //   );
  // };

  // useEffect(() => {
  //   console.log("update");
  //   let form = props.parentAdmissionForm;
  //   console.log(form);
  //   console.log(form.basic_info_ok);
  //   if (form.basic_info_ok) {
  //     console.log("ok");
  //     setExistingData(props.parentAdmissionForm);
  //     setCompleteRegistrationFormData(props.parentAdmissionForm);
  //   } else {
  //     setExistingData({});
  //     setCompleteRegistrationFormData({});
  //   }
  // }, [props.parentAdmissionForm]);

  // const handleSubmitForm = (e) => {
  //   e.preventDefault();
  //   if (props.parentAdmissionForm?.basic_info_ok) {
  //     let form = completeRegistrationFormData;

  //     // if (form?.address?.length && form?.package_id?.length && form?.shift_id?.length) {
  //     // if (form.training_type && form.package_id) {
  //     if (form) {
  //       let post_address = "";
  //       if (form?.user_type == "client") {
  //         // post_address = form?.user_id ? "client/" + form?.user_id : "client";
  //         post_address = "client";
  //         form.admission_date = moment().format("YYYY-MM-DD HH:mm:ss");
  //       } else if (form?.user_type == "trainer") {
  //         // post_address = form?.user_id ? "trainer/" + form?.user_id : "trainer";
  //         post_address = "trainer";
  //         form.joining_date = moment().format("YYYY-MM-DD HH:mm:ss");
  //       } else if (form?.user_type == "staff") {
  //         // post_address = form?.user_id ? "staff/" + form?.user_id : "staff";
  //         post_address = "staff";
  //         form.joining_date = moment().format("YYYY-MM-DD HH:mm:ss");
  //       }
  //       console.log(post_address);
  //       console.log(form);
  //       fetch(config.server + post_address, {
  //         headers: {
  //           Authorization: "Bearer " + jwtToken,
  //           "Content-Type": "application/json",
  //         },
  //         method: "POST",
  //         body: JSON.stringify(form),
  //         mode: "cors",
  //       })
  //         .then((response) => response.json())
  //         .then((result) => {
  //           console.log(result);
  //           if (result.ok) {
  //             props.setParentAdmissionForm(
  //               Object.assign({}, form, result.message, {
  //                 registraition_done: true,
  //               })
  //             );
  //             alert("Admission Successfull. Continue to payment.");
  //           } else {
  //             alert(result.message);
  //           }
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //           alert(err);
  //         });
  //     } else {
  //       if (!form.training_type) {
  //         alert("Please select training_type");
  //       } else if (!form.package_id) {
  //         alert("Please select package");
  //       }
  //     }
  //   }
  //   console.log("not ready");
  //   alert("Please Fill up basic info");
  // };

  const inchToCM = (inch)=>{
    return (inch * 2.54)
  }

  useEffect(
    (e) => {
      if (form.training_type) {
        let arr = packageList.filter(
          (pkg) => pkg.training_type == form.training_type
        );
        setFilteredPackageList(arr);
      } else {
        setFilteredPackageList([]);
      }
    },
    [packageList, trainingType, form.training_type]
  );

  function getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result, null);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
      return null, error;
    };
  }

  const packageOptionView = filteredPackageList.map((pkg, index) => {
    return (
      <option value={pkg.package_id} key={index}>
        {" "}
        {pkg.package_name}
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
  const trainingTypeListView = trainingType.map((type, index) => {
    return (
      <option key={index} value={type.training_type_id}>
        {type.training_type}
      </option>
    );
  });

  return (
    <div id="inner-right2" style={display ? {} : { display: "none" }}>
      <form
        class="my-4 form-registration"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div class="form-body mt-5">
          <div class="form-group row">
            <label for="address" class="col-sm-4 col-form-label">
              Address <small class="text-danger">*</small>
            </label>
            <div class="col-sm-8">
              <input
                type="text"
                placeholder="Enter Address"
                class="form-control form-control-sm rounded-0"
                id="address"
                readOnly={existingData?.address?.length}
                value={form.address}
                onChange={(e) => {
                  updateForm({ address: e.target.value });
                }}
              />
              <span></span>
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-8 offset-sm-4 pb-sm-2">
              <input
                placeholder="Enter City Name"
                type="text"
                class="form-control form-control-sm rounded-0"
                readOnly={existingData?.city?.length}
                value={form.city}
                onChange={(e) => {
                  updateForm({ city: e.target.value });
                }}
              />
              <span></span>
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-8 offset-sm-4 pb-sm-2">
              <input
                placeholder="Enter Zip Code"
                type="text"
                class="form-control form-control-sm rounded-0"
                readOnly={existingData?.zip_code?.length}
                value={form.zip_code ?? ""}
                onChange={(e) => {
                  let val = e.target.value;
                  if (val.match(/^[0-9]*$/)) {
                    updateForm({ zip_code: e.target.value });
                  }
                }}
              />
              <span></span>
            </div>
          </div>
          <div class="form-group row">
            <label for="profession" class="col-sm-4 col-form-label">
              Profession
            </label>
            <div class="col-sm-8">
              <input
                type="tel"
                class="form-control form-control-sm rounded-0"
                id="profession"
                placeholder="Enter Profession"
                readOnly={existingData?.profession?.length}
                value={form.profession}
                onChange={(e) => {
                  updateForm({ profession: e.target.value });
                }}
              />
              <span></span>
            </div>
          </div>
          <div class="form-group row">
            <label for="height" class="col-sm-4 col-form-label">
              Height
            </label>
            <div class="col-4">
              <input
                placeholder="Enter Height"
                type="number"
                class="form-control form-control-sm rounded-0"
                id="height"
                readOnly={existingData?.height?.length}
                value={form.height}
                onChange={(e) => {
                  updateForm({ height: e.target.value });
                }}
              />
              <span></span>
            </div>
            <div class="col-4">
              <div class="custom-control custom-radio custom-control-inline mt-2 mr-0 pl-2">
                <input
                  checked
                  type="radio"
                  id="h-foot"
                  name="height"
                  class="custom-control-input"
                />
                <label class="custom-control-label" for="h-foot">
                  Foot
                </label>
              </div>
              <div class="custom-control custom-radio custom-control-inline mt-2 mr-0">
                <input
                  type="radio"
                  id="h-cm"
                  name="height"
                  class="custom-control-input"
                />
                <label class="custom-control-label" for="h-cm">
                  cm
                </label>
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label for="weight" class="col-sm-4 col-form-label">
              Weight
            </label>
            <div class="col-4">
              <input
                placeholder="Enter Weight"
                type="number"
                class="form-control form-control-sm rounded-0"
                id="weight"
                readOnly={existingData?.weight?.length}
                value={form.weight}
                onChange={(e) => {
                  updateForm({ weight: e.target.value });
                }}
              />
              <span></span>
            </div>
            <div class="col-4">
              <div class="custom-control custom-radio custom-control-inline mt-2 mr-0 pl-2">
                <input
                  checked
                  type="radio"
                  id="w-kg"
                  name="weight"
                  class="custom-control-input"
                />
                <label class="custom-control-label" for="w-kg">
                  kg
                </label>
              </div>
              <div class="custom-control custom-radio custom-control-inline mt-2 mr-0">
                <input
                  type="radio"
                  id="w-lbs"
                  name="weight"
                  class="custom-control-input"
                />
                <label class="custom-control-label" for="w-lbs">
                  lbs
                </label>
              </div>
            </div>
          </div>
          <div
            class="form-group row"
            style={form.user_type == "staff" ? { display: "none" } : {}}
          >
            <label for="type" class="col-sm-4 col-form-label">
              Traning Type <small class="text-danger">*</small>
            </label>
            <div class="col-sm-8">
              <select
                id="type"
                class="custom-select custom-select-sm rounded-0"
                value={form.training_type}
                onChange={(e) => {
                  updateForm({ training_type: e.target.value });
                }}
              >
                <option selected value>
                  Select Type
                </option>
                {trainingTypeListView}
              </select>
              <span></span>
            </div>
          </div>
          <div
            class="form-group row package-area"
            style={form.user_type == "client" ? {} : { display: "none" }}
          >
            <label for="package" class="col-sm-4 col-form-label">
              Package <small class="text-danger">*</small>
            </label>
            <div class="col-sm-8">
              <select
                id="package"
                class="custom-select custom-select-sm rounded-0"
                value={form.package_id}
                onChange={(e) => {
                  updateForm({ package_id: e.target.value });
                }}
              >
                <option selected>Select Package</option>
                {packageOptionView}
              </select>
              <span></span>
            </div>
          </div>

          <div
            class="form-group row"
            style={form.user_type == "client" ? { display: "none" } : {}}
          >
            <label for="designation" class="col-sm-4 col-form-label">
              Designation <small class="text-danger">*</small>
            </label>
            <div class="col-sm-8">
              <input
                type="text"
                placeholder="Enter Designation"
                class="form-control form-control-sm rounded-0"
                id="address"
                readOnly={existingData?.designation?.length}
                value={form.designation}
                onChange={(e) => {
                  updateForm({ designation: e.target.value });
                }}
              />
              <span></span>
            </div>
          </div>
          <div
            class="form-group row"
            style={form.user_type == "trainer" ? {} : { display: "none" }}
          >
            <label for="address" class="col-sm-4 col-form-label">
              Salary <small class="text-danger">*</small>
            </label>
            <div class="col-sm-8">
              <input
                type="text"
                placeholder="Enter Salary"
                class="form-control form-control-sm rounded-0"
                id="address"
                readOnly={existingData?.salary?.length}
                value={form.salary ?? ""}
                onChange={(e) => {
                  let val = e.target.value;
                  if (val.match(/^[0-9]*$/)) {
                    updateForm({ salary: e.target.value });
                  }
                }}
              />
              <span></span>
            </div>
          </div>
          <div
            class="form-group row"
            style={form.user_type == "staff" ? { display: "none" } : {}}
          >
            <label for="shift" class="col-sm-4 col-form-label">
              Shift <small class="text-danger">*</small>
            </label>
            <div class="col-sm-8">
              <select
                id="shift"
                class="custom-select custom-select-sm rounded-0"
                value={form.shift_id}
                onChange={(e) => {
                  updateForm({ shift_id: e.target.value });
                }}
              >
                <option selected>Select Shift</option>
                {shiftOptionView}
              </select>
              <span></span>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-4 col-form-label">Upload Photo</label>
            <div class="col-sm-8">
              <div class="custom-file">
                <input type="file" class="custom-file-input" id="photo" />
                <label class="custom-file-label customFile" for="photo">
                  Choose file
                </label>
              </div>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-4 col-form-label">Upload NID</label>
            <div class="col-sm-8">
              <div class="custom-file">
                <input type="file" class="custom-file-input" id="nid" />
                <label class="custom-file-label customFile" for="nid">
                  Choose file
                </label>
              </div>
            </div>
          </div>
          <div class="form-group row">
            <div class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="agree" 
              checked={form.terms_policy}
              onClick={e=>{
                let state = form.terms_policy;
                updateForm({terms_policy: !state})
              }}
              />
              <label class="custom-control-label" for="agree">
                <small>
                  I accept all the{" "}
                  <a href="#" class="text-primary">
                    Terms and conditions
                  </a>
                </small>
              </label>
            </div>
          </div>
          <div class="form-group text-right mt-4">
            <button
              class="btn btn-outline-info"
              id="prev2"
              onClick={(e) => {
                e.preventDefault();
                backButton();
              }}
            >
              Previous
            </button>
            <button
              type="submit"
              class="ml-3 btn btn-primary"
              id="point2"
              disabled={!form.terms_policy}
            >
              SUBMIT
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
