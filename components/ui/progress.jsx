"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

/**
 * Progress
 * ------------------------------------------------------------------
 * Used for ROI progress, cap completion, wallet activity, etc.
 * Navy track + gold fill for premium financial feel
 */
const Progress = React.forwardRef(
  ({ className, value = 0, ...props }, ref) => (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-3 w-full overflow-hidden rounded-full",
        "bg-navy/10", // track
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full w-full flex-1 rounded-full",
          "bg-gold transition-transform duration-500 ease-out"
        )}
        style={{
          transform: `translateX(-${100 - Math.min(Math.max(value, 0), 100)}%)`,
        }}
      />
    </ProgressPrimitive.Root>
  )
);

Progress.displayName = "Progress";

export { Progress };
