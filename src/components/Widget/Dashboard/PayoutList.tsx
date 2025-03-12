
import React, { useState } from 'react';
import { useWidgetConfig } from '@/hooks/use-widget-config';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import UploadInvoice from './UploadInvoice';

interface Invoice {
  id: string;
  description: string;
  date: string;
  amount: string;
  status: 'Completed' | 'Pending' | 'Awaiting Approval';
}

const invoices: Invoice[] = [
  {
    id: 'INV-2023-05-01',
    description: 'April commission payment',
    date: 'May 15, 2023',
    amount: '$1,250.00',
    status: 'Completed'
  },
  {
    id: 'INV-2023-06-01',
    description: 'May commission payment',
    date: 'Jun 12, 2023',
    amount: '$890.75',
    status: 'Completed'
  },
  {
    id: 'INV-2023-07-01',
    description: 'June commission payment',
    date: 'Jul 15, 2023',
    amount: '$1,475.50',
    status: 'Completed'
  },
  {
    id: 'INV-2023-08-01',
    description: 'July commission payment',
    date: 'Aug 15, 2023',
    amount: '$2,100.00',
    status: 'Pending'
  },
  {
    id: 'INV-2023-09-01',
    description: 'August commission payment',
    date: 'Sep 15, 2023',
    amount: '$1,890.25',
    status: 'Awaiting Approval'
  }
];

const PayoutList = () => {
  const { config } = useWidgetConfig();
  const [showUploadModal, setShowUploadModal] = useState(false);
  
  return (
    <div className="space-y-4">
      {/* Upload Invoice Button - Always visible */}
      <div className="invoice-upload-container">
        <Button 
          onClick={() => setShowUploadModal(true)}
          className="upload-invoice-button dashboard-action-button"
          variant="outline"
          style={{
            color: config.accentColor,
            borderColor: `${config.accentColor}50`
          }}
        >
          <Upload size={16} />
          Upload Invoice
        </Button>
      </div>
      
      {/* Invoice Upload Modal */}
      {showUploadModal && (
        <UploadInvoice 
          onClose={() => setShowUploadModal(false)} 
        />
      )}
      
      {/* Invoice List */}
      <div className="space-y-3">
        {invoices.map((invoice) => (
          <div 
            key={invoice.id}
            className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-white/70">{invoice.id}</p>
                <h3 className="text-base font-medium mt-1">{invoice.description}</h3>
                <p className="text-sm text-white/60 mt-1">{invoice.date}</p>
              </div>
              <div className="text-right">
                <p className="text-base font-semibold" style={{ color: config.accentColor }}>
                  {invoice.amount}
                </p>
                <span 
                  className={`text-xs font-medium px-2 py-1 rounded-full mt-1 inline-block
                    ${invoice.status === 'Completed' ? 'bg-green-500/20 text-green-400' : 
                      invoice.status === 'Pending' ? 'bg-blue-500/20 text-blue-400' : 
                        'bg-yellow-500/20 text-yellow-400'}`}
                >
                  {invoice.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PayoutList;
