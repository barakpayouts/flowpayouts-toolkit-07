
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
        "flex items-start gap-2 group transition-all p-3 rounded-lg",
        "border border-white/10 hover:border-white/20 hover:bg-white/5",
        "cursor-pointer relative overflow-hidden",
        isSelected && "selected bg-white/10 border-white/20"
      )}
    >
      <div
        className="method-icon flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${config.accentColor}20, ${config.accentColor}40)`,
        }}
      >
        <Zap
          size={18}
          className={cn(
            "transition-all",
            isSelected ? "text-white" : "text-white/60"
          )}
          style={{
            color: isSelected ? config.accentColor : undefined,
          }}
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-medium text-sm truncate">Early Access Payment</h3>
          <ChevronRight 
            size={14} 
            className={cn(
              "transition-transform flex-shrink-0 ml-1",
              isSelected ? "rotate-90" : "group-hover:translate-x-1"
            )}
          />
        </div>

        <p className="text-xs text-white/70 mb-1 line-clamp-2">
          Access your funds 2-3 days before settlement
        </p>

        <div className="grid grid-cols-2 gap-1 text-xs">
          <div className="flex items-center gap-1 text-white/60">
            <Clock size={10} />
            <span className="truncate">Early Release</span>
          </div>
          <div className="flex items-center gap-1 text-white/60">
            <DollarSign size={10} />
            <span className="truncate">No Fees</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarlyAccess;
