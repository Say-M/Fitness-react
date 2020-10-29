import * as actionTypes from "./../actionTypes";
import * as defaultData from "./defaultData";
const initialState = {
  packageUpdateStatus: true,
  shiftUpdateStatus: true,
  package: [{
    training_type: 1,
    package_name: 'hello',
    package_duration: 2,
    admission_fee: 2000,
    package_fee : 3000
  },{}],
  shift: [],
  activePackage: 0,
  draftPackage: 0,
  trainingTypeUpdateStatus: true,
  trainingType: defaultData.trainingType,
  alertShowStatus: false,
  alertMsg: "",
  successShowStatus: false,
  successMsg: "",
};

const reusableInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PACKAGE_UPDATE_TRUE:
      return Object.assign({}, state, { packageUpdateStatus: true });

    case actionTypes.PACKAGE_UPDATE_FALSE:
      return Object.assign({}, state, { packageUpdateStatus: false });

    case actionTypes.PACKAGE_UPDATE:
      return Object.assign({}, state, {
        package: action.payload.package,
        activePackage: action.payload.active,
        draftPackage: action.payload.draft,
      });

    case actionTypes.SHIFT_UPDATE_TRUE:
      return Object.assign({}, state, { shiftUpdateStatus: true });

    case actionTypes.SHIFT_UPDATE_FALSE:
      return Object.assign({}, state, { shiftUpdateStatus: false });

    case actionTypes.SHIFT_UPDATE:
      return Object.assign({}, state, { shift: action.payload });

    case actionTypes.TRAINING_TYPE_UPDATE_TRUE:
      return Object.assign({}, state, { trainingTypeUpdateStatus: true });

    case actionTypes.TRAINING_TYPE_UPDATE_FALSE:
      return Object.assign({}, state, { trainingTypeUpdateStatus: false });

    case actionTypes.TRAINING_TYPE_UPDATE:
      return Object.assign({}, state, { trainingType: action.payload });

    case actionTypes.ALERT_SHOW:
      return Object.assign({}, state, {
        alertMsg: action.payload,
        alertShowStatus: true,
      });
    case actionTypes.SUCCESS_SHOW:
      return Object.assign({}, state, {
        successMsg: action.payload,
        successShowStatus: true,
      });

    case actionTypes.ALERT_HIDE:
      return Object.assign({}, state, {
        alertShowStatus: false,
      });
    case actionTypes.SUCCESS_HIDE:
      return Object.assign({}, state, {
        successShowStatus: false,
      });

    default:
      return state;
  }
};

export default reusableInfoReducer;
