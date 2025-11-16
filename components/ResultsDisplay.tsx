import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { CalculationResult } from '../types';
import { formatCurrency } from '../utils/formatters';

interface ResultsDisplayProps {
  result: CalculationResult;
}

const SummaryCard: React.FC<{ title: string; value: string; highlight?: boolean }> = ({ title, value, highlight }) => (
  <div className={`rounded-lg p-4 text-center ${highlight ? 'bg-rose-700/80 text-white' : 'bg-slate-700/50'}`}>
    <p className="text-sm text-slate-400">{title}</p>
    <p className={`text-2xl font-bold ${highlight ? 'text-white' : 'text-slate-200'}`}>{value}</p>
  </div>
);

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  return (
    <div className="mt-10 w-full space-y-8 rounded-lg border border-slate-700 bg-slate-800/50 p-6 shadow-2xl backdrop-blur-sm md:p-8">
      <h2 className="text-center text-3xl font-bold text-white">Resultado da Simulação</h2>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard title="Valor total final" value={formatCurrency(result.summary.finalBalance)} highlight />
        <SummaryCard title="Valor total investido" value={formatCurrency(result.summary.totalInvested)} />
        <SummaryCard title="Total em juros" value={formatCurrency(result.summary.totalInterest)} />
      </div>

      <div>
        <h3 className="mb-4 text-xl font-semibold text-white">Gráfico de Evolução:</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer>
            <LineChart data={result.chartData} margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="period" stroke="#94a3b8" />
              <YAxis tickFormatter={(value) => `R$${Number(value) / 1000}k`} stroke="#94a3b8" />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#cbd5e1' }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Legend wrapperStyle={{ color: '#cbd5e1' }} />
              <Line type="monotone" dataKey="Valor Investido" stroke="#64748b" strokeWidth={2} dot={false} name="Valor Investido"/>
              <Line type="monotone" dataKey="Total Acumulado" stroke="#e11d48" strokeWidth={2} dot={false} name="Total Acumulado"/>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div>
        <h3 className="mb-4 text-xl font-semibold text-white">Tabela Detalhada:</h3>
        <div className="max-h-96 overflow-y-auto rounded-lg border border-slate-700">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="sticky top-0 bg-slate-800">
              <tr>
                {['Mês', 'Juros do Mês', 'Total Investido', 'Total em Juros', 'Total Acumulado'].map(header => (
                  <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700 bg-slate-900/50">
              {result.tableData.map((row) => (
                <tr key={row.month} className="hover:bg-slate-800/70">
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-300">{row.month}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-300">{formatCurrency(row.interest)}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-300">{formatCurrency(row.totalInvested)}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-300">{formatCurrency(row.totalInterest)}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-rose-400">{formatCurrency(row.totalAccumulated)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
