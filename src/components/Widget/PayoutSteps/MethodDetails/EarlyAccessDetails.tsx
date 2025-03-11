
import React, { useState } from 'react';
import { useWidgetConfig } from '@/hooks/use-widget-config';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Zap, Clock, Calendar, Shield, ArrowLeft, CreditCard, Check } from 'lucide-react';

interface EarlyAccessDetailsProps {
  paymentAmount: number;
  onBack: () => void;
}

const EarlyAccessDetails: React.FC<EarlyAccessDetailsProps> = ({
  paymentAmount = 1000, // Default value for demo
  onBack,
}) => {
  const { config } = useWidgetConfig();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showPrepaidOption, setShowPrepaidOption] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleEnroll = () => {
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsEnrolled(true);
      toast.success("Early Access activated", {
        description: "You'll now receive all eligible payments 2-3 days earlier",
      });
      setShowPrepaidOption(true);
    }, 1000);
  };

  const handleConfirmPrepaidCard = () => {
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Prepaid card confirmed", {
        description: "Your early access payments will be sent to your prepaid card",
      });
      onBack();
    }, 1000);
  };

  const handleBackToEnrollment = () => {
    setShowPrepaidOption(false);
  };

  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + 2);
  
  const formattedDate = estimatedDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short', 
    day: 'numeric'
  });

  if (showPrepaidOption) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={handleBackToEnrollment}
            className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity"
          >
            <ArrowLeft size={16} />
            Back to Early Access
          </button>
          <h2 className="text-xl font-semibold">Select Payout Method</h2>
        </div>
        
        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
          <h3 className="text-lg font-medium mb-2">Early Access Activated</h3>
          <p className="text-sm text-white/70 mb-3">
            You'll receive your payment on {formattedDate}
          </p>
          
          <div className="flex items-center gap-4 mt-4 bg-black/20 p-3 rounded-lg">
            <Zap size={24} className="text-white/70" />
            <div>
              <p className="font-medium">Next Eligible Payment</p>
              <p className="text-2xl font-bold">${paymentAmount.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm opacity-80">Please select how you want to receive your early access payment:</p>
          
          <div 
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all bg-white/10 border-${config.accentColor}60`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: `${config.accentColor}20`,
                  }}
                >
                  <CreditCard 
                    size={20} 
                    style={{ color: config.accentColor }}
                  />
                </div>
                <div>
                  <h3 className="font-medium">Prepaid Card</h3>
                  <p className="text-sm opacity-70">Receive your funds on a prepaid card</p>
                </div>
              </div>
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: config.accentColor }}
              >
                <Check size={14} className="text-black" />
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-xs opacity-70 mt-2 text-center">
          Your prepaid card will be issued immediately after confirmation
        </p>
        
        <Button 
          onClick={handleConfirmPrepaidCard}
          className="w-full"
          disabled={isProcessing}
          style={{
            backgroundColor: config.accentColor,
            color: config.backgroundColor
          }}
        >
          {isProcessing ? "Processing..." : "Confirm Prepaid Card"}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity"
        >
          <ArrowLeft size={16} />
          Back to methods
        </button>
        <h2 className="text-xl font-semibold">Early Access Payments</h2>
      </div>
      
      <div className="bg-white/5 p-4 rounded-lg border border-white/10">
        <h3 className="text-lg font-medium mb-2">Early Access Payments</h3>
        <p className="text-sm text-white/70 mb-3">
          Receive your payments 2-3 days before the standard settlement
        </p>
        
        <div className="flex items-center gap-4 mt-4 bg-black/20 p-3 rounded-lg">
          <Zap size={24} className="text-white/70" />
          <div>
            <p className="font-medium">Next Eligible Payment</p>
            <p className="text-2xl font-bold">${paymentAmount.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <Calendar size={18} className="text-white/60" />
            <div>
              <p className="text-sm text-white/70">Estimated Payment Date</p>
              <p className="font-medium">{formattedDate}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Clock size={18} className="text-white/60" />
            <div>
              <p className="text-sm text-white/70">Normal Settlement</p>
              <p className="font-medium">3-5 Business Days</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <Shield size={18} className="text-white/60" />
            <p className="font-medium">Early Access Benefits</p>
          </div>
          
          <ul className="ml-8 space-y-2 text-sm list-disc text-white/70">
            <li>Receive payments 2-3 days faster</li>
            <li>No additional fees</li>
            <li>Automatic enrollment for all future payments</li>
            <li>Cancel anytime</li>
          </ul>
        </div>
      </div>

      {!isEnrolled ? (
        <Button 
          onClick={handleEnroll}
          className="w-full"
          disabled={isProcessing}
          style={{
            backgroundColor: config.accentColor,
            color: config.backgroundColor
          }}
        >
          <Zap size={16} className="mr-2" />
          {isProcessing ? "Processing..." : "Activate Early Access Payments"}
        </Button>
      ) : (
        <div className="bg-white/10 p-4 rounded-lg text-center">
          <p className="text-white/70 text-sm mb-2">Early Access is active</p>
          <p className="font-medium">Your payments will arrive 2-3 days faster</p>
        </div>
      )}
    </div>
  );
};

export default EarlyAccessDetails;
