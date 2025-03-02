
import React, { useState } from 'react';
import { Building, Check } from 'lucide-react';
import { useWidgetConfig } from '@/hooks/use-widget-config';

interface BankTransferProps {
  onSelect: () => void;
}

const BankTransfer: React.FC<BankTransferProps> = ({ onSelect }) => {
  const [selected, setSelected] = useState(false);
  const { config } = useWidgetConfig();
  
  const handleSelect = () => {
    setSelected(true);
    onSelect();
  };
  
  return (
    <div 
      className={`payout-method-card ${selected ? 'selected' : ''}`}
      onClick={handleSelect}
      style={{
        borderRadius: `${config.borderRadius}px`,
      }}
    >
      <div className="flex items-center">
        <div className="method-icon">
          <Building size={20} />
        </div>
        <div className="flex-1">
          <h3 className="font-medium">Bank Transfer</h3>
          <p className="text-sm opacity-70">2-3 business days</p>
        </div>
        {selected && (
          <div 
            className="selected-indicator"
            style={{ 
              backgroundColor: config.accentColor,
              color: config.primaryColor,
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Check size={16} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BankTransfer;
