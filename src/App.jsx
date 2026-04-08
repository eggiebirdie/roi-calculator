import { useState } from 'react'
import Scenario from './components/Scenario'
import { exportToPdf } from './utils/exportPdf'
import './App.css'

const CHART_THEME_LIGHT = {
  grid: '#eaeaea', axisFill: '#6b7280', axisLine: '#e5e7eb',
  tooltipBg: '#ffffff', tooltipBorder: '#e5e7eb', activeDotStroke: '#ffffff',
}
const CHART_THEME_DARK = {
  grid: '#2e2e50', axisFill: '#9ca3b0', axisLine: '#2e2e50',
  tooltipBg: '#1e1e38', tooltipBorder: '#2e2e50', activeDotStroke: '#1e1e38',
}

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
  const [exporting, setExporting] = useState(false)
  const [isDark, setIsDark] = useState(() => localStorage.getItem('epam-roi-theme') === 'dark')

  function toggleTheme() {
    setIsDark(d => {
      const next = !d
      localStorage.setItem('epam-roi-theme', next ? 'dark' : 'light')
      return next
    })
  }

  async function handleExport() {
    setExporting(true)
    try {
      await exportToPdf({ valuesA, valuesB })
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="app" data-theme={isDark ? 'dark' : undefined}>
      <header className="app-header">
        <div className="header-inner">
          <div className="header-brand">
            <span className="logo">EPAM</span>
            <div className="header-text">
              <span className="app-title">Business ROI Calculator</span>
              <span className="app-subtitle">Evaluate your project's return on investment</span>
            </div>
          </div>

          <div className="header-actions">
            <button
              className="theme-toggle-btn"
              onClick={toggleTheme}
              title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {isDark ? '☀' : '☾'}
            </button>

            <button
              className="export-btn"
              onClick={handleExport}
              disabled={exporting}
            >
              {exporting ? 'Generating…' : '↓ Export PDF'}
            </button>

            <button
              className={`compare-btn ${compareMode ? 'compare-btn--active' : ''}`}
              onClick={() => setCompareMode(m => !m)}
            >
              {compareMode ? '✕ Exit Comparison' : '⇄ Compare Scenarios'}
            </button>
          </div>
        </div>
      </header>

      <div className="scenarios">
        <Scenario
          label="Scenario A"
          accentColor="#39f"
          chartColor="#39f"
          values={valuesA}
          onChange={setValuesA}
          chartTheme={isDark ? CHART_THEME_DARK : CHART_THEME_LIGHT}
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
              chartTheme={isDark ? CHART_THEME_DARK : CHART_THEME_LIGHT}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default App
