import React from 'react';
import type { FormData, RateType, PeriodType } from '../types';

interface CalculatorFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  rateType: RateType;
  setRateType: React.Dispatch<React.SetStateAction<RateType>>;
  periodType: PeriodType;
  setPeriodType: React.Dispatch<React.SetStateAction<PeriodType>>;
  onCalculate: () => void;
}

const InputField: React.FC<{
  id: keyof FormData;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  prefix?: string;
  suffix?: string;
}> = ({ id, label, value, onChange, prefix, suffix }) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="mb-2 text-sm font-medium text-slate-400">{label}</label>
    <div className="relative">
      {prefix && <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">{prefix}</span>}
      <input
        type="text"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className={`w-full rounded-md border-slate-700 bg-slate-800 p-3 text-white shadow-sm transition-colors focus:border-rose-500 focus:ring-rose-500 ${prefix ? 'pl-10' : ''} ${suffix ? 'pr-12' : ''}`}
        placeholder="0"
        onFocus={(e) => e.target.select()}
      />
      {suffix && <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500">{suffix}</span>}
    </div>
  </div>
);

const ToggleButton: React.FC<{
  options: { value: string; label: string }[];
  selectedValue: string;
  onChange: (value: any) => void;
}> = ({ options, selectedValue, onChange }) => (
  <div className="flex rounded-md bg-slate-800 p-1">
    {options.map(option => (
      <button
        key={option.value}
        type="button"
        onClick={() => onChange(option.value)}
        className={`w-full rounded px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
          selectedValue === option.value
            ? 'bg-rose-600 text-white shadow-md'
            : 'text-slate-400 hover:bg-slate-700'
        }`}
      >
        {option.label}
      </button>
    ))}
  </div>
);


export const CalculatorForm: React.FC<CalculatorFormProps> = ({
  formData,
  setFormData,
  rateType,
  setRateType,
  periodType,
  setPeriodType,
  onCalculate
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Allow only numbers and a single comma
    const sanitizedValue = value.replace(/[^\d,]/g, '').replace(/,(?=.*,)/g, '');
    setFormData(prev => ({ ...prev, [name]: sanitizedValue }));
  };

  return (
    <div className="w-full rounded-lg border border-slate-700 bg-slate-800/50 p-6 shadow-2xl backdrop-blur-sm md:p-8">
      <form onSubmit={(e) => { e.preventDefault(); onCalculate(); }} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <InputField
            id="initialValue"
            label="Valor Inicial"
            value={formData.initialValue}
            onChange={handleInputChange}
            prefix="R$"
          />
          <InputField
            id="monthlyValue"
            label="Valor Mensal"
            value={formData.monthlyValue}
            onChange={handleInputChange}
            prefix="R$"
          />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
                 <InputField
                    id="interestRate"
                    label="Taxa de Juros"
                    value={formData.interestRate}
                    onChange={handleInputChange}
                    suffix="%"
                />
                <div className="mt-2">
                    <ToggleButton
                        options={[{ value: 'monthly', label: 'Mensal' }, { value: 'yearly', label: 'Anual' }]}
                        selectedValue={rateType}
                        onChange={setRateType}
                    />
                </div>
            </div>
            <div>
                 <InputField
                    id="period"
                    label="Período"
                    value={formData.period}
                    onChange={handleInputChange}
                />
                <div className="mt-2">
                    <ToggleButton
                        options={[{ value: 'months', label: 'Meses' }, { value: 'years', label: 'Anos' }]}
                        selectedValue={periodType}
                        onChange={setPeriodType}
                    />
                </div>
            </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full rounded-lg bg-rose-600 px-6 py-3 text-lg font-bold text-white shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Calcular
          </button>
        </div>
      </form>
    </div>
  );
};
