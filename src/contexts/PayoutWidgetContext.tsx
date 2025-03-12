import React, { createContext, useContext, useState } from 'react';
import { toast } from "sonner";
import { Notification } from "@/components/Widget/Dashboard/Notifications/NotificationsPanel";

export type PayoutMethod = 'Bank Transfer' | 'Cryptocurrency' | 'Digital Wallet' | 'Card Payment' | 'Prepaid Card' | 'Gift Card' | 'Advanced Payment' | null;
export type DetailOption = 'PayPal' | 'Venmo' | 'Payoneer' | 'Visa Prepaid' | 'Mastercard Prepaid' | 'Amazon' | 'Walmart' | 'Target' | null;
export type PayoutStatus = 'Completed' | 'Pending' | 'Awaiting Approval';
export type AdvanceTier = '70%' | '85%' | '100%' | null;
export type AdvanceType = 'invoice' | 'direct' | null;

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
  method?: string;
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
  advanceType: AdvanceType;
  setAdvanceType: (type: AdvanceType) => void;
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
  prepaidCardEmail: string;
  setPrepaidCardEmail: (email: string) => void;
  companyName: string;
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
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
    handleNext?: () => void,
    isLoggedIn?: boolean,
    setIsLoggedIn?: (loggedIn: boolean) => void,
    advancedPaymentStage?: boolean,
    setAdvancedPaymentStage?: (stage: boolean) => void,
    selectedAdvanceTier?: string | null,
    setSelectedAdvanceTier?: (tier: string | null) => void,
    handleLogin?: () => void,
    handleStartOnboarding?: () => void,
    prepaidCardEmail?: string,
    setPrepaidCardEmail?: (email: string) => void,
    advanceType?: AdvanceType,
    setAdvanceType?: (type: AdvanceType) => void,
    companyName?: string,
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
  const [isLoggedIn, setIsLoggedIn] = useState(value?.isLoggedIn || false);
  const [prepaidCardEmail, setPrepaidCardEmail] = useState(value?.prepaidCardEmail || "");
  const [companyName, setCompanyName] = useState(value?.companyName || "Acme Inc.");
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Welcome to the Dashboard",
      message: "You can manage all your payment methods and transactions here.",
      date: "3/12/2025 • 12:03:21 PM",
      read: false
    },
    {
      id: "2",
      title: "New Team Features Available",
      message: "You can now invite team members to help manage your payments.",
      date: "3/12/2025 • 12:03:21 PM",
      read: false
    }
  ]);

  const [advancedPaymentStage, setAdvancedPaymentStage] = useState(value?.advancedPaymentStage || false);
  const [selectedAdvanceTier, setSelectedAdvanceTier] = useState<AdvanceTier>(value?.selectedAdvanceTier as AdvanceTier || null);
  const [advanceType, setAdvanceType] = useState<AdvanceType>(value?.advanceType || null);
  
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
    
    if (value?.isLoggedIn !== undefined) {
      setIsLoggedIn(value.isLoggedIn);
    }
    
    if (value?.advancedPaymentStage !== undefined) {
      setAdvancedPaymentStage(value.advancedPaymentStage);
    }
    
    if (value?.selectedAdvanceTier !== undefined) {
      setSelectedAdvanceTier(value.selectedAdvanceTier as AdvanceTier);
    }
    
    if (value?.prepaidCardEmail !== undefined) {
      setPrepaidCardEmail(value.prepaidCardEmail);
    }
    
    if (value?.advanceType !== undefined) {
      setAdvanceType(value.advanceType);
    }
    
    if (value?.companyName !== undefined) {
      setCompanyName(value.companyName);
    }
  }, [
    value?.selectedMethod, 
    value?.showDashboard, 
    value?.onboardingCompleted,
    value?.isLoggedIn,
    value?.advancedPaymentStage,
    value?.selectedAdvanceTier,
    value?.prepaidCardEmail,
    value?.advanceType,
    value?.companyName
  ]);

  const payouts = [
    { 
      id: 'p1', 
      amount: '$875.00', 
      date: 'Jan 15, 2024', 
      status: 'Completed' as PayoutStatus, 
      method: 'Advanced Payment (70%) - Invoice Factoring',
      invoice: 'INV-2024-01-01',
      description: 'Invoice factoring advance'
    },
    { 
      id: 'p2', 
      amount: '$1,062.50', 
      date: 'Feb 1, 2024', 
      status: 'Completed' as PayoutStatus, 
      method: 'Advanced Payment (85%) - Direct Advance',
      invoice: 'INV-2024-02-01',
      description: 'Direct advance on upcoming payout'
    },
    { 
      id: 'p3', 
      amount: '$1,250.00', 
      date: 'Feb 15, 2024', 
      status: 'Completed' as PayoutStatus, 
      method: 'Bank Transfer',
      invoice: 'INV-2024-02-15',
      description: 'January commission payment'
    },
    { 
      id: 'p4', 
      amount: '$1,475.50', 
      date: 'Mar 1, 2024', 
      status: 'Pending' as PayoutStatus, 
      method: 'Advanced Payment (70%) - Invoice Factoring',
      invoice: 'INV-2024-03-01',
      description: 'Invoice factoring advance'
    },
    { 
      id: 'p5', 
      amount: '$2,100.00', 
      date: 'Mar 10, 2024', 
      status: 'Awaiting Approval' as PayoutStatus, 
      method: 'Advanced Payment (85%) - Direct Advance',
      invoice: 'INV-2024-03-10',
      description: 'Direct advance request'
    }
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
    if (value?.handleStartOnboarding) {
      value.handleStartOnboarding();
      return;
    }
    
    setCurrentStep(0);
    setOnboardingCompleted(false);
    setShowSuccess(false);
    setShowDashboard(false);
    setIsLoggedIn(true);
  };
  
  const handleLogin = () => {
    if (value?.handleLogin) {
      value.handleLogin();
      return;
    }
    
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
    advanceType,
    setAdvanceType,
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
    prepaidCardEmail,
    setPrepaidCardEmail,
    companyName,
   

