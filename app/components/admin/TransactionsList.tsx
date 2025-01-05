"use client";

interface Transaction {
  id: number;
  name: string;
  amount: number;
  date: string;
  type: 'payment' | 'refund';
}

const transactions: Transaction[] = [
  { id: 1, name: "Bonnie Green", amount: 2499.99, date: "Apr 23, 2021", type: "payment" },
  { id: 2, name: "#00910", amount: -99.99, date: "Apr 23, 2021", type: "refund" },
  { id: 3, name: "#087651", amount: 2499.99, date: "Apr 18, 2021", type: "payment" },
  { id: 4, name: "Lana Byrd", amount: 5999.99, date: "Apr 15, 2021", type: "payment" },
  { id: 5, name: "Jese Leos", amount: 2499.99, date: "Apr 15, 2021", type: "payment" },
  { id: 6, name: "THEMESBERG LLC", amount: 5999.99, date: "Apr 11, 2021", type: "payment" },
  { id: 7, name: "Lana Lysle", amount: 1999.99, date: "Apr 6, 2021", type: "payment" },
];

export function TransactionsList() {
  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div 
          key={transaction.id}
          className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
        >
          <div>
            <p className="font-medium">{transaction.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{transaction.date}</p>
          </div>
          <span className={`font-medium ${
            transaction.type === 'refund' 
              ? 'text-red-500' 
              : 'text-emerald-500'
          }`}>
            {transaction.type === 'refund' ? '-' : '+'}
            ${transaction.amount.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
} 