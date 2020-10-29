import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import * as config from "../config";
import * as actionTypes from "../../redux/actionTypes";


export default function LoadReusableInfo() {
    const dispatch = useDispatch()
    // const pkg = useSelector(state => state.reusableInfo?.package)
    // console.log(pkg)
    const jwtToken = useSelector(state=>state.user.jwtToken)
    const packageUpdateStatus = useSelector(state => state.reusableInfo?.packageUpdateStatus)
    const shiftUpdateStatus = useSelector(state => state.reusableInfo?.shiftUpdateStatus)
    const trainingTypeUpdateStatus = useSelector(state => state.reusableInfo?.trainingTypeUpdateStatus)
    // console.log(packageUpdateStatus)
    // console.log(shiftUpdateStatus)
    useEffect(() => {
        const fetchData = () => {
            fetch(config.server + "package", {
                headers: {
                    "Authorization": "Bearer " + jwtToken
                }
            })
				.then(response => response.json())
				.then(result => {
                    if (result?.ok) {
                        let active = result.message.filter(pkg => {
                            if (pkg.package_status == 1) {
                                return pkg
                            }
                        })
                        dispatch({
                            type: actionTypes.PACKAGE_UPDATE, payload: {
                                package: result.message,
                                active: active,
                                draft: result.message.length - active.length
                            }
                            })
					}
				})
				.catch(err => {
					console.log(err);
				});
        };
        if (packageUpdateStatus) {
            fetchData()
            dispatch({ type: actionTypes.PACKAGE_UPDATE_FALSE});
        }
    },[packageUpdateStatus])

    
    useEffect(() => {
        const fetchData = () => {
            fetch(config.server + "training_type", {
                headers: {
                    "Authorization": "Bearer " + jwtToken
                }
            })
				.then(response => response.json())
				.then(result => {
					console.log(result);
                    if (result?.ok) {
                        dispatch({type: actionTypes.TRAINING_TYPE_UPDATE, payload: result.message})
					}
				})
				.catch(err => {
					console.log(err);
				});
        };
        if (trainingTypeUpdateStatus) {
            fetchData()
            dispatch({ type: actionTypes.TRAINING_TYPE_UPDATE_FALSE});
        }
    },[trainingTypeUpdateStatus])
    
    useEffect(() => {
        const fetchData = () => {
            fetch(config.server + "shift", {
                headers: {
                    "Authorization": "Bearer " + jwtToken
                }
            })
				.then(response => response.json())
				.then(result => {
					console.log(result);
                    if (result?.ok) {
                        dispatch({type: actionTypes.SHIFT_UPDATE, payload: result.message})
					}
				})
				.catch(err => {
					console.log(err);
				});
        };
        if (shiftUpdateStatus) {
            fetchData()
            dispatch({ type: actionTypes.SHIFT_UPDATE_FALSE});
        }
    },[shiftUpdateStatus])


    return (
        <>
            </>
    )
}