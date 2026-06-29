import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {icon && (
          <div className="absolute left-3 text-slate-400 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={`flex h-11 w-full rounded-xl bg-black/20 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all ${icon ? 'pl-10' : ''} ${className || ''}`}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';
