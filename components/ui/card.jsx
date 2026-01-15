import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Card
 * ------------------------------------------------------------------
 * Base container for dashboard + landing UI
 * Navy surface, subtle gold accent support, clean elevation
 */
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border border-navy/10 bg-white text-navy shadow-sm",
      "transition-shadow hover:shadow-md",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

/**
 * CardHeader
 * ------------------------------------------------------------------
 * Title + description container
 */
const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-1.5 p-6 border-b border-navy/5",
      className
    )}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

/**
 * CardTitle
 * ------------------------------------------------------------------
 * Primary heading
 */
const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-lg font-semibold tracking-tight text-navy",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

/**
 * CardDescription
 * ------------------------------------------------------------------
 * Muted explanatory text
 */
const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-sm text-navyMuted",
      className
    )}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

/**
 * CardContent
 * ------------------------------------------------------------------
 * Main content area
 */
const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "p-6 pt-4 text-navy",
      className
    )}
    {...props}
  />
));
CardContent.displayName = "CardContent";

/**
 * CardFooter
 * ------------------------------------------------------------------
 * Actions / summary row
 */
const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-between p-6 pt-4 border-t border-navy/5",
      className
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
