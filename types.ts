import { LucideIcon } from 'lucide-react';

export interface PricingPackage {
  id: string;
  name: string;
  sessions?: string;
  priceMonthly: number;
  features: string[];
  recommended?: boolean;
}

export interface AddOnService {
  id: string;
  name: string;
  description: string;
  priceOneOff?: number;
  priceMonthly?: number;
  discountNote?: string;
  allowQuantity?: boolean;
}

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface CompanyInfo {
  name: string;
  email: string;
  phone: string[];
  address: string;
  founder: string;
}

export interface ProjectDetails {
  clientName: string;
  clientCompany: string;
  proposalDate: string;
  validUntil: string;
}