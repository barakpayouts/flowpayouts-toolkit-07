
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
        "flex items-start gap-3 md:gap-4 group transition-all p-3 md:p-4 rounded-lg",
        "border border-white/10 hover:border-white/20 hover:bg-white/5",
        "cursor-pointer relative overflow-hidden",
        isSelected && "selected bg-white/10 border-white/20"
      )}
    >
      <div
        className="method-icon flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${config.accentColor}20, ${config.accentColor}40)`,
        }}
      >
        <Zap
          size={20}
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
          <h3 className="font-medium text-sm md:text-base truncate">Early Access Payment</h3>
          <ChevronRight 
            size={16} 
            className={cn(
              "transition-transform flex-shrink-0 ml-2",
              isSelected ? "rotate-90" : "group-hover:translate-x-1"
            )}
          />
        </div>

        <p className="text-xs md:text-sm text-white/70 mb-2 md:mb-3 line-clamp-2">
          Access your funds 2-3 days before settlement
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-2 text-xs">
          <div className="flex items-center gap-1 text-white/60">
            <Clock size={12} />
            <span className="truncate">Early Release</span>
          </div>
          <div className="flex items-center gap-1 text-white/60">
            <DollarSign size={12} />
            <span className="truncate">No Fees</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarlyAccess;
