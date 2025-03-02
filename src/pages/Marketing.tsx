import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Sparkles, LayoutGrid, Globe, FileCheck } from 'lucide-react';

// Note: Making GlassMorphism accept className prop
const GlassMorphism: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => {
  return (
    <div 
      className={`backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-2xl ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
};

const Marketing = () => {
  const navigate = useNavigate();
  
  const FeatureCard = ({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) => (
    <GlassMorphism className="p-6 flex items-start space-x-4 hover:bg-white/10 transition-colors">
      {icon}
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-white/70">{description}</p>
      </div>
    </GlassMorphism>
  );

  const TestimonialCard = ({ name, title, testimonial }: { name: string; title: string; testimonial: string }) => (
    <GlassMorphism className="p-6 space-y-4">
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
          <Globe className="h-5 w-5" />
        </div>
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-sm text-white/60">{title}</p>
        </div>
      </div>
      <p className="text-white/80">{testimonial}</p>
    </GlassMorphism>
  );

  const FAQItem = ({ question, answer }: { question: string; answer: string }) => (
    <GlassMorphism className="p-6 space-y-2">
      <h4 className="font-medium">{question}</h4>
      <p className="text-white/80">{answer}</p>
    </GlassMorphism>
  );
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-payouts-dark to-payouts-dark/80 text-white p-4 bg-[url('https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center bg-blend-soft-light">
      <div className="container mx-auto max-w-6xl">
        <header className="py-12">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
              Smart Payout Widget
            </h1>
            <Button variant="outline" size="sm" onClick={() => navigate('/')} className="rounded-full flex items-center gap-1 text-sm">
              Back
            </Button>
          </div>
          <div className="mt-8 max-w-3xl">
            <h2 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-payouts-accent mb-4">
              Revolutionize Your Payout System
            </h2>
            <p className="text-xl text-white/80 mb-6">
              Our smart payout widget offers a seamless, secure, and customizable solution for managing payouts to vendors,
              contractors, and more.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-payouts-accent to-payouts-accent/90 text-payouts-dark hover:from-payouts-accent/90 hover:to-payouts-accent px-8 py-6 rounded-xl shadow-lg text-lg font-bold flex items-center gap-2">
              Explore Features <ArrowRight size={20} />
            </Button>
          </div>
        </header>

        <section className="py-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Customizable Recipient Types"
              description="Easily configure payout settings for vendors, contractors, and more."
              icon={<Sparkles className="h-6 w-6 text-payouts-accent" />}
            />
            <FeatureCard
              title="Automated Verification"
              description="Streamline the verification process with automated profile, bank, and tax checks."
              icon={<FileCheck className="h-6 w-6 text-payouts-accent" />}
            />
            <FeatureCard
              title="Multiple Payout Methods"
              description="Offer recipients a variety of payout options, including bank transfer, crypto, and digital wallets."
              icon={<LayoutGrid className="h-6 w-6 text-payouts-accent" />}
            />
          </div>
        </section>

        <section className="py-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Our Widget?</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <GlassMorphism className="p-8 space-y-4">
                <h3 className="text-2xl font-semibold">Seamless Integration</h3>
                <p className="text-white/80">
                  Integrate our widget effortlessly into your existing platform with just a few lines of code.
                </p>
              </GlassMorphism>
              <GlassMorphism className="mt-6 p-8 space-y-4">
                <h3 className="text-2xl font-semibold">Enhanced Security</h3>
                <p className="text-white/80">
                  Protect sensitive payout information with our advanced security measures and encryption protocols.
                </p>
              </GlassMorphism>
            </div>
            <div>
              <GlassMorphism className="p-8 space-y-4">
                <h3 className="text-2xl font-semibold">User-Friendly Interface</h3>
                <p className="text-white/80">
                  Provide a smooth and intuitive payout experience for your recipients with our user-friendly interface.
                </p>
              </GlassMorphism>
              <GlassMorphism className="mt-6 p-8 space-y-4">
                <h3 className="text-2xl font-semibold">Dedicated Support</h3>
                <p className="text-white/80">
                  Rely on our dedicated support team to assist you with any questions or issues you may encounter.
                </p>
              </GlassMorphism>
            </div>
          </div>
        </section>

        <section className="py-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TestimonialCard
              name="Sarah Johnson"
              title="Finance Manager"
              testimonial="The smart payout widget has revolutionized our payment process. It's easy to use and has saved us countless hours."
            />
            <TestimonialCard
              name="David Lee"
              title="Operations Director"
              testimonial="Our vendors love the variety of payout options. The widget has improved our relationships and streamlined our operations."
            />
          </div>
        </section>

        <section className="py-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FAQItem
              question="How does the widget handle security?"
              answer="Our widget uses advanced encryption and security protocols to protect sensitive payout information."
            />
            <FAQItem
              question="Can I customize the widget's appearance?"
              answer="Yes, you can customize the widget's colors, fonts, and layout to match your brand."
            />
            <FAQItem
              question="What payout methods are supported?"
              answer="We support a variety of payout methods, including bank transfer, crypto, digital wallets, and more."
            />
            <FAQItem
              question="Is there a dedicated support team?"
              answer="Yes, our dedicated support team is available to assist you with any questions or issues."
            />
          </div>
        </section>

        <footer className="py-12 text-center">
          <p className="text-sm text-white/60">
            &copy; {new Date().getFullYear()} Smart Payout Widget. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Marketing;
