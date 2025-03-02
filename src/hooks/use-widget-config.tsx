
import { useState, useCallback, useEffect } from 'react';

export type PayoutMethod = 'bank' | 'crypto' | 'digital' | 'card' | 'prepaid' | 'gift';
export type VerificationStep = 'profile' | 'bank' | 'tax';
export type BankVerificationMethod = 'plaid' | 'statement' | 'microdeposit';
export type TaxFormType = 'w9' | 'w8';
export type RecipientType = 'vendor' | 'insured' | 'individual' | 'business' | 'contractor';

export interface WidgetConfig {
  // Functionality Options
  steps: VerificationStep[];
  payoutMethods: PayoutMethod[];
  recipientType: RecipientType;
  
  // Brand Customization
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  
  // Brand Identity
  companyName: string;
  logoUrl: string;
  
  // UI Customization
  borderRadius: number;
  buttonStyle: 'rounded' | 'square' | 'pill';
  fontFamily: string;
  
  // Advanced Options
  showProgressBar: boolean;
  showStepNumbers: boolean;
  allowSkipSteps: boolean;
}

const defaultConfig: WidgetConfig = {
  // Functionality Options
  steps: ['profile', 'bank', 'tax'],
  payoutMethods: ['bank', 'crypto', 'digital', 'card', 'prepaid', 'gift'],
  recipientType: 'individual',
  
  // Brand Customization (Default: Payouts.com)
  primaryColor: '#0f2a35',
  accentColor: '#d0e92a',
  backgroundColor: '#143745',
  textColor: '#ffffff',
  borderColor: '#21404d',
  
  // Brand Identity
  companyName: 'Payouts.com',
  logoUrl: 'https://payouts.com/wp-content/uploads/2024/02/Payoutscom-logo-light.svg',
  
  // UI Customization
  borderRadius: 8,
  buttonStyle: 'rounded',
  fontFamily: 'Inter, sans-serif',
  
  // Advanced Options
  showProgressBar: true,
  showStepNumbers: true,
  allowSkipSteps: false,
};

export const useWidgetConfig = (initialConfig?: Partial<WidgetConfig>) => {
  const [config, setConfig] = useState<WidgetConfig>({
    ...defaultConfig,
    ...initialConfig
  });
  
  const updateConfig = useCallback((updates: Partial<WidgetConfig>) => {
    setConfig(prev => ({
      ...prev,
      ...updates
    }));
  }, []);
  
  // Toggle a step's inclusion
  const toggleStep = useCallback((step: VerificationStep) => {
    setConfig(prev => {
      if (prev.steps.includes(step)) {
        return {
          ...prev,
          steps: prev.steps.filter(s => s !== step)
        };
      } else {
        return {
          ...prev,
          steps: [...prev.steps, step].sort((a, b) => {
            const order: Record<VerificationStep, number> = {
              profile: 0,
              bank: 1,
              tax: 2
            };
            return order[a] - order[b];
          })
        };
      }
    });
  }, []);
  
  // Set to payouts-only mode (empty steps array)
  const setPayoutsOnlyMode = useCallback((enabled: boolean) => {
    setConfig(prev => ({
      ...prev,
      steps: enabled ? [] : defaultConfig.steps
    }));
  }, []);
  
  // Toggle a payout method's inclusion
  const togglePayoutMethod = useCallback((method: PayoutMethod) => {
    setConfig(prev => {
      if (prev.payoutMethods.includes(method)) {
        return {
          ...prev,
          payoutMethods: prev.payoutMethods.filter(m => m !== method)
        };
      } else {
        return {
          ...prev,
          payoutMethods: [...prev.payoutMethods, method]
        };
      }
    });
  }, []);
  
  // Set recipient type
  const setRecipientType = useCallback((type: RecipientType) => {
    setConfig(prev => {
      // If in payouts-only mode, don't adjust steps
      if (prev.steps.length === 0) {
        return {
          ...prev,
          recipientType: type
        };
      }
      
      // Adjust steps based on recipient type
      let updatedSteps = [...prev.steps];
      
      if (type === 'vendor' || type === 'business' || type === 'contractor') {
        // These types require tax information
        if (!updatedSteps.includes('tax')) {
          updatedSteps.push('tax');
        }
      }
      
      return {
        ...prev,
        recipientType: type,
        steps: updatedSteps.sort((a, b) => {
          const order: Record<VerificationStep, number> = {
            profile: 0,
            bank: 1,
            tax: 2
          };
          return order[a] - order[b];
        })
      };
    });
  }, []);
  
  // Generate CSS variables for the widget based on current config
  const getCssVariables = useCallback(() => {
    return {
      '--widget-primary': config.primaryColor,
      '--widget-accent': config.accentColor,
      '--widget-background': config.backgroundColor,
      '--widget-text': config.textColor,
      '--widget-border': config.borderColor,
      '--widget-border-radius': `${config.borderRadius}px`,
      '--widget-font-family': config.fontFamily,
    } as React.CSSProperties;
  }, [config]);
  
  // Reset config to defaults
  const resetConfig = useCallback(() => {
    setConfig(defaultConfig);
  }, []);
  
  // Load stored config from localStorage on mount
  useEffect(() => {
    const storedConfig = localStorage.getItem('widgetConfig');
    if (storedConfig) {
      try {
        setConfig(JSON.parse(storedConfig));
      } catch (error) {
        console.error('Failed to parse stored widget config', error);
      }
    }
  }, []);
  
  // Save config to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('widgetConfig', JSON.stringify(config));
  }, [config]);
  
  return {
    config,
    updateConfig,
    toggleStep,
    togglePayoutMethod,
    setRecipientType,
    setPayoutsOnlyMode,
    getCssVariables,
    resetConfig
  };
};
