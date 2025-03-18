"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, max, getValueLabel, ...props }, ref) => {
  const defaultMax = 100;
  const validMax =
    max !== undefined && !isNaN(max) && max > 0 ? max : defaultMax;

  // Ensure value is a number, default to 0 if undefined or null
  const numericValue = value !== null && value !== undefined ? value : 0;

  // Handle invalid max value
  if (max !== undefined && (isNaN(max) || max <= 0)) {
    console.error(
      `Invalid prop \`max\` of value \`${max}\` supplied to \`Progress\`. Only numbers greater than 0 are valid max values. Defaulting to \`100\`.`
    );
  }

  // Handle invalid value
  if (isNaN(numericValue)) {
    console.error(
      `Invalid prop \`value\` of value \`${value}\` supplied to \`Progress\`. The \`value\` prop must be a number.`
    );
  }

  if (numericValue < 0 || numericValue > validMax) {
    console.error(
      `Invalid prop \`value\` of value \`${value}\` supplied to \`Progress\`. The \`value\` prop must be a number between 0 and ${validMax}.`
    );
  }

  // Generate value label
  const defaultGetValueLabel = (value: number, max: number) =>
    `${Math.round((value / max) * 100)}%`;
  const label =
    value !== null
      ? (getValueLabel || defaultGetValueLabel)(numericValue, validMax)
      : undefined;

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...props}
      value={numericValue}
      max={validMax}
      aria-valuetext={label}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-primary transition-all"
        style={{
          transform: `translateX(-${100 - (numericValue / validMax) * 100}%)`,
        }}
      />
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = "Progress";

export { Progress };
