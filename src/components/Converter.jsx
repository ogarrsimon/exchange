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
            <h2 className="text-xl mb-0 mt-6 font-mono">Check the Rates</h2>
            <div className="bg-[var(--surface)] rounded-md p-6 mt-6 mb-10">
            <div className="flex items-center justify-between mb-4">

                {/* amount input */}
            <div className="bg-[var(--surface-secondary)] border-1 border-[#353535] rounded-md p-4 w-xl">
                <h4 className="text-sm font-bold text-gray-200 mb-4">SEND</h4>
                <div className="flex">
                    <input type="number" onChange={getAmount} placeholder="Amount" className="font-mono bg-[var(--surface-secondary)] text-5xl text-white outline-none w-full" />
                    <CurrencySelector value={baseCurrency} onChange={selectBaseCurrency} />
                </div>
                </div> 

                {/* swap button */}
                <div className="mx-12">
                    <button onClick={() => handleSwap()} className="bg-[var(--surface-secondary)] text-white rounded-md p-2">
                        <IoIosSwap size={20} />
                    </button>
                </div>

                {/* receive currency selector */}
                <div className="bg-[var(--surface-secondary)] border-1 border-[#353535] rounded-md p-4 w-xl">
                    <h4 className="text-sm font-bold text-gray-200 mb-4">RECEIVE</h4>
                    <div className="flex w-full justify-between items-center">
                        <h1 className="text-5xl font-mono font-bold text-[var(--primary)]">{formatAmount((Number(rate) * amount))}</h1>
                        <CurrencySelector value={quoteCurrency} onChange={selectQuoteCurrency}/>
                    </div>
                    
                    
                </div>
            </div>
            <div className="border-t p-2 mb-0 border-dotted flex items-center justify-between border-gray-500">
                <p className='mt-2 font-mono mb-0 pb-0'>
                    1 {baseCurrency} = {formatAmount(rate)} {quoteCurrency}
                </p>
                <div className="mt-2">
                    <button className='bg-[var(--primary)] uppercase p-2 rounded text-black mr-6 '>
                        Favourited
                    </button>
                    <button className='border border-[var(--primary)] rounded p-2'>
                        Log Conversion
                    </button>
                </div>
            </div>
        </div>
        </>
        
    )
}

export default Converter