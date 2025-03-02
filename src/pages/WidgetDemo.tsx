
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const WidgetDemo = () => {
  const navigate = useNavigate();
  
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
          <div className="bg-white/10 p-6 rounded-lg">
            <div className="text-center p-8">
              <h3 className="text-xl mb-4">Widget Placeholder</h3>
              <p>The actual widget functionality would appear here.</p>
              <Button className="btn-primary mt-6">Configure Widget</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetDemo;
