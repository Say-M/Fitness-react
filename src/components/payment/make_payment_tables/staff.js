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

export default function StaffTable(props) {
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
        config.server + "payment/make/staff?month=" + props?.month + "-01",
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
    fetch(config.server + "payment/staff", {
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

  const getDue = () => {
    let salary = paymentForm.salary ?? 0;
    let bonus = paymentForm.bonus ?? 0;
    let paid = paymentForm.paid ?? 0;
    let new_payment = paymentForm.new_payment ?? 0;
    // console.log(admission_fee, package_fee, monthly_fee, discount, paid)
    let month =
      moment(paymentForm.month_to).month() -
      moment(paymentForm.month_from).month() +
      1;

    return (
      parseInt(salary) * month +
      parseInt(bonus) -
      parseInt(paid) -
      parseInt(new_payment)
    );
  };

  const getTotal = () => {
    let salary = paymentForm.salary ?? 0;
    let bonus = paymentForm.bonus ?? 0;
    let month =
      moment(paymentForm.month_to).month() -
      moment(paymentForm.month_from).month() +
      1;
    return parseInt(salary) * month + parseInt(bonus);
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
        : member.paid < member.salary + member.bonus
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
        <td>{member?.email}</td>
        <td>{member?.phone}</td>
        <td>{member?.salary}</td>
        <td>{member?.bonus}</td>
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
              let pkgDetails = pkg.length ? pkg[0] : { monthly: true };
              const defaultValue = {
                salary: member.salary ?? 0,
                bonus: member.bonus ?? 0,
                due: member.due ?? 0,
                paid: member.paid ?? 0,
                payment_method: "Cash",
                new_payment: 0,
                month_from: props.month + "-01",
                month_to: props.month + "-01",
                date: moment().format("YYYY-MM-DD"),
              };
              setPaymentForm(
                Object.assign({}, paymentForm, member, pkgDetails, defaultValue)
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
            <th scope="col">Email</th>
            <th scope="col">Contact</th>
            <th scope="col"> Salary</th>
            <th scope="col">Bonus</th>
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
            <div class="member-input-grp">
              <label for="">
                Salary <span>*</span> :
              </label>
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter amount"
                value={paymentForm.salary ?? ""}
                onChange={(e) => {
                  if (e.target.value.match(/[0-9]|\./) || !e.target.value) {
                    updatePaymentForm("salary", parseInt(e.target.value));
                  }
                }}
                readOnly={paymentForm.payment_id}
              />
            </div>
            <div class="member-input-grp">
              <label for="">
                Bonus <span>*</span> :
              </label>
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter amount"
                value={paymentForm.bonus ?? ""}
                onChange={(e) => {
                  if (e.target.value.length == 0) updatePaymentForm("bonus", 0);
                  else if (e.target.value.match(/[0-9]/)) {
                    console.log(paymentForm.bonus);
                    updatePaymentForm("bonus", parseInt(e.target.value));
                  }
                }}
                readOnly={paymentForm.payment_id}
              />
            </div>
            <div class="member-input-grp">
              <label for="">
                Total <span>*</span> :
              </label>
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter amount"
                value={getTotal()}
                readOnly={true}
              />
            </div>

            <div class="member-input-grp">
              <label for="">Paid :</label>
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter amount"
                value={paymentForm.paid}
                onChange={(e) => {
                  if (e.target.value.length == 0) updatePaymentForm("paid", 0);
                  else if (e.target.value.match(/[0-9]|\./)) {
                    updatePaymentForm("paid", parseInt(e.target.value));
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
                  if (e.target.value.length == 0)
                    updatePaymentForm("new_payment", 0);
                  else if (e.target.value.match(/[0-9]|\./)) {
                    let val = parseInt(e.target.value);
                    let due =
                      paymentForm.salary +
                      paymentForm.bonus -
                      paymentForm.paid -
                      val;
                    if (due >= 0) {
                      updatePaymentForm(
                        "new_payment",
                        val
                      );
                    }
                  }
                }}
              />
            </div>
            <div class="member-input-grp m-0">
              <label for="">Due :</label>
              <p class="const">{getDue()}</p>
            </div>
            {/* <div class="member-input-grp">
              <label for="">Total :</label>
              <p class="const">3000 tk</p>
            </div> */}
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
