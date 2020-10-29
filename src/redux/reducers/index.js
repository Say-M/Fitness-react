import userReducer from './userReducer'
import appSettingsReducer from './appSettingsReducer'
import reusableInfoReducer from './reusableinfoReducer'

import {combineReducers} from 'redux'


const reducers= combineReducers({
    user: userReducer,
    appSettings: appSettingsReducer,
    reusableInfo: reusableInfoReducer,
})


export default reducers