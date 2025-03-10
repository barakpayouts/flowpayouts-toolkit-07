
import React from 'react';
import { useWidgetConfig } from '@/hooks/use-widget-config';
import { PayoutMethodProps } from '@/hooks/use-widget-config';
import { Rocket, Clock, Shield, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const AdvancedPayment: React.FC<PayoutMethodProps> = ({ onSelect, isSelected }) => {
  const { config } = useWidgetConfig();
  const { advancedPayment } = config;

  if (!advancedPayment.enabled) return null;

  const maxPercentage = Math.max(...advancedPayment.tiers.map(tier => tier.percentage));

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
        <Rocket
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
          <h3 className="font-medium">Advanced Payment</h3>
          <ChevronRight 
            size={16} 
            className={cn(
              "transition-transform",
              isSelected ? "rotate-90" : "group-hover:translate-x-1"
            )}
          />
        </div>

        <p className="text-sm text-white/70 mb-3">
          Get up to {maxPercentage}% of your funds instantly
        </p>

        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="flex items-center gap-1 text-white/60">
            <Clock size={12} />
            <span>Instant Access</span>
          </div>
          <div className="flex items-center gap-1 text-white/60">
            <Shield size={12} />
            <span>Secure Process</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedPayment;
