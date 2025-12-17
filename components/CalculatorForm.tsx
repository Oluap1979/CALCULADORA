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
    <label htmlFor={id} className="mb-1 text-sm font-semibold text-slate-300">{label}</label>
    <div className="relative rounded-md shadow-sm">
      {prefix && <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">{prefix}</span>}
      <input
        type="text"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className={`w-full rounded-md border-slate-700 bg-slate-800 py-3 text-white placeholder-slate-500 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm ${prefix ? 'pl-10' : 'pl-3'} ${suffix ? 'pr-10' : 'pr-3'}`}
        placeholder="0"
        onFocus={(e) => e.target.select()}
      />
      {suffix && <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">{suffix}</span>}
    </div>
  </div>
);

const Select: React.FC<{
    value: string;
    onChange: (value: any) => void;
    options: { value: string; label: string }[];
}> = ({ value, onChange, options }) => (
    <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full rounded-md border-slate-700 bg-slate-800 py-3 pl-3 pr-10 text-base text-white focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm"
    >
        {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
    </select>
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
    <div className="w-full">
      <form onSubmit={(e) => { e.preventDefault(); onCalculate(); }} className="space-y-6">
        
        {/* Row 1 */}
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

        {/* Row 2 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
              <div>
                   <InputField
                        id="interestRate"
                        label="Taxa de Juros"
                        value={formData.interestRate}
                        onChange={handleInputChange}
                        suffix="%"
                    />
              </div>
              <div className="mt-6"> {/* Align with input */}
                  <Select 
                    value={rateType}
                    onChange={setRateType}
                    options={[{ value: 'monthly', label: 'Mensal' }, { value: 'yearly', label: 'Anual' }]}
                  />
              </div>
          </div>

           <div className="grid grid-cols-2 gap-4">
                 <InputField
                    id="period"
                    label="Período"
                    value={formData.period}
                    onChange={handleInputChange}
                />
                 <div className="mt-6">
                    <Select 
                        value={periodType}
                        onChange={setPeriodType}
                        options={[{ value: 'months', label: 'Meses' }, { value: 'years', label: 'Anos' }]}
                    />
                 </div>
            </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full rounded-md border border-transparent bg-rose-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-slate-900 sm:text-lg"
          >
            Calcular
          </button>
        </div>
      </form>
    </div>
  );
};