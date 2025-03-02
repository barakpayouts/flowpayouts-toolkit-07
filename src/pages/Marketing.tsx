import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import GlassMorphism from '@/components/ui/GlassMorphism';
import { Rocket, Sparkles, ShieldCheck, PiggyBank, Users, BarChartBig, ChevronRight } from 'lucide-react';

const Marketing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-payouts-dark to-payouts-dark/80 text-white p-4 bg-[url('https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center bg-blend-soft-light">
      <div className="container mx-auto max-w-6xl">
        <header className="py-8">
          <h1 className="text-4xl font-bold text-center mb-4 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
            Smart Payout Widget
          </h1>
          <p className="text-lg text-center text-white/80">
            The ultimate solution for streamlined and secure payouts.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <GlassMorphism className="p-6 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-2xl">
            <div className="text-center md:text-left">
              <div className="w-20 h-20 rounded-full bg-payouts-accent/20 mx-auto md:mx-0 flex items-center justify-center mb-6">
                <Rocket className="h-10 w-10 text-payouts-accent" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Instant Payouts</h2>
              <p className="text-white/80 text-lg mb-6">
                Experience lightning-fast payouts with our optimized widget.
                Say goodbye to delays and keep your recipients happy.
              </p>
              <Button 
                className="bg-gradient-to-r from-payouts-accent to-payouts-accent/90 text-payouts-dark hover:from-payouts-accent/90 hover:to-payouts-accent px-8 py-6 rounded-xl shadow-lg text-lg font-bold"
                onClick={() => navigate('/widget')}
              >
                Try Demo
              </Button>
            </div>
          </GlassMorphism>

          <GlassMorphism className="p-6 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-2xl">
            <div className="text-center md:text-left">
              <div className="w-20 h-20 rounded-full bg-payouts-accent/20 mx-auto md:mx-0 flex items-center justify-center mb-6">
                <Sparkles className="h-10 w-10 text-payouts-accent" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Customizable &amp; Versatile</h2>
              <p className="text-white/80 text-lg mb-6">
                Tailor the widget to match your brand with customizable themes
                and flexible payout options.
              </p>
              <Button 
                variant="outline"
                className="border border-white/20 text-white hover:bg-white/10 px-6 py-4 rounded-xl text-lg font-semibold"
                onClick={() => navigate('/widget')}
              >
                Learn More
              </Button>
            </div>
          </GlassMorphism>
        </section>

        <section className="mb-8">
          <GlassMorphism className="p-8 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-2xl">
            <h2 className="text-3xl font-bold text-center mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-payouts-accent/20 mx-auto flex items-center justify-center mb-4">
                  <ShieldCheck className="h-8 w-8 text-payouts-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
                <p className="text-white/70">
                  Ensure secure transactions with advanced encryption and fraud
                  detection.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-payouts-accent/20 mx-auto flex items-center justify-center mb-4">
                  <PiggyBank className="h-8 w-8 text-payouts-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Cost-Effective</h3>
                <p className="text-white/70">
                  Reduce payout costs with our efficient system and transparent
                  pricing.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-payouts-accent/20 mx-auto flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-payouts-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">User-Friendly</h3>
                <p className="text-white/70">
                  Provide a seamless payout experience for your recipients with
                  an intuitive interface.
                </p>
              </div>
            </div>
          </GlassMorphism>
        </section>

        <section className="mb-8">
          <GlassMorphism className="p-8 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-2xl">
            <h2 className="text-3xl font-bold text-center mb-6">Analytics &amp; Reporting</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-white/80 text-lg mb-4">
                  Gain valuable insights into your payout processes with our
                  comprehensive analytics dashboard. Track payments, monitor
                  trends, and optimize your strategy.
                </p>
                <ul className="list-disc list-inside text-white/70">
                  <li>Real-time payment tracking</li>
                  <li>Customizable reports</li>
                  <li>Trend analysis</li>
                  <li>Exportable data</li>
                </ul>
              </div>
              <div className="flex justify-center">
                <BarChartBig className="h-64 w-64 text-payouts-accent" />
              </div>
            </div>
          </GlassMorphism>
        </section>

        <footer className="py-8 text-center">
          <p className="text-white/60">
            &copy; {new Date().getFullYear()} Smart Payout Widget. All rights
            reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Marketing;
