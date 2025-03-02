
import React from 'react';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWidgetConfig } from '@/hooks/use-widget-config';

interface VerificationLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  onBack: () => void;
  onNext: () => void;
  isLastStep: boolean;
  isComplete?: boolean;
  isAuthorized?: boolean;
  setIsAuthorized?: (value: boolean) => void;
  disableNext?: boolean;
}

const VerificationLayout: React.FC<VerificationLayoutProps> = ({
  children,
  title,
  description,
  onBack,
  onNext,
  isLastStep,
  isComplete = false,
  isAuthorized = false,
  setIsAuthorized,
  disableNext = false,
}) => {
  const { config } = useWidgetConfig();

  return (
    <div className="py-5">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        {description && <p className="text-white/70">{description}</p>}
      </div>
      
      {children}
      
      <div className="mt-6 bg-white/5 backdrop-blur-md p-5 rounded-xl border border-white/10">
        {setIsAuthorized && (
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <input
                id="authorize"
                type="checkbox"
                checked={isAuthorized}
                onChange={() => setIsAuthorized(!isAuthorized)}
                className="w-4 h-4 opacity-0 absolute"
              />
              <div 
                className={cn(
                  "w-5 h-5 rounded border flex items-center justify-center transition-all",
                  isAuthorized 
                    ? "bg-gradient-to-r border-0" 
                    : "bg-white/5 border-white/20"
                )}
                style={{
                  background: isAuthorized 
                    ? `linear-gradient(to right, ${config.accentColor}, ${config.accentColor}DD)` 
                    : undefined,
                }}
              >
                {isAuthorized && <Lock size={12} className="text-payouts-dark" />}
              </div>
            </div>
            <label 
              htmlFor="authorize"
              className="text-sm font-medium leading-none cursor-pointer"
            >
              I authorize the verification of my bank account
            </label>
          </div>
        )}
        
        <div className="flex items-center gap-3 bg-white/5 p-4 rounded-lg mb-5">
          <Lock 
            size={18} 
            style={{ color: config.accentColor }} 
          />
          <p className="text-xs text-white/80">
            Your information is protected with bank-level encryption and will be used solely for verification purposes
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button
            onClick={onBack}
            variant="glass"
            size="default"
            className="flex-1"
          >
            Back
          </Button>
          <Button
            onClick={onNext}
            variant="glow"
            size="default"
            disabled={disableNext}
            className="flex-1"
            style={{
              background: `linear-gradient(to right, ${config.accentColor}, ${config.accentColor}DD)`,
              color: config.primaryColor,
              boxShadow: `0 4px 15px ${config.accentColor}40`,
            }}
          >
            {isLastStep ? 'Complete' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerificationLayout;
