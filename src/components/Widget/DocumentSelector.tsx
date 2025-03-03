
import React from 'react';
import { KYCDocumentType } from '@/hooks/use-widget-config';
import { motion } from 'framer-motion';
import { useWidgetConfig } from '@/hooks/use-widget-config';
import { IdCard, ScanFace, Check } from 'lucide-react';

interface DocumentSelectorProps {
  documentType: KYCDocumentType;
  onDocumentTypeChange: (type: KYCDocumentType) => void;
}

const DocumentSelector: React.FC<DocumentSelectorProps> = ({
  documentType,
  onDocumentTypeChange,
}) => {
  const { config } = useWidgetConfig();
  
  const documentTypes = [
    { id: 'passport', label: 'Passport', description: 'International travel document', icon: IdCard },
    { id: 'id', label: 'ID Card', description: 'National identity card', icon: IdCard },
    { id: 'driver_license', label: 'Driver\'s License', description: 'Driver\'s license with photo', icon: IdCard },
  ];
  
  return (
    <div className="grid grid-cols-3 gap-2 mb-8">
      {documentTypes.map((doc) => {
        const Icon = doc.icon;
        const isActive = documentType === doc.id;
        
        return (
          <motion.button
            key={doc.id}
            onClick={() => onDocumentTypeChange(doc.id as KYCDocumentType)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              flex flex-col items-center text-center p-4 rounded-xl transition-all
              ${isActive 
                ? "bg-white/10 shadow-lg border border-white/20" 
                : "bg-white/5 hover:bg-white/8 border border-transparent"}
            `}
            style={{
              borderColor: isActive ? `${config.accentColor}50` : 'transparent',
              boxShadow: isActive ? `0 4px 20px -5px ${config.accentColor}40` : 'none',
            }}
          >
            <div 
              className={`
                w-12 h-12 rounded-full flex items-center justify-center mb-3
                ${isActive ? "bg-gradient-to-br from-white/10 to-white/5" : "bg-white/5"}
              `}
              style={{
                boxShadow: isActive ? `0 0 15px ${config.accentColor}30` : 'none',
                border: isActive ? `1px solid ${config.accentColor}40` : '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <Icon
                size={24}
                className={`
                  transition-all
                  ${isActive ? "text-white" : "text-white/60"}
                `}
                style={{
                  color: isActive ? config.accentColor : undefined,
                  filter: isActive ? `drop-shadow(0 0 5px ${config.accentColor}70)` : 'none',
                }}
              />
            </div>
            <div className="space-y-1">
              <h3 className={`
                font-medium text-sm
                ${isActive ? "text-white" : "text-white/80"}
              `}>
                {doc.label}
              </h3>
              <p className="text-xs text-white/60 line-clamp-2">
                {doc.description}
              </p>
            </div>
            {isActive && (
              <motion.div 
                className="h-1 w-12 mt-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '50%' }}
                style={{ 
                  background: `linear-gradient(to right, ${config.accentColor}, ${config.accentColor}50)`,
                }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default DocumentSelector;
