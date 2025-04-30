"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { HelpCircle } from "lucide-react"
import { Bar, ComposedChart,Line, ResponsiveContainer, XAxis, YAxis, Tooltip as RechartsTooltip   } from "recharts"
import { formatarMoeda } from "@/utils/format"

export default function InvestmentCalculator() {
  const [initialValue, setInitialValue] = useState("1000")
  const [interestRate, setInterestRate] = useState("1")
  const [monthlyContribution, setMonthlyContribution] = useState("100")
  const [period, setPeriod] = useState("10")
  const [goal, setGoal] = useState("2000")
  const [interestPeriod, setInterestPeriod] = useState("monthly")
  const [timePeriod, setTimePeriod] = useState("monthly")
  const [chartData, setChartData] = useState([])

  const formatCurrency = (value) => value?.replace(/\D/g, "") || ""
  const formatPercentage = (value) => value?.replace(/[^\d.]/g, "") || ""

  useEffect(() => {
    calculateInvestment()
  }, [initialValue, interestRate, monthlyContribution, period, goal, interestPeriod, timePeriod])

  const calculateInvestment = () => {
    const principal = Number.parseFloat(initialValue) || 0
    const rate = Number.parseFloat(interestRate) / 100 || 0
    const contribution = Number.parseFloat(monthlyContribution) || 0
    let months = Number.parseInt(period) || 0

    if (timePeriod === "yearly") months *= 12
    const monthlyRate = interestPeriod === "yearly" ? Math.pow(1 + rate, 1 / 12) - 1 : rate

    const data = []
    for (let i = 0; i <= months; i++) {
      const totalContributions = principal + contribution * i
      const compoundedInitial = principal * Math.pow(1 + monthlyRate, i)
      const compoundedAportes = contribution > 0 && monthlyRate > 0
        ? (contribution * (Math.pow(1 + monthlyRate, i) - 1)) / monthlyRate
        : contribution * i

      const total = compoundedInitial + compoundedAportes
      const interest = total - totalContributions
      const meta = Number.parseFloat(goal) || 0

      data.push({
        name: timePeriod === "yearly" ? `Ano ${Math.floor(i / 12)}` : `Mês ${i}`,
        contributions: Math.round(totalContributions),
        interest: Math.round(interest),
        total: Math.round(total),
        goal: meta,
      })
    }

    setChartData(data.filter((_, index) => timePeriod === "yearly" ? index % 12 === 0 : true))
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <h1 className="text-4xl font-normal text-center mb-8 text-white">Calculadora de investimentos</h1>

      <Card className="max-w-4xl mx-auto p-8 bg-gray-50 shadow-md rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Valor inicial */}
          <Field
            id="initial-value"
            label="Valor inicial"
            tooltip="Valor o qual você começará a investir."
            value={initialValue}
            onChange={(e) => setInitialValue(formatCurrency(e.target.value))}
            prefix="R$"
          />

          {/* Juros */}
          <Field

            id="interest-rate"
            label="Juros"
            value={interestRate}
            onChange={(e) => setInterestRate(formatPercentage(e.target.value))}
            prefix="%"
            tooltip="Taxa de juros aplicada mensalmente ou anualmente sobre o total acumulado."
            select={{
              value: interestPeriod,
              onChange: setInterestPeriod,
              items: [
                { value: "monthly", label: "Mensal" },
                { value: "yearly", label: "Anual" },
              ],
            }}
          />

          {/* Aporte mensal */}
          <Field
            id="monthly-contribution"
            label="Aporte mensal"
             tooltip="Quantidade que você pretende investir mensalmente."
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(formatCurrency(e.target.value))}
            prefix="R$"
          />

          {/* Período */}
          <Field
            id="period"
            label="Período"
            value={period}
            tooltip="Tempo que você pretende investir."
            onChange={(e) => setPeriod(e.target.value.replace(/\D/g, ""))}
            select={{
              value: timePeriod,
              onChange: setTimePeriod,
              items: [
                { value: "monthly", label: "Meses" },
                { value: "yearly", label: "Anos" },
              ],
            }}
          />

          {/* Meta */}
          <Field
            id="goal"
            label="Meta"
            tooltip="Meta em reais que você deseja alcançar."
            value={goal}
            onChange={(e) => setGoal(formatCurrency(e.target.value))}
            prefix="R$"
            full
          />
        </div>
      </Card>

      {/* Gráfico */}
      <div className="max-w-4xl mx-auto mt-6 bg-gray-700 p-6 rounded-xl">
        <div className="flex items-center gap-6 mb-4">
          <Legend color="bg-green-500" label="Aportes" />
          <Legend color="bg-emerald-400" label="Juros" />
          <Legend color="bg-cyan-300" label="Total" />
        </div>

        <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
  <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
    <XAxis dataKey="name" stroke="#fff" />
    <YAxis stroke="#fff" />
    <RechartsTooltip
  formatter={(value, name) => {
    const labelMap = {
      contributions: "Aportes",
      interest: "Juros",
      total: "Montante Total",
      goal: "Meta",
    }
    return [formatarMoeda(value), labelMap[name] || name]
  }}
  labelFormatter={(label) => label}
  />

    <Bar dataKey="contributions" stackId="a" fill="#22c55e" name="Aportes" />
    <Bar dataKey="interest" stackId="a" fill="#34d399" name="Juros" />
    <Line type="monotone" dataKey="total" stroke="oklch(78.9% 0.154 211.53)" strokeWidth={2} dot={false} name="Montante Total" />
    <Line
      type="monotone"
      dataKey="goal"
      stroke="#f87171"
      strokeDasharray="5 5"
      strokeWidth={2}
      dot={false}
      name="Meta"
    />
  </ComposedChart>
</ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

function Field({ id, label, value, onChange, prefix, select, full = false, tooltip }) {
  return (
    <div className={`space-y-2 ${full ? "md:col-span-2 md:w-1/2" : ""}`}>
      <div className="flex items-center gap-1">
        <label htmlFor={id} className="text-lg font-medium">{label}</label>

        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-gray-500 cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="text-sm">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      <div className="flex">
        <div className="relative flex-1">
          <Input
            id={id}
            value={value}
            onChange={onChange}
            className={`pr-10 bg-gray-200 border-0 h-12 ${select ? "rounded-r-none" : ""}`}
          />
          {prefix && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600">{prefix}</span>
          )}
        </div>

        {select && (
          <Select value={select.value} onValueChange={select.onChange}>
            <SelectTrigger className="w-32 bg-emerald-500 text-white border-0 rounded-l-none !h-12 flex items-center justify-center">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {select.items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  )
}


function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-4 h-4 ${color}`}></div>
      <span className="text-white">{label}</span>
    </div>
  )
}