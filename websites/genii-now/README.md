# Genii Now - Official Website

Public-facing website for Genii Now AI/Technology services.

## Features

- Modern, responsive design
- Service offerings and portfolio
- Contact form integrated with ERPNext CRM
- Automated lead capture
- SEO optimized
- Fast page loads with static generation

## Tech Stack

- Next.js 14 (Static Site Generation)
- Tailwind CSS
- TypeScript
- ERPNext API integration for lead capture

## Development

```bash
npm install
npm run dev
```

Open http://localhost:4001

## Deployment

Automatically deployed to Netlify on push to main.

Live URL: https://geniinow.com

## Contact Form Integration

Contact submissions automatically create Lead records in ERPNext:
- Lead Name: From form
- Email: From form
- Source: Website
- Status: Open
- Company: Genii Now
