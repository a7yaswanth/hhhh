import React from 'react';
import { Order } from '../../types';
import { formatCurrency } from '../../utils/format';

interface PaymentSummaryProps {
  orders: Order[];
  onPayment: () => void;
}

export default function PaymentSummary({ orders, onPayment }: PaymentSummaryProps) {
  const subtotal = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Payment Summary</h2>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax (10%)</span>
          <span>{formatCurrency(tax)}</span>
        </div>
        <div className="border-t pt-3">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
      <button
        onClick={onPayment}
        className="w-full mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
      >
        Pay Now
      </button>
    </div>
  );
}