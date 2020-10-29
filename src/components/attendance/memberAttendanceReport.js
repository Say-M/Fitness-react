import React, { useState, useEffect } from "react";
import {useParams} from "react-router-dom"

import * as config from "../config";

export default function MemberAttendanceReport(){
    let {user_type, id} = useParams();

    useEffect(() => {
        fetch()
    },[])
    return(
        <>
        </>
    )
}