import React, { useState, useEffect } from "react";

import * as config from "../config";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

export default function AddFoodModal(props) {
  const [textSearch, setTextSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [foodCategoryList, setFoodCategoryList] = useState([]);
  const [supplimentCategoryList, setSupplimentCategoryList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [displayList, setDisplayList] = useState([]);

  const toggle = () => {
    props.setShow(false);
  };

  useEffect(() => {
    const arr = props.foodList.map((food) => {
      return food.category;
    });
    const newarr = [...new Set(arr)];
    setFoodCategoryList(newarr);
  }, [props.foodList]);

  useEffect(() => {
    if (props.form.add_value_selection == "food") {
      setDisplayList(props.foodList);
    }
  }, [props.foodList, props.form.add_value_selection]);


  const displayListView = displayList?.map((food, index) => {
    let addedStatus = false;

    if (props.form.add_value_selection == "food") {
      addedStatus = props?.form?.food_nutrition?.some((f) => {
        if (
          f.id == food.id &&
          f.meal_id == props.form.selected_meal &&
          props.form.create_meal_day.indexOf(f.day) > -1
        ) {
          return true;
        } else return false;
      });
    }

    return (
      <tr key={index}>
        <th scope="row">{food.name}</th>
        <td>{food.category}</td>
        <td>{food.type}</td>
        <td>{food.unit}</td>
        <td>{food.unit_size}</td>
        <td>{food.calorie}</td>
        <td>{food.protein}</td>
        <td>{food.carbohydrate}</td>
        <td>{food.fat}</td>
       
        <td>
          <button
            type="submit"
            class="btn-primary custom-primary-btn br-25"
            style={{display: addedStatus ? 'none' : ''}}
            onClick={(e) => {
              e.preventDefault();
              addFoodToForm(food);
            }}
          >
            + Add
          </button>
          <button
            type="submit"
            class="btn-danger br-25"
            style={{ backgroundColor: config.redColorCode,
              display: addedStatus ? '' : 'none'}}
            onClick={(e) => {
              let arr = [...props.form.food_nutrition]
              arr = arr.filter((f) => {
                if (!(
                  f.id == food.id &&
                  f.meal_id == props.form.selected_meal &&
                  props.form.create_meal_day.indexOf(f.day) > -1
                )) return f 
              });

              if (props.form.add_value_selection == "food") {
                props.updateForm("food_nutrition", arr);
              }
            }}
          >
            - Remove
          </button>
        </td>
      </tr>
    );
  });

  const addFoodToForm = (food) => {
    const days = [...props?.form?.create_meal_day];
    const arr = [...props?.form?.food_nutrition];
    days.forEach((day) => {
      arr.push({
        id: food.id,
        day: day,
        meal_id: props?.form?.selected_meal,
        meal_time: props?.form?.selected_meal_time,
        quantity: 100,
        details: food
      });
    });
    if (props.form.add_value_selection == "food") {
      props.updateForm("food_nutrition", arr);
    }
  };

  

  return (
    <Modal
      isOpen={props.show}
      centered={true}
      toggle={toggle}
      id="show-packages"
      size="lg"
    >
      <ModalHeader>
        <h5 class="modal-title" id="exampleModalLongTitle">
          <h3>Add Food </h3>
        </h5>
        <button type="button" class="close" aria-label="Close" onClick={toggle}>
          <span aria-hidden="true">&times;</span>
        </button>
      </ModalHeader>
      <ModalBody>
        <div class="headholder">
          <h4></h4>
          <div class="input-form">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="svg_icon2"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
            <input
              type="text"
              name="search"
              id=""
              placeholder="Search"
              style={{ border: '1px solid #ccc"' }}
              value={textSearch}
              onChange={(e)=>setTextSearch(e.target.value)}
            />
          </div>
          <select
            name="#"
            id=""
            class="row-number"
            style={{ border: '1px solid #ccc"' }}
          >
            <option value="">lorem ipsome</option>
          </select>
        </div>
        <div class="customtable1">
          <table class="table table-bordered ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Category</th>
                <th scope="col">Type</th>
                <th scope="col">Unit of Measurement</th>
                <th scope="col">Serving Size</th>
                <th scope="col">Calorie/ 100g</th>
                <th scope="col">Protein/ 100g</th>
                <th scope="col">Carbs/ 100g</th>
                <th scope="col">Fat/ 100g</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>{displayListView}</tbody>
          </table>
        </div>
      </ModalBody>
    </Modal>
  );
}
