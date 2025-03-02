
import React from 'react';
import { Check } from 'lucide-react';
import { usePayoutWidget } from '@/contexts/PayoutWidgetContext';
import { useWidgetConfig } from '@/hooks/use-widget-config';

const SuccessScreen: React.FC = () => {
  const { selectedMethod, selectedDetailOption, setOnboardingCompleted } = usePayoutWidget();
  const { config } = useWidgetConfig();
  
  return (
    <div className="success-view text-center p-8">
      <div className="success-icon mb-4 mx-auto">
        <div className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto">
          <Check className="w-8 h-8" />
        </div>
      </div>
      <h2 className="text-xl font-bold mb-2">Success!</h2>
      <p className="mb-4">Your payout has been processed via {selectedMethod}{selectedDetailOption ? ` (${selectedDetailOption})` : ''}.</p>
      <p className="text-sm opacity-70">You will receive a confirmation email shortly.</p>
      
      <button
        onClick={() => setOnboardingCompleted(true)}
        className="mt-6 py-3 px-6 rounded-lg font-medium"
        style={{
          backgroundColor: config.accentColor,
          color: config.primaryColor,
          borderRadius: `var(--button-radius)`,
        }}
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default SuccessScreen;
