
import React, { useState, useEffect } from 'react';
import { Wallet, CheckCircle2, ArrowRight } from 'lucide-react';
import { useWidgetConfig, PayoutMethodProps } from '@/hooks/use-widget-config';
import { motion } from 'framer-motion';

const DigitalWallet: React.FC<PayoutMethodProps> = ({ onSelect, isSelected = false }) => {
  const [selected, setSelected] = useState(isSelected);
  const { config } = useWidgetConfig();
  
  useEffect(() => {
    setSelected(isSelected);
  }, [isSelected]);
  
  const handleSelect = () => {
    setSelected(true);
    onSelect();
  };
  
  return (
    <motion.div 
      className="relative p-5 mb-3 overflow-hidden rounded-xl"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      onClick={handleSelect}
      style={{
        borderRadius: `${config.borderRadius}px`,
        background: selected 
          ? `linear-gradient(135deg, ${config.backgroundColor}ee, ${config.backgroundColor}90)`
          : 'rgba(255, 255, 255, 0.05)',
        boxShadow: selected 
          ? `0 10px 25px -5px ${config.accentColor}40` 
          : '0 4px 12px rgba(0, 0, 0, 0.1)',
        border: selected 
          ? `1px solid ${config.accentColor}70` 
          : '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Decorative background elements */}
      <div 
        className="absolute inset-0 opacity-20" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 30% 30%, ${config.accentColor}30 0%, transparent 70%)`,
        }}
      />
      
      <div className="relative flex items-center gap-4">
        <motion.div 
          className="flex items-center justify-center w-14 h-14 rounded-lg"
          whileHover={{ rotate: [0, -5, 5, -5, 0] }}
          whileTap={{ scale: 0.95 }}
          style={{
            backgroundColor: selected 
              ? `${config.accentColor}20` 
              : 'rgba(255, 255, 255, 0.07)',
            boxShadow: selected 
              ? `0 0 15px ${config.accentColor}40` 
              : '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Wallet 
            size={24} 
            className="transition-all duration-300" 
            style={{ 
              color: config.accentColor,
              filter: selected ? `drop-shadow(0 0 5px ${config.accentColor}90)` : 'none',
            }}
          />
        </motion.div>
        
        <div className="flex-1">
          <div className="flex items-center">
            <motion.h3 
              className="font-semibold text-lg"
              animate={{ x: selected ? 0 : 0 }}
            >
              Digital Wallet
            </motion.h3>
            {selected && (
              <motion.span 
                className="ml-2 text-xs font-medium px-2 py-0.5 rounded-full"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ 
                  backgroundColor: `${config.accentColor}20`,
                  color: config.accentColor,
                }}
              >
                Selected
              </motion.span>
            )}
          </div>
          
          <div className="space-y-3">
            <p className="text-sm text-white/70">Instant transfer to Apple Pay, Google Pay, or PayPal</p>
            
            {selected && (
              <motion.div 
                className="flex gap-3 mt-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Apple_Pay_logo.svg/1200px-Apple_Pay_logo.svg.png" 
                    alt="Apple Pay" 
                    className="h-4 w-auto"
                  />
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10">
                  <img src="https://developers.google.com/static/pay/api/images/brand-guidelines/google-pay-mark.png" 
                    alt="Google Pay" 
                    className="h-4 w-auto"
                  />
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" 
                    alt="PayPal" 
                    className="h-4 w-auto"
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>
        
        <div className="shrink-0">
          {selected ? (
            <motion.div 
              className="flex items-center justify-center w-8 h-8 rounded-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring" }}
              style={{ 
                backgroundColor: config.accentColor,
                boxShadow: `0 0 15px ${config.accentColor}80`,
              }}
            >
              <CheckCircle2 size={18} style={{ color: config.backgroundColor }} />
            </motion.div>
          ) : (
            <motion.div 
              className="w-8 h-8 rounded-full border-2 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              style={{
                borderColor: `${config.accentColor}50`,
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
              }}
            >
              <ArrowRight size={16} className="text-white/60" />
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Bottom animated border */}
      {selected && (
        <motion.div 
          className="absolute bottom-0 left-0 h-1 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          style={{ 
            background: `linear-gradient(to right, ${config.accentColor}, ${config.accentColor}80)`,
            boxShadow: `0 0 10px ${config.accentColor}50`,
          }}
        />
      )}
    </motion.div>
  );
};

export default DigitalWallet;
