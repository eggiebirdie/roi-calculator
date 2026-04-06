function fmt(n) {
  return n.toLocaleString('en-US', { maximumFractionDigits: 2 })
}

function Results({ roi, paybackPeriod, totalNetProfit }) {
  const roiPositive = roi >= 0
  const profitPositive = totalNetProfit >= 0

  return (
    <div className="card results-card">
      <h2 className="card-title">Results</h2>

      <div className="metrics">
        <div className="metric">
          <span className="metric-label">ROI</span>
          <span className={`metric-value ${roiPositive ? 'positive' : 'negative'}`}>
            {fmt(roi)}%
          </span>
        </div>

        <div className="metric">
          <span className="metric-label">Payback Period</span>
          <span className="metric-value">
            {paybackPeriod === null ? 'Never' : `${paybackPeriod} months`}
          </span>
        </div>

        <div className="metric">
          <span className="metric-label">Total Net Profit</span>
          <span className={`metric-value ${profitPositive ? 'positive' : 'negative'}`}>
            ${fmt(totalNetProfit)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Results
