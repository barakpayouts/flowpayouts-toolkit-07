
import React, { useState } from 'react';
import { Bitcoin, Check } from 'lucide-react';
import { useWidgetConfig } from '@/hooks/use-widget-config';

interface CryptocurrencyProps {
  onSelect: () => void;
}

const Cryptocurrency: React.FC<CryptocurrencyProps> = ({ onSelect }) => {
  const [selected, setSelected] = useState(false);
  const { config } = useWidgetConfig();
  
  const handleSelect = () => {
    setSelected(true);
    onSelect();
  };
  
  return (
    <div 
      className="payout-method-card p-4 cursor-pointer border border-white/20 hover:bg-white/10 transition-colors flex items-center justify-between"
      onClick={handleSelect}
      style={{
        borderRadius: `${config.borderRadius}px`,
        backgroundColor: selected ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
        borderColor: selected ? config.accentColor : 'rgba(255, 255, 255, 0.2)',
      }}
    >
      <div className="flex items-center gap-3">
        <div 
          className="method-icon w-10 h-10 rounded-full flex items-center justify-center"
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: config.accentColor 
          }}
        >
          <Bitcoin size={20} />
        </div>
        <div>
          <h3 className="font-medium text-base">Cryptocurrency</h3>
          <p className="text-sm opacity-70">Instant transfer</p>
        </div>
      </div>
      {selected && (
        <div 
          className="selected-indicator w-6 h-6 flex items-center justify-center rounded-full"
          style={{ 
            backgroundColor: config.accentColor,
            color: config.primaryColor,
          }}
        >
          <Check size={16} />
        </div>
      )}
    </div>
  );
};

export default Cryptocurrency;
