import React, { useState, useEffect } from "react";
import Header from "../common/header";
import AddIcon from "../../material/icons/add.png";
import MakePayment from "./payment";
import PaymentModal from "./paymentModal";

export default function Payment() {
  return (
    <>
      <div className="work">
        <div className="p-4 container-fluid payment-sec">
          <MakePayment />
        </div>
      </div>
    </>
  );
}
