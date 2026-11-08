const currency_reducer = (state, action) => {
  if(action.type == "SWITCH_CURRENCY") {
    return {...state, baseCurrency: state.quoteCurrency, quoteCurrency: state.baseCurrency}
  }
  if(action.type == "SELECT_BASE_CURRENCY") {
    console.log(action.payload)
    return {...state, baseCurrency: action.payload}
  }
  if(action.type == "SELECT_QUOTE_CURRENCY") {
    return {...state, quoteCurrency: action.payload}
  }
  if(action.type == "SET_RATE") {
    return {...state, rate: action.payload.rate}
  }
  if(action.type == "SET_AMOUNT") {
    return {...state, amount: Number(action.payload)}
  }
  return state
}

export default currency_reducer