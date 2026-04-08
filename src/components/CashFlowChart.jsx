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

function CashFlowChart({ cashFlow, color = '#39f', chartTheme = {} }) {
  const {
    grid           = '#eaeaea',
    axisFill       = '#6b7280',
    axisLine       = '#e5e7eb',
    tooltipBg      = '#ffffff',
    tooltipBorder  = '#e5e7eb',
    activeDotStroke = '#ffffff',
  } = chartTheme

  return (
    <div className="chart-section">
      <h2 className="section-title">Cumulative Cash Flow</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={cashFlow} margin={{ top: 8, right: 24, left: 8, bottom: 16 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={grid} vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: axisFill }}
            axisLine={{ stroke: axisLine }}
            tickLine={false}
            label={{ value: 'Month', position: 'insideBottomRight', offset: -4, fontSize: 12, fill: axisFill }}
          />
          <YAxis
            tickFormatter={formatDollar}
            tick={{ fontSize: 11, fill: axisFill }}
            axisLine={false}
            tickLine={false}
            width={100}
          />
          <Tooltip
            formatter={(value) => [formatDollar(value), 'Cash Flow']}
            labelFormatter={(l) => `Month ${l}`}
            contentStyle={{ background: tooltipBg, border: `1px solid ${tooltipBorder}`, borderRadius: 4, fontSize: 13 }}
          />
          <ReferenceLine
            y={0}
            stroke="#f58220"
            strokeDasharray="6 3"
            strokeWidth={1.5}
            label={{ value: 'Break-even', fill: '#f58220', fontSize: 11, position: 'insideTopLeft' }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, fill: color, stroke: activeDotStroke, strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CashFlowChart
