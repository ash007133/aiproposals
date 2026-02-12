import React, { useState } from 'react';
import { Section } from './Section';
import { PACKAGES, ADD_ONS } from '../constants';
import { Check, Info, Calculator, Plus, Minus } from 'lucide-react';
import { Button } from './Button';

interface PricingProps {
  onSelectPackage: (pkgId: string, total: number) => void;
  selectedPackageId: string | null;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPackage, selectedPackageId }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [addOnQuantities, setAddOnQuantities] = useState<Record<string, number>>({});

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
    // Initialize quantity to 1 if not set
    if (!addOnQuantities[id]) {
        setAddOnQuantities(prev => ({ ...prev, [id]: 1 }));
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    // If increasing quantity and not selected, select it automatically
    if (!selectedAddOns.includes(id) && delta > 0) {
        toggleAddOn(id);
    }
    
    setAddOnQuantities(prev => {
        const current = prev[id] || 1;
        const newQty = Math.max(1, current + delta);
        return { ...prev, [id]: newQty };
    });
  };

  const calculatePackagePrice = (priceMonthly: number) => {
    return billingCycle === 'yearly' ? (priceMonthly * 12 * 0.9) : priceMonthly;
  };

  const calculateTotal = () => {
    // Get Selected Package Price
    const selectedPkg = PACKAGES.find(p => p.id === selectedPackageId);
    let total = selectedPkg ? calculatePackagePrice(selectedPkg.priceMonthly) : 0;
    
    // Add monthly add-ons
    const monthlyAddOnsCost = ADD_ONS
      .filter(addon => selectedAddOns.includes(addon.id) && addon.priceMonthly)
      .reduce((sum, addon) => {
         const qty = addon.allowQuantity ? (addOnQuantities[addon.id] || 1) : 1;
         return sum + ((addon.priceMonthly || 0) * qty);
      }, 0);
      
    // Assuming calculation for monthly recurring total for the sake of the proposal flow
    if (billingCycle === 'monthly') {
        total += monthlyAddOnsCost;
    } else {
        // If yearly, we add 12 months of add-ons for the yearly total estimate.
        total += (monthlyAddOnsCost * 12);
    }

    return total;
  };

  const currentTotal = calculateTotal();
  const selectedPkgName = PACKAGES.find(p => p.id === selectedPackageId)?.name;

  return (
    <Section id="pricing" title="Investment" subtitle="Pricing to suit all budgets. No hidden fees." className="bg-slate-50">
      
      {/* Billing Toggle */}
      <div className="flex justify-center mb-12">
        <div className="bg-white p-1 rounded-lg shadow-sm border border-slate-200 inline-flex relative">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${billingCycle === 'monthly' ? 'bg-brand-900 text-white shadow' : 'text-slate-600 hover:text-brand-900'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${billingCycle === 'yearly' ? 'bg-brand-900 text-white shadow' : 'text-slate-600 hover:text-brand-900'}`}
          >
            Yearly <span className="text-[10px] bg-green-500 text-white px-1.5 rounded-full">10% OFF</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Main Pricing Area */}
        <div className="flex-1">
          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {PACKAGES.map((pkg) => {
              const price = calculatePackagePrice(pkg.priceMonthly);
              const isSelected = selectedPackageId === pkg.id;

              return (
                <div 
                  key={pkg.id} 
                  className={`
                    relative bg-white rounded-2xl shadow-lg border transition-all duration-300 flex flex-col cursor-pointer
                    ${pkg.recommended ? 'border-brand-500 ring-2 ring-brand-500/20 z-10' : 'border-slate-100 hover:border-brand-300'}
                    ${isSelected ? 'ring-4 ring-brand-600 border-brand-600 transform scale-[1.02]' : ''}
                  `}
                  onClick={() => onSelectPackage(pkg.id, price)}
                >
                  {pkg.recommended && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-500 text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full shadow-md">
                      Recommended
                    </div>
                  )}
                  
                  <div className={`p-6 text-center border-b border-slate-100 ${pkg.recommended ? 'bg-brand-50/50' : ''}`}>
                    <h3 className="text-xl font-bold text-brand-900">{pkg.name}</h3>
                    {pkg.sessions && (
                      <p className="text-sm text-slate-500 mt-2">{pkg.sessions}</p>
                    )}
                    <div className="mt-4 mb-2">
                      <span className="text-3xl font-bold text-brand-900">R {price.toLocaleString()}</span>
                      <span className="text-slate-500 text-sm font-medium"> / {billingCycle === 'yearly' ? 'year' : 'month'}</span>
                    </div>
                  </div>

                  <div className="p-6 flex-1">
                    <ul className="space-y-3">
                      {pkg.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                          <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-6 mt-auto">
                    <div className={`w-full py-2 px-4 rounded-md text-center text-sm font-medium transition-colors ${isSelected ? 'bg-brand-900 text-white' : 'bg-slate-100 text-slate-600'}`}>
                      {isSelected ? 'Selected' : 'Click to Select'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add-ons */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden mb-8">
            <div className="p-6 bg-slate-50 border-b border-slate-200">
              <h3 className="text-lg font-bold text-brand-900">Add-on Services</h3>
              <p className="text-slate-600 text-sm">Enhance your package with these optional extras.</p>
            </div>
            <div className="divide-y divide-slate-100">
              {ADD_ONS.map((addon) => {
                const isSelected = selectedAddOns.includes(addon.id);
                const qty = addOnQuantities[addon.id] || 1;

                return (
                    <div 
                        key={addon.id} 
                        className={`p-6 flex flex-col md:flex-row items-start gap-4 transition-colors cursor-pointer ${isSelected ? 'bg-brand-50/50' : 'hover:bg-slate-50'}`}
                        onClick={() => toggleAddOn(addon.id)}
                    >
                    <div className="flex items-center pt-1">
                        <div className={`
                            w-5 h-5 rounded border flex items-center justify-center transition-colors
                            ${isSelected ? 'bg-brand-600 border-brand-600' : 'border-slate-300 bg-white'}
                        `}>
                            {isSelected && <Check size={12} className="text-white" />}
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                            <label className="font-semibold text-brand-900 cursor-pointer select-none">
                                {addon.name}
                            </label>
                            {addon.discountNote && (
                                <span className="text-xs bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded-full">{addon.discountNote}</span>
                            )}
                        </div>
                        <div className="text-sm text-slate-600 whitespace-pre-line leading-relaxed">
                            {addon.description}
                        </div>
                        
                        {/* Quantity Selector */}
                        {addon.allowQuantity && (
                            <div className="mt-4 p-3 bg-white border border-slate-200 rounded-lg inline-flex items-center gap-3 shadow-sm" onClick={(e) => e.stopPropagation()}>
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Additional Users:</span>
                                <div className="flex items-center border border-slate-300 rounded-md overflow-hidden">
                                    <button 
                                        onClick={() => updateQuantity(addon.id, -1)}
                                        className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 border-r border-slate-300 transition-colors"
                                        aria-label="Decrease quantity"
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <span className="w-10 text-center font-bold text-brand-900 bg-white">
                                        {qty}
                                    </span>
                                    <button 
                                        onClick={() => updateQuantity(addon.id, 1)}
                                        className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 border-l border-slate-300 transition-colors"
                                        aria-label="Increase quantity"
                                    >
                                        <Plus size={14} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="text-right min-w-[120px]">
                        {addon.priceOneOff && (
                            <div className="text-brand-900 font-bold">R {addon.priceOneOff.toLocaleString()} <span className="text-xs font-normal text-slate-500">once-off</span></div>
                        )}
                        {addon.priceMonthly && (
                            <div className="text-brand-900 font-bold">R {(addon.priceMonthly * (isSelected && addon.allowQuantity ? qty : 1)).toLocaleString()} <span className="text-xs font-normal text-slate-500">/ mo</span></div>
                        )}
                    </div>
                    </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Total Calculation Column (Sticky Sidebar on desktop) */}
        <div className="lg:w-80">
          <div className="bg-brand-900 text-white p-6 rounded-2xl shadow-xl sticky top-8">
             <div className="flex items-center gap-3 mb-6 border-b border-brand-700 pb-4">
               <Calculator className="text-brand-500" />
               <h3 className="text-xl font-bold">Investment Summary</h3>
             </div>

             <div className="space-y-4 mb-6">
                <div className="flex justify-between items-start text-sm">
                   <span className="text-slate-300">Package:</span>
                   <span className="font-medium text-right">{selectedPkgName || 'None selected'}</span>
                </div>
                {selectedAddOns.length > 0 && (
                   <div className="flex justify-between items-start text-sm">
                      <span className="text-slate-300">Add-ons:</span>
                      <div className="text-right">
                         {selectedAddOns.map(id => {
                            const addon = ADD_ONS.find(a => a.id === id);
                            if (!addon) return null;
                            const qty = addOnQuantities[id] || 1;
                            const showQty = addon.allowQuantity && qty > 1;
                            
                            return (
                                <div key={id} className="font-medium">
                                    {addon.name} {showQty ? <span className="text-brand-400 text-xs ml-1">(x{qty})</span> : ''}
                                </div>
                            );
                         })}
                      </div>
                   </div>
                )}
                <div className="flex justify-between items-center text-sm">
                   <span className="text-slate-300">Billing:</span>
                   <span className="font-medium capitalize">{billingCycle}</span>
                </div>
             </div>

             <div className="pt-4 border-t border-brand-700">
                <p className="text-sm text-slate-400 mb-1">Total {billingCycle === 'monthly' ? 'Monthly' : 'Annual'} Investment</p>
                <div className="text-3xl font-bold text-white">R {currentTotal.toLocaleString()}</div>
                {billingCycle === 'yearly' && (
                  <p className="text-xs text-brand-400 mt-2">Includes 10% discount on package</p>
                )}
             </div>

             {!selectedPackageId && (
               <div className="mt-4 p-3 bg-brand-800 rounded text-xs text-brand-200">
                 Please select a package to see the total investment.
               </div>
             )}
          </div>
        </div>

      </div>
      
      <div className="mt-8 text-center text-sm text-slate-500">
        <p>Outside of these packages, fees begin at R650 per hour. Need custom pricing? Contact us directly.</p>
      </div>
    </Section>
  );
};