import React, {useState, useEffect} from 'react'
import { IoIosSwap } from "react-icons/io";
import CurrencySelector from './CurrencySelect'
import { useCurrencyContext } from '../currency_context';
const Converter = () => {
   
    const {baseCurrency, quoteCurrency, getAmount, amount, handleSwap, selectBaseCurrency, selectQuoteCurrency, fetchRate, rate} =useCurrencyContext()
    const formatAmount = (amount) =>
    Number(amount).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    useEffect(() => {
        fetchRate();
    }, [])
    useEffect(() => {

        fetchRate()
    }, [baseCurrency, quoteCurrency]) 
    return (
        
    <>
    <h2 className="text-xl mb-0 mt-6 font-mono">
        Check the Rates
    </h2>

    

<div className="box-border w-full max-w-full min-w-0 rounded-md bg-[var(--surface)] p-3 sm:p-5 md:p-6 mt-6 mb-10">

  {/* Currency conversion layout */}
  <div className="flex w-full min-w-0 flex-col gap-3 sm:gap-4 mb-5">

    {/* Send amount */}
    <div className="box-border w-full max-w-full min-w-0 overflow-hidden rounded-md border border-[#353535] bg-[var(--surface-secondary)] p-3 sm:p-4">
      <h4 className="text-xs sm:text-sm font-bold text-gray-200 mb-3">
        SEND
      </h4>

      <div className="flex w-full min-w-0 items-center gap-2">
        <input
          type="number"
          onChange={getAmount}
          placeholder="Amount"
          className="block w-0 flex-1 min-w-0 max-w-full appearance-none bg-transparent font-mono text-xl sm:text-3xl md:text-4xl text-white outline-none"
        />

        <div className="w-[112px] sm:w-[140px] min-w-0 shrink-0">
          <CurrencySelector
            value={baseCurrency}
            onChange={selectBaseCurrency}
          />
        </div>
      </div>
    </div>

    {/* Swap button */}
    <div className="flex justify-center">
      <button
        type="button"
        onClick={handleSwap}
        aria-label="Swap currencies"
        className="flex shrink-0 items-center justify-center rounded-md border border-[#353535] bg-[var(--surface-secondary)] p-2.5 text-white transition-colors hover:border-[var(--primary)] sm:p-3"
      >
        <IoIosSwap size={20} />
      </button>
    </div>

    {/* Receive amount */}
    <div className="box-border w-full max-w-full min-w-0 overflow-hidden rounded-md border border-[#353535] bg-[var(--surface-secondary)] p-3 sm:p-4">
      <h4 className="text-xs sm:text-sm font-bold text-gray-200 mb-3">
        RECEIVE
      </h4>

      <div className="flex w-full min-w-0 items-center gap-2">
        <h1 className="w-0 flex-1 min-w-0 max-w-full break-all [overflow-wrap:anywhere] font-mono text-xl font-bold text-[var(--primary)] sm:text-3xl md:text-4xl">
          {formatAmount(Number(rate) * Number(amount))}
        </h1>

        <div className="w-[112px] sm:w-[140px] min-w-0 shrink-0">
          <CurrencySelector
            value={quoteCurrency}
            onChange={selectQuoteCurrency}
          />
        </div>
      </div>
    </div>

  </div>

  {/* Exchange rate and actions */}
  <div className="w-full min-w-0 border-t border-dotted border-gray-500 pt-4 flex flex-col gap-4">

    <p className="min-w-0 max-w-full break-words font-mono text-xs sm:text-sm md:text-base">
      1 {baseCurrency} = {formatAmount(rate)} {quoteCurrency}
    </p>

    <div className="grid w-full min-w-0 grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
      <button
        type="button"
        className="box-border w-full min-w-0 rounded bg-[var(--primary)] px-3 py-3 sm:py-2 text-sm font-semibold uppercase text-black"
      >
        Favourited
      </button>

      <button
        type="button"
        className="box-border w-full min-w-0 rounded border border-[var(--primary)] px-3 py-3 sm:py-2 text-sm"
      >
        Log Conversion
      </button>
    </div>

  </div>
</div>


    </>

        
    )
}

export default Converter