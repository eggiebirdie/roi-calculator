import { useState } from 'react'
import Scenario from './components/Scenario'
import './App.css'

const DEFAULTS_A = {
  initialInvestment: 100000,
  monthlyRevenue: 15000,
  monthlyCosts: 5000,
  period: 12,
}

const DEFAULTS_B = {
  initialInvestment: 150000,
  monthlyRevenue: 20000,
  monthlyCosts: 8000,
  period: 24,
}

function App() {
  const [compareMode, setCompareMode] = useState(false)
  const [valuesA, setValuesA] = useState(DEFAULTS_A)
  const [valuesB, setValuesB] = useState(DEFAULTS_B)

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="header-brand">
            <span className="logo">EPAM</span>
            <div className="header-text">
              <span className="app-title">Business ROI Calculator</span>
              <span className="app-subtitle">Evaluate your project's return on investment</span>
            </div>
          </div>

          <button
            className={`compare-btn ${compareMode ? 'compare-btn--active' : ''}`}
            onClick={() => setCompareMode(m => !m)}
          >
            {compareMode ? '✕ Exit Comparison' : '⇄ Compare Scenarios'}
          </button>
        </div>
      </header>

      <div className="scenarios">
        <Scenario
          label="Scenario A"
          accentColor="#39f"
          chartColor="#39f"
          values={valuesA}
          onChange={setValuesA}
        />

        {compareMode && (
          <>
            <div className="scenario-divider" />
            <Scenario
              label="Scenario B"
              accentColor="#f58220"
              chartColor="#f58220"
              values={valuesB}
              onChange={setValuesB}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default App
