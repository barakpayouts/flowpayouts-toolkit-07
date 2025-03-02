
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-payouts-dark to-payouts-medium p-8 text-white text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">Smart Payout Widget</h1>
      <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-8">
        A customizable widget to streamline payouts for financial services, insurance platforms, and marketplaces.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl w-full">
        <Link to="/marketing" className="block w-full">
          <Button 
            className="w-full py-6 text-lg bg-payouts-accent text-payouts-dark font-semibold hover:bg-payouts-accent/90"
          >
            View Marketing Page
          </Button>
        </Link>
        
        <Link to="/widget" className="block w-full">
          <Button 
            className="w-full py-6 text-lg font-semibold text-gray-900 bg-[#8B5CF6] hover:text-white"
            style={{
              boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)"
            }}
          >
            Try Widget Demo <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
      
      <p className="mt-12 text-white/60 max-w-xl">
        Explore our payout solutions designed to help businesses send money to anyone, anywhere, with their preferred payment method.
      </p>
    </div>
  );
}
