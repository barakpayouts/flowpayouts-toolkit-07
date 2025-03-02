
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/widget');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-payouts-dark text-white p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-gradient mb-6">Welcome to Payouts.com Widget</h1>
        <p className="text-xl text-white/80 mb-8">
          White-labeled Global Payouts for Your Software Platform
        </p>
        <Button className="btn-primary" onClick={handleGetStarted}>Get Started</Button>
      </div>
    </div>
  );
};

export default Index;
