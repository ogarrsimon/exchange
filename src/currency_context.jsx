import React, {useState, useReducer, useContext} from "react"
const CurrencyContext = React.createContext()
import reducer from "./currency_reducer"


const initialState = {
  baseCurrency: "USD",
  quoteCurrency: "NGN",
  rate: null,
  amount: null
}

export const CurrencyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleSwap = () => {
    dispatch({type: "SWITCH_CURRENCY"})
  }

  const selectBaseCurrency = (e) => {
    dispatch({type: "SELECT_BASE_CURRENCY", payload: e})
  }
  const selectQuoteCurrency = (e) => {
    dispatch({type: "SELECT_QUOTE_CURRENCY", payload: e})
  }

 const fetchRate = async() => {
    if (state.baseCurrency === state.quoteCurrency) {
      dispatch({
        type: "SET_EXCHANGE_RATE",
        payload: 1,
      });
      return;
    }
    dispatch({ type: "RATE_LOADING" });
    try {
      const response = await fetch(
        `https://api.frankfurter.dev/v2/rate/${state.baseCurrency.toLowerCase()}/${state.quoteCurrency.toLowerCase()}`
      );

      if (!response.ok) {
        throw new Error("Unable to fetch exchange rate");
      }

      const data = await response.json();
      dispatch({type: "SET_RATE", payload: data})
    } catch (error) {
      console.log(error)
      if (error.name !== "AbortError") {
        dispatch({
          type: "RATE_ERROR",
          payload: error.message,
        });
      }
    }
 }
       

 const getAmount = (e) => {
  dispatch({type: "SET_AMOUNT", payload: e.target.value})

 }

  return <CurrencyContext.Provider value={{...state, getAmount, handleSwap, selectBaseCurrency, selectQuoteCurrency, fetchRate}}>{children}</CurrencyContext.Provider>

}

export const useCurrencyContext = () => {
  return useContext(CurrencyContext)
}