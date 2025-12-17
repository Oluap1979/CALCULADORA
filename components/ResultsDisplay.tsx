import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { CalculationResult } from '../types';
import { formatCurrency } from '../utils/formatters';

interface ResultsDisplayProps {
  result: CalculationResult;
}

const SummaryCard: React.FC<{ title: string; value: string; isPrimary?: boolean }> = ({ title, value, isPrimary }) => (
  <div className={`overflow-hidden rounded-lg bg-slate-800 px-4 py-5 shadow sm:p-6 ${isPrimary ? 'ring-2 ring-rose-500' : ''}`}>
    <dt className="truncate text-sm font-medium text-slate-400">{title}</dt>
    <dd className={`mt-1 text-3xl font-semibold tracking-tight ${isPrimary ? 'text-white' : 'text-slate-200'}`}>
      {value}
    </dd>
  </div>
);

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  return (
    <div className="mt-10 space-y-10">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <SummaryCard title="Valor Total Final" value={formatCurrency(result.summary.finalBalance)} isPrimary />
        <SummaryCard title="Total Investido" value={formatCurrency(result.summary.totalInvested)} />
        <SummaryCard title="Total em Juros" value={formatCurrency(result.summary.totalInterest)} />
      </div>

      <div className="rounded-lg bg-slate-800 p-6 shadow-lg">
        <h3 className="mb-4 text-lg font-medium leading-6 text-white">Evolução do Patrimônio</h3>
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={result.chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis 
                dataKey="period" 
                stroke="#94a3b8"
                label={{ value: 'Período', position: 'insideBottomRight', offset: -10, fill: '#94a3b8' }} 
              />
              <YAxis 
                stroke="#94a3b8"
                tickFormatter={(value) => `R$ ${value / 1000}k`}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#f8fafc' }}
                itemStyle={{ color: '#f8fafc' }}
                formatter={(value: number) => formatCurrency(value)}
                labelFormatter={(label) => `Período: ${label}`}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Line 
                type="monotone" 
                dataKey="Valor Investido" 
                stroke="#94a3b8" 
                strokeWidth={2}
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="Total Acumulado" 
                stroke="#e11d48" 
                strokeWidth={3}
                activeDot={{ r: 8 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="rounded-lg bg-slate-800 p-6 shadow-lg overflow-hidden">
        <h3 className="mb-4 text-lg font-medium leading-6 text-white">Tabela Detalhada</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-700/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-300">Mês</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-300">Juros (Mês)</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-300">Total Investido</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-300">Total Juros</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white">Total Acumulado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700 bg-slate-800">
              {result.tableData.map((row) => (
                <tr key={row.month} className="hover:bg-slate-700/50">
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-300">{row.month}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-400">{formatCurrency(row.interest)}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-400">{formatCurrency(row.totalInvested)}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-400">{formatCurrency(row.totalInterest)}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-white">{formatCurrency(row.totalAccumulated)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};