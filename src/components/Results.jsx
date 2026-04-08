function fmt(n) {
  return n.toLocaleString('en-US', { maximumFractionDigits: 2 })
}

function Results({ roi, paybackPeriod, totalNetProfit }) {
  const roiPositive = roi >= 0
  const profitPositive = totalNetProfit >= 0

  return (
    <div className="results-section">
      <h2 className="section-title">Results</h2>
      <div className="metrics">
        <div className="metric metric--roi">
          <span className="metric-label">Return on Investment</span>
          <span className={`metric-value ${roiPositive ? 'positive' : 'negative'}`}>
            {fmt(roi)}%
          </span>
          <span className="metric-tag">ROI</span>
        </div>

        <div className="metric metric--payback">
          <span className="metric-label">Payback Period</span>
          <span className="metric-value neutral">
            {paybackPeriod === null ? 'Never' : `${paybackPeriod}`}
          </span>
          {paybackPeriod !== null && <span className="metric-tag">months</span>}
        </div>

        <div className="metric metric--profit">
          <span className="metric-label">Total Net Profit</span>
          <span className={`metric-value ${profitPositive ? 'positive' : 'negative'}`}>
            ${fmt(totalNetProfit)}
          </span>
          <span className="metric-tag">USD</span>
        </div>
      </div>
    </div>
  )
}

export default Results
