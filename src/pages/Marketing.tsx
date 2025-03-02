import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Check, 
  CreditCard, 
  Globe, 
  Shield, 
  DollarSign, 
  UserCheck, 
  Zap 
} from 'lucide-react';
import PayoutWidget from '@/components/Widget/PayoutWidget';
import { useWidgetConfig } from '@/hooks/use-widget-config';

// Simple GlassMorphism component for Stripe-like UI elements
const GlassMorphism: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  children, 
  className, 
  ...props 
}) => {
  return (
    <div 
      className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-lg shadow-sm ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
};

const Marketing = () => {
  const navigate = useNavigate();
  const { updateConfig } = useWidgetConfig();
  const [activeTab, setActiveTab] = useState<'bank' | 'crypto' | 'gift'>('bank');
  
  // Configure demo widget when shown
  const configureWidget = (type: 'bank' | 'crypto' | 'gift') => {
    setActiveTab(type);
    // Configure widget based on selected type
    switch(type) {
      case 'bank':
        updateConfig({ 
          payoutMethods: ['bank'], 
          steps: ['profile'], 
          borderRadius: 8,
          buttonStyle: 'rounded' 
        });
        break;
      case 'crypto':
        updateConfig({ 
          payoutMethods: ['crypto'], 
          steps: ['profile'], 
          borderRadius: 12,
          buttonStyle: 'pill' 
        });
        break;
      case 'gift':
        updateConfig({ 
          payoutMethods: ['gift'], 
          steps: ['profile'], 
          borderRadius: 4,
          buttonStyle: 'square' 
        });
        break;
    }
  };

  // Stripe-style feature card
  const FeatureCard = ({ 
    title, 
    description, 
    icon 
  }: { 
    title: string; 
    description: string; 
    icon: React.ReactNode 
  }) => (
    <div className="flex flex-col gap-4 p-6 rounded-lg border border-white/10 hover:bg-white/5 transition-colors">
      <div className="w-10 h-10 rounded-lg bg-payouts-accent flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-medium mb-1">{title}</h3>
        <p className="text-white/70 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-payouts-dark to-payouts-dark/90 text-white">
      {/* Navbar */}
      <header className="border-b border-white/10 backdrop-blur-sm bg-payouts-dark/50 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="flex items-center gap-x-2">
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
              Smart Payout Widget
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/')}
              className="text-white/70 hover:text-white"
            >
              Home
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/demo')}
              className="hidden md:flex"
            >
              Try Demo
            </Button>
            <Button 
              size="sm" 
              className="bg-payouts-accent text-payouts-dark hover:bg-payouts-accent/90"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                White-labeled Global Payouts for Your Software Platform
              </h1>
              <p className="text-xl text-white/80 mb-8">
                Seamlessly embed our Smart Payout Widget to disburse funds to vendors, affiliates, creators—anyone, anywhere.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-payouts-accent text-payouts-dark hover:bg-payouts-accent/90 px-8 py-6"
                >
                  Request a Demo <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white/20 hover:bg-white/5"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="relative w-full max-w-sm mx-auto">
                {/* Widget Demo */}
                <div className="relative z-10 w-full max-w-xs mx-auto">
                  <PayoutWidget />
                </div>
                {/* Background glow effect */}
                <div className="absolute inset-0 -z-0 bg-payouts-accent/20 blur-3xl rounded-full transform -translate-y-1/2 opacity-30"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Smart Payout Widget?</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Our widget provides a comprehensive solution for disbursing funds globally, with multiple payout options and full customization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              title="Create more value for your recipients"
              description="Our widget fits seamlessly into your platform, letting you pay vendors, influencers, insured parties, or employees with ease—driving satisfaction and loyalty."
              icon={<UserCheck className="h-5 w-5 text-payouts-dark" />}
            />
            <FeatureCard
              title="Reach 190+ countries with 130+ currencies"
              description="From local bank transfers and push-to-card to PayPal, crypto, and gift cards—offer your recipients ultimate flexibility."
              icon={<Globe className="h-5 w-5 text-payouts-dark" />}
            />
            <FeatureCard
              title="Automate compliance & settlements"
              description="Payouts.com handles KYC/AML checks, tax forms, and cross-border regulations so you can focus on growing your business."
              icon={<Shield className="h-5 w-5 text-payouts-dark" />}
            />
          </div>
        </div>
      </section>

      {/* Payout Methods Section */}
      <section className="py-20 bg-gradient-to-b from-payouts-dark/20 to-payouts-dark border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Supported Payout Methods</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Offer your recipients the flexibility to choose how they want to get paid with our wide range of payout options.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
            <button 
              onClick={() => configureWidget('bank')}
              className={`py-3 px-4 rounded-md transition-colors ${activeTab === 'bank' ? 'bg-payouts-accent text-payouts-dark' : 'bg-white/5 text-white/70 hover:bg-white/10'}`}
            >
              Bank Transfer
            </button>
            <button 
              onClick={() => configureWidget('crypto')}
              className={`py-3 px-4 rounded-md transition-colors ${activeTab === 'crypto' ? 'bg-payouts-accent text-payouts-dark' : 'bg-white/5 text-white/70 hover:bg-white/10'}`}
            >
              Cryptocurrency
            </button>
            <button 
              onClick={() => configureWidget('gift')}
              className={`py-3 px-4 rounded-md transition-colors ${activeTab === 'gift' ? 'bg-payouts-accent text-payouts-dark' : 'bg-white/5 text-white/70 hover:bg-white/10'}`}
            >
              Gift Cards
            </button>
            <button 
              className="py-3 px-4 rounded-md bg-white/5 text-white/70 hover:bg-white/10 transition-colors"
            >
              Digital Wallets
            </button>
            <button 
              className="py-3 px-4 rounded-md bg-white/5 text-white/70 hover:bg-white/10 transition-colors"
            >
              Push-to-Card
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="p-8 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
              <div className="max-w-xs mx-auto">
                <PayoutWidget />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Customize Your Brand Experience</h3>
              <p className="text-white/70 mb-6">
                Fully customize the payout widget to match your brand. Adjust colors, borders, and styles to create a seamless experience for your recipients.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-sm font-medium mb-2">Border Radius</div>
                  <div className="flex justify-between">
                    <button className="w-8 h-8 rounded-sm border border-white/20 flex items-center justify-center">S</button>
                    <button className="w-8 h-8 rounded-md border border-white/20 flex items-center justify-center bg-payouts-accent text-payouts-dark">M</button>
                    <button className="w-8 h-8 rounded-lg border border-white/20 flex items-center justify-center">L</button>
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-sm font-medium mb-2">Button Style</div>
                  <div className="flex justify-between">
                    <div className="w-8 h-8 rounded-none border border-white/20 flex items-center justify-center">□</div>
                    <div className="w-8 h-8 rounded-md border border-white/20 flex items-center justify-center bg-payouts-accent text-payouts-dark">⬭</div>
                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">○</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-[#0f2a35] border border-white/20"></div>
                <div className="w-8 h-8 rounded-full bg-[#d0e92a] border border-white/20"></div>
                <div className="w-8 h-8 rounded-full bg-[#143745] border border-white/20"></div>
                <div className="w-8 h-8 rounded-full bg-[#ffffff] border border-white/20"></div>
                <div className="w-8 h-8 rounded-full bg-[#21404d] border border-white/20"></div>
              </div>

              <Button 
                className="bg-payouts-accent text-payouts-dark hover:bg-payouts-accent/90"
              >
                Try Customization Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to simplify your global payouts?</h2>
            <p className="text-white/70 mb-8">
              Embed our Smart Payout Widget and transform your payout operations with just a few lines of code.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-payouts-accent text-payouts-dark hover:bg-payouts-accent/90 px-8"
              >
                Request a Demo
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white/20 hover:bg-white/5"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-white/60">
                &copy; {new Date().getFullYear()} Smart Payout Widget. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                Terms
              </Button>
              <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                Privacy
              </Button>
              <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
                Security
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Marketing;
