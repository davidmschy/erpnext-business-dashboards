/**
 * TypeScript type definitions for ERPNext DocTypes
 */

export interface SalesOrder {
  name: string;
  customer: string;
  customer_name: string;
  transaction_date: string;
  delivery_date: string;
  grand_total: number;
  status: 'Draft' | 'To Deliver and Bill' | 'To Bill' | 'To Deliver' | 'Completed' | 'Cancelled';
  company: string;
  currency: string;
  items: SalesOrderItem[];
}

export interface SalesOrderItem {
  item_code: string;
  item_name: string;
  qty: number;
  rate: number;
  amount: number;
}

export interface SalesInvoice {
  name: string;
  customer: string;
  customer_name: string;
  posting_date: string;
  due_date: string;
  grand_total: number;
  outstanding_amount: number;
  status: 'Draft' | 'Submitted' | 'Paid' | 'Unpaid' | 'Overdue' | 'Cancelled' | 'Return';
  company: string;
  currency: string;
}

export interface Customer {
  name: string;
  customer_name: string;
  customer_type: 'Company' | 'Individual';
  customer_group: string;
  territory: string;
  email_id?: string;
  mobile_no?: string;
  company?: string;
}

export interface Lead {
  name: string;
  lead_name: string;
  email_id?: string;
  mobile_no?: string;
  status: 'Open' | 'Replied' | 'Opportunity' | 'Quotation' | 'Lost Quotation' | 'Interested' | 'Converted' | 'Do Not Contact';
  source: string;
  company: string;
  lead_owner?: string;
}

export interface Opportunity {
  name: string;
  opportunity_from: 'Lead' | 'Customer';
  party_name: string;
  opportunity_type: string;
  status: 'Open' | 'Quotation' | 'Replied' | 'Closed' | 'Lost' | 'Converted';
  expected_closing: string;
  opportunity_amount: number;
  probability: number;
  company: string;
}

export interface Project {
  name: string;
  project_name: string;
  status: 'Open' | 'Completed' | 'Cancelled';
  project_type?: string;
  expected_start_date?: string;
  expected_end_date?: string;
  percent_complete: number;
  company: string;
  customer?: string;
}

export interface Task {
  name: string;
  subject: string;
  status: 'Open' | 'Working' | 'Pending Review' | 'Overdue' | 'Template' | 'Completed' | 'Cancelled';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  project?: string;
  exp_start_date?: string;
  exp_end_date?: string;
  progress: number;
  company: string;
}

export interface Item {
  name: string;
  item_code: string;
  item_name: string;
  item_group: string;
  stock_uom: string;
  is_stock_item: boolean;
  valuation_rate: number;
  standard_rate: number;
}

export interface StockEntry {
  name: string;
  stock_entry_type: 'Material Issue' | 'Material Receipt' | 'Material Transfer' | 'Manufacture' | 'Repack';
  posting_date: string;
  company: string;
  from_warehouse?: string;
  to_warehouse?: string;
  total_amount: number;
}

export interface PaymentEntry {
  name: string;
  payment_type: 'Receive' | 'Pay' | 'Internal Transfer';
  posting_date: string;
  party_type: 'Customer' | 'Supplier' | 'Employee';
  party: string;
  party_name: string;
  paid_amount: number;
  received_amount: number;
  company: string;
  mode_of_payment?: string;
}

export interface Company {
  name: string;
  company_name: string;
  abbr: string;
  default_currency: string;
  country: string;
  domain?: string;
}

/**
 * Dashboard metric types
 */
export interface DashboardMetrics {
  totalRevenue: number;
  outstandingAmount: number;
  totalCustomers: number;
  activeLeads: number;
  openOpportunities?: number;
  activeProjects?: number;
}

export interface CompanyMetrics extends DashboardMetrics {
  company: string;
  period: 'today' | 'week' | 'month' | 'quarter' | 'year';
  comparisonPrevious?: number;
}
