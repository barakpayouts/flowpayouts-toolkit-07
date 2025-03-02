import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import PayoutWidget from "@/components/Widget/PayoutWidget";
import { RecipientType, VerificationStep, PayoutMethod, useWidgetConfig } from '@/hooks/use-widget-config';
import { Check, ChevronDown, Palette, RefreshCcw, Save, ArrowLeft, Sparkles, FileSliders, ChevronRight, CreditCard, LayoutGrid } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GlassMorphism from '@/components/ui/GlassMorphism';

const WidgetDemo = () => {
  const navigate = useNavigate();
  const [showWidget, setShowWidget] = useState(false);
  const { 
    updateConfig, 
    config, 
    setRecipientType, 
    toggleStep, 
    togglePayoutMethod,
    setPayoutsOnlyMode,
    resetConfig
  } = useWidgetConfig();
  const [showConfigPanel, setShowConfigPanel] = useState(false);
  const [isPayoutsOnly, setIsPayoutsOnly] = useState(config.steps.length === 0);
  const [widgetKey, setWidgetKey] = useState(0);
  
  const handleConfigureWidget = () => {
    setShowWidget(true);
    setShowConfigPanel(true);
  };
  
  const handleSelectRecipientType = (type: RecipientType) => {
    setRecipientType(type);
    setWidgetKey(prevKey => prevKey + 1);
    
    toast.success("Recipient type updated", {
      description: `Changed to ${type} recipient type.`
    });
  };

  const handleSaveConfiguration = () => {
    setWidgetKey(prevKey => prevKey + 1);
    
    toast.success("Widget configuration saved", {
      description: "Your settings have been applied successfully."
    });
  };

  const handleTogglePayoutsOnly = (checked: boolean) => {
    setIsPayoutsOnly(checked);
    setPayoutsOnlyMode(checked);
    
    setWidgetKey(prevKey => prevKey + 1);
    
    if (checked) {
      toast.success("Payouts Only mode enabled", {
        description: "All verification steps have been disabled."
      });
    } else {
      toast.success("Full verification mode enabled", {
        description: "Verification steps have been restored."
      });
    }
  };

  const stepOptions: { value: VerificationStep; label: string; icon: React.ReactNode }[] = [
    { value: 'profile', label: 'Profile Information', icon: <FileSliders size={16} /> },
    { value: 'bank', label: 'Bank Verification', icon: <CreditCard size={16} /> },
    { value: 'tax', label: 'Tax Information', icon: <LayoutGrid size={16} /> },
  ];

  const payoutMethodOptions: { value: PayoutMethod; label: string; icon: string }[] = [
    { value: 'bank', label: 'Bank Transfer', icon: '🏦' },
    { value: 'crypto', label: 'Cryptocurrency', icon: '₿' },
    { value: 'digital', label: 'Digital Wallet', icon: '💳' },
    { value: 'card', label: 'Push to Card', icon: '💲' },
    { value: 'prepaid', label: 'Prepaid Card', icon: '💰' },
    { value: 'gift', label: 'Gift Card', icon: '🎁' },
  ];

  const recipientOptions: { value: RecipientType; label: string; icon: string; description: string }[] = [
    { value: 'vendor', label: 'Vendor', icon: '🏢', description: 'For supplier payments' },
    { value: 'insured', label: 'Insured', icon: '🛡️', description: 'For insurance claims' },
    { value: 'individual', label: 'Individual', icon: '👤', description: 'For personal payments' },
    { value: 'business', label: 'Business', icon: '💼', description: 'For company payments' },
    { value: 'contractor', label: 'Contractor', icon: '🔧', description: 'For freelance payments' },
  ];

  const colorPresets = [
    {
      name: 'Default',
      primaryColor: '#0f2a35',
      accentColor: '#d0e92a',
      backgroundColor: '#143745',
      textColor: '#ffffff',
      borderColor: '#21404d',
    },
    {
      name: 'Purple Dream',
      primaryColor: '#1A1F2C',
      accentColor: '#9b87f5',
      backgroundColor: '#221F26',
      textColor: '#ffffff',
      borderColor: '#3A3544',
    },
    {
      name: 'Ocean Blue',
      primaryColor: '#243949',
      accentColor: '#0EA5E9',
      backgroundColor: '#304352',
      textColor: '#ffffff',
      borderColor: '#435363',
    },
    {
      name: 'Forest',
      primaryColor: '#054232',
      accentColor: '#8FE388',
      backgroundColor: '#0B5D44',
      textColor: '#ffffff',
      borderColor: '#1C7A60',
    },
    {
      name: 'Sunset',
      primaryColor: '#5C2101',
      accentColor: '#F97316',
      backgroundColor: '#7A3415',
      textColor: '#ffffff',
      borderColor: '#944830',
    },
  ];

  const handleColorPresetSelect = (preset: typeof colorPresets[0]) => {
    updateConfig({
      primaryColor: preset.primaryColor,
      accentColor: preset.accentColor,
      backgroundColor: preset.backgroundColor,
      textColor: preset.textColor,
      borderColor: preset.borderColor,
    });
    
    setWidgetKey(prevKey => prevKey + 1);
    
    toast.success(`${preset.name} theme applied`, {
      description: "Color scheme has been updated."
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-payouts-dark to-payouts-dark/80 text-white p-4 bg-[url('https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center bg-blend-soft-light">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/')}
              className="rounded-full flex items-center gap-1 text-sm text-white border-white/20 hover:bg-white/10"
            >
              <ArrowLeft size={14} />
              Back
            </Button>
            <h1 className="text-gradient ml-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70">
              Smart Payout Widget
            </h1>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/marketing')}
            className="rounded-full flex items-center gap-1 text-sm text-white border-white/20 hover:bg-white/10"
          >
            View Marketing Page
            <ChevronRight size={14} />
          </Button>
        </div>
        
        {!showWidget ? (
          <GlassMorphism className="p-8 mb-8 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-2xl">
            <div className="text-center max-w-2xl mx-auto">
              <div className="w-20 h-20 rounded-full bg-payouts-accent/20 mx-auto flex items-center justify-center mb-6">
                <Sparkles className="h-10 w-10 text-payouts-accent" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Smart Payout Widget</h2>
              <p className="mb-8 text-white/80 text-lg">Customize our intelligent payout system to suit your needs. Configure recipient types, verification steps, and payout methods.</p>
              
              <div className="bg-white/10 p-8 rounded-2xl shadow-inner backdrop-blur-sm">
                <div className="text-center p-8">
                  <h3 className="text-xl mb-4">Widget Preview</h3>
                  <p className="text-white/70 text-lg mb-8">Configure and test the widget functionality with our intuitive setup panel.</p>
                  <Button 
                    variant="purple"
                    className="bg-[#9b87f5] text-white hover:bg-[#8B5CF6] px-8 py-6 rounded-xl shadow-lg text-lg font-bold flex items-center gap-2" 
                    onClick={handleConfigureWidget}
                  >
                    Configure Widget <ChevronRight size={20} />
                  </Button>
                </div>
              </div>
            </div>
          </GlassMorphism>
        ) : (
          <GlassMorphism className="p-6 mb-8 backdrop-blur-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 font-bold">
                Widget Configuration
              </h2>
              <Button 
                variant="outline" 
                onClick={() => setShowConfigPanel(!showConfigPanel)}
                className="flex items-center gap-2 border border-white/20 bg-white/10 text-white hover:bg-white/20"
              >
                <Palette size={16} />
                {showConfigPanel ? 'Hide Configuration' : 'Configure Widget'}
              </Button>
            </div>

            <div className={`grid ${showConfigPanel ? 'grid-cols-1 md:grid-cols-3 gap-6' : 'grid-cols-1'}`}>
              {showConfigPanel && (
                <div className="bg-black/30 p-5 rounded-xl border border-white/10 shadow-lg h-fit backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">Configuration Panel</h3>
                    <div className="flex items-center gap-2">
                      <Button 
                        onClick={() => setWidgetKey(prevKey => prevKey + 1)}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                        title="Refresh widget"
                      >
                        <RefreshCcw size={14} />
                      </Button>
                      <Button 
                        onClick={handleSaveConfiguration}
                        className="flex items-center gap-2 bg-gradient-to-r from-payouts-accent to-payouts-accent/90 text-payouts-dark hover:from-payouts-accent/90 hover:to-payouts-accent"
                        size="sm"
                      >
                        <Save size={16} />
                        Save Configuration
                      </Button>
                    </div>
                  </div>
                  <Tabs defaultValue="steps" className="w-full">
                    <TabsList className="grid grid-cols-3 mb-4 bg-white/10">
                      <TabsTrigger value="steps" className="data-[state=active]:bg-white/20">Steps</TabsTrigger>
                      <TabsTrigger value="payouts" className="data-[state=active]:bg-white/20">Payouts</TabsTrigger>
                      <TabsTrigger value="styling" className="data-[state=active]:bg-white/20">Styling</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="steps" className="space-y-4 animate-fade-in">
                      <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                        <h3 className="text-lg font-medium">Recipient Type</h3>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full justify-between mt-2 bg-white/10 border-white/20 text-white hover:bg-white/20">
                              <span className="flex items-center gap-2">
                                {recipientOptions.find(r => r.value === config.recipientType)?.icon} 
                                {recipientOptions.find(r => r.value === config.recipientType)?.label}
                              </span>
                              <ChevronDown size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-56 bg-payouts-dark/95 border border-white/20 backdrop-blur-lg">
                            {recipientOptions.map((recipient) => (
                              <DropdownMenuItem 
                                key={recipient.value}
                                onClick={() => handleSelectRecipientType(recipient.value)}
                                className="cursor-pointer py-2 px-3 focus:bg-white/10 hover:bg-white/10"
                              >
                                <div className="flex flex-col">
                                  <div className="flex items-center">
                                    <span className="mr-2 text-lg">{recipient.icon}</span>
                                    <span className="font-medium">{recipient.label}</span>
                                    {config.recipientType === recipient.value && (
                                      <Check className="ml-auto h-4 w-4 text-payouts-accent" />
                                    )}
                                  </div>
                                  <span className="text-xs text-muted-foreground ml-7">{recipient.description}</span>
                                </div>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      <div className="space-y-2 pt-2">
                        <div className="flex items-center gap-2 mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
                          <Checkbox 
                            id="payouts-only" 
                            checked={isPayoutsOnly}
                            onCheckedChange={handleTogglePayoutsOnly}
                            className="data-[state=checked]:bg-payouts-accent data-[state=checked]:border-payouts-accent"
                          />
                          <label 
                            htmlFor="payouts-only"
                            className="text-sm font-medium leading-none flex items-center gap-2 cursor-pointer"
                          >
                            <span className="bg-payouts-accent/20 text-payouts-accent px-2 py-1 rounded text-xs font-bold">Payouts Only Mode</span>
                            <span className="text-white/70">(Skip verification)</span>
                          </label>
                        </div>
                        
                        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                          <h3 className={`text-lg font-medium ${isPayoutsOnly ? 'opacity-50' : ''}`}>Verification Steps</h3>
                          <p className={`text-sm text-muted-foreground mb-3 ${isPayoutsOnly ? 'opacity-50' : ''}`}>
                            {isPayoutsOnly 
                              ? "Verification steps are disabled in Payouts Only mode" 
                              : "Select which steps to include"}
                          </p>
                          
                          <div className="space-y-3">
                            {stepOptions.map((step) => (
                              <div key={step.value} className="flex items-center gap-2 p-2 bg-white/5 rounded-lg">
                                <Checkbox 
                                  id={`step-${step.value}`} 
                                  checked={config.steps.includes(step.value)}
                                  onCheckedChange={() => {
                                    toggleStep(step.value);
                                    setWidgetKey(prevKey => prevKey + 1);
                                  }}
                                  disabled={isPayoutsOnly}
                                  className="data-[state=checked]:bg-payouts-accent data-[state=checked]:border-payouts-accent"
                                />
                                <label 
                                  htmlFor={`step-${step.value}`}
                                  className={`text-sm font-medium leading-none flex items-center gap-2 cursor-pointer ${isPayoutsOnly ? 'opacity-50' : ''}`}
                                >
                                  {step.icon}
                                  {step.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="bg-white/5 p-4 rounded-lg border border-white/10 mt-3">
                          <h3 className={`text-lg font-medium mb-3 ${isPayoutsOnly ? 'opacity-50' : ''}`}>UI Options</h3>
                          
                          <div className="flex items-center gap-2 p-2 bg-white/5 rounded-lg mb-2">
                            <Checkbox 
                              id="show-progress" 
                              checked={config.showProgressBar}
                              onCheckedChange={(checked) => {
                                updateConfig({ showProgressBar: !!checked });
                                setWidgetKey(prevKey => prevKey + 1);
                              }}
                              disabled={isPayoutsOnly}
                              className="data-[state=checked]:bg-payouts-accent data-[state=checked]:border-payouts-accent"
                            />
                            <label 
                              htmlFor="show-progress"
                              className={`text-sm font-medium leading-none cursor-pointer ${isPayoutsOnly ? 'opacity-50' : ''}`}
                            >
                              Show Progress Bar
                            </label>
                          </div>
                          
                          <div className="flex items-center gap-2 p-2 bg-white/5 rounded-lg">
                            <Checkbox 
                              id="show-steps" 
                              checked={config.showStepNumbers}
                              onCheckedChange={(checked) => {
                                updateConfig({ showStepNumbers: !!checked });
                                setWidgetKey(prevKey => prevKey + 1);
                              }}
                              disabled={isPayoutsOnly}
                              className="data-[state=checked]:bg-payouts-accent data-[state=checked]:border-payouts-accent"
                            />
                            <label 
                              htmlFor="show-steps"
                              className={`text-sm font-medium leading-none cursor-pointer ${isPayoutsOnly ? 'opacity-50' : ''}`}
                            >
                              Show Step Numbers
                            </label>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="payouts" className="space-y-4 animate-fade-in">
                      <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                        <h3 className="text-lg font-medium mb-2">Payout Methods</h3>
                        <p className="text-sm text-muted-foreground mb-3">Select which payout methods to include</p>
                        
                        <div className="grid grid-cols-2 gap-2">
                          {payoutMethodOptions.map((method) => (
                            <div key={method.value} className="flex items-center gap-2 p-3 bg-white/5 rounded-lg">
                              <Checkbox 
                                id={`method-${method.value}`} 
                                checked={config.payoutMethods.includes(method.value)}
                                onCheckedChange={() => {
                                  togglePayoutMethod(method.value);
                                  setWidgetKey(prevKey => prevKey + 1);
                                }}
                                className="data-[state=checked]:bg-payouts-accent data-[state=checked]:border-payouts-accent"
                              />
                              <label 
                                htmlFor={`method-${method.value}`}
                                className="text-sm font-medium leading-none cursor-pointer flex items-center gap-2"
                              >
                                <span className="text-lg">{method.icon}</span> {method.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="styling" className="space-y-4 animate-fade-in">
                      <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                        <h3 className="text-lg font-medium mb-3">Color Themes</h3>
                        <div className="grid grid-cols-1 gap-2">
                          {colorPresets.map((preset, index) => (
                            <button
                              key={index}
                              onClick={() => handleColorPresetSelect(preset)}
                              className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors bg-white/5"
                            >
                              <div className="flex gap-1">
                                <div 
                                  className="w-6 h-6 rounded-full" 
                                  style={{ backgroundColor: preset.primaryColor }}
                                ></div>
                                <div 
                                  className="w-6 h-6 rounded-full" 
                                  style={{ backgroundColor: preset.accentColor }}
                                ></div>
                                <div 
                                  className="w-6 h-6 rounded-full" 
                                  style={{ backgroundColor: preset.backgroundColor }}
                                ></div>
                              </div>
                              <span className="font-medium">{preset.name}</span>
                              {config.primaryColor === preset.primaryColor && (
                                <Check className="ml-auto h-4 w-4 text-payouts-accent" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-4 pt-2 bg-white/5 p-4 rounded-lg border border-white/10">
                        <h3 className="text-lg font-medium">UI Customization</h3>
                        
                        <div className="space-y-2">
                          <label className="text-sm">Border Radius: {config.borderRadius}px</label>
                          <Slider
                            defaultValue={[config.borderRadius]}
                            value={[config.borderRadius]}
                            min={0}
                            max={20}
                            step={1}
                            onValueChange={(value) => {
                              updateConfig({ borderRadius: value[0] });
                              setWidgetKey(prevKey => prevKey + 1);
                            }}
                            className="py-2"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm">Button Style</label>
                          <div className="flex gap-2">
                            {['rounded', 'square', 'pill'].map((style) => (
                              <Button
                                key={style}
                                variant={config.buttonStyle === style ? 'default' : 'outline'}
                                className={`${
                                  style === 'rounded' ? 'rounded-md' :
                                  style === 'square' ? 'rounded-none' : 'rounded-full'
                                } ${config.buttonStyle === style ? 'bg-payouts-accent text-payouts-dark' : ''}`}
                                onClick={() => {
                                  updateConfig({ 
                                    buttonStyle: style as 'rounded' | 'square' | 'pill' 
                                  });
                                  setWidgetKey(prevKey => prevKey + 1);
                                }}
                              >
                                {style.charAt(0).toUpperCase() + style.slice(1)}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            resetConfig();
                            setWidgetKey(prevKey => prevKey + 1);
                            toast.success("Reset to defaults", {
                              description: "All configuration options have been reset."
                            });
                          }}
                          className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                        >
                          Reset to Defaults
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
              
              <div className={showConfigPanel ? "col-span-1 md:col-span-2" : "col-span-1"}>
                <div className="bg-black/20 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-lg overflow-hidden">
                  <div className="mb-4 p-4 bg-white/5 rounded-lg flex flex-wrap justify-between items-center gap-2 border border-white/10">
                    <div>
                      <h4 className="font-medium text-white">Current Configuration</h4>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <span className="text-payouts-accent">{recipientOptions.find(r => r.value === config.recipientType)?.icon}</span>
                          <span className="capitalize">{config.recipientType}</span>
                        </div>
                        
                        {isPayoutsOnly ? (
                          <div className="bg-payouts-accent/20 text-payouts-accent px-3 py-1 rounded-full text-xs font-bold">
                            Payouts Only Mode
                          </div>
                        ) : (
                          <>
                            {config.steps.map((step) => (
                              <div key={step} className="bg-white/10 px-3 py-1 rounded-full text-xs font-medium capitalize">
                                {step}
                              </div>
                            ))}
                          </>
                        )}
                        
                        <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <span>Methods: {config.payoutMethods.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <PayoutWidget key={widgetKey} />
                  </div>
                </div>
              </div>
            </div>
          </GlassMorphism>
        )}
      </div>
    </div>
  );
};

export default WidgetDemo;
