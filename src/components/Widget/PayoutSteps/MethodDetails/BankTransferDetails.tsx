
import React, { useEffect, useState, useRef } from 'react';
import { createAndMountBeneficiaryForm, setupBeneficiaryFormEventListeners, submitBeneficiaryForm } from '@/utils/airwallexHelper';
import { usePayoutWidget } from '@/contexts/PayoutWidgetContext';
import { toast } from "sonner";
import { Loader } from 'lucide-react';

interface BankTransferDetailsProps {
  onBack: () => void;
}

const BankTransferDetails: React.FC<BankTransferDetailsProps> = ({ onBack }) => {
  const { colorScheme } = usePayoutWidget();
  const [isLoading, setIsLoading] = useState(true);
  const [element, setElement] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const containerId = 'beneficiary-form-container';
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const loadBeneficiaryForm = async () => {
      try {
        setIsLoading(true);
        console.log(`Loading beneficiary form with color scheme:`, colorScheme);
        
        // Unmount the previous element if it exists
        if (element) {
          element.unmount();
        }
        
        const createdElement = await createAndMountBeneficiaryForm(
          containerId,
          'USD', // Default currency
          colorScheme?.primaryColor || '#143745',
          colorScheme?.accentColor || '#d0e92a'
        );
        
        if (createdElement) {
          setElement(createdElement);
          setupBeneficiaryFormEventListeners(createdElement);
          
          // Set min-height only after the element is loaded
          if (containerRef.current) {
            containerRef.current.style.minHeight = '450px';
          }
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
    try {
      setIsSubmitting(true);
      const result = await submitBeneficiaryForm(element);
      
      if (result.success) {
        toast.success("Bank details submitted successfully");
        // You could navigate to the next step here or show a success screen
      } else {
        toast.error("Failed to submit bank details. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting bank details:", error);
      toast.error("An error occurred while submitting bank details.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="p-4 rounded-lg bg-white/10 border border-white/20">
      <h3 className="text-xl mb-4">Bank Transfer Details</h3>
      
      {isLoading ? (
        <div className="flex flex-col justify-center items-center py-10 gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          <p className="text-white/70">Loading bank details form...</p>
        </div>
      ) : (
        <>
          <div 
            id={containerId} 
            ref={containerRef}
            className="bg-white/5 p-2 rounded-lg"
            style={{ minHeight: '300px' }}
          ></div>
          
          <div className="flex justify-between mt-6">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-sm bg-white/10 px-4 py-2 rounded hover:bg-white/20 transition-colors"
              disabled={isSubmitting}
            >
              Back to methods
            </button>
            
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`flex items-center gap-2 text-sm ${isSubmitting ? 'bg-white/10 cursor-not-allowed' : 'bg-white/20 hover:bg-white/30'} px-4 py-2 rounded transition-colors`}
            >
              {isSubmitting ? (
                <>
                  <Loader size={16} className="animate-spin" />
                  Processing...
                </>
              ) : (
                'Submit bank details'
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BankTransferDetails;
