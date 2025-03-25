
import React from 'react';
import { usePayoutWidget } from '@/contexts/PayoutWidgetContext';
import { ArrowRight } from 'lucide-react';

interface RecipientWelcomeProps {
  onStart?: () => void;
}

const RecipientWelcome: React.FC<RecipientWelcomeProps> = ({ onStart }) => {
  const { handleStartOnboarding, handleLogin, companyName } = usePayoutWidget();
  
  const startOnboarding = () => {
    if (onStart) {
      onStart();
    } else {
      handleStartOnboarding();
    }
  };

  return (
    <div className="welcome-screen">
      <div className="welcome-header">
        <h1 className="welcome-title">Payment Ready</h1>
        <p className="welcome-subtitle">{companyName} would like to pay you</p>
        <div className="welcome-amount">$1,250.00</div>
      </div>
      
      <div className="welcome-features">
        <div className="welcome-feature">
          <span className="welcome-feature-icon">⚡</span>
          <span className="welcome-feature-text">Quick Payment</span>
          <p className="welcome-feature-desc">Choose from multiple payout options</p>
        </div>
        
        <div className="welcome-feature">
          <span className="welcome-feature-icon">🚀</span>
          <span className="welcome-feature-text">Fast Processing</span>
          <p className="welcome-feature-desc">Receive your funds quickly and securely</p>
        </div>
        
        <div className="welcome-feature">
          <span className="welcome-feature-icon">🔒</span>
          <span className="welcome-feature-text">Secure Platform</span>
          <p className="welcome-feature-desc">Your information is protected</p>
        </div>
      </div>
      
      <div className="welcome-actions">
        <button onClick={startOnboarding} className="welcome-button-primary">
          Create Account <ArrowRight size={16} />
        </button>
        <button onClick={handleLogin} className="welcome-button-secondary">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default RecipientWelcome;
