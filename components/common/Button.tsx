import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'A' | 'B' | 'rect';
  label: string;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'rect', label, className, ...props }) => {
  const baseStyle = "active:scale-95 transition-transform flex items-center justify-center font-bold text-white shadow-lg border-b-4 border-r-4 border-black/30";
  
  const styles = {
    A: "w-12 h-12 rounded-full bg-red-800 text-sm",
    B: "w-12 h-12 rounded-full bg-red-800 text-sm",
    rect: "px-4 py-2 bg-gray-700 rounded text-xs"
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <button 
        className={`${baseStyle} ${styles[variant]} ${className}`} 
        {...props}
      >
        {variant === 'rect' ? label : ''}
      </button>
      {variant !== 'rect' && <span className="text-red-900 font-bold text-xs tracking-widest">{label}</span>}
    </div>
  );
};