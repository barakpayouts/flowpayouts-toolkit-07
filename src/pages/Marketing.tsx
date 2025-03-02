import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import GlassMorphism from '@/components/ui/GlassMorphism';
import { 
  Rocket, 
  Sparkles, 
  ShieldCheck, 
  Globe, 
  Activity, 
  Layers, 
  CreditCard, 
  ChevronRight, 
  Gift, 
  Bitcoin,
  Building,
  Briefcase,
  Sliders,
  Lock,
  BarChart,
  Phone,
  Mail,
  Wallet,
  Landmark
} from 'lucide-react';

const Marketing = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-[#143745] py-20">
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                White-labeled Global Payouts for Your Software Platform
              </h1>
              <p className="text-xl text-white/80">
                Seamlessly embed our Smart Payout Widget to disburse funds to vendors, affiliates, creators—anyone, anywhere.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg"
                  className="bg-[#d0e92a] hover:bg-[#d0e92a]/90 text-payouts-dark font-medium"
                  onClick={() => navigate('/widget')}
                >
                  Try Demo
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Contact Sales
                </Button>
              </div>
            </div>
            <div className="relative mx-auto md:ml-auto md:mr-0 max-w-[320px] md:max-w-none">
              {/* iPhone mockup */}
              <div className="relative mx-auto w-[280px] h-[570px] bg-black rounded-[40px] border-[10px] border-[#121212] shadow-2xl overflow-hidden">
                {/* iPhone notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-[20px] z-20"></div>
                {/* Inner bezel */}
                <div className="absolute inset-0 bg-[#143745] rounded-[30px] overflow-hidden z-10">
                  {/* Widget inside phone */}
                  <div className="absolute inset-3 pt-10 overflow-y-auto">
                    <div className="relative bg-[#143745] rounded-xl p-4 shadow-lg border border-[#21404d]">
                      <div className="flex items-center justify-between mb-5">
                        <h3 className="text-lg font-bold text-white">Smart Payout Widget</h3>
                        <div className="h-2 w-2 rounded-full bg-[#d0e92a]"></div>
                      </div>
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between p-3 bg-[#0f2a35]/50 rounded-lg border border-[#21404d]">
                          <div className="flex items-center space-x-3">
                            <Building className="h-5 w-5 text-white/70" />
                            <span className="text-white text-sm">Bank Transfer</span>
                          </div>
                          <ChevronRight className="h-4 w-4 text-white/50" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-[#0f2a35]/50 rounded-lg border border-[#21404d]">
                          <div className="flex items-center space-x-3">
                            <CreditCard className="h-5 w-5 text-white/70" />
                            <span className="text-white text-sm">Push to Card</span>
                          </div>
                          <ChevronRight className="h-4 w-4 text-white/50" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-[#d0e92a]/10 rounded-lg border border-[#d0e92a]/30">
                          <div className="flex items-center space-x-3">
                            <Bitcoin className="h-5 w-5 text-[#d0e92a]" />
                            <span className="text-white text-sm">Cryptocurrency</span>
                          </div>
                          <ShieldCheck className="h-4 w-4 text-[#d0e92a]" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-[#0f2a35]/50 rounded-lg border border-[#21404d]">
                          <div className="flex items-center space-x-3">
                            <Wallet className="h-5 w-5 text-white/70" />
                            <span className="text-white text-sm">Digital Wallet</span>
                          </div>
                          <ChevronRight className="h-4 w-4 text-white/50" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-[#0f2a35]/50 rounded-lg border border-[#21404d]">
                          <div className="flex items-center space-x-3">
                            <Gift className="h-5 w-5 text-white/70" />
                            <span className="text-white text-sm">Gift Card</span>
                          </div>
                          <ChevronRight className="h-4 w-4 text-white/50" />
                        </div>
                      </div>
                      <button className="w-full p-3 bg-[#d0e92a] hover:bg-[#d0e92a]/90 text-[#0f2a35] text-sm font-medium rounded-md flex items-center justify-center">
                        Select Payout Method
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Bottom home bar */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-[120px] h-[5px] bg-white/20 rounded-full z-20"></div>
                
                {/* Side buttons */}
                <div className="absolute top-[120px] -right-[16px] w-[3px] h-[80px] bg-[#121212] rounded-full"></div>
                <div className="absolute top-[220px] -right-[16px] w-[3px] h-[80px] bg-[#121212] rounded-full"></div>
                <div className="absolute top-[120px] -left-[16px] w-[3px] h-[40px] bg-[#121212] rounded-full"></div>
              </div>
              
              {/* Visual elements */}
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#d0e92a]/20 rounded-full blur-3xl"></div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#d0e92a]/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Benefits Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Smart Payout Widget?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Streamline your payout operations with our fully customizable solution designed for global reach.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                <Sparkles className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Create more value for your recipients</h3>
              <p className="text-slate-600">
                Our widget fits seamlessly into your platform, letting you pay vendors, influencers, insured parties, or employees with ease—driving satisfaction and loyalty.
              </p>
            </div>
            
            {/* Benefit 2 */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mb-6">
                <Globe className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Reach 190+ countries with 130+ currencies</h3>
              <p className="text-slate-600">
                From local bank transfers and push-to-card to PayPal, crypto, and gift cards—offer your recipients ultimate flexibility.
              </p>
            </div>
            
            {/* Benefit 3 */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center mb-6">
                <ShieldCheck className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Automate compliance & settlements</h3>
              <p className="text-slate-600">
                Payouts.com handles KYC/AML checks, tax forms, and cross-border regulations so you can focus on growing your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Payout Methods Section */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">We Support</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Multiple payout methods to meet the needs of recipients worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 flex flex-col items-center justify-center shadow-sm border border-slate-100">
              <Building className="h-8 w-8 text-slate-700 mb-3" />
              <span className="text-center font-medium">Bank Transfer</span>
            </div>
            <div className="bg-white rounded-xl p-6 flex flex-col items-center justify-center shadow-sm border border-slate-100">
              <CreditCard className="h-8 w-8 text-slate-700 mb-3" />
              <span className="text-center font-medium">Push to Card</span>
            </div>
            <div className="bg-white rounded-xl p-6 flex flex-col items-center justify-center shadow-sm border border-slate-100">
              <Bitcoin className="h-8 w-8 text-slate-700 mb-3" />
              <span className="text-center font-medium">Cryptocurrency</span>
            </div>
            <div className="bg-white rounded-xl p-6 flex flex-col items-center justify-center shadow-sm border border-slate-100">
              <Gift className="h-8 w-8 text-slate-700 mb-3" />
              <span className="text-center font-medium">Gift Cards</span>
            </div>
            <div className="bg-white rounded-xl p-6 flex flex-col items-center justify-center shadow-sm border border-slate-100">
              <Wallet className="h-8 w-8 text-slate-700 mb-3" />
              <span className="text-center font-medium">Digital Wallets</span>
            </div>
            <div className="bg-white rounded-xl p-6 flex flex-col items-center justify-center shadow-sm border border-slate-100">
              <Phone className="h-8 w-8 text-slate-700 mb-3" />
              <span className="text-center font-medium">Mobile Money</span>
            </div>
            <div className="bg-white rounded-xl p-6 flex flex-col items-center justify-center shadow-sm border border-slate-100">
              <Mail className="h-8 w-8 text-slate-700 mb-3" />
              <span className="text-center font-medium">Email Transfers</span>
            </div>
            <div className="bg-white rounded-xl p-6 flex flex-col items-center justify-center shadow-sm border border-slate-100">
              <Landmark className="h-8 w-8 text-slate-700 mb-3" />
              <span className="text-center font-medium">Wire Transfers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Controls Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Powerful Dashboard Controls</h2>
              <p className="text-slate-600 mb-8">
                Take complete control of your payout operations with a comprehensive dashboard built for businesses of any size.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Approval Workflows</h3>
                    <p className="text-slate-600">
                      Create custom approval flows with multiple stakeholders and automated rules.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Activity className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Real-time Monitoring</h3>
                    <p className="text-slate-600">
                      Track all payouts in real-time and get instant notifications on status changes.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                    <Lock className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Role-based Access</h3>
                    <p className="text-slate-600">
                      Assign granular permissions to team members based on their responsibilities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-xl border border-slate-200">
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 mb-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold">Payment Approval Dashboard</h3>
                  <Sliders className="h-5 w-5 text-slate-500" />
                </div>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-medium">Vendor Payout #1293</div>
                      <div className="text-sm text-slate-500">$5,750.00 • Bank Transfer</div>
                    </div>
                    <Button size="sm" className="bg-green-500 hover:bg-green-600">Approve</Button>
                  </div>
                  <div className="bg-white p-3 rounded border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-medium">Contractor #8832</div>
                      <div className="text-sm text-slate-500">$3,200.00 • Push to Card</div>
                    </div>
                    <Button size="sm" className="bg-green-500 hover:bg-green-600">Approve</Button>
                  </div>
                  <div className="bg-white p-3 rounded border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-medium">Affiliate #4421</div>
                      <div className="text-sm text-slate-500">$1,890.00 • Cryptocurrency</div>
                    </div>
                    <div className="text-xs px-2 py-1 rounded bg-amber-100 text-amber-800">
                      Pending Review
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center p-2">
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded bg-green-100"></div>
                  <div className="w-8 h-8 rounded bg-blue-100"></div>
                  <div className="w-8 h-8 rounded bg-purple-100"></div>
                </div>
                <BarChart className="h-6 w-6 text-slate-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customization Section */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-xl p-6 shadow-xl border border-slate-200">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold">Customize Your Brand</h3>
                  <Layers className="h-5 w-5 text-slate-500" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-12 rounded-md bg-payouts-dark"></div>
                  <div className="h-12 rounded-md bg-payouts-accent"></div>
                  <div className="h-12 rounded-md bg-payouts-medium"></div>
                </div>
                <div className="p-3 rounded-md border border-slate-200">
                  <p className="text-sm text-slate-500 mb-2">Select button style:</p>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-8 bg-slate-100 rounded-md flex items-center justify-center text-xs">Square</div>
                    <div className="h-8 bg-slate-100 rounded-lg flex items-center justify-center text-xs">Rounded</div>
                    <div className="h-8 bg-slate-100 rounded-full flex items-center justify-center text-xs">Pill</div>
                  </div>
                </div>
                <div className="p-3 rounded-md border border-slate-200">
                  <p className="text-sm text-slate-500 mb-2">Company Logo:</p>
                  <div className="h-12 bg-slate-100 rounded-md flex items-center justify-center">
                    <span className="text-sm text-slate-400">Upload logo</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-6">White-label to Match Your Brand</h2>
              <p className="text-slate-600 mb-8">
                Completely customize the payout widget to match your brand's look and feel, creating a seamless experience for your recipients.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-payouts-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ShieldCheck className="h-3 w-3 text-payouts-dark" />
                  </div>
                  <span className="text-slate-600">Customize colors, fonts, and button styles</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-payouts-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ShieldCheck className="h-3 w-3 text-payouts-dark" />
                  </div>
                  <span className="text-slate-600">Add your logo and branding elements</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-payouts-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ShieldCheck className="h-3 w-3 text-payouts-dark" />
                  </div>
                  <span className="text-slate-600">Choose which payout methods to display</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-payouts-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ShieldCheck className="h-3 w-3 text-payouts-dark" />
                  </div>
                  <span className="text-slate-600">Modify text and language options</span>
                </li>
              </ul>
              
              <Button 
                className="mt-8 bg-payouts-dark hover:bg-payouts-dark/90 text-white"
                onClick={() => navigate('/widget')}
              >
                Try Widget Demo
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#0f2a35] to-[#143745] text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to simplify your global payouts?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Embed our Smart Payout Widget and transform your payout operations today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-[#d0e92a] hover:bg-[#d0e92a]/90 text-[#0f2a35] font-medium"
              onClick={() => navigate('/widget')}
            >
              Try Demo
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-[#0f2a35] text-white/60 py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <p>&copy; {new Date().getFullYear()} Smart Payout Widget. All rights reserved.</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Marketing;
