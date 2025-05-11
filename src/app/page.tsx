'use client';

import { useState } from "react";

type CalculatorMode = 'mortgage' | 'fixed-income';

export default function Home() {
  const [mode, setMode] = useState<CalculatorMode>('mortgage');
  
  // Mortgage states
  const [homePrice, setHomePrice] = useState(300000);
  const [downPayment, setDownPayment] = useState(0);
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(5);

  // Fixed Income states
  const [principal, setPrincipal] = useState(100000);
  const [fixedInterestRate, setFixedInterestRate] = useState(4);
  const [investmentTerm, setInvestmentTerm] = useState(5);

  const loanAmount = homePrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanTerm * 12;

  const monthlyPayment =
    loanAmount *
    (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);

  // Fixed Income calculations
  const annualInterest = principal * (fixedInterestRate / 100);
  const totalInterest = annualInterest * investmentTerm;
  const finalAmount = principal + totalInterest;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="w-full max-w-lg">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Financial Calculator</h1>
        
        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => setMode('mortgage')}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              mode === 'mortgage'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Mortgage
          </button>
          <button
            onClick={() => setMode('fixed-income')}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              mode === 'fixed-income'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Fixed Income
          </button>
        </div>

        <div className="bg-white shadow-xl p-8 rounded-2xl space-y-6">
          {mode === 'mortgage' ? (
            <>
              <Input label="Home Price ($)" value={homePrice} onChange={setHomePrice} />
              <Input label="Down Payment ($)" value={downPayment} onChange={setDownPayment} />
              <Input label="Loan Term (years)" value={loanTerm} onChange={setLoanTerm} />
              <Input label="Interest Rate (%)" value={interestRate} onChange={setInterestRate} />
              <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                <div className="text-lg font-medium text-gray-700">
                  Monthly Payment: <span className="text-2xl font-bold text-green-600 ml-2">${monthlyPayment.toFixed(2)}</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <Input label="Principal Amount ($)" value={principal} onChange={setPrincipal} />
              <Input label="Interest Rate (%)" value={fixedInterestRate} onChange={setFixedInterestRate} />
              <Input label="Investment Term (years)" value={investmentTerm} onChange={setInvestmentTerm} />
              <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 space-y-3">
                <div className="text-lg font-medium text-gray-700">
                  Annual Interest: <span className="text-2xl font-bold text-green-600 ml-2">${annualInterest.toFixed(2)}</span>
                </div>
                <div className="text-lg font-medium text-gray-700">
                  Total Interest: <span className="text-2xl font-bold text-green-600 ml-2">${totalInterest.toFixed(2)}</span>
                </div>
                <div className="text-lg font-medium text-gray-700">
                  Final Amount: <span className="text-2xl font-bold text-green-600 ml-2">${finalAmount.toFixed(2)}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

function Input({ label, value, onChange }: { label: string, value: number, onChange: (val: number) => void }) {
  return (
    <div className="flex flex-col">
      <label className="mb-2 font-medium text-gray-700">{label}</label>
      <input
        type="number"
        value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        className="border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-300"
      />
    </div>
  );
}
