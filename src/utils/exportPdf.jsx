import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import CashFlowChart from '../components/CashFlowChart'
import { calculateROI } from './calculations'

function fmt(n) {
  return n.toLocaleString('en-US', { maximumFractionDigits: 2 })
}

function fmtDollar(n) {
  return '$' + fmt(n)
}

async function captureChart(cashFlow, color) {
  return new Promise((resolve) => {
    const wrap = document.createElement('div')
    wrap.style.cssText = [
      'position:fixed', 'top:0', 'left:0',
      'width:700px',
      'background:#ffffff',
      'z-index:-99999',
      'pointer-events:none',
    ].join(';')
    document.body.appendChild(wrap)

    const root = createRoot(wrap)
    root.render(createElement(CashFlowChart, { cashFlow, color }))

    setTimeout(async () => {
      try {
        const canvas = await html2canvas(wrap, {
          scale: 2,
          backgroundColor: '#ffffff',
          useCORS: true,
          allowTaint: true,
          logging: false,
        })
        resolve({ img: canvas.toDataURL('image/png'), aspectRatio: canvas.height / canvas.width })
      } catch {
        resolve(null)
      } finally {
        root.unmount()
        document.body.removeChild(wrap)
      }
    }, 650)
  })
}

export async function exportToPdf({ valuesA, valuesB }) {
  const rA = calculateROI(valuesA)
  const rB = calculateROI(valuesB)

  const [chartA, chartB] = await Promise.all([
    captureChart(rA.cashFlow, '#39f'),
    captureChart(rB.cashFlow, '#f58220'),
  ])

  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const pageW = 210
  const margin = 14
  const cW = pageW - margin * 2  // content width = 182mm

  // ── Page 1: Header + Table ─────────────────────────────────

  // Header bar
  pdf.setFillColor(27, 27, 53)
  pdf.rect(0, 0, pageW, 18, 'F')
  pdf.setFillColor(245, 130, 32)
  pdf.rect(0, 18, pageW, 2, 'F')

  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(12)
  pdf.setTextColor(255, 255, 255)
  pdf.text('EPAM', margin, 12)

  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(9)
  pdf.text('Business ROI Calculator — Scenario Comparison Report', margin + 18, 12)

  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  pdf.setFontSize(8)
  pdf.setTextColor(180, 180, 200)
  pdf.text(date, pageW - margin, 12, { align: 'right' })

  let y = 28

  // Table section label
  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(8)
  pdf.setTextColor(107, 114, 128)
  pdf.text('SCENARIO INPUTS & RESULTS', margin, y)
  y += 5

  // Column widths
  const c0 = 68  // label
  const c1 = 57  // Scenario A
  const c2 = 57  // Scenario B
  const rH = 7.5 // row height

  // Table header
  pdf.setFillColor(27, 27, 53)
  pdf.rect(margin, y, cW, rH, 'F')

  pdf.setFillColor(51, 153, 255)
  pdf.rect(margin + c0, y, c1, rH, 'F')
  pdf.setFillColor(245, 130, 32)
  pdf.rect(margin + c0 + c1, y, c2, rH, 'F')

  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(8)
  pdf.setTextColor(255, 255, 255)
  pdf.text('Scenario A', margin + c0 + 4, y + 5)
  pdf.text('Scenario B', margin + c0 + c1 + 4, y + 5)
  y += rH

  const rows = [
    { section: 'INPUTS' },
    { label: 'Initial Investment',      a: fmtDollar(valuesA.initialInvestment),                         b: fmtDollar(valuesB.initialInvestment) },
    { label: 'Monthly Revenue',         a: fmtDollar(valuesA.monthlyRevenue),                            b: fmtDollar(valuesB.monthlyRevenue) },
    { label: 'Monthly Operating Costs', a: fmtDollar(valuesA.monthlyCosts),                              b: fmtDollar(valuesB.monthlyCosts) },
    { label: 'Calculation Period',      a: `${valuesA.period} months`,                                   b: `${valuesB.period} months` },
    { section: 'RESULTS' },
    { label: 'Monthly Net Profit',      a: fmtDollar(valuesA.monthlyRevenue - valuesA.monthlyCosts),     b: fmtDollar(valuesB.monthlyRevenue - valuesB.monthlyCosts),   bold: true },
    { label: 'ROI',                     a: `${fmt(rA.roi)}%`,                                            b: `${fmt(rB.roi)}%`,                                          bold: true },
    { label: 'Payback Period',          a: rA.paybackPeriod === null ? 'Never' : `${rA.paybackPeriod} months`, b: rB.paybackPeriod === null ? 'Never' : `${rB.paybackPeriod} months`, bold: true },
    { label: 'Total Net Profit',        a: fmtDollar(rA.totalNetProfit),                                 b: fmtDollar(rB.totalNetProfit),                               bold: true },
  ]

  rows.forEach((row, i) => {
    if (row.section) {
      pdf.setFillColor(237, 240, 245)
      pdf.rect(margin, y, cW, 6.5, 'F')
      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(7)
      pdf.setTextColor(107, 114, 128)
      pdf.text(row.section, margin + 3, y + 4.5)
      y += 6.5
      return
    }

    pdf.setFillColor(i % 2 === 0 ? 248 : 255, i % 2 === 0 ? 249 : 255, i % 2 === 0 ? 252 : 255)
    pdf.rect(margin, y, cW, rH, 'F')

    // Accent borders for data columns
    pdf.setFillColor(51, 153, 255)
    pdf.rect(margin + c0, y, 2, rH, 'F')
    pdf.setFillColor(245, 130, 32)
    pdf.rect(margin + c0 + c1, y, 2, rH, 'F')

    // Label
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(8)
    pdf.setTextColor(107, 114, 128)
    pdf.text(row.label, margin + 3, y + 5)

    // Values
    pdf.setFont('helvetica', row.bold ? 'bold' : 'normal')
    pdf.setTextColor(27, 27, 53)
    pdf.text(row.a, margin + c0 + 5, y + 5)
    pdf.text(row.b, margin + c0 + c1 + 5, y + 5)

    // Bottom border
    pdf.setDrawColor(229, 231, 235)
    pdf.setLineWidth(0.1)
    pdf.line(margin, y + rH, margin + cW, y + rH)
    y += rH
  })

  // ── Page 2: Charts ─────────────────────────────────────────

  pdf.addPage()
  y = 15

  // Repeat mini-header
  pdf.setFillColor(27, 27, 53)
  pdf.rect(0, 0, pageW, 10, 'F')
  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(8)
  pdf.setTextColor(255, 255, 255)
  pdf.text('EPAM  |  Cumulative Cash Flow Charts', margin, 6.5)
  y = 18

  const addChart = (chart, label, rgb) => {
    if (!chart) return

    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(8)
    pdf.setTextColor(107, 114, 128)
    pdf.text(label, margin, y)
    y += 3

    pdf.setFillColor(...rgb)
    pdf.rect(margin, y, cW, 1.2, 'F')
    y += 4

    const chartH = cW * chart.aspectRatio
    pdf.addImage(chart.img, 'PNG', margin, y, cW, chartH)
    y += chartH + 10
  }

  addChart(chartA, 'SCENARIO A — CUMULATIVE CASH FLOW', [51, 153, 255])
  addChart(chartB, 'SCENARIO B — CUMULATIVE CASH FLOW', [245, 130, 32])

  pdf.save('epam-roi-comparison.pdf')
}
