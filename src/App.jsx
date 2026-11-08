import { useState } from 'react'
import Navbar from './components/Navbar'
import LiveMarkets from './components/LiveMarkets'
import Converter from './components/Converter'
import Tabs from './components/Tabs'
import './App.css'
import History from './components/History'

function App() { 
  const [activeTab, setActiveTab] = useState("History");
  return (
    <>
      <Navbar />
      <LiveMarkets />

      <section className="max-w-6xl mx-auto px-6">
        <Converter />
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="mt-6">
          {activeTab === "History" && <History />}
          {activeTab === "Compare" && <div>Compare content</div>}
          {activeTab === "Favorites" && <div>Favorites content</div>}
          {activeTab === "Log" && <div>Conversion log content</div>}
        </div>
      </section>
    </>
  )
}

export default App

