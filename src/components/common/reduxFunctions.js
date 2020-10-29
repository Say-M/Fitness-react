import {store} from '../../redux/store'


export function alertShow(message){
    store.dispatch({type: 'ALERT_SHOW', payload: message})
}

export function successShow(message){
    store.dispatch({type: 'SUCCESS_SHOW', payload: message})
}