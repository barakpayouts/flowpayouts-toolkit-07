
import React from 'react';
import { useWidgetConfig } from '@/hooks/use-widget-config';
import { PayoutMethodProps } from '@/hooks/use-widget-config';
import { Zap, Clock, DollarSign, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const EarlyAccess: React.FC<PayoutMethodProps> = ({ onSelect, isSelected }) => {
  const { config } = useWidgetConfig();
  
  return (
    <div
      onClick={onSelect}
      className={cn(
        "payout-method-card",
        "flex items-start gap-4 group transition-all",
        isSelected && "selected"
      )}
    >
      <div
        className="method-icon"
        style={{
          background: `linear-gradient(135deg, ${config.accentColor}20, ${config.accentColor}40)`,
        }}
      >
        <Zap
          className={cn(
            "transition-all",
            isSelected ? "text-white" : "text-white/60"
          )}
          style={{
            color: isSelected ? config.accentColor : undefined,
          }}
        />
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-medium">Early Access Payment</h3>
          <ChevronRight 
            size={16} 
            className={cn(
              "transition-transform",
              isSelected ? "rotate-90" : "group-hover:translate-x-1"
            )}
          />
        </div>

        <p className="text-sm text-white/70 mb-3">
          Access your funds 2-3 days before settlement
        </p>

        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="flex items-center gap-1 text-white/60">
            <Clock size={12} />
            <span>Early Release</span>
          </div>
          <div className="flex items-center gap-1 text-white/60">
            <DollarSign size={12} />
            <span>No Fees</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarlyAccess;
