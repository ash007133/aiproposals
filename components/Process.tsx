import React from 'react';
import { Section } from './Section';

export const Process: React.FC = () => {
  const steps = [
    {
      title: "Consultation",
      desc: "We analyze your current financial standing and needs."
    },
    {
      title: "Proposal",
      desc: "We present a bespoke package (like this one) tailored to you."
    },
    {
      title: "Onboarding",
      desc: "Setting up cloud systems and transferring historical data."
    },
    {
      title: "Management",
      desc: "Ongoing daily/weekly management and reporting."
    }
  ];

  return (
    <Section id="process" title="Our Process" subtitle="From chaos to clarity in four steps.">
      <div className="relative mt-12">
        {/* Connection Line (Desktop) */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 z-0"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="w-12 h-12 mx-auto bg-white border-4 border-brand-500 rounded-full flex items-center justify-center text-xl font-bold text-brand-900 shadow-sm mb-6 relative z-10 group-hover:scale-110 transition-transform">
                {index + 1}
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-slate-100 text-center h-full hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-lg text-brand-900 mb-2">{step.title}</h4>
                <p className="text-sm text-slate-600">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-24 text-center max-w-3xl mx-auto">
        <blockquote className="text-xl font-medium italic text-brand-600 leading-relaxed">
          "Small errors in business accounting can lead to big mistakes... that's why we don't make them"
        </blockquote>
        <div className="mt-6 text-sm text-slate-900 tracking-wider">
          <span className="font-bold">ASHWELL PETERSEN</span> <span className="text-slate-400 px-2">|</span> <span className="font-bold">Founder of Petersen Business Solutions</span>
        </div>
      </div>
    </Section>
  );
};