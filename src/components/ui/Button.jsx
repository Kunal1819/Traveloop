import { cn } from "../../utils/cn";
import { forwardRef } from "react";
import { motion } from "framer-motion";

const Button = forwardRef(({ className, variant = "default", size = "default", asChild = false, children, ...props }, ref) => {
  const Comp = asChild ? motion.div : motion.button;
  return (
    <Comp
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-indigo-600 text-white hover:bg-indigo-700 shadow": variant === "default",
          "bg-red-600 text-white hover:bg-red-700 shadow": variant === "destructive",
          "bg-emerald-600 text-white hover:bg-emerald-700 shadow": variant === "positive",
          "bg-white text-slate-700 hover:bg-slate-50 border border-slate-300 shadow-sm": variant === "outline",
          "bg-slate-100 text-slate-900 hover:bg-slate-200": variant === "secondary",
          "hover:bg-slate-100 text-slate-700": variant === "ghost",
          "h-9 px-4 py-2": size === "default",
          "h-8 rounded-md px-3 text-xs": size === "sm",
          "h-10 rounded-md px-8": size === "lg",
          "h-9 w-9": size === "icon",
        },
        className
      )}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </Comp>
  );
});
Button.displayName = "Button";

export { Button };
