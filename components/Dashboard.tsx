import React, { useState, useCallback } from 'react';
import type { FormData, RateType, PeriodType, CalculationResult, ChartDataPoint, TableDataRow } from '../types';
import { CalculatorForm } from './CalculatorForm';
import { ResultsDisplay } from './ResultsDisplay';
import { InfoSection } from './InfoSection';

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [formData, setFormData] = useState<FormData>({
    initialValue: '1000',
    monthlyValue: '500',
    interestRate: '8',
    period: '10',
  });
  const [rateType, setRateType] = useState<RateType>('yearly');
  const [periodType, setPeriodType] = useState<PeriodType>('years');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const parseLocaleNumber = (str: string) => parseFloat(str.replace(/\./g, '').replace(',', '.'));

  const handleCalculate = useCallback(() => {
    const initialValue = parseLocaleNumber(formData.initialValue) || 0;
    const monthlyValue = parseLocaleNumber(formData.monthlyValue) || 0;
    const interestRate = parseLocaleNumber(formData.interestRate) || 0;
    const period = parseLocaleNumber(formData.period) || 0;

    if (period <= 0 || interestRate <= 0) {
      setResult(null);
      return;
    }

    const monthlyRate = rateType === 'yearly'
      ? Math.pow(1 + interestRate / 100, 1 / 12) - 1
      : interestRate / 100;

    const totalMonths = periodType === 'years' ? period * 12 : period;

    const tableData: TableDataRow[] = [];
    const chartData: ChartDataPoint[] = [{
        period: 0,
        'Valor Investido': initialValue,
        'Total Acumulado': initialValue,
    }];

    let currentBalance = initialValue;
    let totalInvested = initialValue;

    for (let month = 1; month <= totalMonths; month++) {
      const interestEarned = currentBalance * monthlyRate;
      currentBalance += interestEarned;
      if (month > 0) {
        currentBalance += monthlyValue;
        totalInvested += monthlyValue;
      }
      
      const totalInterest = currentBalance - totalInvested;

      tableData.push({
        month: month,
        interest: interestEarned,
        totalInvested: totalInvested,
        totalInterest: totalInterest,
        totalAccumulated: currentBalance,
      });

      if(totalMonths <= 360 || month % Math.floor(totalMonths/360) === 0 || month === totalMonths) {
          chartData.push({
            period: month,
            'Valor Investido': totalInvested,
            'Total Acumulado': currentBalance,
          });
      }
    }
    
    if (chartData[chartData.length - 1].period !== totalMonths) {
       chartData.push({
            period: totalMonths,
            'Valor Investido': totalInvested,
            'Total Acumulado': currentBalance,
        });
    }

    setResult({
      summary: {
        finalBalance: currentBalance,
        totalInvested: totalInvested,
        totalInterest: currentBalance - totalInvested,
      },
      chartData,
      tableData,
    });
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, periodType, rateType]);
  
  React.useEffect(() => {
    handleCalculate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 bg-gradient-to-br from-slate-900 via-slate-900 to-rose-900/40 p-4 font-sans text-slate-300 sm:p-6 lg:p-8">
      <main className="mx-auto max-w-5xl relative">
        <div className="absolute top-0 right-0 z-10 hidden md:block">
            <button 
                onClick={onLogout} 
                className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                </svg>
                Sair
            </button>
        </div>
        
        {/* Mobile logout button */}
         <div className="mb-4 flex justify-end md:hidden">
            <button 
                onClick={onLogout} 
                className="text-sm font-medium text-slate-400 hover:text-white"
            >
                Sair
            </button>
        </div>

        <header className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Simulador de Juros Compostos
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            Visualize o poder dos juros sobre juros e planeje seu futuro financeiro.
          </p>
        </header>

        <section className="mt-10">
          <CalculatorForm
            formData={formData}
            setFormData={setFormData}
            rateType={rateType}
            setRateType={setRateType}
            periodType={periodType}
            setPeriodType={setPeriodType}
            onCalculate={handleCalculate}
          />
        </section>

        {result && (
          <section>
            <ResultsDisplay result={result} />
          </section>
        )}
        
        <section>
            <InfoSection />
        </section>
        
        <footer className="mt-16 border-t border-slate-700 py-8 text-center text-slate-500">
            <p>&copy; {new Date().getFullYear()} Paulo Tavares. Todos os direitos reservados.</p>
            <p className="mt-2">Contato: Whatsapp (83) 99938-5147</p>
        </footer>
      </main>
    </div>
  );
};
