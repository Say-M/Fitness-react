import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import * as config from "../config";
import Header from "../common/header";
import AllReadyMember from "./alreadyMember";
import CompleteRegistraion from "./completeRegistration";
import AddPayment from "./addPayment";
import { fetchBasicData } from "./fetchData";
import { alertShow, successShow } from "../common/reduxFunctions";

import DefaultPic from "../../material/SVG/persons/abid.svg";
import PaymentPic from "../../material/img/payment.jpg";

export default function Admission(props) {
  const defaultValue = {
    user_type: "client",
    gender: "Male",
    marital_status: "Unmarried",
    firstname: "",
    lastname: "",
    phone: null,
    dob: "",
    terms_policy: false,
  };
  const paymentDefaultValue = {
    payment_method: "Cash",
    discount: 0
  };

  const jwtToken = useSelector((state) => state.user.jwtToken);
  const packageList = useSelector((state) => state.reusableInfo.package);
  const [checkEmail, setCheckEmail] = useState("");
  const [admissionForm, setAdmissionForm] = useState(defaultValue);
  const [existingData, setExistingData] = useState({});
  const [paymentForm, setPaymentForm] = useState(paymentDefaultValue);
  const [formStateViewMode, setFormStateViewMode] = useState("basic"); // basic, complete, payment

  const updateAdmissionForm = (data) => {
    setAdmissionForm(Object.assign({}, admissionForm, data));
  };

  const updatePaymentForm = (data)=>{
    setPaymentForm(Object.assign({}, paymentForm, data))
  }

  const checkEmailAdress = (email) => {
    return email.match(/^[\w-\.]+@[\w\.]+\.[\w]+$/);
  };

  const checkEmailAction = (email) => {
    if (checkEmailAdress(email)) {
      fetch(config.server + "user/check_by_email?email=" + email, {
        headers: {
          Authorization: "Bearer " + jwtToken,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.ok) {
            if (result.no_user) {
              defaultValue.email = email;
              setAdmissionForm(defaultValue);
              setExistingData({});
            } else {
              setExistingData(result?.message[0]);
              let data = result.message[0];
              data.email = email;
              data.user_type = "client";
              setAdmissionForm(data);
            }
            successShow("Please fill up the form.");
          }
        })
        .catch((err) => {
          console.log(err);
          alertShow(err);
        });
    } else {
      alertShow("Please provide valid email address.");
    }
  };

  const handleContinueRegButtonClick = () => {
    if (!admissionForm.email) {
      alertShow("Please check registered list.");
    } else if (
      admissionForm.renew_date_client &&
      admissionForm.user_type == "client"
    ) {
      alertShow(`Already a trainee of the gym.`);
    } else if (
      admissionForm.renew_date_trainer &&
      admissionForm.user_type == "trainer"
    ) {
      alertShow(`Already a trainer of the gym.`);
    } else if (
      admissionForm.renew_date_staff &&
      admissionForm.user_type == "staff"
    ) {
      alertShow(`Already a staff of the gym.`);
    } else if (
      !admissionForm.firstname &&
      !admissionForm.lastname &&
      !admissionForm.phone
    ) {
      alertShow("Please provide required information.");
    } else {
      updateAdmissionForm({ basic_info_ok: true });
      setFormStateViewMode("complete");
      successShow("Basic info updated.");
    }
  };

  const completeFormBackButton = () => {
    setFormStateViewMode("basic");
  };
  const paymentFormBackButton = (e) => {
    setFormStateViewMode("complete");
  };

  const handleCompleteFormButton = () => {
    if (!admissionForm.basic_info_ok) {
      alertShow("Please fill up basic info.");
    } else if (!admissionForm.terms_policy) {
      alertShow("Please accept terms and conditions");
    } else if (
      admissionForm.user_type == "client" &&
      !admissionForm?.address?.length &&
      !admissionForm?.training_type?.length &&
      !admissionForm?.package?.length &&
      !admissionForm?.shift?.length
    ) {
      alertShow("Please provide required information.");
    } else {
      postAdmissionForm(admissionForm);
    }
  };

  const postAdmissionForm = (form) => {
    form.admission_date = moment().format("YYYY-MM-DD");
    form.joining_date = moment().format("YYYY-MM-DD");
    let post_address = "client";
    if (form.user_type == "trainer") post_address = "trainer";
    else if (form.user_type == "staff") post_address = "staff";
    fetch(config.server + post_address, {
      headers: {
        Authorization: "Bearer " + jwtToken,
        "Content-Type": "application/json",
      },
      method: "POST",
      mode: "cors",
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.ok) {
          if (post_address == "client") {
            successShow("Registration Completed. Please make payment.");
            updateAdmissionForm({ complete_registration_ok: true });
            setFormStateViewMode("payment");
            let pkg = packageList.filter(pkg => pkg.package_id == admissionForm.package_id);
            pkg = pkg.length ? pkg[0] : { monthly: true, package_fee: 0}
            pkg.monthly_fee  = 0;
            setPaymentForm(
              Object.assign({},paymentForm,{
                admission_fee : pkg?.admission_fee,
                package_fee: pkg?.package_fee,
                monthly: pkg?.monthly,
                month_from: moment().format('YYYY-MM-DD'),
                month_to: moment().add(pkg.package_duration, 'months').format('YYYY-MM-DD'),
                date: moment().format('YYYY-MM-DD'),
                member_id: result.message.client_id
              })
            )

          } else {
            successShow("Registration completed.");
            setAdmissionForm(defaultValue);
            setFormStateViewMode("basic");
          }
        } else {
          alertShow(result.message);
        }
      })
      .catch((err) => {
        console.log(err);
        alertShow(err);
      });
  };

  const postPaymentForm = (form)=>{
    fetch(config.server + "payment/client",{
      headers:{
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtToken,
      }
      ,
      method: "POST",
      mode: "cors",
      body: JSON.stringify(form)})
      .then(response=>response.json())
      .then(res=>{
        console.log(res)
        if(res.ok){
            successShow('Payment done')
            setFormStateViewMode("basic");
        }
        else{
          alertShow(res.message)
        }
      })
      .catch(err=>{
        alertShow(err)
      })
  }



  return (
    <div className="admission">
      <div class="container-fluid">
        <ol class="steps">
          <li
            class={
              formStateViewMode == "basic"
                ? "step is-active"
                : "step is-complete"
            }
            id="points1"
            data-step="1"
          >
            Basic Info
          </li>
          <li
            class={`step ${
              formStateViewMode == "complete"
                ? "is-active"
                : formStateViewMode == "basic"
                ? ""
                : "is-complete"
            }`}
            id="points2"
            data-step="2"
          >
            Profile Creation
          </li>
          <li
            class="step"
            id="points3"
            data-step="3"
            class={`step ${formStateViewMode == "payment" ? "is-active" : ""}`}
          >
            Payment
          </li>
        </ol>

        <div className="row" style={{ transition: "1s" }}>
          <div className="col-lg-5 left">
            <div
              id="step-1"
              style={formStateViewMode == "basic" ? {} : { display: "none" }}
            >
              <h2>
                "Failure is not an option. Everyone has to succeed." <br />
                <small className="text-primary">- Arnold Schwarzengger</small>
              </h2>
              <h3 className="mt-4">Have an Account?</h3>
              <h4 className="mt-3">Check Registerd List</h4>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="example@mail.com"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={checkEmail}
                  onChange={(e) => {
                    setCheckEmail(e.target.value);
                  }}
                  onKeyUp={({ keyCode }) => {
                    if (keyCode == 13) {
                      checkEmailAction(checkEmail);
                    }
                  }}
                />
                <div
                  className="input-group-append"
                  onClick={(e) => {
                    checkEmailAction(checkEmail);
                  }}
                >
                  <span class="input-group-text" id="basic-addon1">
                    <i class="fas fa-search"></i>
                  </span>
                </div>
              </div>
            </div>
            <div
              id="step-2"
              style={formStateViewMode == "complete" ? {} : { display: "none" }}
            >
              <div className="icon">
                <img src={DefaultPic} alt="" className="member-image-small" />
              </div>
              <h2>Registration Now! Keep yourself fit</h2>
            </div>
            <div
              id="step-3"
              style={formStateViewMode == "payment" ? {} : { display: "none" }}
            >
              <div className="image">
                <img src={PaymentPic} alt="" />
              </div>
              <h2>
                <span id="quote" style={{ transition: ".3s" }}></span> <br />
                <small id="quote-person" style={{ display: "none" }}>
                  – Joseph Pilates
                </small>
              </h2>
            </div>
          </div>
          <div className="col-lg-7 right">
            <AllReadyMember
              form={admissionForm}
              updateForm={updateAdmissionForm}
              existingData={existingData}
              display={formStateViewMode == "basic"}
              handleSubmit={handleContinueRegButtonClick}
            />

            <CompleteRegistraion
              form={admissionForm}
              updateForm={updateAdmissionForm}
              existingData={existingData}
              display={formStateViewMode == "complete"}
              handleSubmit={handleCompleteFormButton}
              backButton={completeFormBackButton}
            />

            <AddPayment
              form = {paymentForm}
              updateForm={updatePaymentForm}
              display={formStateViewMode == "payment"}
              backButton={paymentFormBackButton}
              handleSubmit={postPaymentForm}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
