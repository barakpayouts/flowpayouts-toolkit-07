
import React from 'react';
import { usePayoutWidget } from '@/contexts/PayoutWidgetContext';
import { useWidgetConfig } from '@/hooks/use-widget-config';

const LoginScreen: React.FC = () => {
  const { handleLogin, handleStartOnboarding } = usePayoutWidget();
  const { config } = useWidgetConfig();
  
  return (
    <div className="login-container text-center">
      <h2 className="text-xl font-semibold mb-6">Welcome to Payouts</h2>
      <p className="text-sm opacity-70 mb-8">Login or create a new account to manage your payouts</p>
      
      <div className="flex flex-col gap-4">
        <button
          onClick={handleLogin}
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
          onClick={handleStartOnboarding}
          className="py-3 px-4 rounded-lg font-medium"
          style={{
            backgroundColor: config.accentColor || "#8B5CF6",
            color: config.primaryColor || "#ffffff",
          }}
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
