"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RegisterProgressProps {
  currentStep: number;
}

const steps = [
  { number: 1, label: "Purchase" },
  { number: 2, label: "Connect Exchange" },
  { number: 3, label: "Start Trading" }
];

export function RegisterProgress({ currentStep }: RegisterProgressProps) {
  return (
    <div className="mb-12">
      <div className="flex justify-center items-center gap-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className="flex flex-col items-center">
              <motion.div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold mb-2",
                  step.number < currentStep && "bg-accent text-accent-foreground",
                  step.number === currentStep && "bg-primary text-primary-foreground",
                  step.number > currentStep && "bg-muted text-muted-foreground"
                )}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                {step.number}
              </motion.div>
              <span className="text-sm text-muted-foreground">{step.label}</span>
            </div>
            {index < steps.length - 1 && (
              <div className="w-20 h-[2px] mx-2 bg-muted">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: "0%" }}
                  animate={{ width: step.number < currentStep ? "100%" : "0%" }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}