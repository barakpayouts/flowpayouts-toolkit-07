
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-md hover:shadow-lg hover:-translate-y-0.5",
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
          "backdrop-blur-md bg-white/20 text-white border border-white/20 shadow-glass hover:bg-white/30 hover:border-white/30 hover:shadow-glass-lg hover:-translate-y-0.5",
        neobrut: 
          "bg-payouts-accent text-payouts-dark font-semibold shadow-neobrut hover:-translate-y-1 hover:shadow-none transition-all duration-300 active:translate-y-0",
        glow: 
          "bg-gradient-to-r from-payouts-accent to-payouts-accent-light text-payouts-dark font-semibold shadow-glow hover:shadow-accent-glow hover:-translate-y-0.5 transition-all duration-300",
        gradient: 
          "bg-gradient-to-r from-purple-700 via-violet-600 to-purple-700 text-white font-semibold hover:bg-gradient-to-r hover:from-purple-600 hover:via-violet-500 hover:to-purple-600 shadow-md hover:shadow-lg hover:-translate-y-0.5",
        accent: 
          "bg-payouts-accent text-payouts-dark font-semibold hover:bg-payouts-accent-light shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5",
        // Adding new high contrast variants - ensuring text color is explicitly defined for each
        purple: 
          "bg-[#9b87f5] text-gray-900 font-medium shadow-md hover:bg-[#8B5CF6] hover:text-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300",
        blue: 
          "bg-[#0EA5E9] text-white font-medium shadow-md hover:bg-[#0284c7] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300",
        orange: 
          "bg-[#F97316] text-white font-medium shadow-md hover:bg-[#ea580c] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300",
        dark: 
          "bg-[#1A1F2C] text-white font-medium border border-white/10 shadow-md hover:bg-[#1A1F2C]/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300",
      },
      size: {
        default: "h-10 px-5 py-2 rounded-md",
        sm: "h-9 rounded-md px-4",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10 rounded-full",
        xl: "h-12 rounded-md px-10 text-base",
        // Size variants
        pill: "h-10 px-6 rounded-full",
        wide: "h-11 px-12 rounded-md",
        compact: "h-8 px-3 text-xs rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
