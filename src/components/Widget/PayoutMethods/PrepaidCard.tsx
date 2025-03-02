
import React, { useState } from 'react';
import { Check, CreditCard } from 'lucide-react';
import { useWidgetConfig } from '@/hooks/use-widget-config';

interface PrepaidCardProps {
  onSelect: () => void;
}

const PrepaidCard: React.FC<PrepaidCardProps> = ({ onSelect }) => {
  const [selected, setSelected] = useState(false);
  const { config } = useWidgetConfig();
  
  const handleSelect = () => {
    setSelected(true);
    onSelect();
  };
  
  return (
    <div 
      className={`payout-method-card group ${selected ? 'selected' : ''}`}
      onClick={handleSelect}
      style={{
        borderRadius: `${config.borderRadius}px`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: selected ? 'scale(1.02)' : 'scale(1)',
        boxShadow: selected 
          ? `0 8px 20px -4px ${config.accentColor}30` 
          : '0 2px 10px rgba(0, 0, 0, 0.1)',
        background: selected ? `linear-gradient(145deg, ${config.backgroundColor}, ${config.backgroundColor}ee)` : '',
        border: selected ? `1px solid ${config.accentColor}50` : '1px solid transparent',
      }}
    >
      <div className="flex items-center">
        <div 
          className="method-icon relative overflow-hidden"
          style={{
            backgroundColor: `${selected ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.1)'}`,
            transition: 'all 0.3s ease',
            transform: `${selected ? 'scale(1.1)' : 'scale(1)'}`
          }}
        >
          <CreditCard 
            size={18} 
            className="text-current relative z-10 transition-transform group-hover:scale-110" 
            style={{ 
              color: config.accentColor,
              filter: selected ? 'drop-shadow(0 0 5px ' + config.accentColor + '70)' : 'none',
              transition: 'all 0.3s ease',
            }}
          />
          <div 
            className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-30 transition-opacity duration-300"
            style={{ 
              background: `linear-gradient(135deg, ${config.accentColor}40, transparent)`,
            }}
          />
        </div>
        <div className="flex-1">
          <h3 className="font-medium transition-all duration-300 group-hover:translate-x-0.5">Prepaid Card</h3>
          <p className="text-sm opacity-70 transition-all duration-300 group-hover:translate-x-0.5">1-2 business days</p>
        </div>
        {selected ? (
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
              justifyContent: 'center',
              boxShadow: `0 2px 8px ${config.accentColor}50`,
              animation: 'pulse 1.5s infinite ease-in-out',
            }}
          >
            <Check size={16} className="animate-scale-in" />
          </div>
        ) : (
          <div 
            className="w-6 h-6 rounded-full border-2 border-white/20 opacity-60 group-hover:opacity-100 transition-all duration-300"
            style={{
              borderColor: `${config.accentColor}50`,
              boxShadow: `0 0 0 0 ${config.accentColor}00`,
              transition: 'all 0.3s ease',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PrepaidCard;
