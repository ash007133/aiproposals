import React from 'react';
import { NavItem } from '../types';
import { Menu, X, Calendar } from 'lucide-react';
import { COMPANY_INFO } from '../constants';

interface SidebarProps {
  navItems: NavItem[];
  activeSection: string;
  onNavigate: (id: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  navItems, 
  activeSection, 
  onNavigate,
  isOpen,
  setIsOpen
}) => {
  return (
    <>
      {/* Mobile Toggle */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-white rounded-full shadow-lg text-brand-900"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside className={`
        fixed top-0 left-0 h-full w-72 bg-slate-50 border-r border-slate-200 z-40 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>
        <div className="h-full flex flex-col">
          {/* Logo Area */}
          <div className="p-8 border-b border-slate-200 bg-brand-900">
            <div className="flex items-center justify-center">
              <img 
                src="https://petersenbusinesssolutions.co.za/wp-content/uploads/2022/05/white_logo_transparent_background.png" 
                alt="Petersen Business Solutions" 
                className="h-16 w-auto object-contain"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6 px-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onNavigate(item.id);
                      setIsOpen(false);
                    }}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors
                      ${activeSection === item.id 
                        ? 'bg-brand-100 text-brand-900 ring-1 ring-brand-200 shadow-sm' 
                        : 'text-slate-600 hover:bg-brand-50 hover:text-brand-700 hover:shadow-sm'}
                    `}
                  >
                    <item.icon size={18} className={activeSection === item.id ? 'text-brand-600' : 'text-slate-400 group-hover:text-brand-500'} />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Footer */}
          <div className="p-6 border-t border-slate-200 bg-slate-100">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Contact Us</p>
            <p className="text-sm font-medium text-brand-900 mb-1">{COMPANY_INFO.phone[0]}</p>
            <p className="text-xs text-slate-600 truncate mb-4">{COMPANY_INFO.email}</p>
            
            <a 
              href="https://petersenbusinesssolutions.co.za/?fluent-booking=calendar&host=petersenbusinesssolutions_2c3h27&event=30min" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2 bg-brand-600 text-white text-xs font-bold uppercase tracking-wide rounded hover:bg-brand-700 transition-colors shadow-sm hover:shadow"
            >
              <Calendar size={14} />
              Book Online
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};