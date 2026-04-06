import { useState } from 'react'
import InputForm from './components/InputForm'
import Results from './components/Results'
import CashFlowChart from './components/CashFlowChart'
import { calculateROI } from './utils/calculations'
import './App.css'

const DEFAULTS = {
  initialInvestment: 100000,
  monthlyRevenue: 15000,
  monthlyCosts: 5000,
  period: 12,
}

function App() {
  const [values, setValues] = useState(DEFAULTS)
  const { cashFlow, totalNetProfit, roi, paybackPeriod } = calculateROI(values)

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <span className="logo">EPAM</span>
          <h1 className="app-title">Business ROI Calculator</h1>
        </div>
      </header>

      <main className="app-main">
        <div className="layout">
          <div className="col-left">
            <InputForm values={values} onChange={setValues} />
          </div>
          <div className="col-right">
            <Results roi={roi} paybackPeriod={paybackPeriod} totalNetProfit={totalNetProfit} />
            <CashFlowChart cashFlow={cashFlow} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
