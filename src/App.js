import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";

import AppRouter from "./components/router";
import AppHeader from "./panel_component";
import SidePanel from "./panel_component/sidePanel";

import reducers from "./redux/reducers";
import {store} from './redux/store'
import LoadReusableInfo from './components/common/loadReuseableInfo'
const config = require('./components/config')
const CryptoAES = require('crypto-js/aes')
const CryptoENC = require('crypto-js/enc-utf8')

// const store = createStore(
//   reducers,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

function MainApp() {
  let encrypted = localStorage.getItem(config.channel)
  const dispatch = useDispatch()
  if (encrypted) {
    const decrypted = CryptoAES.decrypt(encrypted.toString(), config.encrypKey)
    const info = JSON.parse((decrypted.toString(CryptoENC)))
    dispatch({ type: "SIGN_IN", data: info})
    console.log(info)
  }
  else {
    // window.location = config.loginAdress
  }

  return (
    <BrowserRouter>
    <LoadReusableInfo/>
    <div className="app">
      <AppHeader />
      <div className="app-body">
        <SidePanel />
        <AppRouter />
      </div>
    </div>
  </BrowserRouter>
)
}


function App() {
  

  return (
    <Provider store={store}>
        <MainApp />
      </Provider>
  );
}

export default App;
