
import React from 'react';
import { Calendar, CreditCard } from 'lucide-react';
import { usePayoutWidget } from '@/contexts/PayoutWidgetContext';
import { PayoutRecord } from '@/contexts/PayoutWidgetContext';

interface PayoutListProps {
  payouts: PayoutRecord[];
  handleViewInvoice?: (payout: PayoutRecord) => void;
}

const PayoutList: React.FC<PayoutListProps> = ({ payouts, handleViewInvoice }) => {
  const { getStatusColor } = usePayoutWidget();
  
  return (
    <div className="payouts-list space-y-3">
      {payouts.map(payout => (
        <div 
          key={payout.id} 
          className="payout-item p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
          onClick={() => handleViewInvoice && handleViewInvoice(payout)}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium">{payout.amount}</p>
              <p className="text-sm opacity-70">{payout.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <Calendar size={14} className="opacity-60" />
                <span className="text-xs opacity-70">{payout.date}</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className={`text-sm font-medium ${getStatusColor(payout.status)}`}>
                {payout.status}
              </span>
              <div className="flex items-center gap-1 mt-1">
                <CreditCard size={14} className="opacity-60" />
                <span className="text-xs opacity-70">{payout.method}</span>
              </div>
              <div className="text-xs opacity-70 mt-1">
                Invoice: {payout.invoice}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PayoutList;
