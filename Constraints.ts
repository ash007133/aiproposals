import { CompanyInfo, ProjectDetails, PricingPackage, AddOnService } from './types';

export const COMPANY_INFO: CompanyInfo = {
  name: "Petersen Business Solutions",
  email: "ashwell@petersenbusinesssolutions.co.za",
  phone: ["+27 (0)21 109 8800"],
  address: "Unit 308, Manhattan Place, 130 Bree Street, Cape Town City Centre, Cape Town, 8001",
  founder: "Ashwell Petersen"
};

export const PROJECT_DETAILS: ProjectDetails = {
  clientName: "Sanda Kwaza",
  clientCompany: "Kalima Trading (Pty) Ltd",
  proposalDate: "08 February 2026",
  validUntil: "08 March 2026"
};

export const PACKAGES: PricingPackage[] = [
  {
    id: 'starter',
    name: 'Starter Package',
    priceMonthly: 2500,
    features: [
      'Basic Bookkeeping – Monthly from bank statements',
      'Debtors Listing',
      'Electronic Invoicing',
      'Monthly Recons',
      'Monthly Reports',
      'Annual Financial Statements',
      'SARS Tax Returns & Tax Pins',
      'Quickbooks (x1 user)',
      'Support'
    ]
  },
  {
    id: 'standard',
    name: 'Standard Package',
    priceMonthly: 3300,
    features: [
      'Bookkeeping – Monthly from bank statements & all transactions',
      'Debtors and Creditors Listing',
      'Electronic Invoicing',
      'Fixed Asset Register',
      'Monthly Recons',
      'Monthly Reports',
      'Annual Financial Statements',
      'SARS Tax Returns & Tax Pins',
      'Quickbooks (x1 user)',
      'Virtual CFO (1 session per month)',
      'Support'
    ]
  },
  {
    id: 'premium',
    name: 'Premium Package',
    priceMonthly: 4200,
    recommended: true,
    features: [
      'Bookkeeping – Daily from bank statements and all transactions',
      'Debtors and Creditors Listing',
      'Electronic Invoicing',
      'Fixed Asset Register',
      'Monthly Recons',
      'Monthly Reports',
      'Annual Financial Statements',
      'SARS Tax Returns & Tax Pins',
      'VAT Preparations and submissions',
      'Virtual CFO (2 sessions per month)',
      'Quickbooks (x1 user)',
      'Priority Support'
    ]
  }
];

export const ADD_ONS: AddOnService[] = [
  {
    id: 'quickbooks_extra',
    name: 'Quickbooks Extra',
    description: 'Additional user access for Quickbooks Online.',
    priceMonthly: 150,
    discountNote: 'Per User',
    allowQuantity: true
  },
  {
    id: 'payroll',
    name: 'Monthly Payroll Services',
    description: `Per 20 users. 
    
    What You Get for This Price:
    • Unlimited Payslips: You aren't charged extra if you pay these 20 employees weekly or bi-weekly; the price is strictly per active employee per month.
    • Full Compliance: Includes automatic calculations for PAYE, UIF, and SDL, plus generation of tax certificates and EMP201 reports.
    • Self-Service Portal: Employees can download their own payslips and submit leave requests via the Mobile App at no additional cost.`,
    priceMonthly: 510
  }
];