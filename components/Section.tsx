import React from 'react';

interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
  dark?: boolean;
}

export const Section: React.FC<SectionProps> = ({ 
  id, 
  title, 
  subtitle, 
  className = '', 
  children,
  dark = false
}) => {
  return (
    <section 
      id={id} 
      className={`py-16 md:py-24 px-6 md:px-12 lg:px-20 ${dark ? 'bg-brand-900 text-white' : 'bg-white text-brand-900'} ${className}`}
    >
      <div className="max-w-5xl mx-auto">
        {(title || subtitle) && (
          <div className="mb-12">
            {title && (
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${dark ? 'text-white' : 'text-brand-900'}`}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={`text-lg md:text-xl ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
                {subtitle}
              </p>
            )}
            <div className={`mt-6 h-1 w-20 ${dark ? 'bg-brand-600' : 'bg-brand-900'}`}></div>
          </div>
        )}
        {children}
      </div>
    </section>
  );
};