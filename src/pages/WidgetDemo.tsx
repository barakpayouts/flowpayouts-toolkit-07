import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import PayoutWidget from "@/components/Widget/PayoutWidget";
import { RecipientType, VerificationStep, PayoutMethod, useWidgetConfig } from '@/hooks/use-widget-config';
import { Check, ChevronDown, Palette, RefreshCcw, Save } from 'lucide-react';
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
  const [showConfigOptions, setShowConfigOptions] = useState(false);
  const [showConfigPanel, setShowConfigPanel] = useState(false);
  const [isPayoutsOnly, setIsPayoutsOnly] = useState(config.steps.length === 0);
  // Add a key to force widget refresh
  const [widgetKey, setWidgetKey] = useState(0);
  
  const handleConfigureWidget = () => {
    setShowWidget(true);
  };
  
  const handleSelectRecipientType = (type: RecipientType) => {
    setRecipientType(type);
    setShowConfigOptions(false);
  };

  const handleSaveConfiguration = () => {
    // Increment the key to force the widget to re-render
    setWidgetKey(prevKey => prevKey + 1);
    
    toast.success("Widget configuration saved successfully", {
      description: "Your settings have been saved and applied to the widget."
    });
  };

  const handleTogglePayoutsOnly = (checked: boolean) => {
    setIsPayoutsOnly(checked);
    setPayoutsOnlyMode(checked);
  };

  const stepOptions: { value: VerificationStep; label: string }[] = [
    { value: 'profile', label: 'Profile Information' },
    { value: 'bank', label: 'Bank Verification' },
    { value: 'tax', label: 'Tax Information' },
  ];

  const payoutMethodOptions: { value: PayoutMethod; label: string; icon: string }[] = [
    { value: 'bank', label: 'Bank Transfer', icon: '🏦' },
    { value: 'crypto', label: 'Cryptocurrency', icon: '₿' },
    { value: 'digital', label: 'Digital Wallet', icon: '💳' },
    { value: 'card', label: 'Push to Card', icon: '💲' },
    { value: 'prepaid', label: 'Prepaid Card', icon: '💰' },
    { value: 'gift', label: 'Gift Card', icon: '🎁' },
  ];

  const recipientOptions: { value: RecipientType; label: string; icon: string }[] = [
    { value: 'vendor', label: 'Vendor', icon: '🏢' },
    { value: 'insured', label: 'Insured', icon: '🛡️' },
    { value: 'individual', label: 'Individual', icon: '👤' },
    { value: 'business', label: 'Business', icon: '💼' },
    { value: 'contractor', label: 'Contractor', icon: '🔧' },
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
      name: 'Purple',
      primaryColor: '#1A1F2C',
      accentColor: '#9b87f5',
      backgroundColor: '#221F26',
      textColor: '#ffffff',
      borderColor: '#3A3544',
    },
    {
      name: 'Blue',
      primaryColor: '#243949',
      accentColor: '#0EA5E9',
      backgroundColor: '#304352',
      textColor: '#ffffff',
      borderColor: '#435363',
    },
    {
      name: 'Green',
      primaryColor: '#054232',
      accentColor: '#8FE388',
      backgroundColor: '#0B5D44',
      textColor: '#ffffff',
      borderColor: '#1C7A60',
    },
    {
      name: 'Orange',
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
  };

  return (
    <div className="min-h-screen bg-payouts-dark text-white p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-gradient">Payouts.com Widget Demo</h1>
          <Button variant="outline" onClick={() => navigate('/')}>Back to Home</Button>
        </div>
        
        {!showWidget ? (
          <div className="glass-card p-8 mb-8">
            <h2 className="text-2xl mb-4">Smart Payout Widget</h2>
            <p className="mb-6">This is a demonstration of our payout widget. In a real implementation, this would be the embedded widget where users can select their payout method.</p>
            
            <div className="bg-white/10 p-6 rounded-lg">
              <div className="text-center p-8">
                <h3 className="text-xl mb-4">Widget Placeholder</h3>
                <p>The actual widget functionality would appear here.</p>
                <Button className="btn-primary mt-6" onClick={handleConfigureWidget}>Configure Widget</Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-card p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl">Smart Payout Widget</h2>
              <Button 
                variant="outline" 
                onClick={() => setShowConfigPanel(!showConfigPanel)}
                className="flex items-center gap-2"
              >
                <Palette size={16} />
                {showConfigPanel ? 'Hide Configuration' : 'Configure Widget'}
              </Button>
            </div>

            <div className={`grid ${showConfigPanel ? 'grid-cols-1 md:grid-cols-3 gap-6' : 'grid-cols-1'}`}>
              {showConfigPanel && (
                <div className="bg-black/30 p-5 rounded-lg h-fit">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Widget Configuration</h3>
                    <div className="flex items-center gap-2">
                      <Button 
                        onClick={() => setWidgetKey(prevKey => prevKey + 1)}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                        title="Refresh widget"
                      >
                        <RefreshCcw size={14} />
                      </Button>
                      <Button 
                        onClick={handleSaveConfiguration}
                        className="flex items-center gap-2 bg-payouts-accent text-payouts-dark hover:bg-payouts-accent/90"
                        size="sm"
                      >
                        <Save size={16} />
                        Save Configuration
                      </Button>
                    </div>
                  </div>
                  <Tabs defaultValue="steps" className="w-full">
                    <TabsList className="grid grid-cols-3 mb-4">
                      <TabsTrigger value="steps">Steps</TabsTrigger>
                      <TabsTrigger value="payouts">Payouts</TabsTrigger>
                      <TabsTrigger value="styling">Styling</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="steps" className="space-y-4">
                      <h3 className="text-lg font-medium">Recipient Type</h3>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full justify-between">
                            <span className="flex items-center gap-2">
                              {recipientOptions.find(r => r.value === config.recipientType)?.icon} 
                              {recipientOptions.find(r => r.value === config.recipientType)?.label}
                            </span>
                            <ChevronDown size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-full">
                          {recipientOptions.map((recipient) => (
                            <DropdownMenuItem 
                              key={recipient.value}
                              onClick={() => handleSelectRecipientType(recipient.value)}
                              className="cursor-pointer"
                            >
                              <span className="mr-2">{recipient.icon}</span>
                              {recipient.label}
                              {config.recipientType === recipient.value && (
                                <Check className="ml-auto h-4 w-4" />
                              )}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                      
                      <div className="space-y-2 pt-2">
                        <div className="flex items-center gap-2 mb-4">
                          <Checkbox 
                            id="payouts-only" 
                            checked={isPayoutsOnly}
                            onCheckedChange={handleTogglePayoutsOnly}
                          />
                          <label 
                            htmlFor="payouts-only"
                            className="text-sm font-medium leading-none flex items-center gap-2"
                          >
                            <span className="bg-payouts-accent/20 text-payouts-accent px-2 py-1 rounded text-xs font-bold">Payouts Only Mode</span>
                            <span className="text-white/70">(Skip all verification steps)</span>
                          </label>
                        </div>
                        
                        <h3 className={`text-lg font-medium ${isPayoutsOnly ? 'opacity-50' : ''}`}>Verification Steps</h3>
                        <p className={`text-sm text-muted-foreground ${isPayoutsOnly ? 'opacity-50' : ''}`}>
                          {isPayoutsOnly 
                            ? "Verification steps are disabled in Payouts Only mode" 
                            : "Select which steps to include"}
                        </p>
                        
                        <div className="space-y-2">
                          {stepOptions.map((step) => (
                            <div key={step.value} className="flex items-center gap-2">
                              <Checkbox 
                                id={`step-${step.value}`} 
                                checked={config.steps.includes(step.value)}
                                onCheckedChange={() => toggleStep(step.value)}
                                disabled={isPayoutsOnly}
                              />
                              <label 
                                htmlFor={`step-${step.value}`}
                                className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed ${isPayoutsOnly ? 'opacity-50' : ''}`}
                              >
                                {step.label}
                              </label>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-2 pt-3">
                          <Checkbox 
                            id="show-progress" 
                            checked={config.showProgressBar}
                            onCheckedChange={(checked) => 
                              updateConfig({ showProgressBar: !!checked })}
                            disabled={isPayoutsOnly}
                          />
                          <label 
                            htmlFor="show-progress"
                            className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed ${isPayoutsOnly ? 'opacity-50' : ''}`}
                          >
                            Show Progress Bar
                          </label>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Checkbox 
                            id="show-steps" 
                            checked={config.showStepNumbers}
                            onCheckedChange={(checked) => 
                              updateConfig({ showStepNumbers: !!checked })}
                            disabled={isPayoutsOnly}
                          />
                          <label 
                            htmlFor="show-steps"
                            className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed ${isPayoutsOnly ? 'opacity-50' : ''}`}
                          >
                            Show Step Numbers
                          </label>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="payouts" className="space-y-4">
                      <h3 className="text-lg font-medium">Payout Methods</h3>
                      <p className="text-sm text-muted-foreground">Select which payout methods to include</p>
                      
                      <div className="space-y-3">
                        {payoutMethodOptions.map((method) => (
                          <div key={method.value} className="flex items-center gap-2">
                            <Checkbox 
                              id={`method-${method.value}`} 
                              checked={config.payoutMethods.includes(method.value)}
                              onCheckedChange={() => togglePayoutMethod(method.value)}
                            />
                            <label 
                              htmlFor={`method-${method.value}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed flex items-center gap-2"
                            >
                              <span>{method.icon}</span> {method.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="styling" className="space-y-4">
                      <h3 className="text-lg font-medium">Color Presets</h3>
                      <div className="grid grid-cols-1 gap-2">
                        {colorPresets.map((preset, index) => (
                          <button
                            key={index}
                            onClick={() => handleColorPresetSelect(preset)}
                            className="flex items-center gap-3 p-2 rounded-md hover:bg-white/10 transition-colors"
                          >
                            <div className="flex gap-1">
                              <div 
                                className="w-5 h-5 rounded-full" 
                                style={{ backgroundColor: preset.primaryColor }}
                              ></div>
                              <div 
                                className="w-5 h-5 rounded-full" 
                                style={{ backgroundColor: preset.accentColor }}
                              ></div>
                              <div 
                                className="w-5 h-5 rounded-full" 
                                style={{ backgroundColor: preset.backgroundColor }}
                              ></div>
                            </div>
                            <span>{preset.name}</span>
                          </button>
                        ))}
                      </div>
                      
                      <div className="space-y-4 pt-2">
                        <h3 className="text-lg font-medium">UI Customization</h3>
                        
                        <div className="space-y-2">
                          <label className="text-sm">Border Radius</label>
                          <Slider
                            defaultValue={[config.borderRadius]}
                            min={0}
                            max={20}
                            step={1}
                            onValueChange={(value) => updateConfig({ borderRadius: value[0] })}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm">Button Style</label>
                          <div className="flex gap-2">
                            {['rounded', 'square', 'pill'].map((style) => (
                              <Button
                                key={style}
                                variant={config.buttonStyle === style ? 'default' : 'outline'}
                                className={
                                  style === 'rounded' ? 'rounded-md' :
                                  style === 'square' ? 'rounded-none' : 'rounded-full'
                                }
                                onClick={() => updateConfig({ 
                                  buttonStyle: style as 'rounded' | 'square' | 'pill' 
                                })}
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
                          onClick={resetConfig}
                          className="w-full"
                        >
                          Reset to Defaults
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
              
              <div className={showConfigPanel ? "col-span-1 md:col-span-2" : "col-span-1"}>
                {showConfigOptions ? (
                  <div className="bg-white/10 p-6 rounded-lg">
                    <div className="text-center p-8">
                      <h3 className="text-xl mb-4">Select Recipient Type</h3>
                      <p className="mb-6">Choose the type of recipient for this payout flow</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                        {recipientOptions.map((recipient) => (
                          <Button 
                            key={recipient.value}
                            onClick={() => handleSelectRecipientType(recipient.value)}
                            className="p-4 h-auto flex flex-col items-center"
                          >
                            <span className="text-2xl mb-2">{recipient.icon}</span>
                            <span className="text-lg font-medium">{recipient.label}</span>
                            <span className="text-sm text-gray-400 mt-1">
                              {recipient.value === 'vendor' && 'For supplier payments'}
                              {recipient.value === 'insured' && 'For insurance claims'}
                              {recipient.value === 'individual' && 'For personal payments'}
                              {recipient.value === 'business' && 'For company payments'}
                              {recipient.value === 'contractor' && 'For freelance payments'}
                            </span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/10 p-6 rounded-lg overflow-hidden">
                    <div className="mb-4 p-3 bg-white/5 rounded-lg flex flex-wrap justify-between items-center gap-2">
                      <div>
                        <h4 className="font-medium">Current Recipient Type: <span className="text-payouts-accent capitalize">{config.recipientType}</span></h4>
                        <div className="text-sm mt-1">
                          {isPayoutsOnly ? (
                            <span className="bg-payouts-accent/20 text-payouts-accent px-2 py-1 rounded text-xs font-bold">
                              Payouts Only Mode Enabled
                            </span>
                          ) : (
                            <>
                              <span className="text-white/70">Steps: </span>
                              {config.steps.map((step, index) => (
                                <span key={step} className="capitalize">
                                  {index > 0 ? ' → ' : ''}{step}
                                </span>
                              ))}
                            </>
                          )}
                        </div>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => setShowConfigOptions(true)}>
                        Change Type
                      </Button>
                    </div>
                    <div className="flex justify-center">
                      <PayoutWidget key={widgetKey} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WidgetDemo;
