
import React, { useState } from 'react';
import { Check, Wallet } from 'lucide-react';
import { useWidgetConfig } from '@/hooks/use-widget-config';

interface DigitalWalletProps {
  onSelect: () => void;
}

const DigitalWallet: React.FC<DigitalWalletProps> = ({ onSelect }) => {
  const [selected, setSelected] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { config } = useWidgetConfig();
  
  const handleSelect = () => {
    setSelected(true);
    onSelect();
  };
  
  return (
    <div 
      className={`payout-method-card group ${selected ? 'selected' : ''}`}
      onClick={handleSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: `${config.borderRadius}px`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: selected ? 'scale(1.02)' : hovered ? 'scale(1.01)' : 'scale(1)',
        boxShadow: selected 
          ? `0 10px 25px -4px ${config.accentColor}40` 
          : hovered
            ? '0 6px 15px rgba(0, 0, 0, 0.15)'
            : '0 2px 10px rgba(0, 0, 0, 0.1)',
        background: selected 
          ? `linear-gradient(145deg, ${config.backgroundColor}ee, ${config.backgroundColor}aa)`
          : hovered
            ? `linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))`
            : 'rgba(255, 255, 255, 0.05)',
        border: selected 
          ? `1px solid ${config.accentColor}50` 
          : hovered
            ? '1px solid rgba(255, 255, 255, 0.15)'
            : '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <div className="flex items-center">
        <div 
          className="method-icon relative overflow-hidden"
          style={{
            backgroundColor: selected 
              ? `${config.accentColor}30` 
              : hovered
                ? 'rgba(255, 255, 255, 0.12)'
                : 'rgba(255, 255, 255, 0.1)',
            transition: 'all 0.3s ease',
            transform: selected ? 'scale(1.1)' : 'scale(1)',
            borderRadius: '10px',
          }}
        >
          <Wallet 
            size={18} 
            className="text-current relative z-10 transition-all duration-300 group-hover:scale-110" 
            style={{ 
              color: config.accentColor,
              filter: selected ? `drop-shadow(0 0 5px ${config.accentColor}70)` : 'none',
              transition: 'all 0.3s ease',
            }}
          />
          <div 
            className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-30 transition-opacity duration-300"
            style={{ 
              background: `linear-gradient(135deg, ${config.accentColor}50, transparent)`,
            }}
          />
        </div>
        <div className="flex-1 pl-2">
          <h3 className="font-medium transition-all duration-200 group-hover:translate-x-0.5 mb-0.5">Digital Wallet</h3>
          <p className="text-sm opacity-70 transition-all duration-200 group-hover:translate-x-0.5">Instant transfer</p>
        </div>
        {selected ? (
          <div 
            className="selected-indicator animate-fade-in"
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
            <Check size={16} strokeWidth={3} className="animate-scale-in" />
          </div>
        ) : (
          <div 
            className="w-6 h-6 rounded-full border-2 border-white/20 opacity-60 group-hover:opacity-100 transition-all duration-300"
            style={{
              borderColor: `${config.accentColor}50`,
              boxShadow: hovered ? `0 0 0 2px ${config.accentColor}20` : 'none',
              transition: 'all 0.3s ease',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DigitalWallet;
