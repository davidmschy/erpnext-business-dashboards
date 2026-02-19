# ERPNext Business Dashboards & Websites

Live operational dashboards and business websites integrated with ERPNext for FBX Development Marketplace and Genii companies.

## Project Overview

This repository contains production-ready TypeScript web applications that provide real-time visibility into multi-company operations. Built with Next.js 14, TypeScript, and Tailwind CSS, these dashboards connect directly to ERPNext via REST API to deliver live business intelligence across:

- **FBX Homes** - Real estate development marketplace
- **Genii Now** - AI/Technology services
- **TLC Grading** - Construction and grading services
- **Artes Cosmetics** - Beauty and cosmetics

The platform serves two primary purposes:
1. **Operational Dashboards** - Real-time KPI monitoring and decision support for executives and managers
2. **Business Websites** - Professional marketing sites with ERPNext CRM integration for lead capture

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
│   ├── executive/           # Executive dashboard - real-time metrics
│   ├── monitoring/          # KPI monitoring dashboards
│   └── sales-pipeline/      # Sales pipeline visualization
├── websites/
│   ├── genii-now/           # Genii Now public website
│   ├── fbx-homes/           # FBX Homes real estate site
│   ├── tlc-grading/         # TLC Grading site
│   └── artes-cosmetics/     # Artes Cosmetics site
├── shared/
│   ├── components/          # Reusable React components
│   ├── lib/                 # ERPNext API utilities
│   ├── types/               # TypeScript definitions
│   └── config/              # Shared configuration
└── .github/
    └── workflows/           # CI/CD pipelines
```

## Dashboards Included

### 1. Sales Pipeline Dashboard
**Purpose**: Real-time sales funnel visualization and deal tracking

**Features**:
- Lead and opportunity funnel visualization by stage
- Deal tracking with conversion rates and forecasting
- Win/loss analysis with reasons and trends
- Sales team performance metrics and leaderboard
- Pipeline value by stage and probability
- Auto-refresh every 5 minutes

**Key Metrics**:
- Total pipeline value
- Conversion rates by stage
- Average deal size
- Sales cycle length
- Win rate percentage

### 2. Lead Funnel Dashboard
**Purpose**: Marketing and lead generation performance tracking

**Features**:
- Lead source attribution and ROI analysis
- Lead status and qualification tracking
- Marketing campaign performance
- Lead scoring and engagement metrics
- Conversion velocity by source

**Key Metrics**:
- Leads by source
- MQL to SQL conversion
- Cost per lead by channel
- Lead response time
- Contact rate and quality score

### 3. Project Status Dashboard
**Purpose**: Real-time project and development tracking

**Features**:
- Active projects overview with health indicators
- Milestone tracking and completion status
- Resource allocation and capacity planning
- Budget vs. actual spend tracking
- Timeline visualization with critical path
- Task completion rates by project

**Key Metrics**:
- Projects on track/at risk/delayed
- Budget utilization percentage
- Resource allocation efficiency
- Milestone completion rate
- Project profitability

### 4. Financial Overview Dashboard
**Purpose**: Multi-company financial health monitoring

**Features**:
- Real-time revenue tracking across all companies
- Outstanding invoices and payment status
- Cash flow visualization (AR/AP)
- Profit margins by company and product line
- Monthly recurring revenue (MRR) trends
- Expense tracking by category

**Key Metrics**:
- Total revenue (daily/monthly/yearly)
- Outstanding receivables
- Days Sales Outstanding (DSO)
- Net profit margin
- Operating cash flow

### 5. Inventory Dashboard
**Purpose**: Stock levels and inventory management

**Features**:
- Real-time inventory levels by warehouse
- Stock alerts for low/out-of-stock items
- Inventory valuation and turnover rates
- Reorder point recommendations
- Warehouse capacity utilization
- Slow-moving and dead stock identification

**Key Metrics**:
- Total inventory value
- Stock turnover ratio
- Stockout incidents
- Carrying costs
- Fill rate percentage

## ERPNext Setup Instructions

### Prerequisites
- ERPNext instance (v14+ recommended)
- frappe.cloud account OR self-hosted ERPNext server
- Node.js 18+ and npm/yarn

### API Key Configuration

#### Step 1: Create API Keys in ERPNext

1. Log into your ERPNext instance
2. Navigate to **User** → **API Secret** (or search "API Access")
3. For each user that will access dashboards:
   - Click "Generate Keys"
   - Copy the **API Key** and **API Secret**
   - Store securely - the secret is only shown once

#### Step 2: Set Required Permissions

Grant dashboard user roles access to:
- **Sales Module**: Read access to Lead, Opportunity, Quotation, Sales Order
- **CRM Module**: Read access to Lead, Contact, Communication
- **Projects Module**: Read access to Project, Task, Project Template
- **Accounts Module**: Read access to Sales Invoice, Payment Entry, GL Entry
- **Stock Module**: Read access to Item, Stock Entry, Warehouse, Bin

Recommended approach: Create a custom role "Dashboard Viewer" with read-only permissions.

### Frappe.cloud Connection

#### For Frappe.cloud Hosted ERPNext:

1. **Get Your Site URL**:
   - Format: `https://yourcompany.frappe.cloud`
   - Or custom domain if configured

2. **Configure CORS** (if needed):
   - In frappe.cloud dashboard, go to Site Settings
   - Add your dashboard deployment domain to allowed origins
   - Example: `https://executive-dashboard.vercel.app`

3. **Test API Connection**:
```bash
curl -X GET "https://yourcompany.frappe.cloud/api/resource/Lead" \
  -H "Authorization: token YOUR_API_KEY:YOUR_API_SECRET"
```

#### For Self-Hosted ERPNext:

1. **Enable API Access**:
   - Edit `site_config.json`:
   ```json
   {
     "allow_cors": "*",
     "cors_methods": "GET, POST, PUT, DELETE, OPTIONS",
     "cors_headers": "Authorization"
   }
   ```

2. **Restart bench**:
```bash
bench restart
```

3. **SSL Configuration**:
   - Ensure HTTPS is enabled (required for production)
   - Use Let's Encrypt or your SSL provider

### Dashboard Configuration

#### Step 1: Clone Repository
```bash
git clone https://github.com/davidmschy/erpnext-business-dashboards.git
cd erpnext-business-dashboards
```

#### Step 2: Install Dependencies

For each dashboard app:
```bash
# Example: Executive Dashboard
cd dashboards/executive
npm install

# Or use yarn
yarn install
```

#### Step 3: Configure Environment Variables

Create `.env.local` in each dashboard directory:

```bash
# Copy example environment file
cp .env.example .env.local
```

Edit `.env.local`:
```env
# ERPNext API Configuration
NEXT_PUBLIC_ERPNEXT_URL=https://yourcompany.frappe.cloud
ERPNEXT_API_KEY=your_api_key_here
ERPNEXT_API_SECRET=your_api_secret_here

# Dashboard Settings
NEXT_PUBLIC_REFRESH_INTERVAL=300000  # 5 minutes in milliseconds
NEXT_PUBLIC_COMPANY_FILTER=FBX Homes,Genii Now,TLC Grading

# Optional: Filtering
NEXT_PUBLIC_DEFAULT_COMPANY=FBX Homes
NEXT_PUBLIC_DATE_RANGE=30  # Days to show by default
```

#### Step 4: Configure Company-Specific Settings

Edit `shared/config/companies.ts`:
```typescript
export const COMPANIES = [
  {
    id: 'fbx-homes',
    name: 'FBX Homes',
    erpnextCompany: 'FBX Homes',  // Must match ERPNext company name
    color: '#3B82F6',
    logo: '/logos/fbx-homes.svg'
  },
  {
    id: 'genii-now',
    name: 'Genii Now',
    erpnextCompany: 'Genii Now',
    color: '#8B5CF6',
    logo: '/logos/genii-now.svg'
  },
  // Add more companies...
];
```

#### Step 5: Run Development Server

```bash
npm run dev
# Dashboard available at http://localhost:3000
```

#### Step 6: Verify API Connection

The dashboard will display a connection status indicator:
- 🟢 Green: Successfully connected to ERPNext
- 🟡 Yellow: Connection issues (check credentials)
- 🔴 Red: Cannot reach ERPNext (check URL and CORS)

### Troubleshooting

**Issue**: "CORS Error" or "Access Denied"
- Solution: Add dashboard domain to ERPNext allowed origins
- Check: Site Config → CORS settings

**Issue**: "Authentication Failed"
- Solution: Regenerate API keys and update `.env.local`
- Verify: API Key format (should be two strings separated by colon)

**Issue**: "No Data Displayed"
- Solution: Check user permissions in ERPNext
- Verify: User has read access to required DocTypes

**Issue**: "Connection Timeout"
- Solution: Verify ERPNext URL is correct and accessible
- Test: Try accessing `https://yoursite.frappe.cloud/api/method/ping` in browser

## Screenshots

### Executive Dashboard
_Screenshot placeholder: Real-time KPI overview with revenue, pipeline, and project metrics_

![Executive Dashboard - Coming Soon]

### Sales Pipeline
_Screenshot placeholder: Visual funnel showing lead progression through sales stages_

![Sales Pipeline - Coming Soon]

### Lead Funnel
_Screenshot placeholder: Lead source attribution and conversion tracking_

![Lead Funnel - Coming Soon]

### Project Status
_Screenshot placeholder: Active projects with timeline and budget tracking_

![Project Status - Coming Soon]

### Financial Overview
_Screenshot placeholder: Multi-company financial metrics and cash flow_

![Financial Overview - Coming Soon]

### Inventory Dashboard
_Screenshot placeholder: Stock levels and warehouse management_

![Inventory Dashboard - Coming Soon]

## Deployment Notes

### Vercel Deployment (Dashboards)

Each dashboard can be deployed as a separate Vercel project for independent scaling and updates.

#### Prerequisites:
- Vercel account
- GitHub repository connected to Vercel

#### Deployment Steps:

1. **Connect Repository to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import `davidmschy/erpnext-business-dashboards`
   - Select project root directory for specific dashboard

2. **Configure Build Settings**:
   - **Framework Preset**: Next.js
   - **Root Directory**: `dashboards/executive` (or specific dashboard path)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

3. **Set Environment Variables**:
   In Vercel project settings, add:
   ```
   NEXT_PUBLIC_ERPNEXT_URL=https://yourcompany.frappe.cloud
   ERPNEXT_API_KEY=your_api_key_here
   ERPNEXT_API_SECRET=your_api_secret_here
   NEXT_PUBLIC_REFRESH_INTERVAL=300000
   ```

4. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy automatically
   - Get deployment URL: `https://your-dashboard.vercel.app`

#### Multiple Dashboard Deployment:

Use `vercel.json` configuration files for each dashboard:

**vercel-executive.json**:
```json
{
  "buildCommand": "cd dashboards/executive && npm install && npm run build",
  "outputDirectory": "dashboards/executive/.next",
  "framework": "nextjs",
  "env": {
    "NEXT_PUBLIC_ERPNEXT_URL": "@erpnext_url",
    "ERPNEXT_API_KEY": "@erpnext_api_key",
    "ERPNEXT_API_SECRET": "@erpnext_api_secret"
  }
}
```

Deploy multiple projects:
```bash
# Deploy executive dashboard
vercel --prod --config vercel-executive.json

# Deploy sales pipeline
vercel --prod --config vercel-sales-pipeline.json

# Deploy monitoring dashboard
vercel --prod --config vercel-monitoring.json
```

### Netlify Deployment (Marketing Sites)

Marketing websites use static site generation and are deployed to Netlify for optimal SEO and performance.

#### Deployment Steps:

1. **Connect to Netlify**:
   - Log into [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import existing project"
   - Connect GitHub repository

2. **Configure Build Settings**:
   - **Base Directory**: `websites/fbx-homes` (or specific site)
   - **Build Command**: `npm run build`
   - **Publish Directory**: `out`

3. **Set Environment Variables**:
   ```
   NEXT_PUBLIC_ERPNEXT_URL=https://yourcompany.frappe.cloud
   NEXT_PUBLIC_SITE_URL=https://fbxhomes.com
   ```

4. **Configure netlify.toml**:
```toml
[build]
  base = "websites/fbx-homes"
  command = "npm run build"
  publish = "out"

[[redirects]]
  from = "/api/*"
  to = "https://yourcompany.frappe.cloud/api/:splat"
  status = 200
  headers = {X-From = "Netlify"}

[build.environment]
  NODE_VERSION = "18"
```

### Production Best Practices

1. **Security**:
   - Never commit `.env.local` files
   - Use Vercel/Netlify environment variables for secrets
   - Implement rate limiting on ERPNext API
   - Enable HTTPS only (no HTTP)

2. **Performance**:
   - Configure caching headers for static assets
   - Use Next.js Image optimization
   - Implement incremental static regeneration (ISR)
   - Set appropriate refresh intervals (not too frequent)

3. **Monitoring**:
   - Set up Vercel Analytics
   - Monitor ERPNext API usage and rate limits
   - Configure error tracking (Sentry recommended)
   - Set up uptime monitoring (UptimeRobot, Pingdom)

4. **Updates**:
   - Automatic deployments on `main` branch push
   - Preview deployments for pull requests
   - Semantic versioning for releases
   - Changelog maintenance

### Custom Domain Setup

#### Vercel Custom Domains:
1. Go to Project Settings → Domains
2. Add domain: `executive.yourcompany.com`
3. Configure DNS:
   ```
   CNAME executive.yourcompany.com → cname.vercel-dns.com
   ```
4. SSL automatically provisioned

#### Netlify Custom Domains:
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Configure DNS A records or CNAME
4. Enable HTTPS (Let's Encrypt)

## Development

### Local Development Workflow

```bash
# Start development server with hot reload
cd dashboards/executive
npm run dev

# Run type checking
npm run type-check

# Run linting
npm run lint

# Build for production
npm run build

# Test production build locally
npm run start
```

### Shared Components

Reusable components are in `shared/components/`:
- `DashboardCard` - Standard card layout
- `MetricDisplay` - KPI number display
- `ChartWrapper` - Recharts wrapper with loading states
- `DataTable` - Sortable, filterable tables
- `CompanySelector` - Multi-company filter dropdown

Import in dashboards:
```typescript
import { DashboardCard, MetricDisplay } from '@/shared/components';
```

### API Utilities

ERPNext API helpers in `shared/lib/erpnext-api.ts`:
```typescript
import { fetchLeads, fetchOpportunities } from '@/shared/lib/erpnext-api';

// Fetch with automatic auth
const leads = await fetchLeads({ 
  company: 'FBX Homes',
  status: 'Open' 
});
```

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/new-dashboard`)
3. Commit changes (`git commit -m 'feat: add inventory dashboard'`)
4. Push to branch (`git push origin feature/new-dashboard`)
5. Open Pull Request

## License

Proprietary - All rights reserved by Genii Now and associated companies.

## Support

For issues or questions:
- GitHub Issues: [erpnext-business-dashboards/issues](https://github.com/davidmschy/erpnext-business-dashboards/issues)
- Email: david@geniinow.com
- Documentation: See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment guide

---

**Note**: This repository contains production applications for FBX Development Marketplace and Genii companies. Ensure proper security practices when deploying with live ERPNext credentials.
