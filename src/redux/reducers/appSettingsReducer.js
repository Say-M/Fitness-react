import * as actionTypes from "./../actionTypes";



const initialState = {
    sideBarShow: false,
    allPackageGetStatus: false,
    featureListGetStatus: false,
}


const appSettingsReducer = (state = initialState, action) =>{
    switch (action.type) {
			// hide and show side bar for mobile view
			case actionTypes.SIDE_BAR:
				return Object.assign({}, state, { sideBarShow: !state.sideBarShow });

			// update package list after add new package
			case actionTypes.ALL_PACKAGE_GET_STATUS_TRUE:
				return Object.assign({}, state, {
					allPackageGetStatus: true,
				});
			case actionTypes.ALL_PACKAGE_GET_STATUS_FALSE:
				return Object.assign({}, state, {
					allPackageGetStatus: false,
				});
			// update feature list
			case actionTypes.FEATURE_LIST_GET_STATUS_TRUE:
				return Object.assign({}, state, {
					featureListGetStatus: true,
				});
			case actionTypes.FEATURE_LIST_GET_STATUS_FALSE:
				return Object.assign({}, state, {
					featureListGetStatus: false,
				});
			default:
				return state;
		}
}

export default appSettingsReducer