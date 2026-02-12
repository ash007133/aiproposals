import React from 'react';
import { Section } from './Section';
import { BookOpen, CreditCard, PieChart, Users, FileText, Calculator, Cloud } from 'lucide-react';

const SERVICE_LIST = [
  { icon: BookOpen, title: "Bookkeeping", desc: "Daily / weekly bookkeeping to keep records spotless." },
  { icon: CreditCard, title: "Accounts", desc: "Accounts payable / receivable management." },
  { icon: FileText, title: "Credit Control", desc: "Keeping your cash flow healthy and managed." },
  { icon: Calculator, title: "VAT & Tax", desc: "VAT calculations and returns submitted on time." },
  { icon: PieChart, title: "Annual Returns", desc: "Company year end accounts and annual returns." },
  { icon: Users, title: "Payroll", desc: "Complete payroll processing for your staff." },
];

export const Services: React.FC = () => {
  return (
    <Section id="services" title="How we can help you, today" subtitle="Let's get started with professional solutions." dark>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {SERVICE_LIST.map((service, idx) => (
          <div key={idx} className="bg-white/10 backdrop-blur-sm border border-white/10 p-6 rounded-xl hover:bg-white/20 transition-all duration-300">
            <service.icon className="text-brand-500 mb-4" size={32} />
            <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
            <p className="text-slate-300">{service.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-white text-brand-900 rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row">
        <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-6">
             <Cloud className="text-brand-600" size={32}/>
             <h3 className="text-2xl font-bold">Modern Cloud Technology</h3>
          </div>
          <p className="text-slate-600 mb-4 leading-relaxed">
            We take the hassle away from storing paperwork. With cloud based technology, just take a photo of your invoices and receipts on your smartphone and we take care of the rest.
          </p>
          <p className="text-slate-600 leading-relaxed">
            No more dropping off boxes of paperwork. Access live reports and see the full financial picture as we monitor your business in real-time.
          </p>
        </div>
        <div className="md:w-1/2 h-64 md:h-auto relative">
          <img 
            src="https://picsum.photos/seed/tech_office/800/600" 
            alt="Cloud Accounting" 
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </Section>
  );
};