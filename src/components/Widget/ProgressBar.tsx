
import React from 'react';
import { usePayoutWidget } from '@/contexts/PayoutWidgetContext';
import { useWidgetConfig } from '@/hooks/use-widget-config';

const ProgressBar: React.FC = () => {
  const { currentStep, steps } = usePayoutWidget();
  const { config } = useWidgetConfig();
  
  if (!config.showProgressBar || steps.length <= 1) return null;
  
  return (
    <div className="progress-bar-container mb-6">
      <div className="flex justify-between mb-2">
        {steps.map((step, index) => {
          // Skip the details step in progress bar to avoid confusion
          if (step === 'details') return null;
          
          // Adjust the index for comparison with currentStep
          const displayIndex = index <= steps.indexOf('details') && currentStep > steps.indexOf('details') ? 
            index : index - (steps.includes('details') ? 1 : 0);
            
          return (
            <div 
              key={index}
              className={`step-indicator ${index <= currentStep ? 'active' : ''}`}
            >
              {config.showStepNumbers && (
                <span className="step-number">{displayIndex + 1}</span>
              )}
            </div>
          );
        }).filter(Boolean)}
      </div>
      <div className="progress-track">
        <div 
          className="progress-fill" 
          style={{ 
            width: `${(currentStep / (steps.length - (steps.includes('details') ? 2 : 1))) * 100}%`,
            borderRadius: '3px'
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
