
import React from 'react';
import { usePayoutWidget } from '@/contexts/PayoutWidgetContext';
import { FileText, UserCheck, ShieldCheck, CreditCard, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const LoginScreen: React.FC = () => {
  const { handleLogin, handleStartOnboarding } = usePayoutWidget();
  
  // Mock onboarding status data - in a real app this would come from the backend
  const onboardingStatus = {
    account: 'completed', // 'completed', 'pending', 'required'
    tax: 'pending',
    kyc: 'required',
    billing: 'pending',
    overallProgress: 50 // percentage complete
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'pending':
        return <Clock size={16} className="text-yellow-500" />;
      case 'required':
        return <AlertTriangle size={16} className="text-red-400" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="login-container">
      <h2 className="text-xl font-semibold mb-4 text-center">Welcome to Payouts</h2>
      <p className="text-sm opacity-70 mb-6 text-center">Login or create a new account to manage your payouts</p>
      
      {/* Onboarding Status Section */}
      <div className="mb-6 p-4 rounded-lg border border-white/20 bg-white/5">
        <h3 className="text-sm font-semibold mb-2">Onboarding Status</h3>
        
        <div className="mb-3">
          <Progress value={onboardingStatus.overallProgress} className="h-1.5 bg-white/10" />
          <p className="text-xs opacity-70 mt-1">
            {onboardingStatus.overallProgress}% complete
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-white/10">
              <UserCheck size={14} className="text-blue-400" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <p className="text-xs font-medium">Account</p>
                {getStatusIcon(onboardingStatus.account)}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-white/10">
              <FileText size={14} className="text-purple-400" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <p className="text-xs font-medium">Tax Forms</p>
                {getStatusIcon(onboardingStatus.tax)}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-white/10">
              <ShieldCheck size={14} className="text-green-400" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <p className="text-xs font-medium">KYC</p>
                {getStatusIcon(onboardingStatus.kyc)}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-full bg-white/10">
              <CreditCard size={14} className="text-orange-400" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <p className="text-xs font-medium">Billing</p>
                {getStatusIcon(onboardingStatus.billing)}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <button
          onClick={() => handleLogin()}
          className="py-3 px-4 rounded-lg font-medium bg-white/10 hover:bg-white/20 transition-colors"
        >
          Login (Simulation)
        </button>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-payouts-dark px-2 text-white/60">or</span>
          </div>
        </div>
        
        <button
          onClick={() => handleStartOnboarding()}
          className="py-3 px-4 rounded-lg font-medium bg-payouts-accent text-payouts-dark hover:bg-payouts-accent/90 transition-colors"
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
