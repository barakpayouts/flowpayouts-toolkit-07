
import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useWidgetConfig } from '@/hooks/use-widget-config';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { 
  getAuthCode, 
  getClientId, 
  getEnvironment, 
  handleFormSubmission, 
  getCodeVerifier,
  initializeAirwallex
} from '@/utils/airwallexHelper';

const BankTransferDetails: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { config } = useWidgetConfig();
  const beneficiaryFormRef = useRef<any>(null);
  const [isFormInitialized, setIsFormInitialized] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);
  
  useEffect(() => {
    const initAndRenderElement = async () => {
      try {
        setIsFormLoading(true);
        setFormError(null);
        
        // Dynamically import the Airwallex SDK
        const { createElement, init } = await import('@airwallex/components-sdk');
        
        // Initialize the Airwallex SDK
        await init({
          locale: 'en',
          env: getEnvironment(),
          authCode: await getAuthCode(),
          clientId: getClientId(),
          codeVerifier: getCodeVerifier(),
        });
        
        console.log('Airwallex SDK initialized, creating beneficiary form');
        
        // Create the beneficiary form element
        const element = await createElement('beneficiaryForm', {
          defaultValues: {
            beneficiary: {
              entity_type: 'COMPANY',
              bank_details: {
                account_currency: config.currency || 'USD',
                bank_country_code: 'US', // Default to US
                local_clearing_system: 'BANK_TRANSFER',
              },
            },
            payment_methods: ['LOCAL'],
          },
          theme: {
            palette: {
              primary: {
                '10': '#143745', 
                '20': '#143745',
                '30': '#143745',
                '40': '#143745',
                '50': '#143745',
                '60': config.accentColor,
                '70': config.accentColor,
                '80': config.accentColor,
                '90': config.accentColor,
                '100': config.accentColor,
              },
              gradients: {
                primary: [config.backgroundColor, config.accentColor],
                secondary: [config.backgroundColor, config.accentColor],
                tertiary: [config.backgroundColor, config.accentColor],
                quaternary: [config.accentColor, config.accentColor],
              },
            },
            components: {
              spinner: {
                colors: {
                  start: {
                    initial: config.backgroundColor,
                  },
                  stop: {
                    initial: config.accentColor,
                  },
                },
              },
            },
          },
        });
        
        console.log('Beneficiary form created, mounting to DOM');
        
        // Wait for mount element to be available
        setTimeout(() => {
          const mountElement = document.getElementById('beneficiary-root');
          if (mountElement) {
            console.log('Found mount element, mounting form');
            element.mount('#beneficiary-root');
            beneficiaryFormRef.current = element;
            setIsFormInitialized(true);
            setIsFormLoading(false);
          } else {
            console.error('Mount element not found after timeout');
            setFormError('Mount element not found. Please refresh and try again.');
            setIsFormLoading(false);
          }
        }, 500);
        
      } catch (error) {
        console.error('Error initializing Airwallex form:', error);
        setFormError('Failed to initialize payment form. Please try again later.');
        setIsFormLoading(false);
      }
    };
    
    // Only run once when component mounts
    if (!isFormInitialized) {
      initAndRenderElement();
    }
    
    // Cleanup when component unmounts
    return () => {
      if (beneficiaryFormRef.current) {
        try {
          beneficiaryFormRef.current.unmount();
          console.log('Unmounted Airwallex form');
        } catch (error) {
          console.error('Error unmounting Airwallex form:', error);
        }
      }
    };
  }, [config.accentColor, config.backgroundColor, config.currency, isFormInitialized]);
  
  const handleSubmit = async () => {
    if (beneficiaryFormRef.current) {
      try {
        console.log('Submitting Airwallex form');
        const submitResult = await beneficiaryFormRef.current.submit();
        handleFormSubmission(submitResult);
        toast.success('Bank details submitted successfully!');
      } catch (error) {
        console.error('Error submitting form:', error);
        toast.error('There was an error submitting your details. Please try again.');
      }
    } else {
      toast.error('Form not initialized. Please refresh and try again.');
    }
  };
  
  return (
    <div className="payout-details-form">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity"
        >
          <ArrowLeft size={16} />
          Back to methods
        </button>
        <h2 className="text-xl font-semibold">Bank Transfer Details</h2>
      </div>
      
      {/* Balance Info Card */}
      <div className="mb-6 p-4 rounded-lg border border-white/20 bg-white/5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm opacity-70">Available Balance</span>
          <span className="font-semibold text-lg">{config.payoutAmount || "$1,250.00"}</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="opacity-70">From: {config.companyName || "Acme Inc."}</span>
          <span className="opacity-70">Currency: {config.currency || "USD"}</span>
        </div>
      </div>
      
      {/* Airwallex Form Integration */}
      <div className="space-y-6">
        {formError && (
          <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-white">
            <p className="text-sm">{formError}</p>
            <button 
              onClick={() => window.location.reload()}
              className="text-xs underline mt-2"
            >
              Refresh the page
            </button>
          </div>
        )}
        
        {isFormLoading && (
          <div className="flex flex-col items-center justify-center p-8">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin mb-4"></div>
            <p className="text-sm opacity-70">Loading payment form...</p>
          </div>
        )}
        
        <div
          id="beneficiary-root"
          className={isFormLoading ? 'hidden' : 'block'}
          style={{ 
            minHeight: "500px", 
            marginBottom: "20px"
          }}
        />
        
        <Button
          variant="purple"
          className="w-full font-semibold mt-6"
          style={{
            background: `linear-gradient(to right, ${config.accentColor}, ${config.accentColor}DD)`,
            boxShadow: `0 4px 15px ${config.accentColor}40`,
          }}
          onClick={handleSubmit}
          disabled={isFormLoading || !!formError || !isFormInitialized}
        >
          Submit Bank Details
        </Button>
      </div>
      
      <p className="text-xs opacity-70 mt-6 text-center">
        Your information is securely transmitted and protected. Need help? Contact our support team.
      </p>
    </div>
  );
};

export default BankTransferDetails;
