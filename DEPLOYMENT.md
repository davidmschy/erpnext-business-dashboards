# Deployment Guide

Complete guide for deploying all dashboards and websites with live hosting.

## Overview

This repository uses automated CI/CD pipelines to deploy:
- **3 Dashboards** to Vercel (executive, monitoring, sales-pipeline)
- **4 Websites** to Netlify (Genii Now, FBX Homes, TLC Grading, Artes Cosmetics)

## Prerequisites

### 1. ERPNext API Credentials
- API URL: Your ERPNext instance URL
- API Key: Generate from ERPNext User Settings
- API Secret: Generate from ERPNext User Settings

### 2. Vercel Account Setup
1. Create account at https://vercel.com
2. Install Vercel CLI: `npm i -g vercel`
3. Create 3 projects:
   - `erpnext-executive-dashboard`
   - `erpnext-monitoring-dashboard`
   - `erpnext-sales-pipeline`
4. Get tokens:
   - Vercel Token: Account Settings > Tokens
   - Org ID: Team Settings > General
   - Project IDs: Project Settings > General

### 3. Netlify Account Setup
1. Create account at https://netlify.com
2. Create 4 sites:
   - `genii-now` (custom domain: geniinow.com)
   - `fbx-homes` (custom domain: fbxhomes.com)
   - `tlc-grading` (custom domain: tlcgrading.com)
   - `artes-cosmetics` (custom domain: artescosmetics.com)
3. Get tokens:
   - Personal Access Token: User Settings > Applications
   - Site IDs: Site Settings > General

## GitHub Secrets Configuration

Add these secrets to your GitHub repository (Settings > Secrets and variables > Actions):

### ERPNext API Secrets
```
ERPNEXT_API_URL=https://your-erpnext.com
ERPNEXT_API_KEY=your_api_key
ERPNEXT_API_SECRET=your_api_secret
```

### Vercel Secrets
```
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID_EXECUTIVE=project_id_for_executive
VERCEL_PROJECT_ID_MONITORING=project_id_for_monitoring
VERCEL_PROJECT_ID_SALES=project_id_for_sales
```

### Netlify Secrets
```
NETLIFY_AUTH_TOKEN=your_netlify_token
NETLIFY_SITE_ID_GENII_NOW=site_id_for_genii_now
NETLIFY_SITE_ID_FBX_HOMES=site_id_for_fbx_homes
NETLIFY_SITE_ID_TLC_GRADING=site_id_for_tlc_grading
NETLIFY_SITE_ID_ARTES_COSMETICS=site_id_for_artes_cosmetics
```

## Manual Deployment

If you want to deploy manually before setting up automation:

### Deploy Dashboard to Vercel
```bash
cd dashboards/executive
npm install
npm run build
vercel --prod
```

### Deploy Website to Netlify
```bash
cd websites/genii-now
npm install
npm run build
netlify deploy --prod --dir=dist
```

## Automated Deployment

Once GitHub secrets are configured, deployments happen automatically:

### Triggers
- **Push to main**: Deploys changed applications to production
- **Pull Request**: Creates preview deployments
- **Manual**: Trigger via Actions tab

### Workflow Files
- `.github/workflows/deploy-dashboards.yml` - Dashboard deployment
- `.github/workflows/deploy-websites.yml` - Website deployment

### Smart Path Detection
Only changed applications are deployed:
- Change `dashboards/executive/*` → Deploys only executive dashboard
- Change `shared/*` → Deploys all dashboards (shared dependency)
- Change `websites/genii-now/*` → Deploys only Genii Now site

## Live URLs (After Deployment)

### Dashboards (Internal Use)
- Executive: https://executive.genii-dashboards.com
- Monitoring: https://monitoring.genii-dashboards.com
- Sales Pipeline: https://sales.genii-dashboards.com

### Websites (Public)
- Genii Now: https://geniinow.com
- FBX Homes: https://fbxhomes.com
- TLC Grading: https://tlcgrading.com
- Artes Cosmetics: https://artescosmetics.com

## Custom Domain Setup

### Vercel Custom Domains
1. Go to Project Settings > Domains
2. Add custom domain (e.g., `executive.genii-dashboards.com`)
3. Update DNS records at your domain registrar:
   - Type: CNAME
   - Name: executive
   - Value: cname.vercel-dns.com
4. Wait for SSL certificate provisioning (~5 minutes)

### Netlify Custom Domains
1. Go to Site Settings > Domain Management
2. Add custom domain
3. Update DNS records:
   - Type: A
   - Name: @
   - Value: 75.2.60.5
   - Type: CNAME
   - Name: www
   - Value: your-site.netlify.app
4. Enable HTTPS (automatic)

## Monitoring & Maintenance

### Health Checks
GitHub Actions automatically verify:
- Build success
- ERPNext API connectivity
- Deployment status

### View Deployment Logs
- GitHub: Actions tab > Select workflow run
- Vercel: Project > Deployments
- Netlify: Site > Deploys

### Rollback
- Vercel: Project > Deployments > Select previous > Promote to Production
- Netlify: Site > Deploys > Select previous > Publish deploy

## Environment Variables Per App

Each dashboard/website can have its own environment variables:

### Vercel (Dashboard)
1. Project Settings > Environment Variables
2. Add variables (automatically injected during build)

### Netlify (Website)
1. Site Settings > Build & Deploy > Environment
2. Add variables

## Troubleshooting

### Build Failures
```bash
# Test build locally
cd dashboards/executive
npm install
npm run build

# Check logs
tail -f .next/trace
```

### API Connection Issues
```bash
# Test ERPNext API
curl -H "Authorization: token API_KEY:API_SECRET" \
  "https://your-erpnext.com/api/resource/Company"
```

### Deployment Not Triggering
- Check GitHub Actions tab for errors
- Verify secrets are set correctly
- Ensure workflow files are in `.github/workflows/`
- Check branch name is `main` (not `master`)

## Performance Optimization

### Caching
- Vercel: Automatic edge caching
- Netlify: CDN caching enabled by default

### Build Optimization
- Turbo build system parallelizes builds
- Only changed apps are rebuilt
- Shared dependencies cached between builds

## Security Best Practices

1. **Never commit `.env.local` files**
2. **Rotate API keys regularly** (every 90 days)
3. **Use GitHub Secrets** for all sensitive data
4. **Enable branch protection** on main branch
5. **Review pull requests** before merging
6. **Monitor API usage** in ERPNext

## Support

For deployment issues:
1. Check GitHub Actions logs
2. Review Vercel/Netlify deployment logs
3. Test ERPNext API connectivity
4. Contact: david@geniinow.com

---

**Next Steps:**
1. ✅ Repository structure created
2. ⏳ Configure GitHub Secrets
3. ⏳ Create Vercel projects
4. ⏳ Create Netlify sites
5. ⏳ Push to main branch to trigger first deployment
6. ⏳ Configure custom domains
7. ⏳ Test all live URLs
