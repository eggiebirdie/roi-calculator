import InputForm from './InputForm'
import Results from './Results'
import CashFlowChart from './CashFlowChart'
import { calculateROI } from '../utils/calculations'

function Scenario({ label, accentColor, chartColor, values, onChange }) {
  const { cashFlow, totalNetProfit, roi, paybackPeriod } = calculateROI(values)

  return (
    <div className="scenario">
      <div className="scenario-sidebar" style={{ borderTop: `3px solid ${accentColor}` }}>
        <div className="scenario-badge" style={{ background: accentColor }}>
          {label}
        </div>
        <InputForm values={values} onChange={onChange} />
      </div>

      <div className="scenario-main">
        <Results roi={roi} paybackPeriod={paybackPeriod} totalNetProfit={totalNetProfit} />
        <CashFlowChart cashFlow={cashFlow} color={chartColor} />
      </div>
    </div>
  )
}

export default Scenario
