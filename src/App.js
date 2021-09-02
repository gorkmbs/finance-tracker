import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import reducerForSite from "./reducers/reducerForSite";
import reducerForFinance from "./reducers/reducerForFinance";
import {
  DATE_UPDATED,
  RATES_UPDATED,
  CURRENCY_CHANGED,
} from "./actions/actionsForFinance";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";

const axios = require("axios");

const rootReducer = combineReducers({
  site: reducerForSite,
  finance: reducerForFinance,
});
const store = createStore(rootReducer);

function App() {
  useEffect(() => {
    let updateTime = localStorage.getItem("updateTime");
    let rates = localStorage.getItem("rates");
    let currency = localStorage.getItem("currency");
    // console.log(JSON.parse(rates));

    if (
      updateTime === null ||
      rates === null ||
      Number(Date.now()) - Number(updateTime) > 86400000
    ) {
      axios({
        method: "get",
        url: store.getState().site.financeAPI,
      }).then(function (response) {
        store.dispatch({
          type: DATE_UPDATED,
          payload: { date: Date.now() },
        });
        store.dispatch({
          type: RATES_UPDATED,
          payload: {
            rates: Object.keys(response.data.rates).map((key) => [
              String(key),
              Number(response.data.rates[key]),
            ]),
          },
        });
        window.alert("rates updated");
      });
    } else {
      store.dispatch({
        type: DATE_UPDATED,
        payload: { date: Number(updateTime) },
      });
      store.dispatch({
        type: RATES_UPDATED,
        payload: {
          rates: JSON.parse(rates),
        },
      });
      store.dispatch({
        type: CURRENCY_CHANGED,
        payload: {
          currency: JSON.parse(currency),
        },
      });

      // console.log(store.getState().finance.rates);
    }
  }, []);

  return (
    <>
      <Provider store={store}>
        <div className="bg-gray-100 m-0 p-0" style={{ minHeight: "100vh" }}>
          <Router>
            <Navbar />
            <Switch>
              <Route exact path="/">
                <Dashboard />
              </Route>
              <Route path="*">
                <Error />
              </Route>
            </Switch>
          </Router>
        </div>
      </Provider>
    </>
  );
}

export default App;
