import React, { useState, useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";

export default function ShowAlert(props) {

  const dispatch = useDispatch();
  const alertShowR = useSelector((state) => state.reusableInfo?.alertShowStatus);
  const alertMsgR = useSelector((state) => state.reusableInfo?.alertMsg);

  const successShowR = useSelector((state) => state.reusableInfo?.successShowStatus);
  const successMsgR = useSelector((state) => state.reusableInfo?.successMsg)

  const [alertShow, setAlertShow] = useState(alertMsgR);
  const [alertMsg, setAlertMsg] = useState('')

  const [successShow, setSuccessShow] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(()=>{
      setAlertShow(alertShowR);
    if(alertShowR){
      setAlertMsg(alertMsgR)
      setTimeout(()=>{
        dispatch({type: 'ALERT_HIDE'})
      },4000)
    }
  },[alertShowR, alertMsgR])

  useEffect(()=>{
      setSuccessShow(successShowR);
    if(successShowR){
      setSuccessMsg(successMsgR)
      setTimeout(()=>{
        dispatch({type: 'SUCCESS_HIDE'})
      },4000)
    }
  },[successShowR, successMsgR])

  return (
    <>
      <div class="msg-alert" style={successShow ? {} : { display: "none" }}>
        <div
          class="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <i class="fas fa-check-circle"></i>
          <span id="msg-text">{successMsg}</span>
          <button
            type="button"
            class="close"
            onClick={(e) => {
              dispatch({ type: "SUCCESS_HIDE" });
            }}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
      <div class="msg-alert-fail" style={alertShow ? {} : { display: "none" }}>
        <div
          class="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          <i class="far fa-frown-open"></i>
          <span id="msg-fail-text">{alertMsg}</span>
          <button
            type="button"
            class="close"
            onClick={(e) => {
              dispatch({ type: "ALERT_HIDE" });
            }}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    </>
  );
}

