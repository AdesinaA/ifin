"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

/**
 * ROOT
 * ------------------------------------------------------------------
 */
const Tabs = TabsPrimitive.Root;

/**
 * TABS LIST
 * ------------------------------------------------------------------
 * Navy container with subtle border for structure
 */
const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-11 items-center justify-center gap-1",
      "rounded-lg border border-navy/15 bg-navy/5 p-1",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

/**
 * TABS TRIGGER
 * ------------------------------------------------------------------
 * Gold-highlighted active state
 */
const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap",
      "rounded-md px-4 py-2 text-sm font-medium",
      "text-navyMuted transition-all",
      "hover:text-navy",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",

      // ACTIVE STATE
      "data-[state=active]:bg-gold",
      "data-[state=active]:text-navy",
      "data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

/**
 * TABS CONTENT
 * ------------------------------------------------------------------
 * Clean spacing and focus ring
 */
const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
};
