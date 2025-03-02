import React, { useState } from 'react';

interface ProfileInfoProps {
  onNext: () => void;
  onBack: () => void;
  isLastStep: boolean;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ 
  onNext,
  onBack,
  isLastStep 
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.dob.trim()) {
      newErrors.dob = 'Date of birth is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      if (isLastStep) {
        onNext();
      } else {
        onNext();
      }
    }
  };
  
  return (
    <div className="py-4 animate-fade-in">
      <div className="mb-6 text-center">
        <h3 className="text-xl font-semibold">Complete Your Profile</h3>
        <p className="text-sm text-white/80 mt-1">Please provide your personal information</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
          />
          {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
        </div>
        
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>
        
        <div>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
          />
          {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
        </div>
        
        <div>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            placeholder="Date of Birth"
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all text-white/80"
          />
          {errors.dob && <p className="text-red-400 text-xs mt-1">{errors.dob}</p>}
        </div>
        
        <div>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Address"
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
          />
          {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="City"
              className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
            />
            {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
          </div>
          
          <div>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              placeholder="State"
              className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
            />
            {errors.state && <p className="text-red-400 text-xs mt-1">{errors.state}</p>}
          </div>
        </div>
        
        <div>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            placeholder="ZIP Code"
            className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-payouts-accent focus:outline-none transition-all"
          />
          {errors.zipCode && <p className="text-red-400 text-xs mt-1">{errors.zipCode}</p>}
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            className="btn-primary w-full py-3"
          >
            {isLastStep ? 'Complete' : 'Next'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileInfo;
