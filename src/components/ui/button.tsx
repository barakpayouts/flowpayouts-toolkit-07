
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:bg-destructive/90",
        outline:
          "border border-input bg-[#1A1F2C] text-white hover:bg-accent hover:text-accent-foreground hover:border-accent",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground text-white",
        link: "text-primary underline-offset-4 hover:underline",
        // Modernized button variants with improved contrast
        glass: 
          "bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all",
        glassDark: 
          "bg-black/30 backdrop-blur-sm border border-white/10 text-white hover:bg-black/40 transition-all",
        glassAccent: 
          "bg-accent/20 backdrop-blur-sm border border-accent/30 text-white hover:bg-accent/30 transition-all",
        purple: 
          "bg-button-purple text-white hover:bg-button-purple/90 shadow-lg shadow-button-purple/20 hover:shadow-xl hover:shadow-button-purple/30 transition-all",
        blue: 
          "bg-button-blue text-white hover:bg-button-blue/90 shadow-lg shadow-button-blue/20 hover:shadow-xl hover:shadow-button-blue/30 transition-all",
        orange: 
          "bg-button-orange text-white hover:bg-button-orange/90 shadow-lg shadow-button-orange/20 hover:shadow-xl hover:shadow-button-orange/30 transition-all",
        dark: 
          "bg-button-dark text-white hover:bg-button-dark/90 shadow-md hover:shadow-lg transition-all border border-white/10",
        accent: 
          "bg-payouts-accent text-payouts-dark hover:bg-payouts-accent-light shadow-lg shadow-payouts-accent/20 hover:shadow-xl hover:shadow-payouts-accent/30 transition-all",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
