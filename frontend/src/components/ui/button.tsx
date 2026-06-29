import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends HTMLMotionProps<"button"> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, isLoading, variant = 'primary', children, disabled, ...props }, ref) => {
    const baseStyle = "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      primary: "bg-blue-600/80 hover:bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)] border border-blue-500/50",
      secondary: "bg-white/10 hover:bg-white/20 text-white border border-white/10",
      ghost: "hover:bg-white/10 text-slate-300 hover:text-white",
      danger: "bg-red-600/80 hover:bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)] border border-red-500/50"
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        className={`${baseStyle} ${variants[variant]} ${className || ''}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
