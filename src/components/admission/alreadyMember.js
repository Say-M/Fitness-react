import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useJquery from "react-use-jquery";
import * as config from "../config";

export default function AllReadyMember({
  form,
  updateForm,
  existingData,
  display,
  handleSubmit,
}) {
  const $ = useJquery();

  useEffect(() => {
    if ($) {
      // $(".btn-gender").click(function () {
      //   $("#gender").val($(this).text());
      //   $(".btn-gender").removeClass("btn-primary");
      //   $(".btn-gender").addClass("btn-light");
      //   $(this).toggleClass("btn-primary");
      //   $(this).toggleClass("btn-light");
      // });
    }
  }, [$]);

  return (
    <div
      id="inner-right1"
      class="user-info"
      style={display ? {} : { display: "none" }}
    >
      <form
        action="#"
        class="mt-3"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div class="form-body mt-5">
          <div class="form-group row">
            <label for="name" class="col-sm-4 col-form-label">
              First Name <small class="text-danger">*</small>
            </label>
            <div class="col-sm-8">
              <input
                placeholder="Enter firstname"
                type="text"
                class="form-control form-control-sm rounded-0"
                id="name"
                readOnly={existingData?.firstname?.length || !form.email}
                value={form.firstname}
                onChange={(e) => {
                  updateForm({ firstname: e.target.value });
                }}
              />
              <span></span>
            </div>
          </div>
          <div class="form-group row">
            <label for="name" class="col-sm-4 col-form-label">
              Last Name <small class="text-danger">*</small>
            </label>
            <div class="col-sm-8">
              <input
                placeholder="Enter lastname"
                type="text"
                class="form-control form-control-sm rounded-0"
                id="name"
                readOnly={existingData?.lastname?.length || !form.email}
                value={form.lastname}
                onChange={(e) => {
                  updateForm({ lastname: e.target.value });
                }}
              />
              <span></span>
            </div>
          </div>
          <div class="form-group row">
            <label for="phone" class="col-sm-4 col-form-label">
              Phone <small class="text-danger">*</small>
            </label>
            <div class="col-sm-8">
              <input
                placeholder="Enter Phone"
                type="tel"
                class="form-control form-control-sm rounded-0"
                id="phone"
                readOnly={existingData?.phone?.length || !form.email}
                value={form.phone ?? ""}
                onChange={(e) => {
                  let val = e.target.value;
                  if (val.match(/^[0-9]{0,11}$/)) {
                    updateForm({ phone: e.target.value });
                  }
                }}
              />
              <span></span>
            </div>
          </div>
          <div class="form-group row">
            <label for="birth" class="col-sm-4 col-form-label">
              Date of Birth
            </label>
            <div class="col-sm-8">
              <input
                type="date"
                class="form-control form-control-sm rounded-0"
                id="birth"
                readOnly={existingData?.dob?.length || !form.email}
                value={form.dob}
                onChange={(e) => {
                  updateForm({ dob: e.target.value });
                }}
              />
              <span></span>
            </div>
          </div>
          <div class="form-group row">
            <label for="email" class="col-sm-4 col-form-label">
              Email
            </label>
            <div class="col-sm-8">
              <input
                placeholder="Enter Email"
                type="email"
                class="form-control form-control-sm rounded-0"
                id="email"
                readOnly={true}
                value={form.email}
              />
              <span></span>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-4 col-form-label">Gender</label>
            <div class="col-sm-8">
              <button
                class={`btn btn-gender ${
                  form.gender == "Male" ? "btn-primary" : "btn-light"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  updateForm({ gender: "Male" });
                }}
              >
                Male
              </button>
              <button
                class={`btn btn-gender ${
                  form.gender == "Female" ? "btn-primary" : "btn-light"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  updateForm({ gender: "Female" });
                }}
              >
                Female
              </button>
              <input type="hidden" id="gender" />
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-4 col-form-label">Marital Status</label>
            <div class="col-sm-8">
              <button
                class={`btn btn-maritial ${
                  form.marital_status == "Unmarried"
                    ? "btn-primary"
                    : "btn-light"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  updateForm({ marital_status: "Unmarried" });
                }}
              >
                Unmarried
              </button>
              <button
                class={`btn btn-maritial ${
                  form.marital_status == "Married" ? "btn-primary" : "btn-light"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  updateForm({ marital_status: "Married" });
                }}
              >
                Married
              </button>
              <input type="hidden" id="marital" />
            </div>
          </div>
          <div class="form-group row">
            <label for="blood" class="col-sm-4 col-form-label">
              Blood Group
            </label>
            <div class="col-sm-8">
              <select
                id="blood"
                class="custom-select custom-select-sm rounded-0"
                style={{ width: "100px" }}
                readOnly={existingData?.blood_group?.length || !form.email}
                value={form.blood_group}
                onChange={(e) => {
                  updateForm({ blood_group: e.target.value });
                }}
              >
                <option>Select blood group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
              <span style={{ width: "100px" }}></span>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-4 col-form-label">
              User Type <small class="text-danger">*</small>
            </label>
            <div class="col-sm-8">
              <div class="custom-control custom-radio custom-control-inline mt-2 mr-0 pl-2">
                <input
                  checked={form.user_type == "client"}
                  onClick={(e) => {
                    updateForm({ user_type: "client" });
                  }}
                  type="radio"
                  id="userType1"
                  name="userType"
                  class="custom-control-input user-type"
                />
                <label class="custom-control-label" for="userType1">
                  Trainee
                </label>
              </div>
              <div class="custom-control custom-radio custom-control-inline mt-2 mr-0">
                <input
                  type="radio"
                  id="userType2"
                  name="userType"
                  class="custom-control-input user-type"
                  checked={form.user_type == "trainer"}
                  onClick={(e) => {
                    updateForm({ user_type: "trainer" });
                  }}
                />
                <label class="custom-control-label" for="userType2">
                  Tranier
                </label>
              </div>
              <div class="custom-control custom-radio custom-control-inline mt-2 mr-0">
                <input
                  type="radio"
                  id="userType3"
                  name="userType"
                  class="custom-control-input user-type"
                  checked={form.user_type == "staff"}
                  onClick={(e) => {
                    updateForm({ user_type: "staff" });
                  }}
                />
                <label class="custom-control-label" for="userType3">
                  Stuff
                </label>
              </div>
            </div>
          </div>
          <div class="form-group text-right mt-4">
            <button
              disabled={!form.email}
              type="submit"
              class="ml-3 mb-3 btn btn-primary"
              id="point1"
            >
              Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
