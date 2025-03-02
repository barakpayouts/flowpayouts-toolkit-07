
import React, { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

interface AnimatedGradientProps {
  className?: string;
  children?: React.ReactNode;
}

const AnimatedGradient: React.FC<AnimatedGradientProps> = ({ 
  className, 
  children 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    // Create gradient circles
    const circles = [
      { x: width * 0.3, y: height * 0.4, radius: height * 0.6, color: 'rgba(208, 233, 42, 0.08)' },
      { x: width * 0.7, y: height * 0.7, radius: height * 0.5, color: 'rgba(208, 233, 42, 0.05)' },
    ];
    
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw gradient circles
      circles.forEach((circle, i) => {
        const gradient = ctx.createRadialGradient(
          circle.x, 
          circle.y, 
          0, 
          circle.x, 
          circle.y, 
          circle.radius
        );
        
        gradient.addColorStop(0, circle.color);
        gradient.addColorStop(1, 'rgba(15, 42, 53, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Slowly move circles
        circles[i].x += Math.sin(Date.now() * 0.0001) * 0.5;
        circles[i].y += Math.cos(Date.now() * 0.0001) * 0.5;
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      // Update circle positions on resize
      circles[0].x = width * 0.3;
      circles[0].y = height * 0.4;
      circles[0].radius = height * 0.6;
      
      circles[1].x = width * 0.7;
      circles[1].y = height * 0.7;
      circles[1].radius = height * 0.5;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div className={cn("relative", className)}>
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 -z-10 w-full h-full"
      />
      {children}
    </div>
  );
};

export default AnimatedGradient;
