
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronRight, CheckCircle2, CreditCard, ChevronDown, CpuIcon, Wallet, Clock, Shield, Key, UserCheck, Check, Calendar, Landmark, Building, Banknote } from 'lucide-react';
import AnimatedGradient from '@/components/ui/AnimatedGradient';
import GlassMorphism from '@/components/ui/GlassMorphism';
import { useWidgetConfig } from '@/hooks/use-widget-config';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Marketing = () => {
  const navigate = useNavigate();
  const { updateConfig } = useWidgetConfig();
  
  // Animation state for the iPhone mockup
  const [currentScreen, setCurrentScreen] = useState(0);
  
  // Array of screens to cycle through
  const screens = [
    { id: 'payout-methods', title: 'Payment Methods', subtitle: 'Choose your preferred way to receive funds' },
    { id: 'profile-info', title: 'Profile Information', subtitle: 'Basic details to process your payment' },
    { id: 'bank-verification', title: 'Bank Verification', subtitle: 'Connect your bank account securely' },
    { id: 'tax-form', title: 'Tax Information', subtitle: 'Required for compliance purposes' },
    { id: 'success', title: 'All Set!', subtitle: 'Your payment is on its way' }
  ];
  
  // Auto cycle through screens
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScreen((prev) => (prev + 1) % screens.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [screens.length]);
  
  const renderMockupContent = () => {
    switch(screens[currentScreen].id) {
      case 'payout-methods':
        return (
          <div className="animate-fade-in">
            <div className="mb-4 text-center">
              <h3 className="text-sm font-bold text-[#0f2a35] mb-1">Payment Methods</h3>
              <p className="text-xs text-[#0f2a35]/80">Choose your preferred option</p>
            </div>
            <div className="space-y-2">
              {['Bank Transfer', 'Digital Wallet', 'Cryptocurrency', 'Prepaid Card'].map((method, index) => (
                <div key={index} className={`p-3 rounded-lg border ${index === 0 ? 'border-[#8B5CF6] bg-[#8B5CF6]/20' : 'border-gray-300 bg-white'} flex items-center justify-between`}>
                  <div className="flex items-center gap-2">
                    <span className={`w-8 h-8 rounded-full ${index === 0 ? 'bg-[#8B5CF6]/30' : 'bg-[#0f2a35]/10'} flex items-center justify-center`}>
                      {index === 0 ? <Wallet size={16} className="text-[#8B5CF6]" /> : 
                       index === 1 ? <CreditCard size={16} /> : 
                       index === 2 ? <CpuIcon size={16} /> : 
                       <Calendar size={16} />}
                    </span>
                    <span className="text-xs font-semibold text-[#1A1F2C]">{method}</span>
                  </div>
                  {index === 0 && <Check size={16} className="text-[#8B5CF6]" />}
                </div>
              ))}
            </div>
          </div>
        );
      case 'profile-info':
        return (
          <div className="animate-fade-in">
            <div className="mb-4 text-center">
              <h3 className="text-sm font-bold text-[#0f2a35] mb-1">Profile Information</h3>
              <p className="text-xs text-[#0f2a35]/80">We need a few details</p>
            </div>
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs text-[#0f2a35]/80 font-medium">Full Name</label>
                <input type="text" value="Jane Doe" className="text-xs p-2 rounded-md border border-gray-300 w-full bg-white text-[#1A1F2C]" readOnly />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-[#0f2a35]/80 font-medium">Email Address</label>
                <input type="email" value="jane.doe@example.com" className="text-xs p-2 rounded-md border border-gray-300 w-full bg-white text-[#1A1F2C]" readOnly />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-[#0f2a35]/80 font-medium">Phone Number</label>
                <input type="tel" value="(555) 123-4567" className="text-xs p-2 rounded-md border border-gray-300 w-full bg-white text-[#1A1F2C]" readOnly />
              </div>
            </div>
          </div>
        );
      case 'bank-verification':
        return (
          <div className="animate-fade-in">
            <div className="mb-4 text-center">
              <h3 className="text-sm font-bold text-[#0f2a35] mb-1">Bank Verification</h3>
              <p className="text-xs text-[#0f2a35]/80">Connect your account securely</p>
            </div>
            <div className="space-y-3">
              <div className="flex mb-3 border-b border-gray-300">
                {['Plaid', 'Statement', 'Manual'].map((method, i) => (
                  <button key={i} className={`flex-1 text-xs py-2 px-1 ${i === 0 ? 'border-b-2 border-[#0EA5E9] font-medium text-[#0EA5E9]' : 'text-gray-600'}`}>
                    {method}
                  </button>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {['Chase', 'Wells Fargo', 'Bank of America', 'Citibank'].map((bank, index) => (
                  <div key={index} className={`p-2 rounded-lg border ${index === 0 ? 'border-[#0EA5E9] bg-[#0EA5E9]/10' : 'border-gray-300'} bg-white text-center`}>
                    <Building size={16} className={`mx-auto mb-1 ${index === 0 ? 'text-[#0EA5E9]' : 'text-[#403E43]'}`} />
                    <span className="text-xs font-medium text-[#1A1F2C]">{bank}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-center mt-2 gap-1 text-xs text-[#403E43]">
                <Shield size={12} className="text-[#0EA5E9]" />
                <span>Your credentials are secure</span>
              </div>
            </div>
          </div>
        );
      case 'tax-form':
        return (
          <div className="animate-fade-in">
            <div className="mb-4 text-center">
              <h3 className="text-sm font-bold text-[#0f2a35] mb-1">Tax Information</h3>
              <p className="text-xs text-[#0f2a35]/80">Required for compliance</p>
            </div>
            <div className="p-3 border border-gray-300 rounded-lg bg-white mb-3">
              <div className="flex justify-between mb-2">
                <span className="text-xs font-medium text-[#1A1F2C]">W-9 Form</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">Recommended</span>
              </div>
              <p className="text-xs text-[#403E43]">For U.S. individuals and businesses</p>
            </div>
            <div className="p-3 border border-gray-300 rounded-lg bg-white">
              <div className="flex justify-between mb-2">
                <span className="text-xs font-medium text-[#1A1F2C]">W-8BEN Form</span>
              </div>
              <p className="text-xs text-[#403E43]">For non-U.S. individuals</p>
            </div>
          </div>
        );
      case 'success':
        return (
          <div className="animate-fade-in text-center py-6">
            <div className="w-16 h-16 rounded-full bg-green-100 mx-auto flex items-center justify-center mb-3">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-sm font-bold text-[#0f2a35] mb-1">Verification Complete</h3>
            <p className="text-xs text-[#0f2a35]/80 mb-4">Your payment is on its way</p>
            <div className="p-3 rounded-lg bg-[#F97316]/10 border border-[#F97316]">
              <div className="flex justify-between mb-1">
                <span className="text-xs font-medium text-[#1A1F2C]">Amount</span>
                <span className="text-xs font-bold text-[#1A1F2C]">$1,250.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs font-medium text-[#1A1F2C]">Estimated delivery</span>
                <span className="text-xs text-[#403E43]">1-2 business days</span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-payouts-dark to-payouts-dark/80 text-white p-4 relative overflow-hidden">
      <AnimatedGradient className="absolute inset-0 opacity-30" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex justify-between items-center py-6">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
            Payouts.com
          </h1>
          
          <Button 
            variant="outline" 
            onClick={() => navigate('/widget-demo')}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-full pl-4 pr-3"
          >
            Try the Demo <ChevronRight size={16} />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
                Smart Payment Solutions for Modern Businesses
              </span>
            </h2>
            
            <p className="text-lg text-white/80">
              Our intelligent payout system adapts to your business needs, offering multiple verification methods and payment options.
            </p>
            
            <div className="flex flex-wrap gap-3 pt-2">
              <Button onClick={() => navigate('/widget-demo')} 
                className="bg-gradient-to-r from-[#F97316] to-[#F97316]/90 text-white hover:from-[#F97316]/90 hover:to-[#F97316] rounded-full pl-5 pr-4">
                Get Started <ChevronRight size={16} />
              </Button>
              
              <Button variant="outline" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-full">
                Learn More
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-4">
              {[
                { text: "Secure Verification", icon: <Shield size={16} /> },
                { text: "Real-time Payments", icon: <Clock size={16} /> },
                { text: "Multiple Payment Methods", icon: <Wallet size={16} /> },
                { text: "Compliance Built-in", icon: <CheckCircle2 size={16} /> }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-3 py-2 rounded-full">
                  {item.icon}
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="relative">
              {/* iPhone mockup - improved contrast */}
              <div className="w-[250px] h-[500px] bg-white rounded-[40px] shadow-2xl p-3 relative overflow-hidden">
                {/* iPhone notch */}
                <div className="absolute top-0 left-0 right-0 h-6 bg-white z-10 flex justify-center">
                  <div className="w-[120px] h-[30px] bg-black rounded-b-3xl"></div>
                </div>
                
                {/* Screen content with improved contrast */}
                <div className="h-full bg-gray-50 rounded-[32px] pt-8 px-4 pb-4 overflow-hidden flex flex-col">
                  {/* Status bar */}
                  <div className="flex justify-between text-xs font-medium text-[#0f2a35] mb-4">
                    <span>9:41</span>
                    <div className="flex items-center gap-1">
                      <span className="block w-4 h-2 bg-[#0f2a35] rounded-sm"></span>
                      <span className="block w-3 h-3 rounded-full border-2 border-[#0f2a35]"></span>
                    </div>
                  </div>
                  
                  {/* App header */}
                  <div className="h-full flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded-full bg-[#0f2a35] flex items-center justify-center">
                        <Landmark size={14} className="text-[#F97316]" />
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs text-[#0f2a35] font-bold">Step {currentScreen + 1} of {screens.length}</span>
                      </div>
                    </div>
                    
                    {/* Screen content depends on current screen */}
                    <div className="flex-1 overflow-hidden">
                      {renderMockupContent()}
                    </div>
                    
                    {/* Navigation buttons */}
                    <div className="mt-auto">
                      <button className="w-full py-2 rounded-lg bg-[#0f2a35] text-white text-xs font-medium">
                        {currentScreen === screens.length - 1 ? 'Done' : 'Continue'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Animation indicator */}
              <div className="flex justify-center gap-1.5 mt-4">
                {screens.map((_, index) => (
                  <div 
                    key={index} 
                    className={`w-2 h-2 rounded-full ${currentScreen === index ? 'bg-[#F97316]' : 'bg-white/30'}`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <GlassMorphism className="mb-20 mt-12 py-12 px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
              Features That Set Us Apart
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Our smart widget adapts to your business needs, providing a seamless experience for both you and your recipients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Smart Verification",
                description: "Adaptive verification steps based on recipient type and risk profile.",
                icon: <UserCheck className="h-6 w-6 text-payouts-accent" />
              },
              {
                title: "Multiple Payout Methods",
                description: "Support for bank transfers, digital wallets, crypto, cards, and more.",
                icon: <Wallet className="h-6 w-6 text-payouts-accent" />
              },
              {
                title: "Secure & Compliant",
                description: "Bank-level encryption with built-in tax document collection.",
                icon: <Key className="h-6 w-6 text-payouts-accent" />
              }
            ].map((item, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                <div className="w-12 h-12 rounded-full bg-payouts-accent/20 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-white/70">{item.description}</p>
              </div>
            ))}
          </div>
        </GlassMorphism>
        
        <GlassMorphism className="mb-20 py-12 px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
              We Support
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Multiple payment methods to meet diverse recipient needs
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "Bank Transfer", icon: <Landmark size={24} />, color: "bg-blue-500/20" },
              { name: "Debit Card", icon: <CreditCard size={24} />, color: "bg-purple-500/20" },
              { name: "Digital Wallet", icon: <Wallet size={24} />, color: "bg-green-500/20" },
              { name: "Cryptocurrency", icon: <CpuIcon size={24} />, color: "bg-yellow-500/20" },
              { name: "Prepaid Card", icon: <Banknote size={24} />, color: "bg-pink-500/20" },
              { name: "Gift Card", icon: <Calendar size={24} />, color: "bg-orange-500/20" }
            ].map((method, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 text-center hover:bg-white/10 transition-all">
                <div className={`w-12 h-12 rounded-full ${method.color} flex items-center justify-center mx-auto mb-3`}>
                  {method.icon}
                </div>
                <h3 className="text-sm font-medium">{method.name}</h3>
              </div>
            ))}
          </div>
        </GlassMorphism>
        
        <GlassMorphism className="mb-20 py-12 px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
                Customizable for Your Business
              </h2>
              <p className="text-white/70 mb-6">
                Our widget adapts to your brand, recipient types, and business needs. Configure verification steps, payout methods, and visual styling.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-payouts-accent mt-0.5" />
                  <div>
                    <h4 className="font-medium">White Label Experience</h4>
                    <p className="text-sm text-white/70">Match your brand colors and style</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-payouts-accent mt-0.5" />
                  <div>
                    <h4 className="font-medium">Recipient-Specific Flows</h4>
                    <p className="text-sm text-white/70">Different processes for vendors, individuals, contractors</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-payouts-accent mt-0.5" />
                  <div>
                    <h4 className="font-medium">API Integration</h4>
                    <p className="text-sm text-white/70">Easily embed in your existing systems</p>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={() => navigate('/widget-demo')}
                className="mt-6 bg-gradient-to-r from-payouts-accent to-payouts-accent/90 text-payouts-dark hover:from-payouts-accent/90 hover:to-payouts-accent rounded-full pl-5 pr-4"
              >
                Try the Demo <ChevronRight size={16} />
              </Button>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <h3 className="font-bold mb-4">Configuration Options</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-white/70 block mb-2">Recipient Type</label>
                  <div className="bg-white/10 p-2 rounded-md flex justify-between items-center">
                    <span>Vendor</span>
                    <ChevronDown size={16} />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-white/70 block mb-2">Verification Steps</label>
                  <div className="flex flex-wrap gap-2">
                    {['Profile', 'Bank', 'Tax'].map((step, i) => (
                      <div key={i} className="bg-white/10 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                        <Check size={14} />
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-white/70 block mb-2">Theme</label>
                  <Tabs defaultValue="default" className="w-full">
                    <TabsList className="grid grid-cols-3 bg-white/10">
                      <TabsTrigger value="default">Default</TabsTrigger>
                      <TabsTrigger value="dark">Dark</TabsTrigger>
                      <TabsTrigger value="custom">Custom</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </GlassMorphism>
        
        <footer className="py-12 border-t border-white/10 text-center">
          <p className="text-white/60">© 2023 Payouts.com — Smart Payment Solutions</p>
          <div className="flex justify-center gap-6 mt-4">
            {['Terms', 'Privacy', 'Contact', 'About'].map((item, i) => (
              <a key={i} href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                {item}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Marketing;
