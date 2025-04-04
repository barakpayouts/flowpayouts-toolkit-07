import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { useWidgetConfig } from '@/hooks/use-widget-config';
import { RecipientType } from '@/hooks/use-widget-config';
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

interface RecipientConfigProps {
  onComplete: () => void;
  onBack?: () => void;
}

interface OnboardingOption {
  id: string;
  title: string;
  description: string;
}

interface DataImportOption {
  id: string;
  title: string;
  description: string;
}

interface PortalOption {
  id: string;
  title: string;
  description: string;
}

const RecipientConfig: React.FC<RecipientConfigProps> = ({ onComplete, onBack }) => {
  const { config, setRecipientType, updateConfig } = useWidgetConfig();
  const [step, setStep] = useState<number>(1);
  const [selectedType, setSelectedType] = useState<RecipientType | null>(config.recipientType || null);
  const [managementType, setManagementType] = useState<string | null>(null);
  const [onboardingType, setOnboardingType] = useState<string | null>(null);
  const [portalType, setPortalType] = useState<string | null>(null);

  const recipientTypes: { type: RecipientType; icon: string; label: string }[] = [
    { type: 'vendor', icon: '🏢', label: 'Vendor' },
    { type: 'insured', icon: '🛡️', label: 'Insured' },
    { type: 'individual', icon: '👤', label: 'Individual' },
    { type: 'business', icon: '💼', label: 'Business' },
    { type: 'contractor', icon: '🔧', label: 'Contractor' },
    { type: 'client', icon: '👥', label: 'Client' },
    { type: 'other', icon: '🔄', label: 'Other' },
  ];

  const managementOptions: OnboardingOption[] = [
    {
      id: 'portal',
      title: `Manage ${getRecipientLabel()} via ${getRecipientLabel()} Portal`,
      description: `Empower your ${getRecipientLabel().toLowerCase()}s to manage their own profiles, payment details, and tax information through a secure self-service portal. This streamlines your workflow and enhances ${getRecipientLabel().toLowerCase()} satisfaction.`
    },
    {
      id: 'independent',
      title: `Manage ${getRecipientLabel()}s Independently`,
      description: `Manage your ${getRecipientLabel().toLowerCase()} information and settings directly within Payouts.com or in your own systems. You'll be responsible for entering and updating ${getRecipientLabel().toLowerCase()} details, including payment methods and tax forms. This option gives you complete control over your ${getRecipientLabel().toLowerCase()} data.`
    }
  ];

  const onboardingOptions: OnboardingOption[] = [
    {
      id: 'invite',
      title: `Invite All ${getRecipientLabel()}s`,
      description: `All ${getRecipientLabel()}s will be invited to the ${getRecipientLabel()} Portal and have a self-onboarding.`
    },
    {
      id: 'migrate',
      title: `Migrate Existing ${getRecipientLabel()}s`,
      description: `Automatically migrate all your existing ${getRecipientLabel()}s based on your current data. New ${getRecipientLabel().toLowerCase()}s will be invited to the ${getRecipientLabel()} Portal and have a self onboarding. Note: You will be responsible for validating the accuracy of this data to assure smooth payouts.`
    }
  ];

  const portalOptions: PortalOption[] = [
    {
      id: 'self-hosted',
      title: 'Self-hosted Portal in Payouts.com',
      description: `Use the dedicated portal within Payouts.com for your ${getRecipientLabel().toLowerCase()}s to manage their information.`
    },
    {
      id: 'widget',
      title: 'Use our Widget',
      description: 'Embed our widget within your existing website or application for a seamless experience.'
    }
  ];

  const dataImportOptions: DataImportOption[] = [
    {
      id: 'csv',
      title: 'Bulk Import (CSV)',
      description: `Upload a CSV file with ${getRecipientLabel().toLowerCase()} data (by contacting support@payouts.com)`
    },
    {
      id: 'api',
      title: 'API Integration',
      description: 'Connect directly to our API for real-time data synchronization.'
    }
  ];

  function getRecipientLabel(): string {
    if (!selectedType) return 'Recipient';
    return selectedType.charAt(0).toUpperCase() + selectedType.slice(1);
  }

  const handleNext = () => {
    if (step === 1 && selectedType) {
      setRecipientType(selectedType);
      setStep(2);
    } else if (step === 2 && managementType) {
      if (managementType === 'independent') {
        setStep(5);
      } else {
        setStep(3);
      }
    } else if (step === 3 && onboardingType) {
      setStep(4);
    } else if (step === 4 && portalType) {
      if (portalType === 'widget') {
        completeSetup();
      } else {
        setStep(6);
      }
    } else if (step === 5) {
      completeSetup();
    }
  };

  const handleBack = () => {
    if (step === 1 && onBack) {
      onBack();
    } else if (step > 1) {
      if (step === 3 && managementType === 'independent') {
        setStep(2);
      } else {
        setStep(step - 1);
      }
    }
  };

  const completeSetup = () => {
    updateConfig({
      recipientType: selectedType || 'vendor'
    });

    if (portalType === 'widget') {
      onComplete();
    } else {
      setStep(6);
    }
  };

  const handleOptionSelect = (optionId: string) => {
    switch (step) {
      case 2:
        setManagementType(optionId);
        break;
      case 3:
        setOnboardingType(optionId);
        break;
      case 4:
        setPortalType(optionId);
        break;
      default:
        break;
    }
  };

  return (
    <div className="recipient-config-container p-4">
      {step === 1 && (
        <div className="recipient-type-selection">
          <h2 className="text-xl font-semibold mb-4">Recipient Type</h2>
          <p className="text-sm mb-6 opacity-70">What type of recipient is in this connector?</p>
          
          <RadioGroup
            value={selectedType || ""}
            onValueChange={(value) => setSelectedType(value as RecipientType)}
            className="grid grid-cols-2 gap-3"
          >
            {recipientTypes.map((item) => (
              <div
                key={item.type + item.label}
                className={cn(
                  "p-4 rounded-lg border flex items-center gap-2 transition-all",
                  selectedType === item.type
                    ? "border-accent-foreground bg-accent-foreground/10"
                    : "border-border hover:bg-accent/10"
                )}
              >
                <RadioGroupItem value={item.type} id={item.type} className="mt-1" />
                <label htmlFor={item.type} className="flex-1 flex items-center gap-2 cursor-pointer">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </label>
                {selectedType === item.type && (
                  <Check size={16} className="ml-auto text-green-500" />
                )}
              </div>
            ))}
          </RadioGroup>
        </div>
      )}

      {step === 2 && (
        <div className="management-selection">
          <h2 className="text-xl font-semibold mb-2">Management Option</h2>
          <p className="text-sm mb-6 opacity-70">How would you like to onboard your {getRecipientLabel().toLowerCase()}s to Payouts.com?</p>
          
          <RadioGroup value={managementType || ""} onValueChange={setManagementType} className="space-y-3">
            {managementOptions.map((option) => (
              <div
                key={option.id}
                className={cn(
                  "w-full p-4 rounded-lg border text-left flex items-start gap-3 transition-all",
                  managementType === option.id
                    ? "border-accent-foreground bg-accent-foreground/20 shadow-md"
                    : "border-border hover:bg-accent/10"
                )}
                onClick={() => setManagementType(option.id)}
              >
                <div className={cn(
                  "mt-1 flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center",
                  managementType === option.id 
                    ? "border-accent-foreground bg-accent-foreground" 
                    : "border-muted-foreground"
                )}>
                  {managementType === option.id && <Check size={12} className="text-background" />}
                </div>
                <div className="flex-1">
                  <label htmlFor={option.id} className={cn(
                    "font-medium block mb-1 cursor-pointer",
                    managementType === option.id && "text-accent-foreground"
                  )}>
                    {option.title}
                  </label>
                  <span className="text-sm opacity-70 block">{option.description}</span>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}

      {step === 3 && (
        <div className="onboarding-selection">
          <h2 className="text-xl font-semibold mb-2">Onboarding Process</h2>
          <p className="text-sm mb-6 opacity-70">How would you like to onboard your {getRecipientLabel().toLowerCase()}s to the portal?</p>
          
          <RadioGroup value={onboardingType || ""} onValueChange={setOnboardingType} className="space-y-3">
            {onboardingOptions.map((option) => (
              <div
                key={option.id}
                className={cn(
                  "w-full p-4 rounded-lg border text-left flex items-start gap-3 transition-all",
                  onboardingType === option.id
                    ? "border-accent-foreground bg-accent-foreground/20 shadow-md"
                    : "border-border hover:bg-accent/10"
                )}
                onClick={() => setOnboardingType(option.id)}
              >
                <div className={cn(
                  "mt-1 flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center",
                  onboardingType === option.id 
                    ? "border-accent-foreground bg-accent-foreground" 
                    : "border-muted-foreground"
                )}>
                  {onboardingType === option.id && <Check size={12} className="text-background" />}
                </div>
                <div className="flex-1">
                  <label htmlFor={option.id} className={cn(
                    "font-medium block mb-1 cursor-pointer",
                    onboardingType === option.id && "text-accent-foreground"
                  )}>
                    {option.title}
                  </label>
                  <span className="text-sm opacity-70 block">{option.description}</span>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}

      {step === 4 && (
        <div className="portal-selection">
          <h2 className="text-xl font-semibold mb-2">Portal Type</h2>
          <p className="text-sm mb-6 opacity-70">Would you like to use a self-hosted portal or our widget?</p>
          
          <RadioGroup value={portalType || ""} onValueChange={setPortalType} className="space-y-3">
            {portalOptions.map((option) => (
              <div
                key={option.id}
                className={cn(
                  "w-full p-4 rounded-lg border text-left flex items-start gap-3 transition-all",
                  portalType === option.id
                    ? "border-accent-foreground bg-accent-foreground/20 shadow-md"
                    : "border-border hover:bg-accent/10"
                )}
                onClick={() => setPortalType(option.id)}
              >
                <div className={cn(
                  "mt-1 flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center",
                  portalType === option.id 
                    ? "border-accent-foreground bg-accent-foreground" 
                    : "border-muted-foreground"
                )}>
                  {portalType === option.id && <Check size={12} className="text-background" />}
                </div>
                <div className="flex-1">
                  <label htmlFor={option.id} className={cn(
                    "font-medium block mb-1 cursor-pointer",
                    portalType === option.id && "text-accent-foreground"
                  )}>
                    {option.title}
                  </label>
                  <span className="text-sm opacity-70 block">{option.description}</span>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}

      {step === 5 && (
        <div className="data-import-selection">
          <h2 className="text-xl font-semibold mb-2">Data Import</h2>
          <p className="text-sm mb-6 opacity-70">How would you like to add your data to Payouts.com?</p>
          
          <div className="space-y-3">
            {dataImportOptions.map((option) => (
              <div
                key={option.id}
                className={cn(
                  "w-full p-4 rounded-lg border text-left transition-all",
                  "border-border hover:bg-accent/10"
                )}
              >
                <div className="font-medium mb-1">{option.title}</div>
                <div className="text-sm opacity-70">{option.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 6 && (
        <div className="setup-complete text-center p-6">
          <div className="bg-green-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Check size={24} className="text-green-500" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Setup Complete!</h2>
          <p className="text-sm mb-6 opacity-70">
            {portalType === 'widget' 
              ? "Widget configuration is ready. Proceed to customize your widget." 
              : "Your portal is set up and ready to use. You can now proceed to the next steps."}
          </p>
        </div>
      )}

      <div className="flex justify-between mt-6">
        <Button
          onClick={handleBack}
          variant="dark"
          className={cn(
            step === 1 && !onBack ? "invisible" : ""
          )}
        >
          <ArrowLeft size={16} className="mr-2" /> Back
        </Button>
        <Button
          onClick={handleNext}
          variant="accent"
          disabled={
            (step === 1 && !selectedType) ||
            (step === 2 && !managementType) ||
            (step === 3 && !onboardingType) ||
            (step === 4 && !portalType) ||
            step === 6
          }
        >
          Next <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default RecipientConfig;
