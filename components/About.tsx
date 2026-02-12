import React from 'react';
import { Section } from './Section';
import { Users, Shield, Award, Heart } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <Section id="about" title="About Us" subtitle="Who we are and what drives us.">
      <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
        <div className="md:w-1/2">
          <img 
             src="https://picsum.photos/seed/team_meeting/800/600" 
             alt="Our Team" 
             className="rounded-lg shadow-2xl w-full"
          />
        </div>
        <div className="md:w-1/2 space-y-6">
          <p className="text-slate-700 leading-relaxed">
            We are a <span className="font-semibold text-brand-900">Cape Town based family business</span>, led by a husband and wife team with over 40 years combined active experience in auditing, accounting and the real world of finance.
          </p>
          <p className="text-slate-700 leading-relaxed">
            We strive to provide our clients with quality accounting, tax, bookkeeping, and business services at an affordable cost and with the utmost integrity. Our mission is to provide you with the highest quality services for you to succeed.
          </p>
          <div className="p-4 bg-brand-50 border-l-4 border-brand-500 rounded-r">
             <p className="italic text-slate-700 font-medium">
               "It is through our client's success that we succeed."
             </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Shield, title: "Honesty & Integrity", desc: "Providing services in an ethical and fair manner is paramount." },
          { icon: Award, title: "Quality", desc: "Striving to exceed expectations with every deliverable." },
          { icon: Users, title: "Professionalism", desc: "Continually learning to provide current tax laws and advice." },
          { icon: Heart, title: "Dignity & Respect", desc: "We treat every client with the utmost dignity and respect." }
        ].map((val, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg shadow border border-slate-100 text-center hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 mx-auto bg-brand-50 text-brand-600 rounded-full flex items-center justify-center mb-4">
              <val.icon size={24} />
            </div>
            <h4 className="font-bold text-brand-900 mb-2">{val.title}</h4>
            <p className="text-sm text-slate-600">{val.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};