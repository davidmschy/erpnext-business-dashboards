# ERPNext Business Dashboards & Websites

Live operational dashboards and business websites integrated with ERPNext for Genii companies.

## Overview

This repository contains production-ready web applications that provide real-time visibility into multi-company operations across:
- **Genii Now** - AI/Technology services
- **FBX Homes** - Real estate development
- **TLC Grading** - Construction and grading services
- **Artes Cosmetics** - Beauty and cosmetics

## Architecture

### Technology Stack
- **Frontend**: Next.js 14 (React) with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Charts**: Recharts for data visualization
- **API Integration**: ERPNext REST API
- **Deployment**: Vercel (dashboards) + Netlify (marketing sites)
- **CI/CD**: GitHub Actions

### Project Structure

```
erpnext-business-dashboards/
├── dashboards/
│   ├── executive/          # Executive dashboard - real-time metrics
│   ├── monitoring/         # KPI monitoring dashboards
│   └── sales-pipeline/     # Sales pipeline visualization
├── websites/
│   ├── genii-now/         # Genii Now public website
│   ├── fbx-homes/         # FBX Homes real estate site
│   ├── tlc-grading/       # TLC Grading site
│   └── artes-cosmetics/   # Artes Cosmetics site
├── shared/
│   ├── components/        # Reusable React components
│   ├── lib/              # ERPNext API utilities
│   ├── types/            # TypeScript definitions
│   └── config/           # Shared configuration
└── .github/
    └── workflows/         # CI/CD pipelines
```

## Features

### Executive Dashboard
- Real-time revenue tracking across all companies
- Sales pipeline status and conversion metrics
- Outstanding invoices and payment tracking
- Project status and resource allocation
- Automated alerts for critical KPIs

### Monitoring Dashboards
- Live KPI visualization with auto-refresh
- Company-specific performance metrics
- Inventory levels and stock alerts
- Customer activity and engagement tracking

### Sales Pipeline Dashboard
- Lead and opportunity funnel visualization
- Deal stage tracking and forecasting
- Win/loss analysis
- Sales team performance metrics

### Business Websites
- Professional marketing sites for each company
- ERPNext integration for contact forms and inquiries
- Automated lead capture to ERPNext CRM
- SEO optimized and mobile responsive

## Getting Started

### Prerequisites
```bash
Node.js 18+ and npm/yarn
ERPNext API credentials
```

### Installation
```bash
# Clone repository
git clone https://github.com/davidmschy/erpnext-business-dashboards.git
cd erpnext-business-dashboards

# Install dependencies for a specific app
cd dashboards/executive
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your ERPNext API credentials

# Run development server
npm run dev
```

### Environment Variables
```env
ERPNEXT_API_URL=https://your-erpnext-instance.com
ERPNEXT_API_KEY=your_api_key
ERPNEXT_API_SECRET=your_api_secret
NEXT_PUBLIC_SITE_URL=https://your-dashboard-url.com
```

## Deployment

### Automated Deployment
All applications are automatically deployed via GitHub Actions:
- **Push to main**: Deploys to production
- **Pull requests**: Creates preview deployments
- **Manual trigger**: Deploy specific apps on demand

### Live URLs
Once deployed, shareable links will be available:
- Executive Dashboard: `https://executive.genii-dashboards.com`
- Monitoring: `https://monitoring.genii-dashboards.com`
- Sales Pipeline: `https://sales.genii-dashboards.com`
- Genii Now: `https://geniinow.com`
- FBX Homes: `https://fbxhomes.com`
- TLC Grading: `https://tlcgrading.com`
- Artes Cosmetics: `https://artescosmetics.com`

## ERPNext API Integration

All dashboards and websites connect to ERPNext REST API for real-time data:

### Authentication
```typescript
import { ERPNextClient } from '@/shared/lib/erpnext-client';

const client = new ERPNextClient({
  apiUrl: process.env.ERPNEXT_API_URL,
  apiKey: process.env.ERPNEXT_API_KEY,
  apiSecret: process.env.ERPNEXT_API_SECRET,
});
```

### Data Fetching
```typescript
// Fetch sales data
const salesOrders = await client.getList('Sales Order', {
  fields: ['name', 'customer', 'grand_total', 'status'],
  filters: [['company', '=', 'Genii Now']],
  limit: 100,
});

// Real-time updates with auto-refresh
const { data, isLoading } = useERPNextData('Sales Invoice', {
  refreshInterval: 30000, // 30 seconds
});
```

## Development

### Adding a New Dashboard
```bash
cd dashboards
npx create-next-app@latest new-dashboard --typescript --tailwind
cd new-dashboard
npm install @/shared
```

### Shared Components
Reusable components are available in `/shared/components`:
- `MetricCard` - Display KPI metrics
- `DataTable` - Sortable/filterable tables
- `ChartContainer` - Wrapper for Recharts
- `CompanySelector` - Multi-company filter

## CI/CD Pipeline

GitHub Actions automatically:
1. Run tests and linting
2. Build production bundles
3. Deploy to hosting platforms
4. Run ERPNext API health checks
5. Send deployment notifications

## Security

- API keys stored in GitHub Secrets
- Environment variables never committed
- CORS configured for ERPNext API
- Rate limiting on API endpoints
- Authentication required for sensitive dashboards

## Contributing

1. Create feature branch: `git checkout -b feature/new-dashboard`
2. Make changes and test locally
3. Commit with descriptive message
4. Push and create pull request
5. Automated tests will run
6. Preview deployment will be created

## Support

For issues or questions:
- Create GitHub issue
- Contact: david@geniinow.com
- ERPNext documentation: https://docs.erpnext.com

## License

MIT License - see LICENSE file for details

---

**Status**: Active Development
**Last Updated**: 2026-02-16
**Maintained by**: Genii Operations Team