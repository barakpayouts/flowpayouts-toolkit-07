
import React from 'react';
import { FileText, UserCheck, ShieldCheck, CreditCard } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useWidgetConfig } from '@/hooks/use-widget-config';

type OnboardingStatusProps = {
  onboardingStatus: {
    account: 'completed' | 'pending' | 'required';
    tax: 'completed' | 'pending' | 'required';
    kyc: 'completed' | 'pending' | 'required';
    billing: 'completed' | 'pending' | 'required';
    overallProgress: number;
  };
};

const OnboardingStatus: React.FC<OnboardingStatusProps> = ({ onboardingStatus }) => {
  const { config } = useWidgetConfig();
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="text-green-500">Completed</span>;
      case 'pending':
        return <span className="text-yellow-500">Pending</span>;
      case 'required':
        return <span className="text-red-400">Required</span>;
      default:
        return null;
    }
  };
  
  return (
    <div className="mb-5 p-4 rounded-lg border border-white/20 bg-white/5">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold">Onboarding Status</h3>
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/10">
          {onboardingStatus.overallProgress}% complete
        </span>
      </div>
      
      <Progress 
        value={onboardingStatus.overallProgress} 
        className="h-1.5 bg-white/10 mb-4" 
        style={{
          "--progress-background": `${config.accentColor}`,
        } as React.CSSProperties}
      />
      
      <div className="space-y-2">
        <div className="flex justify-between items-center py-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <UserCheck size={16} className="text-blue-400" />
            <span className="text-sm">Account</span>
          </div>
          {getStatusText(onboardingStatus.account)}
        </div>
        
        <div className="flex justify-between items-center py-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-purple-400" />
            <span className="text-sm">Tax Forms</span>
          </div>
          {getStatusText(onboardingStatus.tax)}
        </div>
        
        <div className="flex justify-between items-center py-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-green-400" />
            <span className="text-sm">KYC</span>
          </div>
          {getStatusText(onboardingStatus.kyc)}
        </div>
        
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center gap-2">
            <CreditCard size={16} className="text-orange-400" />
            <span className="text-sm">Billing</span>
          </div>
          {getStatusText(onboardingStatus.billing)}
        </div>
      </div>
    </div>
  );
};

export default OnboardingStatus;
