import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts'

function formatDollar(value) {
  return '$' + value.toLocaleString('en-US')
}

function CashFlowChart({ cashFlow }) {
  return (
    <div className="card chart-card">
      <h2 className="card-title">Cumulative Cash Flow</h2>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={cashFlow} margin={{ top: 8, right: 16, left: 16, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="month"
            label={{ value: 'Month', position: 'insideBottomRight', offset: -8, fontSize: 12 }}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            tickFormatter={formatDollar}
            tick={{ fontSize: 11 }}
            width={90}
          />
          <Tooltip formatter={(value) => [formatDollar(value), 'Cash Flow']} labelFormatter={(l) => `Month ${l}`} />
          <ReferenceLine y={0} stroke="#9ca3af" strokeDasharray="6 3" label={{ value: 'Break-even', fill: '#9ca3af', fontSize: 11 }} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#39f"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CashFlowChart
