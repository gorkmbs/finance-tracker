import {
  DATE_UPDATED,
  RATES_UPDATED,
  NEW_OPERATION,
  CURRENCY_CHANGED,
  RELOAD_OPERATIONS,
  SET_TOTAL_AMOUNT,
} from "../actions/actionsForFinance";

const initialFinanceStore = {
  updateDate: 0,
  rates: [],
  total: 0,
  operations: [],
  currency: "EUR",
};

function reducerForFinance(state = initialFinanceStore, action) {
  if (action.type === DATE_UPDATED) {
    localStorage.setItem("updateTime", JSON.stringify(Date.now()));
    return { ...state, updateDate: action.payload.date };
  }
  if (action.type === SET_TOTAL_AMOUNT) {
    return { ...state, total: action.payload.total };
  }
  if (action.type === RATES_UPDATED) {
    localStorage.setItem("rates", JSON.stringify(action.payload.rates));
    return { ...state, rates: action.payload.rates };
  }
  if (action.type === CURRENCY_CHANGED) {
    localStorage.setItem("currency", JSON.stringify(action.payload.currency));
    return { ...state, currency: action.payload.currency };
  }
  if (action.type === RELOAD_OPERATIONS) {
    return { ...state, operations: [...action.payload.operations] };
  }
  if (action.type === NEW_OPERATION) {
    localStorage.setItem(
      "operations",
      JSON.stringify([
        ...state.operations,
        [
          Date.now(),
          action.payload.entranceType,
          action.payload.entranceAmount,
          action.payload.currency,
          action.payload.entranceExplanation,
        ],
      ])
    );
    return {
      ...state,
      operations: [
        ...state.operations,
        [
          Date.now(),
          action.payload.entranceType,
          action.payload.entranceAmount,
          action.payload.currency,
          action.payload.entranceExplanation,
        ],
      ],
    };
  }
  return state;
}

export default reducerForFinance;
