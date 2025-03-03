
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useWidgetConfig } from '@/hooks/use-widget-config';
import ChatWindow from './ChatWindow';
import { Check, Palette, Bot } from 'lucide-react';
import { motion } from 'framer-motion';

interface AIStyleConfiguratorProps {
  setWidgetKey: (cb: (prev: number) => number) => void;
}

const AIStyleConfigurator: React.FC<AIStyleConfiguratorProps> = ({ setWidgetKey }) => {
  const { config, updateConfig } = useWidgetConfig();
  const [previewStyle, setPreviewStyle] = useState(config);
  const [showPreview, setShowPreview] = useState(false);
  
  const handleStyleChange = (styleChanges: any) => {
    setPreviewStyle({
      ...config,
      ...styleChanges,
    });
    setShowPreview(true);
  };
  
  const applyChanges = () => {
    updateConfig(previewStyle);
    setWidgetKey(prevKey => prevKey + 1);
    setShowPreview(false);
  };
  
  return (
    <div className="bg-[#1A1F2C]/95 rounded-xl border border-white/10 p-0 overflow-hidden shadow-lg">
      <div className="p-3 border-b border-white/10">
        <div className="flex items-center gap-2 mb-1">
          <Bot size={16} className="text-payouts-accent" />
          <h3 className="font-medium text-sm">AI-Powered Widget Styling</h3>
        </div>
        <p className="text-white/70 text-xs">
          Chat with our AI to customize the widget design based on your brand. 
          Upload your logo or share your website, and let the AI create a style 
          that matches your branding.
        </p>
      </div>
      
      <div className="ai-style-grid">
        <div className="h-full">
          <ChatWindow onApplyStyle={handleStyleChange} />
        </div>
        
        <div className="border-t md:border-t-0 md:border-l border-white/10 bg-gradient-to-br from-[#1A1F2C] to-[#141824] p-4 flex flex-col h-full">
          <div className="flex items-center gap-2 mb-4">
            <Palette size={16} className="text-payouts-accent" />
            <h3 className="font-medium text-sm">Style Preview</h3>
          </div>
          
          {!showPreview ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
                <Palette size={20} className="text-white/40" />
              </div>
              <h3 className="text-sm font-medium mb-2">No style changes yet</h3>
              <p className="text-white/60 mb-4 max-w-xs text-xs">
                Chat with the Style AI to create a custom look for your widget based on your brand
              </p>
              <div className="flex flex-col items-center gap-2">
                <button 
                  className="suggestion-chip flex items-center justify-center w-full"
                  onClick={() => handleStyleChange(
                    {
                      name: "Green and Blue",
                      primaryColor: "#1A3C40",
                      accentColor: "#1EAEDB",
                      backgroundColor: "#265073",
                      textColor: "#ffffff",
                      borderColor: "#2D6E7E",
                      borderRadius: 8,
                    }
                  )}
                >
                  "Make it match our website colors"
                </button>
                <button
                  className="suggestion-chip flex items-center justify-center w-full"
                  onClick={() => handleStyleChange(
                    {
                      name: "Ocean Blue",
                      primaryColor: "#003366",
                      accentColor: "#33C3F0",
                      backgroundColor: "#004E89",
                      textColor: "#ffffff",
                      borderColor: "#2A6F97",
                      borderRadius: 8,
                    }
                  )}
                >
                  "Our brand uses green and blue"
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col">
              <div className="grid grid-cols-1 gap-3 mb-3">
                <div className="bg-white/5 p-3 rounded-lg">
                  <h4 className="text-xs font-medium mb-2 text-white/70">Color Palette</h4>
                  <div className="flex gap-2 mb-3">
                    <div className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-8 h-8 rounded-md mb-1"
                        style={{ backgroundColor: previewStyle.primaryColor }}
                      ></div>
                      <span className="text-[10px] text-white/60">Primary</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-8 h-8 rounded-md mb-1"
                        style={{ backgroundColor: previewStyle.accentColor }}
                      ></div>
                      <span className="text-[10px] text-white/60">Accent</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-8 h-8 rounded-md mb-1"
                        style={{ backgroundColor: previewStyle.backgroundColor }}
                      ></div>
                      <span className="text-[10px] text-white/60">Background</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-8 h-8 rounded-md border border-white/10 mb-1"
                        style={{ backgroundColor: previewStyle.borderColor }}
                      ></div>
                      <span className="text-[10px] text-white/60">Border</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 p-3 rounded-lg">
                  <h4 className="text-xs font-medium mb-2 text-white/70">Style Preview</h4>
                  <div className="space-y-2">
                    <div 
                      className="h-12 rounded-lg border p-2 flex items-center justify-between"
                      style={{ 
                        backgroundColor: previewStyle.backgroundColor,
                        borderColor: previewStyle.borderColor,
                        borderRadius: `${previewStyle.borderRadius}px`,
                      }}
                    >
                      <div className="w-24 h-4 bg-white/10 rounded"></div>
                      <div 
                        className="w-20 h-6 rounded flex items-center justify-center text-[10px] font-medium"
                        style={{ 
                          backgroundColor: previewStyle.accentColor,
                          color: previewStyle.primaryColor,
                          borderRadius: `${previewStyle.borderRadius}px`,
                        }}
                      >
                        Button
                      </div>
                    </div>
                    
                    <div 
                      className="h-12 rounded-lg border flex items-center gap-2 p-2"
                      style={{ 
                        backgroundColor: previewStyle.backgroundColor,
                        borderColor: previewStyle.borderColor,
                        borderRadius: `${previewStyle.borderRadius}px`,
                      }}
                    >
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: previewStyle.accentColor }}
                      >
                        <Bot size={12} style={{ color: previewStyle.primaryColor }} />
                      </div>
                      <div className="flex-1">
                        <div className="w-full h-2 bg-white/10 rounded mb-1"></div>
                        <div className="w-2/3 h-2 bg-white/10 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-auto"
              >
                <Button 
                  onClick={applyChanges}
                  className="w-full flex items-center justify-center gap-2 py-2 text-payouts-dark font-semibold text-sm"
                  style={{ 
                    backgroundColor: previewStyle.accentColor,
                    color: previewStyle.primaryColor,
                  }}
                  variant="accent"
                  size="default"
                >
                  <Check size={14} />
                  Apply This Style
                </Button>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIStyleConfigurator;
