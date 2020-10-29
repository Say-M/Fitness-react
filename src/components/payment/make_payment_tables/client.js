import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import * as config from "../../config";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

import DefaultPic from "../../../material/SVG/persons/abid.svg";
import EditIcon from "../../../material/SVG/edit.svg";
import CardImg from "../../../material/SVG/admission/credit.svg";
import BkashImg from "../../../material/SVG/admission/bkash bw.svg";
import CashImg from "../../../material/SVG/admission/COH.svg";

export default function ClientTable(props) {
  const jwtToken = useSelector((state) => state.user.jwtToken);

  const packageList = useSelector((state) => state.reusableInfo.package);
  const [loadState, setLoadState] = useState(1);
  const [paymentList, setPaymentList] = useState([]);
  const [filteredPaymentList, setFilteredPaymentList] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const toggle = () => {
    setModalShow(false);
  };

  const [paymentForm, setPaymentForm] = useState({
    payment_method: "Cash",
  });
  const updatePaymentForm = (entry, value) => {
    setPaymentForm(
      Object.assign({}, paymentForm, {
        [entry]: value,
      })
    );
  };

  useEffect(() => {
    const fetchData = () => {
      fetch(
        config.server +
          "payment/make/client?month=" +
          props?.month +
          "-01",
        {
          headers: {
            Authorization: "Bearer " + jwtToken,
          },
        }
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.ok) {
            setPaymentList(result.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // if (loadState) {
    fetchData();
    // setLoadState(false);
    // }
  }, [loadState, props.month]);

  const handleSubmitPaymentForm = (data) => {
    // data.month_from += '-01'
    // data.month_to += '-01'
    data.due = getDue();
    fetch(config.server + "payment/client", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtToken,
      },
      method: "POST",
      mode: "cors",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        if (res.ok) {
          setLoadState((value) => value + 1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTotal = (discount = paymentForm.discount) => {
    let admission_fee = paymentForm.admission_fee ?? 0;
    let package_fee = paymentForm.package_fee ?? 0;
    let monthly_fee = paymentForm.monthly_fee ?? 0;
    discount = discount ?? 0;
    return admission_fee + package_fee + monthly_fee - discount;
  };

  const getDue = (newPayment = paymentForm.new_payment,paid = paymentForm.paid) => {
    let admission_fee = paymentForm.admission_fee ?? 0;
    let package_fee = paymentForm.package_fee ?? 0;
    let monthly_fee = paymentForm.monthly_fee ?? 0;
    let discount = paymentForm.discount ?? 0;
    paid = paid ?? 0;
    newPayment = newPayment ?? 0;
    return admission_fee + package_fee + monthly_fee - discount - paid - newPayment;
  };


  useEffect(
    (e) => {
      if (props.searchName.length == 0) setFilteredPaymentList(paymentList);
      else {
        let arr = paymentList.filter(
          (mem) =>
            mem.name.toLowerCase().indexOf(props.searchName.toLowerCase()) > -1
        );
        setFilteredPaymentList(arr);
      }
    },
    [props.searchName, paymentList]
  );

  const paymentListView = filteredPaymentList.map((member, index) => {
  
    member.status =
      member.paid < 1
        ? "unpaid"
        : member.paid < member.fee - member.discount
        ? "due"
        : "paid";
    return (
      <tr key={index}>
        <td>
          <img
            src={member.image ? member.user_image : DefaultPic}
            alt=""
            class="member-image-small"
          />
        </td>
        <td>{member?.name}</td>
        <td>{member?.phone}</td>
        <td>{member?.title}</td>
    <td>{member.package_name + ' (' + member.training_type+')'}</td>
        <td>{member?.paid}</td>
        <td>{member?.due}</td>
        <td class="selectnon">
          <p
            class="active mt-2"
            style={
              member?.status == "unpaid"
                ? { backgroundColor: config.redColorCode }
                : member?.status == "due"
                ? { backgroundColor: config.warningColorCode }
                : {}
            }
          >
            {member?.status}
          </p>
        </td>
        <th class=" action_holder">
          <img
            src={EditIcon}
            class="action_icon"
            alt=""
            onClick={() => {
              let pkg = packageList.filter(
                (pkg) => pkg.package_id == member.package_id
              );
              let pkgDetails = pkg[0]
              if(member.renew_date == member.admission_date){
              member.admission_status = moment(props.month).diff(moment(member.admission_date), 'months') > pkgDetails.package_duration -1 
              }
              else{
                let diff = moment(props.month).diff(moment(member.renew_date));
                if (diff > pkgDetails.package_duration - 1 ){member.admission_status = true}
                else if (diff < 0) {
                  member.admission_status = moment(props.month).diff(moment(member.admission_date), 'months') > pkgDetails.package_duration - 1 
                }
                else{
                  member.admission_status =false;
                  
                }
              }
              const defaultValue = {
                admission_fee: member.admission_status ? 0 : ( pkgDetails.admission_fee ?? 0),
                package_fee: pkgDetails?.package_fee ?? 0,
                discount: member.discount ?? 0,
                due: member.due ?? 0,
                paid: member.paid ?? 0,
                payment_method: "Cash",
                new_payment: 0,
                month_from: props.month + "-01",
                month_to: pkgDetails?.package_duration ? moment(props.month + "-01").add(pkgDetails.package_duration, 'months').format('YYYY-MM-DD') :  props.month + "-01",
                date: moment().format("YYYY-MM-DD"),
              };
              setPaymentForm(
                Object.assign(
                  {},
                  paymentForm,
                  member,
                  pkgDetails,
                  defaultValue
                )
              );
              setModalShow(true);
            }}
          />
        </th>
      </tr>
    );
  });

  return (
    <>
      <table class="table" style={props.display ? {} : { display: "none" }}>
        <thead>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Contact</th>
            <th scope="col">Payment Title</th>
            <th scope="col">Package</th>
            <th scope="col">Paid</th>
            <th scope="col">Due</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>{paymentListView}</tbody>
      </table>
      <Modal
        isOpen={modalShow}
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
            <div class="member-input-grp">
              <label for="name">
                Name <span>*</span> :
              </label>
              <input
                type="text"
                name=""
                id="name"
                placeholder="Enter Name"
                value={paymentForm.name}
                readOnly={true}
              />
            </div>
            <div class="member-input-grp mb-5">
              <label for="" class="mt-4">
                Month <span>*</span> :
              </label>
              <div class="monthbox">
                <div class="c1">
                  <p>From:</p>
                  <input
                    type="month"
                    name=""
                    id=""
                    value={moment(paymentForm.month_from).format("YYYY-MM")}
                    onChange={(e) => {
                      updatePaymentForm("month_from", e.target.value);
                    }}
                  />
                </div>
                <div class="c1">
                  <p>To:</p>
                  <input
                    type="month"
                    name=""
                    id=""
                    value={moment(paymentForm.month_to).format("YYYY-MM")}
                    onChange={(e) => {
                      updatePaymentForm("month_to", e.target.value);
                    }}
                  />
                </div>
              </div>
              <div class="check">
                <input type="checkbox" name="" id="" />
                <p> This month</p>
              </div>
            </div>
            <div class="member-input-grp">
              <label for="">
                Date <span>*</span> :
              </label>
              <input
                type="date"
                name=""
                id=""
                placeholder="Enter Date"
                value={paymentForm.date}
                onChange={(e) => {
                  updatePaymentForm("date", e.target.value);
                }}
              />
            </div>
            <div class="member-input-grp"
            style={paymentForm.admission_status ? {display: "none" } : {}}
            >
              <label for="">
                Admission Fee <span>*</span> :
              </label>
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter amount"
                value={paymentForm.admission_fee}
                onChange={(e) => {
                  if (e.target.value.length == 0)
                    updatePaymentForm("admission_fee", 0);
                  else if (e.target.value.match(/[0-9]|\./)) {
                    let val = parseInt(e.target.value);
                    let due =
                      val +
                      paymentForm.monthly_fee +
                      paymentForm.package_fee-
                      paymentForm.discount -
                      paymentForm.paid -
                      paymentForm.new_payment
                    if (due >= 0 && val >= 0) {
                      updatePaymentForm(
                        "admission_fee",
                        val
                      );
                    }
                  }
                }}
                readOnly={paymentForm.payment_id}
              />
            </div>
            <div
              class="member-input-grp"
              style={paymentForm.monthly ? {} : { display: "none" }}
            >
              <label for="">
                Monthly fee <span>*</span> :
              </label>
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter amount"
                value={paymentForm.monthly_fee}
                onChange={(e) => {
                  if (e.target.value.length == 0)
                    updatePaymentForm("monthly_fee", 0);
                  else if (e.target.value.match(/[0-9]|\./)) {
                    let val = parseInt(e.target.value);
                    let due =
                      paymentForm.admission_fee +
                      // paymentForm.monthly_fee +
                      val + 
                      paymentForm.package_fee -
                      paymentForm.discount -
                      paymentForm.paid -
                      paymentForm.new_payment
                    if (due >= 0 && val >= 0) {
                      updatePaymentForm(
                        "monthly_fee",
                        val
                      );
                    }
                  }
                }}
                readOnly={paymentForm.payment_id}
              />
            </div>
            <div
              class="member-input-grp"
              style={paymentForm.monthly ? { display: "none" } : {}}
            >
              <label for="">
                Package fee <span>*</span> :
              </label>
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter amount"
                value={paymentForm.package_fee}
                onChange={(e) => {
                  if (e.target.value.length == 0)
                    updatePaymentForm("package_fee", 0);
                  else if (e.target.value.match(/[0-9]|\./)) {
                    let val = parseInt(e.target.value);
                    let due =
                      paymentForm.admission_fee +
                      paymentForm.monthly_fee +
                      // paymentForm.package_fee -
                      val -
                      paymentForm.discount -
                      paymentForm.paid -
                      paymentForm.new_payment
                    if (due >= 0 && val >= 0) {
                      updatePaymentForm(
                        "package_fee",
                        val
                      );
                    }
                  }
                }}
                readOnly={paymentForm.payment_id}
              />
            </div>
            <div class="member-input-grp">
              <label for="">
                Discount <span>*</span> :
              </label>
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter amount"
                value={paymentForm.discount}
                onChange={(e) => {
                  if (e.target.value.length == 0)
                    updatePaymentForm("discount", 0);
                  else if (e.target.value.match(/[0-9]|\./)) {
                    let val = parseInt(e.target.value);
                    let due =
                      paymentForm.admission_fee +
                      paymentForm.monthly_fee +
                      paymentForm.package_fee -
                      // paymentForm.discount -
                      val -
                      paymentForm.paid -
                      paymentForm.new_payment
                    if (due >= 0 && val >= 0) {
                      updatePaymentForm(
                        "discount",
                        val
                      );
                    }
                  }
                }}
                readOnly={paymentForm.payment_id}
              />
            </div>

            <div class="member-input-grp">
              <label for="">
                {paymentForm.payment_id ? "Previously " : ""}
                Paid :
              </label>
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter amount"
                value={paymentForm.paid}
                onChange={(e) => {
                  if (e.target.value.length == 0)
                    updatePaymentForm("paid", 0);
                  else if (e.target.value.match(/[0-9]|\./)) {
                    let val = parseInt(e.target.value);
                    let due =getDue(0,val)
                    if (due >= 0 && val >= 0) {
                      updatePaymentForm(
                        "paid",
                        val
                      );
                    }
                  }
                }}
                readOnly={paymentForm.payment_id}
              />
            </div>

            <div
              class="member-input-grp"
              style={paymentForm.payment_id ? {} : { display: "none" }}
            >
              <label for="">Newly Payment :</label>
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter amount"
                value={paymentForm.new_payment}
                onChange={(e) => {
                  let val = parseInt(e.target.value);
                  let due = getDue(val);
                  if (due >= 0 && val>=0) {
                    updatePaymentForm(
                      "new_payment",
                      val
                    );
                  }
                }
                }
              />
            </div>
            <div class="member-input-grp m-0">
              <label for="">Due :</label>
              <p class="const">
                {getDue()}
              </p>
            </div>
            <div class="member-input-grp">
              <label for="">Total :</label>
              <p class="const">3000 tk</p>
            </div>
            <div class="paymentmethod">
              <h4>Select Payment Method</h4>
              <div class="method">
                <div>
                  <input
                    type="radio"
                    name="utyp"
                    id="t1"
                    checked={paymentForm.payment_method == "BKash"}
                    onClick={(e) => {
                      updatePaymentForm("payment_method", "BKash");
                    }}
                  />
                  <label for="t1">
                    <img class="bikash" src={BkashImg} alt="" srcset="" />
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="utyp"
                    id="t2"
                    checked={paymentForm.payment_method == "Cash"}
                    onClick={(e) => {
                      updatePaymentForm("payment_method", "Cash");
                    }}
                  />
                  <label for="t2">
                    <label for="t2">
                      <img class="bikash" src={CashImg} alt="" srcset="" />
                    </label>
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="utyp"
                    id="t3"
                    checked={paymentForm.payment_method == "Card"}
                    onClick={(e) => {
                      updatePaymentForm("payment_method", "Card");
                    }}
                  />
                  <label for="t3">
                    <img class="bikash" src={CardImg} alt="" srcset="" />
                  </label>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter className="centered">
          <button
            type="submit"
            class="btn-danger br-25 "
            onClick={(e) => {
              toggle();
            }}
          >
            <h5 class="mt-1">Cancel</h5>
          </button>
          <button
            type="submit"
            class="btn-primry cyanbtn br-25"
            onClick={(e) => {
              handleSubmitPaymentForm(paymentForm);
              toggle();
            }}
          >
            <h5 class="mt-1">Proceed</h5>
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
}
