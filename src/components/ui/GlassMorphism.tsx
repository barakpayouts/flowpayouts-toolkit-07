
import React from 'react';
import { cn } from "@/lib/utils";

interface GlassMorphismProps {
  className?: string;
  children: React.ReactNode;
  hoverEffect?: boolean;
}

const GlassMorphism: React.FC<GlassMorphismProps> = ({ 
  className, 
  children,
  hoverEffect = false
}) => {
  return (
    <div
      className={cn(
        "glass-card",
        hoverEffect && "glass-card-hover",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassMorphism;
