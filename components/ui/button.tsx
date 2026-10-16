import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "cta-primary text-black font-bold shadow-lg hover:shadow-[0_0_25px_rgba(201,165,92,0.5)]",
        luxury: "cta-primary text-black font-bold shadow-xl",
        outline: "cta-secondary text-foreground hover:text-white",
        ghost: "hover:bg-primary/10 hover:text-primary text-muted-foreground",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-8 text-base",
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

export function Button({ className, variant, size, asChild, ...p }: ButtonProps) {
  const C = asChild ? Slot : "button";
  return <C className={cn(buttonVariants({ variant, size }), className)} {...p} />;
}
