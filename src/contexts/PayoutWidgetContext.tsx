import React, { createContext, useContext, useState } from 'react';
import { toast } from "sonner";

export type PayoutMethod = 'Bank Transfer' | 'Cryptocurrency' | 'Digital Wallet' | 'Card Payment' | 'Prepaid Card' | 'Gift Card' | 'Advanced Payment' | 'Early Access' | null;
export type DetailOption = 'PayPal' | 'Venmo' | 'Payoneer' | 'Visa Prepaid' | 'Mastercard Prepaid' | 'Amazon' | 'Walmart' | 'Target' | null;
export type PayoutStatus = 'Completed' | 'Pending' | 'Awaiting Approval';
export type AdvanceTier = '70%' | '85%' | '100%' | null;

export interface PayoutRecord {
  id: string;
  amount: string;
  date: string;
  status: PayoutStatus;
  method: string;
  invoice: string;
  description: string;
}

export interface InvoiceData {
  id: string;
  invoice: string;
  date: string;
  amount: string;
  description: string;
  status: PayoutStatus;
  fileName?: string;
  isUploaded?: boolean;
}

interface PayoutWidgetContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  selectedMethod: PayoutMethod;
  setSelectedMethod: (method: PayoutMethod | null) => void;
  selectedDetailOption: DetailOption;
  setSelectedDetailOption: (option: DetailOption) => void;
  showMethodDetails: boolean;
  setShowMethodDetails: (show: boolean) => void;
  showSuccess: boolean;
  setShowSuccess: (show: boolean) => void;
  showDashboard: boolean;
  setShowDashboard: (show: boolean) => void;
  formData: Record<string, string>;
  setFormData: (data: Record<string, string>) => void;
  onboardingCompleted: boolean;
  setOnboardingCompleted: (completed: boolean) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  advancedPaymentStage: boolean;
  setAdvancedPaymentStage: (stage: boolean) => void;
  selectedAdvanceTier: AdvanceTier;
  setSelectedAdvanceTier: (tier: AdvanceTier) => void;
  earlyAccessActivated: boolean;
  setEarlyAccessActivated: (activated: boolean) => void;
  steps: string[];
  payouts: PayoutRecord[];
  isInvoiceUploadOpen: boolean;
  setIsInvoiceUploadOpen: (open: boolean) => void;
  isInvoiceDetailOpen: boolean;
  setIsInvoiceDetailOpen: (open: boolean) => void;
  selectedInvoice: InvoiceData | null;
  setSelectedInvoice: (invoice: InvoiceData | null) => void;
  uploadedInvoices: InvoiceData[];
  setUploadedInvoices: (invoices: InvoiceData[]) => void;
  handleNextStep: () => void;
  handleBackStep: () => void;
  handleSelectPayoutMethod: (method: PayoutMethod) => void;
  handleSelectDetailOption: (option: DetailOption) => void;
  handleFormChange: (field: string, value: string) => void;
  handleStartOnboarding: () => void;
  handleLogin: () => void;
  handleLogout: () => void;
  handleChangePayoutMethod: () => void;
  getStatusColor: (status: PayoutStatus) => string;
  handleUploadInvoice: (file: File) => void;
  handleViewInvoice: (invoice: InvoiceData) => void;
  handleDownloadInvoice: () => void;
}

const PayoutWidgetContext = createContext<PayoutWidgetContextType | undefined>(undefined);

export const usePayoutWidget = () => {
  const context = useContext(PayoutWidgetContext);
  if (!context) {
    throw new Error('usePayoutWidget must be used within a PayoutWidgetProvider');
  }
  return context;
};

export const PayoutWidgetProvider: React.FC<{ 
  children: React.ReactNode, 
  value?: { 
    selectedMethod: string | null, 
    setSelectedMethod: (method: string | null) => void,
    showDashboard?: boolean,
    setShowDashboard?: (show: boolean) => void,
    onboardingCompleted?: boolean,
    setOnboardingCompleted?: (completed: boolean) => void,
    handleNext?: () => void
  } 
}> = ({ children, value }) => {
  const steps = ['profile', 'payout', 'details', 'bank', 'tax'];
  
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState<PayoutMethod>(value?.selectedMethod as PayoutMethod || null);
  const [selectedDetailOption, setSelectedDetailOption] = useState<DetailOption>(null);
  const [showMethodDetails, setShowMethodDetails] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDashboard, setShowDashboard] = useState(value?.showDashboard || false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [onboardingCompleted, setOnboardingCompleted] = useState(value?.onboardingCompleted || false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [advancedPaymentStage, setAdvancedPaymentStage] = useState(false);
  const [selectedAdvanceTier, setSelectedAdvanceTier] = useState<AdvanceTier>(null);
  const [earlyAccessActivated, setEarlyAccessActivated] = useState(false);
  
  const [isInvoiceUploadOpen, setIsInvoiceUploadOpen] = useState(false);
  const [isInvoiceDetailOpen, setIsInvoiceDetailOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceData | null>(null);
  const [uploadedInvoices, setUploadedInvoices] = useState<InvoiceData[]>([]);
  
  React.useEffect(() => {
    if (value?.selectedMethod !== undefined) {
      setSelectedMethod(value.selectedMethod as PayoutMethod);
    }
    
    if (value?.showDashboard !== undefined) {
      setShowDashboard(value.showDashboard);
    }
    
    if (value?.onboardingCompleted !== undefined) {
      setOnboardingCompleted(value.onboardingCompleted);
    }
  }, [value?.selectedMethod, value?.showDashboard, value?.onboardingCompleted]);

  const payouts = [
    { 
      id: 'p1', 
      amount: '$1,250.00', 
      date: 'May 15, 2023', 
      status: 'Completed' as PayoutStatus, 
      method: 'Bank Transfer',
      invoice: 'INV-2023-05-01',
      description: 'April commission payment'
    },
    { 
      id: 'p2', 
      amount: '$890.75', 
      date: 'Jun 12, 2023', 
      status: 'Completed' as PayoutStatus, 
      method: 'Bank Transfer',
      invoice: 'INV-2023-06-01',
      description: 'May commission payment'
    },
    { 
      id: 'p3', 
      amount: '$1,475.50', 
      date: 'Jul 15, 2023', 
      status: 'Completed' as PayoutStatus, 
      method: 'Digital Wallet (PayPal)',
      invoice: 'INV-2023-07-01',
      description: 'June commission payment'
    },
    { 
      id: 'p4', 
      amount: '$2,100.00', 
      date: 'Aug 15, 2023', 
      status: 'Pending' as PayoutStatus, 
      method: 'Digital Wallet (PayPal)',
      invoice: 'INV-2023-08-01',
      description: 'July commission payment'
    },
    { 
      id: 'p5', 
      amount: '$1,890.25', 
      date: 'Sep 15, 2023', 
      status: 'Awaiting Approval' as PayoutStatus, 
      method: 'Digital Wallet (PayPal)',
      invoice: 'INV-2023-09-01',
      description: 'August commission payment'
    },
    { 
      id: 'p6', 
      amount: '$700.00', 
      date: 'Oct 5, 2023', 
      status: 'Completed' as PayoutStatus, 
      method: 'Advanced Payment (70%) - Visa Prepaid',
      invoice: 'INV-2023-10-01',
      description: 'September commission advance'
    },
    { 
      id: 'p7', 
      amount: '$1,200.00', 
      date: 'Oct 20, 2023', 
      status: 'Pending' as PayoutStatus, 
      method: 'Early Access - Mastercard Prepaid',
      invoice: 'INV-2023-10-02',
      description: 'October early payment'
    },
  ];

  const handleNextStep = () => {
    if (value?.handleNext) {
      value.handleNext();
      return;
    }
    
    if (steps[currentStep] === 'payout' && selectedMethod) {
      setCurrentStep(currentStep + 1);
    } 
    else if (steps[currentStep] === 'details') {
      if ((selectedMethod === 'Digital Wallet' || selectedMethod === 'Prepaid Card' || selectedMethod === 'Gift Card') 
          && !selectedDetailOption) {
        toast.error("Please select an option to continue", {
          description: `You need to select a specific ${selectedMethod.toLowerCase()} option.`
        });
        return;
      }
      
      if (selectedMethod === 'Bank Transfer' && steps.includes('bank')) {
        const bankStepIndex = steps.indexOf('bank');
        setCurrentStep(bankStepIndex);
      } 
      else {
        const nextStepIndex = currentStep + 1;
        if (nextStepIndex < steps.length) {
          setCurrentStep(nextStepIndex);
        } else {
          setShowDashboard(true);
          setOnboardingCompleted(true);
          toast.success("Payout successful!", {
            description: `Your funds will be sent via ${selectedMethod}${selectedDetailOption ? ` (${selectedDetailOption})` : ''}.`
          });
        }
      }
    }
    else if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowDashboard(true);
      setOnboardingCompleted(true);
      toast.success("Payout successful!", {
        description: `Your funds will be sent via ${selectedMethod}${selectedDetailOption ? ` (${selectedDetailOption})` : ''}.`
      });
    }
  };
  
  const handleBackStep = () => {
    if (showDashboard) {
      setShowDashboard(false);
      return;
    }
    
    if (advancedPaymentStage) {
      setAdvancedPaymentStage(false);
      return;
    }
    
    if (earlyAccessActivated) {
      setEarlyAccessActivated(false);
      return;
    }
    
    if (steps[currentStep] === 'details') {
      setSelectedMethod(null);
      setSelectedDetailOption(null);
      setCurrentStep(steps.indexOf('payout'));
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSelectPayoutMethod = (method: PayoutMethod) => {
    setSelectedMethod(method);
    setSelectedDetailOption(null);
    if (value?.setSelectedMethod) {
      value.setSelectedMethod(method);
    }
  };
  
  const handleSelectDetailOption = (option: DetailOption) => {
    setSelectedDetailOption(option);
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleStartOnboarding = () => {
    setCurrentStep(0);
    setOnboardingCompleted(false);
    setShowSuccess(false);
    setShowDashboard(false);
    setIsLoggedIn(true);
  };
  
  const handleLogin = () => {
    setIsLoggedIn(true);
    setOnboardingCompleted(true);
    setSelectedMethod('Digital Wallet');
    setSelectedDetailOption('PayPal');
    setShowDashboard(true);
    toast.success("Welcome back!", {
      description: "You've been logged in successfully."
    });
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setOnboardingCompleted(false);
    setShowDashboard(false);
    toast.info("You've been logged out", {
      description: "See you again soon!"
    });
  };
  
  const handleChangePayoutMethod = () => {
    setCurrentStep(steps.indexOf('payout'));
    setShowDashboard(false);
    setOnboardingCompleted(false);
    setShowSuccess(false);
  };
  
  const getStatusColor = (status: PayoutStatus) => {
    switch (status) {
      case 'Completed': return 'text-green-500';
      case 'Pending': return 'text-yellow-500';
      case 'Awaiting Approval': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  const handleUploadInvoice = (file: File) => {
    const newInvoice: InvoiceData = {
      id: `user-${Date.now()}`,
      invoice: `INV-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`,
      date: new Date().toLocaleDateString(),
      amount: '$0.00',
      description: file.name,
      status: 'Awaiting Approval',
      fileName: file.name,
      isUploaded: true
    };
    
    setUploadedInvoices([...uploadedInvoices, newInvoice]);
    setIsInvoiceUploadOpen(false);
    
    toast.success("Invoice uploaded successfully", {
      description: "Your invoice has been uploaded and is pending review."
    });
  };
  
  const handleViewInvoice = (invoice: InvoiceData) => {
    setSelectedInvoice(invoice);
    setIsInvoiceDetailOpen(true);
  };
  
  const handleDownloadInvoice = () => {
    toast.success("Invoice download started", {
      description: "Your invoice is being downloaded."
    });
  };

  const contextValue = {
    currentStep,
    setCurrentStep,
    selectedMethod,
    setSelectedMethod,
    selectedDetailOption,
    setSelectedDetailOption,
    showMethodDetails,
    setShowMethodDetails,
    showSuccess,
    setShowSuccess,
    showDashboard,
    setShowDashboard,
    formData,
    setFormData,
    onboardingCompleted,
    setOnboardingCompleted,
    isLoggedIn,
    setIsLoggedIn,
    advancedPaymentStage,
    setAdvancedPaymentStage,
    selectedAdvanceTier,
    setSelectedAdvanceTier,
    earlyAccessActivated,
    setEarlyAccessActivated,
    steps,
    payouts,
    isInvoiceUploadOpen,
    setIsInvoiceUploadOpen,
    isInvoiceDetailOpen,
    setIsInvoiceDetailOpen,
    selectedInvoice,
    setSelectedInvoice,
    uploadedInvoices,
    setUploadedInvoices,
    handleNextStep,
    handleBackStep,
    handleSelectPayoutMethod,
    handleSelectDetailOption,
    handleFormChange,
    handleStartOnboarding,
    handleLogin,
    handleLogout,
    handleChangePayoutMethod,
    getStatusColor,
    handleUploadInvoice,
    handleViewInvoice,
    handleDownloadInvoice,
  };

  return (
    <PayoutWidgetContext.Provider value={contextValue}>
      {children}
    </PayoutWidgetContext.Provider>
  );
};
