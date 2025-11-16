export interface FormData {
  initialValue: string;
  monthlyValue: string;
  interestRate: string;
  period: string;
}

export type RateType = 'monthly' | 'yearly';
export type PeriodType = 'months' | 'years';

export interface CalculationResult {
  summary: {
    finalBalance: number;
    totalInvested: number;
    totalInterest: number;
  };
  chartData: ChartDataPoint[];
  tableData: TableDataRow[];
}

export interface ChartDataPoint {
  period: number;
  'Valor Investido': number;
  'Total Acumulado': number;
}

export interface TableDataRow {
  month: number;
  interest: number;
  totalInvested: number;
  totalInterest: number;
  totalAccumulated: number;
}