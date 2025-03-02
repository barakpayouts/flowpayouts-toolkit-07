
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import PayoutWidget from "@/components/Widget/PayoutWidget";
import { RecipientType, useWidgetConfig } from '@/hooks/use-widget-config';

const WidgetDemo = () => {
  const navigate = useNavigate();
  const [showWidget, setShowWidget] = useState(false);
  const { updateConfig, config, setRecipientType } = useWidgetConfig();
  const [showConfigOptions, setShowConfigOptions] = useState(false);
  
  const handleConfigureWidget = () => {
    setShowWidget(true);
  };
  
  const handleSelectRecipientType = (type: RecipientType) => {
    setRecipientType(type);
    setShowConfigOptions(false);
  };
  
  return (
    <div className="min-h-screen bg-payouts-dark text-white p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-gradient">Payouts.com Widget Demo</h1>
          <Button variant="outline" onClick={() => navigate('/')}>Back to Home</Button>
        </div>
        
        <div className="glass-card p-8 mb-8">
          <h2 className="text-2xl mb-4">Smart Payout Widget</h2>
          <p className="mb-6">This is a demonstration of our payout widget. In a real implementation, this would be the embedded widget where users can select their payout method.</p>
          
          {!showWidget ? (
            <div className="bg-white/10 p-6 rounded-lg">
              <div className="text-center p-8">
                <h3 className="text-xl mb-4">Widget Placeholder</h3>
                <p>The actual widget functionality would appear here.</p>
                <Button className="btn-primary mt-6" onClick={handleConfigureWidget}>Configure Widget</Button>
              </div>
            </div>
          ) : showConfigOptions ? (
            <div className="bg-white/10 p-6 rounded-lg">
              <div className="text-center p-8">
                <h3 className="text-xl mb-4">Select Recipient Type</h3>
                <p className="mb-6">Choose the type of recipient for this payout flow</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  <Button 
                    onClick={() => handleSelectRecipientType('vendor')}
                    className="p-4 h-auto flex flex-col items-center"
                  >
                    <span className="text-2xl mb-2">🏢</span>
                    <span className="text-lg font-medium">Vendor</span>
                    <span className="text-sm text-gray-400 mt-1">For supplier payments</span>
                  </Button>
                  
                  <Button 
                    onClick={() => handleSelectRecipientType('insured')}
                    className="p-4 h-auto flex flex-col items-center"
                  >
                    <span className="text-2xl mb-2">🛡️</span>
                    <span className="text-lg font-medium">Insured</span>
                    <span className="text-sm text-gray-400 mt-1">For insurance claims</span>
                  </Button>
                  
                  <Button 
                    onClick={() => handleSelectRecipientType('individual')}
                    className="p-4 h-auto flex flex-col items-center"
                  >
                    <span className="text-2xl mb-2">👤</span>
                    <span className="text-lg font-medium">Individual</span>
                    <span className="text-sm text-gray-400 mt-1">For personal payments</span>
                  </Button>
                  
                  <Button 
                    onClick={() => handleSelectRecipientType('business')}
                    className="p-4 h-auto flex flex-col items-center"
                  >
                    <span className="text-2xl mb-2">💼</span>
                    <span className="text-lg font-medium">Business</span>
                    <span className="text-sm text-gray-400 mt-1">For company payments</span>
                  </Button>
                  
                  <Button 
                    onClick={() => handleSelectRecipientType('contractor')}
                    className="p-4 h-auto flex flex-col items-center md:col-span-2"
                  >
                    <span className="text-2xl mb-2">🔧</span>
                    <span className="text-lg font-medium">Contractor</span>
                    <span className="text-sm text-gray-400 mt-1">For freelance payments</span>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white/10 p-6 rounded-lg overflow-hidden">
              <div className="mb-4 p-3 bg-white/5 rounded-lg flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Current Recipient Type: <span className="text-payouts-accent capitalize">{config.recipientType}</span></h4>
                </div>
                <Button size="sm" variant="outline" onClick={() => setShowConfigOptions(true)}>
                  Change Type
                </Button>
              </div>
              <PayoutWidget />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WidgetDemo;
