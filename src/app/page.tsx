'use client';

import { useState } from "react";

export default function Home() {
  const [homePrice, setHomePrice] = useState(300000);
  const [downPayment, setDownPayment] = useState(0);
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(5);

  const loanAmount = homePrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanTerm * 12;

  const monthlyPayment =
    loanAmount *
    (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="w-full max-w-lg">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Mortgage Calculator</h1>
        <div className="bg-white shadow-xl p-8 rounded-2xl space-y-6">
          <Input label="Home Price ($)" value={homePrice} onChange={setHomePrice} />
          <Input label="Down Payment ($)" value={downPayment} onChange={setDownPayment} />
          <Input label="Loan Term (years)" value={loanTerm} onChange={setLoanTerm} />
          <Input label="Interest Rate (%)" value={interestRate} onChange={setInterestRate} />
          <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
            <div className="text-lg font-medium text-gray-700">
              Monthly Payment: <span className="text-2xl font-bold text-green-600 ml-2">${monthlyPayment.toFixed(2)}</span>
            </div>
          </div>
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
