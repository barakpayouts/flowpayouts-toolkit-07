
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { TaxFormType, useWidgetConfig } from '@/hooks/use-widget-config';
import { toast } from "sonner";

interface TaxFormProps {
  onNext: () => void;
  onBack: () => void;
  isLastStep: boolean;
}

const TaxForm: React.FC<TaxFormProps> = ({ 
  onNext,
  onBack,
  isLastStep
}) => {
  const { config } = useWidgetConfig();
  const [formType, setFormType] = useState<TaxFormType>('w9');
  const [formData, setFormData] = useState({
    name: '',
    ssn: '',
    tin: '',
    companyName: '',
    purpose: '',
    beneficiary: '',
    relation: '',
    policyType: 'standard',
    vendorType: 'service',
    contractorAgreement: false
  });
  const [isCertified, setIsCertified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const handleFormTypeChange = (type: TaxFormType) => {
    setFormType(type);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const requiredFields = getRequiredFields();
    const missingRequired = requiredFields.some(field => !formData[field as keyof typeof formData]);
    
    if (missingRequired || !isCertified) {
      toast.error("Please complete all required fields and certify the information");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Tax information submitted successfully");
      onNext(); // Navigate to the next step
    }, 1000);
  };
  
  // Get required fields based on recipient type
  const getRequiredFields = () => {
    const commonFields = ['name'];
    
    switch (config.recipientType) {
      case 'vendor':
        return [...commonFields, 'tin', 'companyName', 'vendorType'];
      case 'insured':
        return [...commonFields, 'ssn', 'purpose', 'beneficiary', 'relation', 'policyType'];
      case 'contractor':
        return [...commonFields, 'ssn', 'contractorAgreement'];
      case 'business':
        return [...commonFields, 'tin', 'companyName'];
      case 'individual':
      default:
        return [...commonFields, 'ssn'];
    }
  };
  
  // Render form fields based on recipient type
  const renderRecipientTypeFields = () => {
    switch (config.recipientType) {
      case 'vendor':
        return (
          <>
            <div>
              <label className="text-sm text-white/80 block mb-2">
                Company Name
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                required
                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
              />
            </div>
            
            <div>
              <label className="text-sm text-white/80 block mb-2">
                Tax Identification Number (TIN)
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="tin"
                value={formData.tin}
                onChange={handleInputChange}
                required
                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
              />
            </div>
            
            <div>
              <label className="text-sm text-white/80 block mb-2">
                Vendor Type
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                name="vendorType"
                value={formData.vendorType}
                onChange={handleInputChange}
                required
                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
              >
                <option value="service">Service Provider</option>
                <option value="goods">Goods Supplier</option>
                <option value="both">Both Services and Goods</option>
              </select>
            </div>
          </>
        );
        
      case 'insured':
        return (
          <>
            <div>
              <label className="text-sm text-white/80 block mb-2">
                Purpose of Insurance
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="purpose"
                value={formData.purpose}
                onChange={handleInputChange}
                required
                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
              />
            </div>
            
            <div>
              <label className="text-sm text-white/80 block mb-2">
                Beneficiary Name
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="beneficiary"
                value={formData.beneficiary}
                onChange={handleInputChange}
                required
                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
              />
            </div>
            
            <div>
              <label className="text-sm text-white/80 block mb-2">
                Beneficiary Relation
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="relation"
                value={formData.relation}
                onChange={handleInputChange}
                required
                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
              />
            </div>
            
            <div>
              <label className="text-sm text-white/80 block mb-2">
                Policy Type
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                name="policyType"
                value={formData.policyType}
                onChange={handleInputChange}
                required
                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
              >
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
                <option value="basic">Basic</option>
              </select>
            </div>
          </>
        );
        
      case 'contractor':
        return (
          <div className="flex items-start mt-6">
            <input
              id="contractorAgreement"
              name="contractorAgreement"
              type="checkbox"
              checked={formData.contractorAgreement}
              onChange={handleCheckboxChange}
              className="w-4 h-4 mt-1 rounded border-white/20 text-payouts-accent focus:ring-payouts-accent"
            />
            <label htmlFor="contractorAgreement" className="ml-2 text-sm text-white/80">
              I confirm that I am an independent contractor and not an employee
              <span className="text-red-500 ml-1">*</span>
            </label>
          </div>
        );
        
      case 'business':
        return (
          <>
            <div>
              <label className="text-sm text-white/80 block mb-2">
                Company Name
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                required
                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
              />
            </div>
            
            <div>
              <label className="text-sm text-white/80 block mb-2">
                Tax Identification Number (TIN)
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="tin"
                value={formData.tin}
                onChange={handleInputChange}
                required
                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
              />
            </div>
          </>
        );
        
      case 'individual':
      default:
        return null;
    }
  };
  
  return (
    <div className="py-4">
      <div className="mb-6 text-center">
        <h3 className="text-xl font-semibold">Tax Information</h3>
        <p className="text-sm text-white/80 mt-1">
          Complete your tax information for {config.recipientType} payments
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-white/80 block mb-2">Tax Form Type</label>
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => handleFormTypeChange('w9')}
              className={cn(
                "flex-1 py-2 px-4 rounded-lg border transition-all text-center text-sm",
                formType === 'w9' 
                  ? "border-payouts-accent bg-payouts-accent/10 text-white"
                  : "border-white/20 bg-white/5 text-white/70 hover:bg-white/10"
              )}
            >
              W-9 (U.S. Persons)
            </button>
            <button
              type="button"
              onClick={() => handleFormTypeChange('w8')}
              className={cn(
                "flex-1 py-2 px-4 rounded-lg border transition-all text-center text-sm",
                formType === 'w8' 
                  ? "border-payouts-accent bg-payouts-accent/10 text-white"
                  : "border-white/20 bg-white/5 text-white/70 hover:bg-white/10"
              )}
            >
              W-8 (Non-U.S.)
            </button>
          </div>
        </div>
        
        {/* Recipient-specific fields */}
        {renderRecipientTypeFields()}
        
        <div>
          <label className="text-sm text-white/80 block mb-2">
            Name (as shown on your income tax return)
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
          />
        </div>
        
        {/* Only show SSN field for individual and insured */}
        {(config.recipientType === 'individual' || config.recipientType === 'insured' || config.recipientType === 'contractor') && (
          <div>
            <label className="text-sm text-white/80 block mb-2">
              Social Security Number
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="ssn"
              value={formData.ssn}
              onChange={handleInputChange}
              required
              className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
            />
          </div>
        )}
        
        <div className="flex items-start mt-6">
          <input
            id="certify"
            type="checkbox"
            checked={isCertified}
            onChange={() => setIsCertified(!isCertified)}
            className="w-4 h-4 mt-1 rounded border-white/20 text-payouts-accent focus:ring-payouts-accent"
          />
          <label htmlFor="certify" className="ml-2 text-sm text-white/80">
            I certify that all information provided is true and accurate
            <span className="text-red-500 ml-1">*</span>
          </label>
        </div>
        
        <p className="text-xs text-white/60 italic">
          Under penalties of perjury, I declare that I have examined this information and to the best of my knowledge and belief, it is true, correct, and complete.
        </p>
        
        <div className="flex space-x-3 pt-2">
          <button
            type="button"
            onClick={onBack}
            className="btn-secondary flex-1 py-2"
            disabled={isSubmitting}
          >
            Back
          </button>
          <button
            type="submit"
            className="btn-primary flex-1 py-2"
            disabled={isSubmitting || !isCertified || !formData.name || (config.recipientType === 'individual' && !formData.ssn)}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : isLastStep ? 'Submit Tax Information' : 'Next'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaxForm;
