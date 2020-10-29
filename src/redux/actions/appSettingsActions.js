import * as actionTypes from './../actionTypes'

export const sideBarAction = () =>{
    return (
        {
            type: actionTypes.SIDE_BAR
        }
    )
}

export const allPackageGetStatusTrueAction = ()=>{
    return({
        type: actionTypes.ALL_PACKAGE_GET_STATUS_TRUE
    })
}
export const allPackageGetStatusFalseAction = ()=>{
    return({
        type: actionTypes.ALL_PACKAGE_GET_STATUS_FALSE
    })
}