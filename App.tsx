import React, { useState, useCallback } from 'react';
import type { FormData, RateType, PeriodType, CalculationResult, ChartDataPoint, TableDataRow } from './types';
import { CalculatorForm } from './components/CalculatorForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { InfoSection } from './components/InfoSection';

const App: React.FC = () => {
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

      // To avoid performance issues on huge charts, we can sample the data
      // For now, let's add all points for accuracy up to 30 years
      if(totalMonths <= 360 || month % Math.floor(totalMonths/360) === 0 || month === totalMonths) {
          chartData.push({
            period: month,
            'Valor Investido': totalInvested,
            'Total Acumulado': currentBalance,
          });
      }
    }
    
    // Ensure the last point is always on the chart
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
      <main className="mx-auto max-w-5xl">
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

export default App;
