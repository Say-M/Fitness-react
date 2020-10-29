import React, { useState, useEffect } from "react"

import EditImg from '../../material/SVG/edit.svg'
import TrashImg from '../../material/SVG/trash.svg'

export default function WorkoutPlanList(props) {
    return (
        <div class="nutrationPlan p-4">
            <div class="full">
                <select name="" id="" class='check'>
                    <option value="">lorem ipsome</option>
                    <option value="">lorem ipsome</option>
                    <option value="">lorem ipsome</option>
                </select>
            </div>
            <div class="full my-4">
                <button class="btn-primary">(08:00-12:00 AM)</button>
                <button class="btn-secondary">(04:00-10:00 PM)</button>
            </div>
            <div class="box4">
                <p>Muscle Group</p>
                <p class="shaped">Chest Back</p>
            </div>

            <div class="box3 mb-3">
                <div class="column mt-2 mb-4">
                    <div class="head">
                        <p class="item">Item 1</p>
                        <img src={EditImg} class="action_icon" alt="" />
                        <img src={TrashImg} class="action_icon" alt="" />
                    </div>
                    <div class="workoutPlanlist">
                        <label for="">Name</label>
                        <input type="text" class="fulldatainput" disabled placeholder="" />
                        <label for="">Set Type</label>
                        <input type="text" class="datainput" disabled placeholder="20" />
                        <label for="">Strength</label>
                        <input type="text" class="datainput" disabled placeholder="20" />
                        <label for="">Set</label>
                        <input type="text" class="datainput" disabled placeholder="20" />
                        <label for="">Raps</label>
                        <input type="text" class="datainput" disabled placeholder="20" />
                    </div>
                </div>
                <hr/>

                    <div class="column mt-2 mb-4">
                        <div class="head">
                            <p class="item">Item 1</p>
                            <img src={EditImg} class="action_icon" alt="" />
                            <img src={TrashImg} class="action_icon" alt="" />
                        </div>
                        <div class="workoutPlanlist">
                            <label for="">Name</label>
                            <input type="text" class="fulldatainput" disabled placeholder="" />
                            <label for="">Set Type</label>
                            <input type="text" class="datainput" disabled placeholder="20" />
                            <label for="">Strength</label>
                            <input type="text" class="datainput" disabled placeholder="20" />
                            <label for="">Set</label>
                            <input type="text" class="datainput" disabled placeholder="20" />
                            <label for="">Raps</label>
                            <input type="text" class="datainput" disabled placeholder="20" />
                        </div>
                    </div>
                    <hr/>
                        <div class="column mt-2 mb-4">
                            <div class="head">
                                <p class="item">Item 1</p>
                                <img src={EditImg} class="action_icon" alt="" />
                                <img src={TrashImg} class="action_icon" alt="" />
                            </div>
                            <div class="workoutPlanlist">
                                <label for="">Name</label>
                                <input type="text" class="fulldatainput" disabled placeholder="" />
                                <label for="">Set Type</label>
                                <input type="text" class="datainput" disabled placeholder="20" />
                                <label for="">Strength</label>
                                <input type="text" class="datainput" disabled placeholder="20" />
                                <label for="">Set</label>
                                <input type="text" class="datainput" disabled placeholder="20" />
                                <label for="">Raps</label>
                                <input type="text" class="datainput" disabled placeholder="20" />
                            </div>
                        </div>
                        </div>


                    <textarea class="" placeholder="Note" ></textarea>
                    <hr/>
                        <div class="column">
                            <div class="body">
                                <h2 class='total'>Total</h2>
                                <label for="">Cal</label>
                                <input type="text" class="datainput" disabled placeholder="20" />
                                <label for="">Protine</label>
                                <input type="text" class="datainput" disabled placeholder="20" />
                                <label for="">Fat</label>
                                <input type="text" class="datainput" disabled placeholder="20" />
                                <label for="">Carbs</label>
                                <input type="text" class="datainput" disabled placeholder="20" />
                            </div>
                        </div>

                        <button type="submit" class="btn-primary custom-primary-btn mt-4"><h5 class="mt-1">Create Workout Plan</h5></button>
                    </div>
    )
}