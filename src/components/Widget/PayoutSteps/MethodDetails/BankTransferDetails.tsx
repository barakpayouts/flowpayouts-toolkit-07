
import React, { useEffect, useState } from 'react';
import { createAndMountBeneficiaryForm, setupBeneficiaryFormEventListeners, submitBeneficiaryForm } from '@/utils/airwallexHelper';
import { usePayoutWidget } from '@/contexts/PayoutWidgetContext';
import { toast } from "sonner";

interface BankTransferDetailsProps {
  onBack: () => void;
}

const BankTransferDetails: React.FC<BankTransferDetailsProps> = ({ onBack }) => {
  const { colorScheme } = usePayoutWidget();
  const [isLoading, setIsLoading] = useState(true);
  const [element, setElement] = useState<any>(null);
  const containerId = 'beneficiary-form-container';
  
  useEffect(() => {
    const loadBeneficiaryForm = async () => {
      try {
        setIsLoading(true);
        console.log(`Loading beneficiary form with color scheme:`, colorScheme);
        
        const createdElement = await createAndMountBeneficiaryForm(
          containerId,
          'USD', // Default currency
          colorScheme?.primaryColor || '#143745',
          colorScheme?.accentColor || '#d0e92a'
        );
        
        if (createdElement) {
          setElement(createdElement);
          setupBeneficiaryFormEventListeners(createdElement);
        } else {
          console.error('Failed to create beneficiary form element');
          toast.error("Could not load the bank transfer form. Please try again.");
        }
      } catch (error) {
        console.error('Error loading beneficiary form:', error);
        toast.error("Could not load the bank transfer form. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadBeneficiaryForm();
    
    // Clean up function
    return () => {
      if (element) {
        element.unmount();
      }
    };
  }, [colorScheme]);
  
  const handleSubmit = async () => {
    const result = await submitBeneficiaryForm(element);
    if (result.success) {
      toast.success("Bank details submitted successfully");
      // Handle successful submission
    } else {
      toast.error("Failed to submit bank details. Please try again.");
    }
  };
  
  return (
    <div className="p-4 rounded-lg bg-white/10 border border-white/20">
      <h3 className="text-xl mb-4">Bank Transfer Details</h3>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : (
        <>
          <div id={containerId} style={{ minHeight: '300px' }}></div>
          
          <div className="flex justify-between mt-6">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-sm bg-white/10 px-4 py-2 rounded hover:bg-white/20 transition-colors"
            >
              Back to methods
            </button>
            
            <button 
              onClick={handleSubmit}
              className="flex items-center gap-2 text-sm bg-white/20 px-4 py-2 rounded hover:bg-white/30 transition-colors"
            >
              Submit bank details
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BankTransferDetails;
