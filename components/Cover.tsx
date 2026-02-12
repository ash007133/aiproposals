import React from 'react';
import { PROJECT_DETAILS, COMPANY_INFO } from '../constants';
import { ChevronDown } from 'lucide-react';

export const Cover: React.FC = () => {
  const scrollToNext = () => {
    const nextSection = document.getElementById('introduction');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="cover" className="relative h-screen w-full flex flex-col justify-center items-center text-white bg-brand-900 overflow-hidden">
      {/* Background Overlay Image */}
      <div className="absolute inset-0 z-0 opacity-40">
         <img 
            src="https://picsum.photos/seed/finance_city/1920/1080" 
            alt="Cityscape" 
            className="w-full h-full object-cover animate-zoom-slow"
         />
      </div>
      
      {/* Content - Moved up with -translate-y-12 */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto -translate-y-12 md:-translate-y-16">
        <div className="bg-white/10 backdrop-blur-sm p-8 md:p-12 rounded-lg border border-white/20 shadow-2xl">
          <div className="mb-8 flex justify-center">
             <div className="p-4 rounded">
                <img 
                  src="https://petersenbusinesssolutions.co.za/wp-content/uploads/2022/07/white_logo_color2_background.png" 
                  alt="Petersen Business Solutions" 
                  className="h-24 md:h-32 w-auto object-contain"
                />
             </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Accounting Proposal
          </h1>
          
          <div className="mb-8">
            <p className="text-xl md:text-2xl text-slate-200 font-light mb-2">
              Prepared exclusively for
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {PROJECT_DETAILS.clientName}
            </h2>
            <p className="text-sm md:text-lg text-slate-300 font-medium">
              From {PROJECT_DETAILS.clientCompany}
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-sm md:text-base text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-500"></span>
              Written by {COMPANY_INFO.founder}
            </div>
            <div className="hidden md:block text-slate-500">•</div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-500"></span>
              {PROJECT_DETAILS.proposalDate}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <button 
          onClick={scrollToNext}
          className="flex flex-col items-center justify-center p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all animate-bounce cursor-pointer group"
          aria-label="Scroll down"
        >
          <span className="text-xs uppercase tracking-widest text-slate-300 mb-1 group-hover:text-white transition-colors">Start</span>
          <ChevronDown size={32} className="text-white drop-shadow-md" />
        </button>
      </div>
    </div>
  );
};