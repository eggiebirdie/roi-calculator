function InputForm({ values, onChange }) {
  function handleChange(e) {
    const { name, value } = e.target
    onChange({ ...values, [name]: Number(value) })
  }

  return (
    <div className="sidebar-form">
      <div className="sidebar-heading">
        <h2 className="sidebar-title">Project Inputs</h2>
        <p className="sidebar-desc">Enter your project financials to calculate ROI</p>
      </div>

      <div className="field">
        <label htmlFor="initialInvestment">Initial Investment ($)</label>
        <input
          id="initialInvestment"
          type="number"
          name="initialInvestment"
          value={values.initialInvestment}
          min="0"
          onChange={handleChange}
        />
      </div>

      <div className="field">
        <label htmlFor="monthlyRevenue">Expected Monthly Revenue ($)</label>
        <input
          id="monthlyRevenue"
          type="number"
          name="monthlyRevenue"
          value={values.monthlyRevenue}
          min="0"
          onChange={handleChange}
        />
      </div>

      <div className="field">
        <label htmlFor="monthlyCosts">Monthly Operating Costs ($)</label>
        <input
          id="monthlyCosts"
          type="number"
          name="monthlyCosts"
          value={values.monthlyCosts}
          min="0"
          onChange={handleChange}
        />
      </div>

      <div className="field">
        <label htmlFor="period">Calculation Period (months)</label>
        <select
          id="period"
          name="period"
          value={values.period}
          onChange={handleChange}
        >
          <option value={12}>12 months</option>
          <option value={24}>24 months</option>
          <option value={36}>36 months</option>
        </select>
      </div>
    </div>
  )
}

export default InputForm
