# Executive Dashboard

Real-time executive dashboard showing consolidated metrics across all Genii companies.

## Features

- **Multi-Company Overview**: Consolidated view of Genii Now, FBX Homes, TLC Grading, and Artes Cosmetics
- **Revenue Tracking**: Real-time revenue, invoicing, and payment status
- **Sales Pipeline**: Active opportunities and conversion rates
- **Project Status**: Active projects and completion tracking
- **Outstanding Invoices**: Aging analysis and collection priorities
- **Auto-Refresh**: Updates every 30 seconds

## Key Metrics

- Total Revenue (MTD, QTD, YTD)
- Outstanding Receivables
- Active Sales Opportunities
- Project Completion Rates
- Customer Counts by Company
- Lead Conversion Rates

## Environment Setup

```bash
cp .env.example .env.local
```

Required environment variables:
```
ERPNEXT_API_URL=https://your-erpnext-instance.com
ERPNEXT_API_KEY=your_api_key
ERPNEXT_API_SECRET=your_api_secret
```

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3001

## Deployment

Automatically deployed to Vercel on push to main branch.

Live URL: https://executive.genii-dashboards.com
