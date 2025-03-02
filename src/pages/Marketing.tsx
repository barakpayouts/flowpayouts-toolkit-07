
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PayoutWidget from '@/components/Widget/PayoutWidget';
import { Button } from '@/components/ui/button';
import { useWidgetConfig } from '@/hooks/use-widget-config';
import { ChevronRight, Globe, CheckCircle, Shield, RefreshCcw, ArrowRight, CreditCard, Bitcoin, Gift, DollarSign, BanknoteIcon, Wallet, Settings, Palette } from 'lucide-react';

const Marketing = () => {
  const navigate = useNavigate();
  const { config, updateConfig } = useWidgetConfig();
  
  // Set default configuration for marketing page display
  React.useEffect(() => {
    updateConfig({
      recipientType: 'vendor',
      steps: ['profile', 'bank', 'tax'],
      payoutMethods: ['bank', 'crypto', 'digital', 'card', 'prepaid', 'gift'],
      showProgressBar: true,
      showStepNumbers: true
    });
  }, [updateConfig]);

  return (
    <div className="min-h-screen bg-payouts-dark text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pb-24 px-6">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute w-[500px] h-[500px] rounded-full bg-payouts-accent/5 blur-3xl -top-64 -right-64"></div>
          <div className="absolute w-[500px] h-[500px] rounded-full bg-payouts-accent/5 blur-3xl -bottom-64 -left-64"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex justify-between items-center mb-8">
            <a href="/" className="block">
              <img 
                src="https://payouts.com/wp-content/uploads/2024/02/Payoutscom-logo-light.svg" 
                alt="Payouts.com" 
                className="h-8 md:h-10"
              />
            </a>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => navigate('/widget')}
                variant="outline"
                className="bg-transparent border border-white/20 hover:bg-white/10 hidden sm:flex"
              >
                Try Demo
              </Button>
              <Button 
                className="bg-payouts-accent text-payouts-dark hover:bg-payouts-accent/90 font-semibold"
              >
                Request Demo
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-16">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                White-labeled <span className="text-payouts-accent">Global Payouts</span> for Your Software Platform
              </h1>
              <p className="text-xl md:text-2xl text-white/80 mb-8">
                Seamlessly embed our Smart Payout Widget to disburse funds to vendors, affiliates, creators—anyone, anywhere.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button 
                  className="bg-payouts-accent text-payouts-dark hover:bg-payouts-accent/90 font-semibold text-lg px-8 py-6 rounded-xl shadow-lg flex items-center gap-2"
                  onClick={() => navigate('/widget')}
                >
                  Try Demo <ChevronRight size={20} />
                </Button>
                <Button 
                  variant="outline"
                  className="bg-transparent border-2 border-white/20 hover:bg-white/10 text-lg px-8 py-6 rounded-xl"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="glassmorphism-intense p-4 rounded-xl relative z-10 transform transition-all hover:-translate-y-2 shadow-xl">
                <PayoutWidget className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-payouts-dark to-payouts-medium relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1920&q=20')] bg-cover bg-center opacity-5"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Streamline Your Disbursement Process
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Benefit Box 1 */}
            <div className="glass-card p-8 rounded-xl flex flex-col h-full transform transition-all hover:-translate-y-2 hover:shadow-lg">
              <div className="w-16 h-16 rounded-xl bg-payouts-accent/20 flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8 text-payouts-accent" />
              </div>
              <h3 className="text-xl font-bold mb-4">Create more value for your recipients</h3>
              <p className="text-white/70 flex-grow">
                Our widget fits seamlessly into your platform, letting you pay vendors, influencers, insured parties, or employees with ease—driving satisfaction and loyalty.
              </p>
            </div>
            
            {/* Benefit Box 2 */}
            <div className="glass-card p-8 rounded-xl flex flex-col h-full transform transition-all hover:-translate-y-2 hover:shadow-lg">
              <div className="w-16 h-16 rounded-xl bg-payouts-accent/20 flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-payouts-accent" />
              </div>
              <h3 className="text-xl font-bold mb-4">Reach 190+ countries with 130+ currencies</h3>
              <p className="text-white/70 flex-grow">
                From local bank transfers and push-to-card to PayPal, crypto, and gift cards—offer your recipients ultimate flexibility.
              </p>
            </div>
            
            {/* Benefit Box 3 */}
            <div className="glass-card p-8 rounded-xl flex flex-col h-full transform transition-all hover:-translate-y-2 hover:shadow-lg">
              <div className="w-16 h-16 rounded-xl bg-payouts-accent/20 flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-payouts-accent" />
              </div>
              <h3 className="text-xl font-bold mb-4">Automate compliance & settlements</h3>
              <p className="text-white/70 flex-grow">
                Payouts.com handles KYC/AML checks, tax forms, and cross-border regulations so you can focus on growing your business.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Payout Methods Section */}
      <section className="py-20 px-6 bg-payouts-dark">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              We Support <span className="text-payouts-accent">Multiple Payout Methods</span>
            </h2>
            <p className="text-white/70 text-lg max-w-3xl mx-auto">
              Provide your recipients with the flexibility to choose their preferred payout method
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mt-12">
            {/* Bank Transfer */}
            <div className="glass-card p-6 rounded-xl text-center hover:shadow-lg transition-all">
              <div className="w-16 h-16 rounded-full bg-payouts-accent/20 flex items-center justify-center mx-auto mb-4">
                <BanknoteIcon className="w-8 h-8 text-payouts-accent" />
              </div>
              <h3 className="text-lg font-bold mb-1">Bank Transfer</h3>
              <p className="text-white/70 text-sm">Direct to account</p>
            </div>
            
            {/* Push to Card */}
            <div className="glass-card p-6 rounded-xl text-center hover:shadow-lg transition-all">
              <div className="w-16 h-16 rounded-full bg-payouts-accent/20 flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-payouts-accent" />
              </div>
              <h3 className="text-lg font-bold mb-1">Push to Card</h3>
              <p className="text-white/70 text-sm">Visa & Mastercard</p>
            </div>
            
            {/* Digital Wallet */}
            <div className="glass-card p-6 rounded-xl text-center hover:shadow-lg transition-all">
              <div className="w-16 h-16 rounded-full bg-payouts-accent/20 flex items-center justify-center mx-auto mb-4">
                <Wallet className="w-8 h-8 text-payouts-accent" />
              </div>
              <h3 className="text-lg font-bold mb-1">Digital Wallet</h3>
              <p className="text-white/70 text-sm">PayPal, Venmo, etc.</p>
            </div>
            
            {/* Cryptocurrency */}
            <div className="glass-card p-6 rounded-xl text-center hover:shadow-lg transition-all">
              <div className="w-16 h-16 rounded-full bg-payouts-accent/20 flex items-center justify-center mx-auto mb-4">
                <Bitcoin className="w-8 h-8 text-payouts-accent" />
              </div>
              <h3 className="text-lg font-bold mb-1">Cryptocurrency</h3>
              <p className="text-white/70 text-sm">BTC, ETH & more</p>
            </div>
            
            {/* Gift Cards */}
            <div className="glass-card p-6 rounded-xl text-center hover:shadow-lg transition-all">
              <div className="w-16 h-16 rounded-full bg-payouts-accent/20 flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-payouts-accent" />
              </div>
              <h3 className="text-lg font-bold mb-1">Gift Cards</h3>
              <p className="text-white/70 text-sm">Major retailers</p>
            </div>
            
            {/* Cash Pickup */}
            <div className="glass-card p-6 rounded-xl text-center hover:shadow-lg transition-all">
              <div className="w-16 h-16 rounded-full bg-payouts-accent/20 flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-payouts-accent" />
              </div>
              <h3 className="text-lg font-bold mb-1">Cash Pickup</h3>
              <p className="text-white/70 text-sm">Worldwide network</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Customization Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-payouts-medium to-payouts-dark relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1572059152504-4b1d7db4b3b6?auto=format&fit=crop&w=1920&q=20')] bg-cover bg-center opacity-5"></div>
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="text-payouts-accent">White-Label</span> the Widget to Match Your Brand
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Customize every aspect of the payout experience to create a seamless extension of your platform.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-payouts-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Palette className="w-6 h-6 text-payouts-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Brand Colors and Typography</h3>
                    <p className="text-white/70">
                      Apply your brand colors, fonts, and visual style for a consistent user experience.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-payouts-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Settings className="w-6 h-6 text-payouts-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Configurable User Flow</h3>
                    <p className="text-white/70">
                      Control which verification steps are required and which payout methods to offer.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-payouts-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <RefreshCcw className="w-6 h-6 text-payouts-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Simple Integration</h3>
                    <p className="text-white/70">
                      Easy to implement with our JavaScript SDK, React component, or direct API integration.
                    </p>
                  </div>
                </div>
              </div>
              
              <Button 
                className="mt-10 bg-payouts-accent text-payouts-dark hover:bg-payouts-accent/90 font-semibold px-8 py-3 rounded-lg flex items-center gap-2"
                onClick={() => navigate('/widget')}
              >
                Try Customization <ArrowRight size={18} />
              </Button>
            </div>
            
            <div className="flex justify-center">
              <div className="p-6 rounded-xl border border-white/10 bg-payouts-dark/60 backdrop-blur-md shadow-2xl relative">
                <div className="absolute -top-16 right-4 p-4 bg-payouts-accent/10 backdrop-blur-md border border-payouts-accent/20 rounded-xl shadow-lg max-w-[260px]">
                  <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
                    <Palette size={18} className="text-payouts-accent" />
                    Color Customization
                  </h4>
                  <div className="flex gap-2 mb-3">
                    {['#d0e92a', '#FF6B6B', '#4ECDC4', '#4ECDC4', '#845EC2'].map((color) => (
                      <div 
                        key={color}
                        className="w-8 h-8 rounded-full cursor-pointer ring-2 ring-white/20 hover:ring-white/40 transition-all"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <h4 className="text-sm font-bold mb-1">Preview</h4>
                  <div className="bg-payouts-medium p-3 rounded-lg">
                    <div className="text-xs text-white/60">Brand color affects all elements</div>
                    <div className="flex mt-2 gap-2">
                      <div className="px-3 py-1 rounded-md text-xs font-medium bg-payouts-accent text-payouts-dark">Button</div>
                      <div className="px-3 py-1 rounded-md text-xs font-medium border border-payouts-accent text-white">Outline</div>
                    </div>
                  </div>
                </div>
                
                <img 
                  src="https://images.unsplash.com/photo-1585423768249-08a23ca8e2ec?auto=format&fit=crop&w=800&q=80" 
                  alt="Dashboard preview" 
                  className="rounded-lg border border-white/10 shadow-lg"
                />
                
                <div className="absolute -bottom-12 -left-4 p-4 bg-payouts-accent/10 backdrop-blur-md border border-payouts-accent/20 rounded-xl shadow-lg max-w-[220px]">
                  <h4 className="text-sm font-bold mb-2">Configure Recipient Types</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 rounded-md bg-white/10">
                      <input type="checkbox" checked readOnly className="rounded bg-payouts-accent text-payouts-accent" />
                      <span className="text-xs">Vendors</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-md bg-white/10">
                      <input type="checkbox" checked readOnly className="rounded bg-payouts-accent text-payouts-accent" />
                      <span className="text-xs">Contractors</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-md bg-white/10">
                      <input type="checkbox" checked readOnly className="rounded bg-payouts-accent text-payouts-accent" />
                      <span className="text-xs">Insured Parties</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 px-6 bg-payouts-dark relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-payouts-accent/5 to-transparent"></div>
          <div className="absolute w-[800px] h-[800px] rounded-full bg-payouts-accent/5 blur-3xl -top-[400px] -right-[400px]"></div>
        </div>
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to <span className="text-payouts-accent">simplify your global payouts</span>?
          </h2>
          <p className="text-white/80 text-xl max-w-3xl mx-auto mb-12">
            Embed our Smart Payout Widget and transform your payout operations. Reach recipients anywhere in the world, with their preferred payment method.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button 
              className="bg-payouts-accent text-payouts-dark hover:bg-payouts-accent/90 font-semibold text-lg px-10 py-6 rounded-xl shadow-lg w-full sm:w-auto"
            >
              Request a Demo
            </Button>
            <Button 
              variant="outline"
              className="bg-transparent border-2 border-white/20 hover:bg-white/10 text-lg px-10 py-6 rounded-xl w-full sm:w-auto"
              onClick={() => navigate('/widget')}
            >
              Try Widget Demo
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-6 bg-payouts-dark border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <img 
                src="https://payouts.com/wp-content/uploads/2024/02/Payoutscom-logo-light.svg" 
                alt="Payouts.com" 
                className="h-8"
              />
              <p className="text-white/60 mt-3">
                Global payment disbursement solution
              </p>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-4 justify-center md:justify-end">
              <a href="#" className="text-white/70 hover:text-white transition-colors">Product</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">Pricing</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">Developers</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">Company</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              © 2024 Payouts.com. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Marketing;
