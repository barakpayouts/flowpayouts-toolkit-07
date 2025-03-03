
import React, { useState } from 'react';
import { Check, Clock, AlertCircle, FileText, Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";
import UploadInvoice from './UploadInvoice';

interface Payout {
  id: string;
  description: string;
  date: string;
  amount: string;
  status: 'completed' | 'pending' | 'awaiting';
}

const PayoutList = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  
  const payouts: Payout[] = [
    {
      id: 'INV-2023-05-01',
      description: 'April commission payment',
      date: 'May 15, 2023',
      amount: '$1,250.00',
      status: 'completed'
    },
    {
      id: 'INV-2023-06-01',
      description: 'May commission payment',
      date: 'Jun 12, 2023',
      amount: '$890.75',
      status: 'completed'
    },
    {
      id: 'INV-2023-07-01',
      description: 'June commission payment',
      date: 'Jul 15, 2023',
      amount: '$1,475.50',
      status: 'completed'
    },
    {
      id: 'INV-2023-08-01',
      description: 'July commission payment',
      date: 'Aug 15, 2023',
      amount: '$2,100.00',
      status: 'pending'
    },
    {
      id: 'INV-2023-09-01',
      description: 'August commission payment',
      date: 'Sep 15, 2023',
      amount: '$1,890.25',
      status: 'awaiting'
    }
  ];

  const getStatusIcon = (status: Payout['status']) => {
    switch (status) {
      case 'completed':
        return <Check size={16} className="text-green-500" />;
      case 'pending':
        return <Clock size={16} className="text-amber-500" />;
      case 'awaiting':
        return <AlertCircle size={16} className="text-blue-400" />;
    }
  };

  const getStatusText = (status: Payout['status']) => {
    switch (status) {
      case 'completed':
        return <span className="text-green-500">Completed</span>;
      case 'pending':
        return <span className="text-amber-500">Pending</span>;
      case 'awaiting':
        return <span className="text-blue-400">Awaiting Approval</span>;
    }
  };

  return (
    <div>
      {/* Upload Invoice Button */}
      <div className="mb-4 flex justify-end">
        <Button 
          onClick={() => setShowUploadModal(true)}
          variant="outline" 
          size="sm"
          className="text-white border-white/20 hover:bg-white/10 flex items-center gap-2"
        >
          <Upload size={14} />
          Upload Invoice
        </Button>
      </div>
      
      {/* Payouts List */}
      <div className="space-y-3">
        {payouts.map((payout) => (
          <div 
            key={payout.id} 
            className="bg-payouts-primary/30 border border-white/10 rounded-lg p-4"
          >
            <div className="flex justify-between mb-1">
              <div className="font-medium text-white">{payout.id}</div>
              <div className="font-bold">{payout.amount}</div>
            </div>
            <div className="text-white/80 mb-2">{payout.description}</div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1 text-sm text-white/60">
                <FileText size={14} />
                {payout.date}
              </div>
              <div className="flex items-center gap-1">
                {getStatusIcon(payout.status)}
                {getStatusText(payout.status)}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Upload Invoice Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <UploadInvoice 
            onClose={() => setShowUploadModal(false)} 
            onUploadSuccess={() => {
              // Here you would typically refresh the list of payouts
              // In a real app, this would fetch updated data from the server
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PayoutList;
