
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, CircleDollarSign, GanttChartSquare, Gem, Globe, PiggyBank, Smartphone, ThumbsUp, Wallet, Building, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedGradient from '@/components/ui/AnimatedGradient';
import GlassMorphism from '@/components/ui/GlassMorphism';

const Marketing = () => {
  const [activeScreen, setActiveScreen] = useState(0);
  
  // Add bank verification to the screens
  const screens = [
    {
      name: 'Home',
      component: (
        <div className="text-center space-y-4 p-4">
          <div className="mb-6 flex justify-center">
            <CircleDollarSign className="h-12 w-12 text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold">flowpayouts</h3>
          <p className="text-sm text-white/70">Fast, secure payment solutions</p>
          <div className="pt-6">
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-white/10 text-center">
                <Wallet className="h-5 w-5 mx-auto mb-2" />
                <span className="text-xs">Send</span>
              </div>
              <div className="p-3 rounded-lg bg-white/10 text-center">
                <PiggyBank className="h-5 w-5 mx-auto mb-2" />
                <span className="text-xs">Save</span>
              </div>
              <div className="p-3 rounded-lg bg-white/10 text-center">
                <GanttChartSquare className="h-5 w-5 mx-auto mb-2" />
                <span className="text-xs">Manage</span>
              </div>
            </div>
          </div>
          <div className="pt-4">
            <button className="w-full py-3 bg-purple-600 rounded-lg text-white font-medium">
              Get Started
            </button>
          </div>
        </div>
      )
    },
    {
      name: 'Setup',
      component: (
        <div className="text-center space-y-4 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Profile Setup</h3>
            <div className="text-xs bg-white/10 px-2 py-1 rounded">1/3</div>
          </div>
          <div className="space-y-4">
            <div className="text-left">
              <label className="text-xs text-white/70 block mb-1">Full Name</label>
              <input type="text" className="w-full p-3 bg-white/10 rounded-lg border border-white/20" placeholder="John Doe" />
            </div>
            <div className="text-left">
              <label className="text-xs text-white/70 block mb-1">Email Address</label>
              <input type="email" className="w-full p-3 bg-white/10 rounded-lg border border-white/20" placeholder="john@example.com" />
            </div>
            <div className="text-left">
              <label className="text-xs text-white/70 block mb-1">Phone Number</label>
              <input type="tel" className="w-full p-3 bg-white/10 rounded-lg border border-white/20" placeholder="+1 (555) 123-4567" />
            </div>
          </div>
          <div className="pt-4">
            <button className="w-full py-3 bg-purple-600 rounded-lg text-white font-medium flex items-center justify-center">
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      )
    },
    {
      name: 'Bank Verification',
      component: (
        <div className="text-center space-y-4 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Bank Verification</h3>
            <div className="text-xs bg-white/10 px-2 py-1 rounded">2/3</div>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm text-white/70">Connect your bank account securely</p>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white/10 rounded-lg text-center border border-white/20">
                <Building className="h-6 w-6 mx-auto mb-2" />
                <span className="text-xs">Chase</span>
              </div>
              <div className="p-3 bg-white/10 rounded-lg text-center border border-white/20">
                <Building className="h-6 w-6 mx-auto mb-2" />
                <span className="text-xs">Bank of America</span>
              </div>
              <div className="p-3 bg-white/10 rounded-lg text-center border border-white/20">
                <Building className="h-6 w-6 mx-auto mb-2" />
                <span className="text-xs">Wells Fargo</span>
              </div>
              <div className="p-3 bg-white/10 rounded-lg text-center border border-white/20">
                <Building className="h-6 w-6 mx-auto mb-2" />
                <span className="text-xs">Citibank</span>
              </div>
            </div>
            
            <div className="flex items-center justify-center text-xs text-white/60 gap-1">
              <Lock className="h-3 w-3" />
              <span>Secure connection via Plaid</span>
            </div>
          </div>
          
          <div className="pt-4">
            <button className="w-full py-3 bg-purple-600 rounded-lg text-white font-medium flex items-center justify-center">
              Connect Account <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      )
    },
    {
      name: 'Methods',
      component: (
        <div className="text-center space-y-4 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Payout Method</h3>
            <div className="text-xs bg-white/10 px-2 py-1 rounded">3/3</div>
          </div>
          <p className="text-sm text-white/70">How would you like to receive funds?</p>
          <div className="space-y-3 pt-2">
            <div className="p-3 rounded-lg bg-white/10 border border-purple-500 flex items-center">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                <Wallet className="h-4 w-4 text-purple-400" />
              </div>
              <div className="text-left">
                <div className="font-medium">Direct Deposit</div>
                <div className="text-xs text-white/70">2-3 business days</div>
              </div>
              <div className="ml-auto">
                <div className="w-5 h-5 rounded-full border-2 border-purple-500 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                </div>
              </div>
            </div>
            
            <div className="p-3 rounded-lg bg-white/10 border border-white/20 flex items-center">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-3">
                <Globe className="h-4 w-4" />
              </div>
              <div className="text-left">
                <div className="font-medium">International Wire</div>
                <div className="text-xs text-white/70">3-5 business days</div>
              </div>
              <div className="ml-auto">
                <div className="w-5 h-5 rounded-full border-2 border-white/30"></div>
              </div>
            </div>
            
            <div className="p-3 rounded-lg bg-white/10 border border-white/20 flex items-center">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-3">
                <Gem className="h-4 w-4" />
              </div>
              <div className="text-left">
                <div className="font-medium">Cryptocurrency</div>
                <div className="text-xs text-white/70">Instant transfer</div>
              </div>
              <div className="ml-auto">
                <div className="w-5 h-5 rounded-full border-2 border-white/30"></div>
              </div>
            </div>
          </div>
          <div className="pt-4">
            <button className="w-full py-3 bg-purple-600 rounded-lg text-white font-medium flex items-center justify-center">
              Complete Setup <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      )
    },
    {
      name: 'Success',
      component: (
        <div className="text-center space-y-4 p-4 flex flex-col items-center justify-center h-full">
          <div className="mb-4">
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
          </div>
          <h3 className="text-xl font-semibold">Setup Complete!</h3>
          <p className="text-sm text-white/70">Your account is ready to receive payments</p>
          <div className="pt-8 w-full">
            <button className="w-full py-3 bg-purple-600 rounded-lg text-white font-medium">
              Go to Dashboard
            </button>
            <button className="w-full py-3 mt-3 bg-transparent border border-white/20 rounded-lg text-white font-medium">
              View Payment Methods
            </button>
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveScreen((prev) => (prev + 1) % screens.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [screens.length]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white overflow-hidden">
      <AnimatedGradient />
      
      <div className="container mx-auto px-4 py-12 lg:py-24 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-block mb-4">
            <span className="bg-purple-900/30 text-purple-400 text-sm font-medium px-4 py-1.5 rounded-full">Modern Payment Solutions</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Transforming how businesses handle <span className="text-purple-400">payouts</span></h1>
          <p className="text-xl text-white/80 mb-8">Our platform makes it easy to manage global payments, reduce costs, and improve the experience for your customers and partners.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">Start for free</Button>
            <Button size="lg" variant="outline" className="border-white/20 bg-white/5 backdrop-blur-sm">
              <Link to="/widget">View Demo</Link>
            </Button>
          </div>
        </div>
        
        {/* iPhone Mockup with Animation */}
        <div className="max-w-sm mx-auto relative">
          <div className="relative mx-auto border-[14px] border-gray-800 rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
            <div className="w-[148px] h-[18px] bg-gray-800 absolute -top-[14px] left-1/2 transform -translate-x-1/2 rounded-b-[1rem] z-20"></div>
            <div className="w-[56px] h-[5px] bg-gray-800 absolute -bottom-[14px] left-1/2 transform -translate-x-1/2 rounded-t-[0.3rem] z-20"></div>
            <div className="h-full w-full bg-gray-900 overflow-hidden rounded-[2rem] flex items-center justify-center relative">
              {/* Phone Content */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-950 overflow-hidden">
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,rgba(120,70,220,0.8)_0,#20133f_100%)]"></div>
                
                {/* Status Bar */}
                <div className="relative z-10 px-4 py-2 flex justify-between items-center text-xs">
                  <div>9:41</div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 rounded-full bg-white"></div>
                    <div className="h-3 w-3 rounded-full bg-white"></div>
                    <div className="h-3 w-3 rounded-full bg-white"></div>
                    <div className="h-3 w-3 rounded-full bg-white"></div>
                  </div>
                </div>
                
                {/* Screen Content */}
                <div className="relative z-10 h-[calc(100%-40px)]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeScreen}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="h-full flex items-center justify-center"
                    >
                      {screens[activeScreen].component}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
          
          {/* Screen Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {screens.map((_, index) => (
              <div 
                key={index} 
                className={`h-2 rounded-full transition-all ${activeScreen === index ? 'w-8 bg-purple-500' : 'w-2 bg-white/30'}`}
              ></div>
            ))}
          </div>
        </div>
        
        {/* Features Section */}
        <div className="py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Platform</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Our payment solution is designed with both businesses and users in mind, providing a seamless experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <GlassMorphism className="p-6">
              <div className="h-12 w-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
              <p className="text-white/70">Send payments to more than 190 countries in 100+ currencies with competitive exchange rates.</p>
            </GlassMorphism>
            
            <GlassMorphism className="p-6">
              <div className="h-12 w-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                <ThumbsUp className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Integration</h3>
              <p className="text-white/70">Simple APIs and developer tools that make integration a breeze, regardless of your platform.</p>
            </GlassMorphism>
            
            <GlassMorphism className="p-6">
              <div className="h-12 w-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                <Smartphone className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Modern Experience</h3>
              <p className="text-white/70">Intuitive mobile-first design that makes managing payments simple for everyone.</p>
            </GlassMorphism>
            
            <GlassMorphism className="p-6">
              <div className="h-12 w-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Enterprise Security</h3>
              <p className="text-white/70">Bank-level security with advanced fraud protection and compliance built-in.</p>
            </GlassMorphism>
            
            <GlassMorphism className="p-6">
              <div className="h-12 w-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                <CircleDollarSign className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Cost Effective</h3>
              <p className="text-white/70">Transparent pricing with no hidden fees, saving you money on every transaction.</p>
            </GlassMorphism>
            
            <GlassMorphism className="p-6">
              <div className="h-12 w-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Reliable Service</h3>
              <p className="text-white/70">99.99% uptime with 24/7 support to ensure your payments are always processed on time.</p>
            </GlassMorphism>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="py-16">
          <GlassMorphism className="max-w-4xl mx-auto p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to transform your payment operations?</h2>
            <p className="text-xl text-white/70 mb-8">Join thousands of businesses that trust our platform for their payment needs.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">Get Started</Button>
              <Button size="lg" variant="outline" className="border-white/20 bg-white/5 backdrop-blur-sm">Contact Sales</Button>
            </div>
          </GlassMorphism>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="border-t border-white/10 py-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <CircleDollarSign className="h-6 w-6 text-purple-400 mr-2" />
                <span className="text-xl font-semibold">flowpayouts</span>
              </div>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-white/70 hover:text-white transition-colors">About</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">Features</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">Pricing</a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">Contact</a>
            </div>
            <div className="mt-4 md:mt-0 text-white/50 text-sm">
              © 2023 FlowPayouts. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Marketing;
