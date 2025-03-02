
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ArrowRight, Check, ChevronRight, Lock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import AnimatedGradient from '@/components/ui/AnimatedGradient';
import GlassMorphism from '@/components/ui/GlassMorphism';

const Marketing = () => {
  const navigate = useNavigate();
  const [currentScreen, setCurrentScreen] = useState(0);
  
  // Animation screens for the mobile widget
  const screens = [
    {
      name: "profile",
      title: "Profile Information",
      content: (
        <div className="animate-fade-in">
          <div className="mb-4">
            <label className="text-xs text-white/70 mb-1 block">Name</label>
            <div className="border border-white/20 bg-white/10 rounded-lg p-2 text-xs">John Smith</div>
          </div>
          <div className="mb-4">
            <label className="text-xs text-white/70 mb-1 block">Email</label>
            <div className="border border-white/20 bg-white/10 rounded-lg p-2 text-xs">john@example.com</div>
          </div>
          <div className="mb-4">
            <label className="text-xs text-white/70 mb-1 block">Phone</label>
            <div className="border border-white/20 bg-white/10 rounded-lg p-2 text-xs">(555) 123-4567</div>
          </div>
        </div>
      )
    },
    {
      name: "bank",
      title: "Select Bank",
      content: (
        <div className="animate-fade-in">
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="text-center p-2 border border-white/20 bg-white/10 rounded-lg hover:bg-white/20 cursor-pointer">
              <div className="text-lg mb-1">🏦</div>
              <div className="text-xs">Chase</div>
            </div>
            <div className="text-center p-2 border border-white/20 bg-white/10 rounded-lg hover:bg-white/20 cursor-pointer">
              <div className="text-lg mb-1">🏦</div>
              <div className="text-xs">Wells Fargo</div>
            </div>
            <div className="text-center p-2 border border-white/20 bg-white/10 rounded-lg hover:bg-white/20 cursor-pointer">
              <div className="text-lg mb-1">🏦</div>
              <div className="text-xs">Bank of America</div>
            </div>
            <div className="text-center p-2 border border-white/20 bg-white/10 rounded-lg hover:bg-white/20 cursor-pointer">
              <div className="text-lg mb-1">🏦</div>
              <div className="text-xs">Citibank</div>
            </div>
          </div>
          <div className="flex items-center justify-center text-xs text-white/60 gap-1 mt-3">
            <Lock className="h-3 w-3" />
            <p>Secure connection with Plaid</p>
          </div>
        </div>
      )
    },
    {
      name: "bank-login",
      title: "Log in to Bank",
      content: (
        <div className="animate-fade-in">
          <div className="text-center mb-3">
            <div className="text-xl mb-1">🏦</div>
            <div className="text-sm font-medium">Chase</div>
          </div>
          <div className="mb-3">
            <input 
              type="text" 
              placeholder="Username" 
              className="w-full p-2 text-xs bg-white/10 border border-white/20 rounded-lg"
            />
          </div>
          <div className="mb-3">
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full p-2 text-xs bg-white/10 border border-white/20 rounded-lg"
            />
          </div>
          <div className="flex items-center justify-center text-xs text-white/60 gap-1 mt-2">
            <Lock className="h-3 w-3" />
            <p>Your credentials are never stored</p>
          </div>
        </div>
      )
    },
    {
      name: "bank-success",
      title: "Verification Complete",
      content: (
        <div className="animate-fade-in text-center">
          <div className="w-12 h-12 rounded-full bg-payouts-accent/20 mx-auto flex items-center justify-center mb-2">
            <Check className="h-6 w-6 text-payouts-accent" strokeWidth={3} />
          </div>
          <p className="text-xs text-white/80 mb-2">Your bank account has been successfully verified</p>
          <p className="text-xs font-semibold">Chase Bank ****4567</p>
        </div>
      )
    },
    {
      name: "tax",
      title: "Tax Information",
      content: (
        <div className="animate-fade-in">
          <div className="border border-white/20 bg-white/10 rounded-lg p-3 mb-3">
            <div className="flex items-center mb-2">
              <div className="h-4 w-4 rounded-full border border-white/20 mr-2 flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-payouts-accent"></div>
              </div>
              <div className="text-xs font-medium">W-9 Form (US Taxpayer)</div>
            </div>
            <div className="text-xs text-white/70 pl-6">For US citizens or residents</div>
          </div>
          <div className="border border-white/20 bg-white/10 rounded-lg p-3">
            <div className="flex items-center mb-2">
              <div className="h-4 w-4 rounded-full border border-white/20 mr-2"></div>
              <div className="text-xs font-medium">W-8 Form (Non-US)</div>
            </div>
            <div className="text-xs text-white/70 pl-6">For non-US citizens or residents</div>
          </div>
        </div>
      )
    },
    {
      name: "payout",
      title: "Select Payout Method",
      content: (
        <div className="animate-fade-in">
          <div className="space-y-2">
            <div className="border border-white/20 bg-white/10 rounded-lg p-2 flex items-center hover:bg-white/20 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-payouts-accent/10 flex items-center justify-center mr-2">
                <span className="text-lg">🏦</span>
              </div>
              <div>
                <div className="text-xs font-medium">Bank Transfer</div>
                <div className="text-xs text-white/70">2-3 business days</div>
              </div>
              <ChevronRight className="ml-auto h-4 w-4 text-white/40" />
            </div>
            <div className="border border-white/20 bg-white/10 rounded-lg p-2 flex items-center hover:bg-white/20 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-payouts-accent/10 flex items-center justify-center mr-2">
                <span className="text-lg">₿</span>
              </div>
              <div>
                <div className="text-xs font-medium">Cryptocurrency</div>
                <div className="text-xs text-white/70">Instant transfer</div>
              </div>
              <ChevronRight className="ml-auto h-4 w-4 text-white/40" />
            </div>
            <div className="border border-white/20 bg-white/10 rounded-lg p-2 flex items-center hover:bg-white/20 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-payouts-accent/10 flex items-center justify-center mr-2">
                <span className="text-lg">💳</span>
              </div>
              <div>
                <div className="text-xs font-medium">Digital Wallet</div>
                <div className="text-xs text-white/70">Instant transfer</div>
              </div>
              <ChevronRight className="ml-auto h-4 w-4 text-white/40" />
            </div>
          </div>
        </div>
      )
    },
    {
      name: "success",
      title: "Payment Complete",
      content: (
        <div className="animate-fade-in text-center">
          <div className="w-12 h-12 rounded-full bg-payouts-accent/20 mx-auto flex items-center justify-center mb-3">
            <Check className="h-6 w-6 text-payouts-accent" strokeWidth={3} />
          </div>
          <p className="text-sm font-medium mb-1">Payout Successful!</p>
          <p className="text-xs text-white/80 mb-2">Your funds will be sent via Bank Transfer</p>
          <p className="text-sm font-medium">$1,250.00</p>
        </div>
      )
    }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScreen((prev) => (prev + 1) % screens.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [screens.length]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-payouts-dark to-payouts-dark/80 text-white p-4 bg-[url('https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center bg-blend-soft-light overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        {/* Header section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 mt-8">
          <div className="mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70 mb-4">
              Smart Payout Widget
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-xl">
              Simplify your payment operations with our customizable payout solution.
            </p>
            <div className="mt-8 flex gap-4">
              <Button 
                onClick={() => navigate('/widget')}
                className="bg-gradient-to-r from-payouts-accent to-payouts-accent/90 text-payouts-dark hover:from-payouts-accent/90 hover:to-payouts-accent px-6 py-6 rounded-xl shadow-lg text-lg font-bold flex items-center gap-2"
              >
                Try Demo <ArrowRight size={20} />
              </Button>
              <Button 
                variant="outline"
                className="border border-white/20 bg-white/5 text-white hover:bg-white/10 px-6 py-6 rounded-xl shadow-lg text-lg font-bold"
              >
                Documentation
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-payouts-accent/30 via-purple-500/20 to-blue-500/30 blur-xl opacity-70 animate-pulse"></div>
            <div className="iphone-mockup relative z-10">
              <div className="iphone-frame">
                <div className="iphone-screen bg-payouts-dark">
                  <div className="p-3 space-y-3">
                    <div className="progress-bar-container">
                      <div className="flex justify-between mb-1">
                        {screens.map((_, index) => (
                          <div 
                            key={index}
                            className={`step-indicator-mini ${index <= currentScreen ? 'active' : ''}`}
                          >
                            <span className="step-number-mini">{index + 1}</span>
                          </div>
                        ))}
                      </div>
                      <div className="progress-track-mini">
                        <div 
                          className="progress-fill-mini" 
                          style={{ 
                            width: `${(currentScreen / (screens.length - 1)) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="widget-screen px-3 py-4 rounded-xl border border-white/15 bg-payouts-dark">
                      <h3 className="text-sm font-semibold mb-3">{screens[currentScreen].title}</h3>
                      {screens[currentScreen].content}
                      
                      <div className="flex space-x-2 mt-4">
                        <button className="flex-1 py-1.5 text-xs bg-white/10 rounded-lg">
                          Back
                        </button>
                        <button className="flex-1 py-1.5 text-xs bg-payouts-accent text-payouts-dark font-medium rounded-lg">
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features section */}
        <GlassMorphism className="p-8 mb-16 backdrop-blur-md">
          <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            Key Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card">
              <div className="w-12 h-12 rounded-full bg-payouts-accent/20 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 2H20C21.1 2 22 2.9 22 4V20C22 21.1 21.1 22 20 22H4C2.9 22 2 21.1 2 20V4C2 2.9 2.9 2 4 2Z" stroke="#d0e92a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 10L12 14L8 10" stroke="#d0e92a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Multi-Step Verification</h3>
              <p className="text-white/70">
                Customizable verification workflow with profile, bank account, and tax information steps.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="w-12 h-12 rounded-full bg-payouts-accent/20 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="#d0e92a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 7L12 13L21 7" stroke="#d0e92a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Multiple Payout Methods</h3>
              <p className="text-white/70">
                Support for bank transfers, cryptocurrency, digital wallets, cards, and more payment options.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="w-12 h-12 rounded-full bg-payouts-accent/20 flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#d0e92a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="#d0e92a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Fully Customizable</h3>
              <p className="text-white/70">
                Tailor the widget appearance with custom colors, border styles, and UI elements to match your brand.
              </p>
            </div>
          </div>
        </GlassMorphism>
        
        {/* Use Cases section */}
        <GlassMorphism className="p-8 mb-16 backdrop-blur-md">
          <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            Use Cases
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="use-case-card">
              <div className="w-12 h-12 rounded-full bg-payouts-accent/20 flex items-center justify-center mb-4">
                <span className="text-2xl">💼</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Vendor Payments</h3>
              <p className="text-white/70 mb-4">
                Streamline payments to vendors and suppliers with automated verification and diverse payout options.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-payouts-accent mr-2" />
                  <span className="text-sm">Automated tax form collection</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-payouts-accent mr-2" />
                  <span className="text-sm">Secure bank verification</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-payouts-accent mr-2" />
                  <span className="text-sm">Global payment support</span>
                </li>
              </ul>
            </div>
            
            <div className="use-case-card">
              <div className="w-12 h-12 rounded-full bg-payouts-accent/20 flex items-center justify-center mb-4">
                <span className="text-2xl">🏦</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Insurance Claims</h3>
              <p className="text-white/70 mb-4">
                Process insurance claims efficiently with customizable verification steps and multiple payout methods.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-payouts-accent mr-2" />
                  <span className="text-sm">Streamlined verification process</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-payouts-accent mr-2" />
                  <span className="text-sm">Real-time payment status</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-payouts-accent mr-2" />
                  <span className="text-sm">Instant digital payment options</span>
                </li>
              </ul>
            </div>
            
            <div className="use-case-card">
              <div className="w-12 h-12 rounded-full bg-payouts-accent/20 flex items-center justify-center mb-4">
                <span className="text-2xl">👤</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Creator Payouts</h3>
              <p className="text-white/70 mb-4">
                Pay content creators, influencers and freelancers with flexible payout options and tax compliance.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-payouts-accent mr-2" />
                  <span className="text-sm">International payment support</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-payouts-accent mr-2" />
                  <span className="text-sm">Cryptocurrency options</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-payouts-accent mr-2" />
                  <span className="text-sm">Tax document management</span>
                </li>
              </ul>
            </div>
            
            <div className="use-case-card">
              <div className="w-12 h-12 rounded-full bg-payouts-accent/20 flex items-center justify-center mb-4">
                <span className="text-2xl">🌐</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Marketplace Disbursements</h3>
              <p className="text-white/70 mb-4">
                Facilitate payments between buyers and sellers on your marketplace platform.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-payouts-accent mr-2" />
                  <span className="text-sm">Multi-party payment flows</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-payouts-accent mr-2" />
                  <span className="text-sm">Escrow capabilities</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-payouts-accent mr-2" />
                  <span className="text-sm">Automated seller onboarding</span>
                </li>
              </ul>
            </div>
          </div>
        </GlassMorphism>
        
        {/* CTA section */}
        <GlassMorphism className="p-8 mb-16 text-center backdrop-blur-md">
          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            Ready to Transform Your Payouts?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Experience the flexibility and power of our Smart Payout Widget. Get started with our demo or contact us for custom integration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/widget')}
              className="bg-gradient-to-r from-payouts-accent to-payouts-accent/90 text-payouts-dark hover:from-payouts-accent/90 hover:to-payouts-accent px-8 py-6 rounded-xl shadow-lg text-lg font-bold"
            >
              Try Interactive Demo
            </Button>
            <Button 
              variant="outline"
              className="border border-white/20 bg-white/5 text-white hover:bg-white/10 px-8 py-6 rounded-xl shadow-lg text-lg font-bold"
            >
              Contact Sales
            </Button>
          </div>
        </GlassMorphism>
        
        {/* Footer */}
        <div className="border-t border-white/10 pt-8 pb-16">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                Smart Payout Widget
              </h3>
              <p className="text-sm text-white/60 mt-1">
                © 2023 Payouts Inc. All rights reserved.
              </p>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="text-white/70 hover:text-white">Documentation</a>
              <a href="#" className="text-white/70 hover:text-white">API Reference</a>
              <a href="#" className="text-white/70 hover:text-white">Contact</a>
              <a href="#" className="text-white/70 hover:text-white">Privacy</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketing;
