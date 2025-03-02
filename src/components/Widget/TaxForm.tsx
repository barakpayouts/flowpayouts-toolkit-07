
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { TaxFormType } from '@/hooks/use-widget-config';

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
  const [formType, setFormType] = useState<TaxFormType>('w9');
  const [formData, setFormData] = useState({
    name: '',
    ssn: '',
    purpose: '',
    beneficiary: '',
    relation: '',
    policyType: 'standard'
  });
  const [isCertified, setIsCertified] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFormTypeChange = (type: TaxFormType) => {
    setFormType(type);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };
  
  return (
    <div className="py-4">
      <div className="mb-6 text-center">
        <h3 className="text-xl font-semibold">Tax Information</h3>
        <p className="text-sm text-white/80 mt-1">Complete your tax information</p>
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
        
        <div>
          <label className="text-sm text-white/80 block mb-2">Purpose of Insurance</label>
          <input
            type="text"
            name="purpose"
            value={formData.purpose}
            onChange={handleInputChange}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
          />
        </div>
        
        <div>
          <label className="text-sm text-white/80 block mb-2">Beneficiary Name</label>
          <input
            type="text"
            name="beneficiary"
            value={formData.beneficiary}
            onChange={handleInputChange}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
          />
        </div>
        
        <div>
          <label className="text-sm text-white/80 block mb-2">Beneficiary Relation</label>
          <input
            type="text"
            name="relation"
            value={formData.relation}
            onChange={handleInputChange}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
          />
        </div>
        
        <div>
          <label className="text-sm text-white/80 block mb-2">Policy Type</label>
          <select
            name="policyType"
            value={formData.policyType}
            onChange={handleInputChange}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
          >
            <option value="standard">Standard</option>
            <option value="premium">Premium</option>
            <option value="basic">Basic</option>
          </select>
        </div>
        
        <div>
          <label className="text-sm text-white/80 block mb-2">
            Name (as shown on your income tax return)
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
          />
        </div>
        
        <div>
          <label className="text-sm text-white/80 block mb-2">
            Social Security Number
          </label>
          <input
            type="text"
            name="ssn"
            value={formData.ssn}
            onChange={handleInputChange}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
          />
        </div>
        
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
          >
            Back
          </button>
          <button
            type="submit"
            className="btn-primary flex-1 py-2"
            disabled={!isCertified || !formData.name || !formData.ssn}
          >
            {isLastStep ? 'Submit Tax Information' : 'Next'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaxForm;
