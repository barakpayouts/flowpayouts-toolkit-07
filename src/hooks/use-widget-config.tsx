
import { create } from 'zustand';

export type RecipientType = 'vendor' | 'insured' | 'individual' | 'business' | 'contractor';
export type VerificationStep = 'profile' | 'bank' | 'tax' | 'kyc' | 'payout';
export type PayoutMethod = 'bank' | 'crypto' | 'digital' | 'card' | 'prepaid' | 'gift' | 'advanced' | 'early';
export type ButtonStyle = 'rounded' | 'square' | 'pill';
export type BankVerificationMethod = 'plaid' | 'statement' | 'microdeposit';
export type TaxFormType = 'w9' | 'w8';
export type KYCDocumentType = 'passport' | 'id' | 'driver_license';

export interface PayoutMethodProps {
  onSelect: () => void;
  isSelected?: boolean;
}

interface AdvancedPaymentTier {
  percentage: number;
  fee: number;
  minDays: number;
}

interface AdvancedPaymentConfig {
  enabled: boolean;
  tiers: AdvancedPaymentTier[];
  maxAmount: number;
  requiresApproval: boolean;
  eligibilityCriteria: {
    minTransactions: number;
    minAccountAge: number;
    goodStanding: boolean;
  };
}

interface EarlyAccessConfig {
  enabled: boolean;
  expeditedDays: number;
  minimumAmount: number;
  noFees: boolean;
}

interface WidgetConfig {
  recipientType: RecipientType;
  steps: VerificationStep[];
  payoutMethods: PayoutMethod[];
  showProgressBar: boolean;
  showStepNumbers: boolean;
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  borderRadius: number;
  buttonStyle: ButtonStyle;
  advancedPayment: AdvancedPaymentConfig;
  earlyAccess: EarlyAccessConfig;
}

interface WidgetConfigState {
  config: WidgetConfig;
  setRecipientType: (type: RecipientType) => void;
  toggleStep: (step: VerificationStep) => void;
  togglePayoutMethod: (method: PayoutMethod) => void;
  updateConfig: (updates: Partial<WidgetConfig>) => void;
  setPayoutsOnlyMode: (enabled: boolean) => void;
  resetConfig: () => void;
}

const DEFAULT_PRIMARY_COLOR = '#0f2a35';
const DEFAULT_ACCENT_COLOR = '#d0e92a';
const DEFAULT_BACKGROUND_COLOR = '#143745';
const DEFAULT_TEXT_COLOR = '#ffffff';
const DEFAULT_BORDER_COLOR = '#21404d';

const defaultConfig: WidgetConfig = {
  recipientType: 'vendor',
  // Remove bank from initial steps - it will be added dynamically when needed
  steps: ['profile', 'kyc', 'tax', 'payout'],
  payoutMethods: ['bank', 'crypto', 'digital', 'card', 'prepaid', 'gift', 'advanced', 'early'],
  showProgressBar: true,
  showStepNumbers: true,
  primaryColor: DEFAULT_PRIMARY_COLOR,
  accentColor: DEFAULT_ACCENT_COLOR,
  backgroundColor: DEFAULT_BACKGROUND_COLOR,
  textColor: DEFAULT_TEXT_COLOR,
  borderColor: DEFAULT_BORDER_COLOR,
  borderRadius: 8,
  buttonStyle: 'rounded',
  advancedPayment: {
    enabled: true,
    tiers: [
      { percentage: 70, fee: 1, minDays: 1 },
      { percentage: 85, fee: 2, minDays: 0 },
      { percentage: 100, fee: 3, minDays: 0 },
    ],
    maxAmount: 50000,
    requiresApproval: true,
    eligibilityCriteria: {
      minTransactions: 3,
      minAccountAge: 30,
      goodStanding: true,
    },
  },
  earlyAccess: {
    enabled: true,
    expeditedDays: 3,
    minimumAmount: 100,
    noFees: true
  }
};

export const useWidgetConfig = create<WidgetConfigState>((set) => ({
  config: defaultConfig,
  
  setRecipientType: (type: RecipientType) => 
    set((state) => ({ 
      config: { ...state.config, recipientType: type } 
    })),
  
  toggleStep: (step: VerificationStep) => 
    set((state) => {
      const steps = state.config.steps.includes(step)
        ? state.config.steps.filter(s => s !== step)
        : [...state.config.steps, step];
      return { config: { ...state.config, steps } };
    }),
  
  togglePayoutMethod: (method: PayoutMethod) => 
    set((state) => {
      const payoutMethods = state.config.payoutMethods.includes(method)
        ? state.config.payoutMethods.filter(m => m !== method)
        : [...state.config.payoutMethods, method];
      return { config: { ...state.config, payoutMethods } };
    }),
  
  updateConfig: (updates: Partial<WidgetConfig>) => {
    console.log("useWidgetConfig: Updating config with", updates);
    
    return set((state) => {
      const newConfig = { 
        ...state.config, 
        ...updates 
      };
      
      console.log("New widget config:", newConfig);
      return { config: newConfig };
    });
  },
  
  setPayoutsOnlyMode: (enabled: boolean) => 
    set((state) => ({
      config: { 
        ...state.config, 
        steps: enabled ? [] : defaultConfig.steps 
      }
    })),
  
  resetConfig: () => set({ config: defaultConfig }),
}));
