import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import * as config from "../config";

import CardImg from "../../material/SVG/admission/credit.svg";
import BkashImg from "../../material/SVG/admission/bkash bw.svg";
import CashImg from "../../material/SVG/admission/COH.svg";

export default function AddPayment({
  form,
  updateForm,
  display,
  backButton,
  handleSubmit,
}) {
  const jwtToken = useSelector((state) => state.user.jwtToken);
  const packageList = useSelector((state) => state.reusableInfo.package);
  const [paymentForm, setPaymentForm] = useState({
    payment_method: "Cash",
  });
  const [thisMonthStatus, setThisMonthStatus] = useState(false);

  // const handleSubmitForm = (e) => {
  //   if (props?.parentAdmissionForm?.registraition_done) {
  //     let data = paymentForm;
  //     let post_address = "payment/";
  //     if (props.parentAdmissionForm.user_type == "client") {
  //       post_address += "client";
  //       data.member_id = props?.parentAdmissionForm?.client_id;
  //     }
  //     data.month_from += "-01";
  //     data.month_to += "-01";
  //     data.due = getDue(
  //       data.admission_fee,
  //       data.package_fee,
  //       data.monthly_fee,
  //       data.discount,
  //       data.paid
  //     );
  //     console.log(data);
  //     console.log(post_address);
  //     fetch(config.server + post_address, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + jwtToken,
  //       },
  //       method: "POST",
  //       mode: "cors",
  //       body: JSON.stringify(data),
  //     })
  //       .then((response) => response.json())
  //       .then((res) => {
  //         console.log(res);
  //         if (res.ok) {
  //           alert("Payment successful");
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } else {
  //     console.log("Not ready");
  //     alert("Error admission");
  //   }
  // };

  // const getDue = (admission_fee, package_fee, monthly_fee, discount, paid) => {
  //   admission_fee = admission_fee ?? 0;
  //   package_fee = package_fee ?? 0;
  //   monthly_fee = monthly_fee ?? 0;
  //   discount = discount ?? 0;
  //   paid = paid ?? 0;
  //   return (
  //     parseInt(admission_fee) +
  //     parseInt(package_fee) +
  //     parseInt(monthly_fee) -
  //     parseInt(discount) -
  //     parseInt(paid)
  //   );
  // };

  const getTotal = (discount = form.discount) => {
    let admission_fee = form.admission_fee ?? 0;
    let package_fee = form.package_fee ?? 0;
    let monthly_fee = form.monthly_fee ?? 0;
    discount = discount ?? 0;
    return admission_fee + package_fee + monthly_fee - discount;
  };

  const getDue = (paid = form.paid) => {
    let admission_fee = form.admission_fee ?? 0;
    let package_fee = form.package_fee ?? 0;
    let monthly_fee = form.monthly_fee ?? 0;
    let discount = form.discount ?? 0;
    paid = paid ?? 0;
    return admission_fee + package_fee + monthly_fee - discount - paid;
  };

  const checkAllDigit = (val) => {
    const re = /^[0-9]*$/;
    // console.log(val.match(re))
    return val.match(re) != null;
  };

  // useEffect(() => {
  //   if (thisMonthStatus) {
  //     let month = moment().format("YYYY-MM");
  //     setPaymentForm(
  //       Object.assign({}, paymentForm, {
  //         payment_month_from: month,
  //         payment_month_to: month,
  //       })
  //     );
  //   }
  // }, [thisMonthStatus]);

  return (
    <div id="inner-right3" style={display ? {} : { display: "none" }}>
      <form
        class="mt-4 form-registration"
        onSubmit={(e) => {
          e.preventDefault();
          const data = form;
          data.due = getDue();
          handleSubmit(form);
        }}
      >
        <div class="form-body mt-5">
          <div class="form-group row">
            <label class="col-sm-4 col-form-label">
              Month<small class="text-danger">*</small>
            </label>
            <div class="col-4">
              <input
                type="month"
                class="form-control form-control-sm rounded-0"
                id="date1"
                value={moment(form.month_from).format("YYYY-MM")}
                onChange={(e) => {
                  let val = e.target.value + "-01";
                  updateForm({ month_from: val });
                }}
              />
              <span style={{ bottom: 0 }}></span>
              {/* <small class="form-text text-danger mt-1">Invalid Date</small> */}
            </div>
            <div class="col-4">
              <input
                type="month"
                class="form-control nxtMonth form-control-sm rounded-0"
                id="date2"
                value={moment(form.month_to).format("YYYY-MM")}
                onChange={(e) => {
                  let val = e.target.value + "-01";
                  updateForm(val);
                }}
              />
              <span style={{ bottom: 0 }}></span>
            </div>
          </div>
          <div class="form-group row">
            <label for="date" class="col-sm-4 col-form-label">
              Date<small class="text-danger">*</small>
            </label>
            <div class="col-sm-8">
              <input
                type="date"
                class="form-control form-control-sm rounded-0"
                id="date"
                value={form?.date}
                onChange={(e) => {
                  updateForm(e.target.value);
                }}
              />
              <span></span>
            </div>
          </div>
          <div class="form-group row">
            <label for="addfee" class="col-sm-4 col-form-label">
              Admission Fee<small class="text-danger">*</small>
            </label>
            <div class="col-sm-8">
              <input
                placeholder="Enter Admission Fee"
                type="text"
                class="form-control form-control-sm rounded-0"
                id="addfee"
                value={form?.admission_fee ?? ""}
                onChange={(e) => {
                  let val = e.target.value;
                  if (checkAllDigit(val)) {
                    val = val.length ? val : 0;
                    updateForm({ admission_fee: parseInt(val) });
                  }
                }}
              />
              <span></span>
            </div>
          </div>
          <div
            class="form-group row"
            style={form.monthly ? { display: "none" } : {}}
          >
            <label for="pacfee" class="col-sm-4 col-form-label">
              Package Fee<small class="text-danger">*</small>
            </label>
            <div class="col-sm-8">
              <input
                placeholder="Enter Package Fee"
                type="text"
                class="form-control form-control-sm rounded-0"
                id="pacfee"
                value={form?.package_fee ?? ""}
                onChange={(e) => {
                  let val = e.target.value;
                  if (checkAllDigit(val)) {
                    val = val.length ? val : 0;
                    updateForm({ package_fee: parseInt(val) });
                  }
                }}
              />
              <span></span>
            </div>
          </div>
          <div
            class="form-group row"
            style={form.monthly ? {} : { display: "none" }}
          >
            <label for="monfee" class="col-sm-4 col-form-label">
              Monthly Fee<small class="text-danger">*</small>
            </label>
            <div class="col-sm-8">
              <input
                placeholder="Enter Package Fee"
                type="number"
                class="form-control form-control-sm rounded-0"
                id="monfee"
                value={form?.monthly_fee ?? ""}
                onChange={(e) => {
                  let val = e.target.value;
                  if (checkAllDigit(val)) {
                    val = val.length ? val : 0;
                    updateForm({ monthly_fee: parseInt(val) });
                  }
                }}
              />
              <span></span>
            </div>
          </div>
          <div class="form-group row">
            <label for="monfee" class="col-sm-4 col-form-label">
              Discount<small class="text-danger">*</small>
            </label>
            <div class="col-sm-8">
              <input
                placeholder="Enter Discount Fee"
                type="number"
                class="form-control form-control-sm rounded-0"
                id="monfee"
                value={form?.discount ?? ""}
                onChange={(e) => {
                  let val = e.target.value;
                  if (checkAllDigit(val)) {
                    val = val.length ? val : 0;
                    if (getTotal(val) >= 0) {
                      updateForm({ discount: parseInt(val) });
                    }
                  }
                }}
              />
              <span></span>
            </div>
          </div>
          <div class="form-group row">
            <label for="total" class="col-sm-4 col-form-label">
              Total<small class="text-danger">*</small>
            </label>
            <div class="col-sm-8">
              <input
                placeholder="Total Fee"
                type="text"
                class="form-control form-control-sm rounded-0"
                id="total"
                value={getTotal()}
              />
              <span></span>
            </div>
          </div>
          <div class="form-group row">
            <label for="paid" class="col-sm-4 col-form-label">
              Paid<small class="text-danger">*</small>
            </label>
            <div class="col-sm-8">
              <input
                placeholder="Paid Fee"
                type="text"
                class="form-control form-control-sm rounded-0"
                id="paid"
                value={form?.paid ?? ""}
                onChange={(e) => {
                  let val = e.target.value;
                  if (checkAllDigit(val)) {
                    val = val.length ? val : 0;
                    if (getDue(val) >= 0) updateForm({ paid: parseInt(val) });
                  }
                }}
              />
              <span></span>
            </div>
          </div>
          <div class="form-group row">
            <label for="due" class="col-sm-4 col-form-label">
              Due
            </label>
            <div class="col-sm-8">
              <input
                placeholder="Enter Due"
                type="number"
                class="form-control form-control-sm rounded-0"
                id="due"
                value={getDue()}
                readOnly={true}
              />
              <span></span>
            </div>
          </div>
          <div class="form-group row mt-4 px-2">
            <h3 class="col-sm-4">Select Payment Method</h3>
            <div class="col-sm-8" style={{ position: "relative", top: "-6px" }}>
              <div class="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  id="handond"
                  name="payment"
                  value="Cash"
                  class="custom-control-input card-payment"
                  checked={form.payment_method == "Cash"}
                  onClick={(e) => {
                    updateForm({ payment_method: "Cash" });
                  }}
                />
                <label class="custom-control-label payment-radio" for="handond">
                  <i class="fas fa-hand-holding-usd mr-2"></i> Cash on hand
                </label>
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  id="bkash"
                  name="payment"
                  value="Bkash"
                  class="custom-control-input card-payment"
                  checked={form.payment_method == "bKash"}
                  onClick={(e) => {
                    updateForm({ payment_method: "bKash" });
                  }}
                />
                <label
                  class="custom-control-label payment-radio bkash-img"
                  for="bkash"
                >
                  <img src={BkashImg} width="30" alt="bkash" />
                  bkash
                </label>
              </div>
              <div class="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  id="card"
                  name="payment"
                  value="card"
                  class="custom-control-input card-payment"
                  checked={form.payment_method == "Card"}
                  onClick={(e) => {
                    updateForm({ payment_method: "Card" });
                  }}
                />
                <label class="custom-control-label payment-radio" for="card">
                  <i class="far fa-credit-card mr-2"></i>
                  Credit/Debit Card
                </label>
              </div>
            </div>
          </div>
          {/* <div class="card-options" style={{ display: "block" }}>
            <div class="row">
              <div class="col-sm-4 image">
                <div class="card-image">
                  <img src="../material/img/credit-card.png" />
                </div>
              </div>
              <div class="col-sm-8 border-left">
                <strong class="card-title text-muted">Card details</strong>
                <div class="form-group row mt-4 px-2">
                  <div class="col-6">
                    <input
                      placeholder="Name"
                      type="text"
                      class="form-control form-control-sm rounded-0"
                      id="card-name"
                    />
                    <span></span>
                  </div>
                  <div class="col-6">
                    <input
                      placeholder="Surename"
                      type="text"
                      class="form-control form-control-sm rounded-0"
                      id="card-surename"
                    />
                    <span></span>
                  </div>
                </div>
                <div class="form-group row mt-4 px-2">
                  <div class="col-12">
                    <input
                      placeholder="Credit Card Number"
                      type="number"
                      class="form-control form-control-sm rounded-0 card-number"
                      id="card-number"
                    />
                    <span></span>
                  </div>
                </div>
                <div class="form-group row mt-4 px-2">
                  <div class="col-6">
                    <input
                      placeholder="Expirition Date"
                      type="date"
                      class="form-control form-control-sm rounded-0"
                      id="card-exp-date"
                    />
                    <span></span>
                  </div>
                  <div class="col-6">
                    <input
                      placeholder="CCV"
                      type="password"
                      class="form-control form-control-sm rounded-0"
                      id="card-ccv"
                    />
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <div class="form-group text-right mt-4">
            <button
              class="btn btn-outline-info"
              id="prev3"
              onClick={(e) => {
                e.preventDefault();
                backButton();
              }}
            >
              Previous
            </button>
            <button type="submit" class="ml-3 btn btn-primary">
              CHECKOUT
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
