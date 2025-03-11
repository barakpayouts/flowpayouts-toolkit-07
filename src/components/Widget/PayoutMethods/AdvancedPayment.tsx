
import React from 'react';
import { useWidgetConfig } from '@/hooks/use-widget-config';
import { PayoutMethodProps } from '@/hooks/use-widget-config';
import { Rocket, Clock, Shield, ChevronRight, FileText, Wallet } from 'lucide-react';
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
        "payout-method-card relative overflow-hidden",
        "flex items-start gap-4 group transition-all",
        isSelected && "selected",
        "border-2 border-white/20" // Add thicker border to make it stand out
      )}
      style={{
        background: isSelected 
          ? `linear-gradient(135deg, ${config.accentColor}30, ${config.accentColor}50)` 
          : `linear-gradient(135deg, ${config.accentColor}10, ${config.accentColor}30)`
      }}
    >
      {/* Premium badge */}
      <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-amber-300 text-black text-xs font-bold py-1 px-3 transform rotate-45 translate-x-[30%] translate-y-[-30%]">
        PREMIUM
      </div>

      <div
        className="method-icon"
        style={{
          background: `linear-gradient(135deg, ${config.accentColor}30, ${config.accentColor}50)`,
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
          <h3 className="font-medium text-lg">Advanced Payment</h3>
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

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1 text-white/60">
            <FileText size={12} />
            <span>Invoice Factoring</span>
          </div>
          <div className="flex items-center gap-1 text-white/60">
            <Wallet size={12} />
            <span>Direct Advances</span>
          </div>
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
