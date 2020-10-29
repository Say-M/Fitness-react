import React, { useState, useEffect } from 'react';


export function FormInputError(props) {
    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState('')

    useEffect(() => {
        setShow(props.Error)
    }, [props.Error])
    useEffect(() => {
        setMsg(props.Msg)
    }, [props.Msg])


    return (<div class='error'
        style={show ? { display: 'block' } : { display: 'none' }}
    >{msg}</div>);
}