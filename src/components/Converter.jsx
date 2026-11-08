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

    <div className="bg-[var(--surface)] rounded-md p-3 sm:p-5 md:p-6 mt-6 mb-10">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between mb-4">

        {/* Amount input */}
        <div className="bg-[var(--surface-secondary)] border border-[#353535] rounded-md p-4 w-full min-w-0 flex-1">
            <h4 className="text-sm font-bold text-gray-200 mb-4">
            SEND
            </h4>

            <div className="flex items-center gap-3 min-w-0">
            <input
                type="number"
                onChange={getAmount}
                placeholder="Amount"
                className="font-mono bg-transparent text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white outline-none w-full min-w-0"
            />

            <div className="shrink-0">
                <CurrencySelector
                value={baseCurrency}
                onChange={selectBaseCurrency}
                />
            </div>
            </div>
        </div>

        {/* Swap button */}
        <div className="flex justify-center items-center shrink-0">
            <button
            onClick={handleSwap}
            aria-label="Swap currencies"
            className="bg-[var(--surface-secondary)] text-white rounded-md p-3 border border-[#353535] hover:border-[var(--primary)] transition-transform"
            >
            <IoIosSwap size={20} />
            </button>
        </div>

        {/* Receive currency */}
        <div className="bg-[var(--surface-secondary)] border border-[#353535] rounded-md p-4 w-full min-w-0 flex-1">
            <h4 className="text-sm font-bold text-gray-200 mb-4">
            RECEIVE
            </h4>

            <div className="flex items-center justify-between gap-3 min-w-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-mono font-bold text-[var(--primary)] min-w-0 break-all">
                {formatAmount(Number(rate) * Number(amount))}
            </h1>

            <div className="shrink-0">
                <CurrencySelector
                value={quoteCurrency}
                onChange={selectQuoteCurrency}
                />
            </div>
            </div>
        </div>
        </div>

        {/* Exchange rate and actions */}
        <div className="border-t border-dotted border-gray-500 pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="font-mono text-sm sm:text-base break-words">
            1 {baseCurrency} = {formatAmount(rate)} {quoteCurrency}
        </p>

        <div className="flex flex-col xs:flex-row sm:flex-row gap-2 sm:gap-3">
            <button className="bg-[var(--primary)] uppercase px-3 py-2 rounded text-black text-sm font-semibold w-full sm:w-auto">
            Favourited
            </button>

            <button className="border border-[var(--primary)] rounded px-3 py-2 text-sm w-full sm:w-auto">
            Log Conversion
            </button>
        </div>
        </div>
    </div>
    </>

        
    )
}

export default Converter