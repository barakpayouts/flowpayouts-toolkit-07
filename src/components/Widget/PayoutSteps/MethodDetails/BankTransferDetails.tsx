
import React, { useState } from 'react';
import { usePayoutWidget } from '@/contexts/PayoutWidgetContext';
import { toast } from "sonner";
import { ArrowLeft, ExternalLink } from 'lucide-react';

interface BankTransferDetailsProps {
  onBack: () => void;
}

const BankTransferDetails: React.FC<BankTransferDetailsProps> = ({ onBack }) => {
  const { colorScheme } = usePayoutWidget();
  const [isLoading, setIsLoading] = useState(true);
  
  // Handle iframe load event
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="p-4 rounded-lg bg-white/10 border border-white/20">
      <h3 className="text-xl mb-4 flex items-center justify-between">
        <span>Bank Transfer Details</span>
        <a 
          href="https://airwallex-payout-nq98.replit.app/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm flex items-center gap-1 text-white/70 hover:text-white transition-colors"
        >
          <ExternalLink size={14} />
          Open in new tab
        </a>
      </h3>
      
      {isLoading && (
        <div className="flex flex-col justify-center items-center py-10 gap-4 absolute inset-0 bg-black/50 rounded-lg z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          <p className="text-white/70">Loading bank details form...</p>
        </div>
      )}
      
      <div className="relative min-h-[450px] bg-white/5 rounded-lg overflow-hidden">
        <iframe
          src="https://airwallex-payout-nq98.replit.app/"
          title="Airwallex Payout Widget"
          className="w-full h-[450px] border-0"
          onLoad={handleIframeLoad}
          style={{ 
            background: colorScheme?.backgroundColor || '#143745',
            color: colorScheme?.textColor || '#ffffff'
          }}
          allow="clipboard-write"
        />
      </div>
      
      <div className="flex justify-between mt-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm bg-white/10 px-4 py-2 rounded hover:bg-white/20 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to methods
        </button>
      </div>
    </div>
  );
};

export default BankTransferDetails;
