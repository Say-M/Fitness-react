import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

export default function PaymentModal(props) {

    const toggle = () => {
        props.setModalShow(false)
    }

  return (
    <Modal isOpen={props.modalShow} centered={true} toggle={toggle} id="show-packages">
      <ModalHeader>
        <h5 class="modal-title" id="exampleModalLongTitle">
          <h3>Add Payment </h3>
        </h5>
        <button
          type="button"
          class="close"
                  aria-label="Close"
                  onClick={toggle}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </ModalHeader>
      <ModalBody>
        <form action="#" class="modal-form">
          <div class="member-input-grp">
            <label for="name">
              Name <span>*</span> :
            </label>
            <input type="text" name="" id="name" placeholder="Enter Name" />
           
          </div>
          <div class="member-input-grp mb-5">
            <label for="">
              Month <span>*</span> :
            </label>
            <div class="container">
              <input type="month" name="" id="" />
              <input type="month" name="" id="" />
            </div>

            <div class="check">
              <input type="checkbox" name="" id="" checked />
              <p> This month</p>
            </div>
          </div>
          <div class="member-input-grp">
            <label for="">
              Date <span>*</span> :
            </label>
            <input type="date" name="" id="" placeholder="Enter Date" />
            <div class="error">Invalid date</div>
          </div>
          <div class="member-input-grp">
            <label for="">
              Admission fee <span>*</span> :
            </label>
            <input type="number" name="" id="" placeholder="Enter amount" />
            <div class="error">Invalid date</div>
          </div>
          <div class="member-input-grp">
            <label for="">
              Package fee <span>*</span> :
            </label>
            <input type="number" name="" id="" placeholder="Enter amount" />
            <div class="error">Invalid date</div>
          </div>
          <div class="member-input-grp">
            <label for="">
              Discount <span>*</span> :
            </label>
            <input type="number" name="" id="" placeholder="Enter amount" />
            <div class="error">Invalid date</div>
          </div>
          <div class="member-input-grp">
            <label for="">
              Due <span>*</span> :
            </label>
            <input type="number" name="" id="" placeholder="Enter amount" />
            <div class="error">Invalid date</div>
          </div>
          <div class="member-input-grp">
            <label for="">
              Total <span>*</span> :
            </label>
            <input type="number" name="" id="" placeholder="Enter amount" />
            <div class="error">Invalid date</div>
          </div>
        </form>
          </ModalBody>
          <ModalFooter className='centered'>
          <button type="submit" class="btn-danger br-25 "><h5 class="mt-1">Cancel</h5></button>
            <button type="submit" class="btn-success br-25"><h5 class="mt-1">Proceed</h5></button>
             
          </ModalFooter>
    </Modal>
  );
}
