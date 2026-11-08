import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 text-white">
      <div className="text-xl font-bold">FX CHECKER</div>
      <div className="flex space-x-4">
        <a href="#" className="hover:underline">55 Currencies</a>
        <a href="#" className="hover:underline">ECB Data</a>
        <a href="#" className="hover:underline">EOD</a>
      </div>
    </nav>
  )
}

export default Navbar