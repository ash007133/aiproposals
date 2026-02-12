import React from 'react';
import { Section } from './Section';
import { Target, Clock, Receipt, CheckCircle2 } from 'lucide-react';

export const Introduction: React.FC = () => {
  return (
    <>
      <Section id="introduction" className="bg-white">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-900 mb-6">
            Your business. Our passion.
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Relax. We can help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold mb-4">Are you facing these challenges?</h3>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="font-medium text-lg text-brand-900">Looming Deadlines</h4>
                <p className="text-slate-600">Dreading those SARS tax return deadlines that seem to come around too fast?</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                <Target size={24} />
              </div>
              <div>
                <h4 className="font-medium text-lg text-brand-900">Year-End Balancing</h4>
                <p className="text-slate-600">Struggling to balance end of year accounts accurately?</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                <Receipt size={24} />
              </div>
              <div>
                <h4 className="font-medium text-lg text-brand-900">Paperwork Chaos</h4>
                <p className="text-slate-600">Is your desk a mess of dog-eared receipts and sales print-outs?</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-brand-50 rounded-xl transform rotate-3"></div>
            <img 
              src="https://picsum.photos/seed/accounting_stress/600/400" 
              alt="Person working on finances" 
              className="relative rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>
        </div>

        <div className="mt-20 p-8 bg-brand-50 rounded-2xl border border-brand-100">
          <div className="flex gap-4 items-start">
            <div className="mt-1">
               <CheckCircle2 className="text-brand-600" size={32} />
            </div>
            <div>
              <p className="text-lg text-slate-700 leading-relaxed">
                If accounting or finance issues are affecting your business or simply taking too much time or effort, 
                <span className="font-bold text-brand-900"> Petersen Business Solutions</span> can be trusted to provide your company with immediate and reliable assistance.
              </p>
              <p className="mt-4 text-lg text-slate-700 leading-relaxed">
                With over 40 years of collective industry experience, we are an organisational force to be reckoned with. 
                From preparing balance sheets or profit and loss statements to payroll processing, we simply get your company figures in order, on time.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};