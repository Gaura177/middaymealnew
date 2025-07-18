"use client";

import * as React from "react";
import { MoveRight } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Link from "next/link";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-custom-light-blue text-custom-light-blue-foreground hover:bg-custom-light-blue/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
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

interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

export const Hero = React.forwardRef<HTMLDivElement, HeroProps>(
  (
    {
      className,
      title = "MID DAY MEAL",
      subtitle = "Providing nutritious meals to children across schools nationwide",
      ctaText = "Get Started",
      ctaLink = "#",
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("w-full bg-background", className)}
        {...props}
      >
        <div className="container mx-auto px-4">
          <div className="flex gap-6 py-16 md:py-24 items-center justify-center flex-col">
            <div className="flex gap-4 flex-col">
              <h1 className="text-4xl md:text-6xl max-w-3xl tracking-tighter text-center font-bold">
                {title}
              </h1>
              {subtitle && (
                <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-3xl text-center">
                  {subtitle}
                </p>
              )}
            </div>

            <div className="relative w-full">
              <div className="absolute -z-10 w-[250px] h-[250px] md:w-[400px] md:h-[400px] rounded-full border border-border/30 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"></div>
              <div className="absolute -z-10 w-[180px] h-[180px] md:w-[280px] md:h-[280px] rounded-full border border-border/50 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"></div>
            </div>

            {ctaText && ctaLink && (
              <Button size="lg" className="gap-2" asChild>
                <a href={ctaLink}>
                  {ctaText} <MoveRight className="w-4 h-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
);
Hero.displayName = "Hero";

export { Button, buttonVariants };
