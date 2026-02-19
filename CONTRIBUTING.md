# Contributing to ERPNext Business Dashboards

Thank you for your interest in contributing to ERPNext Business Dashboards! This guide will help you get started.

## Code of Conduct

- Be respectful and professional
- Collaborate constructively
- Focus on what is best for the project and users

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Git
- ERPNext instance for testing
- Basic knowledge of TypeScript, React, and Next.js

### Setting Up Development Environment

1. Fork the repository
2. Clone your fork:
```bash
git clone https://github.com/YOUR_USERNAME/erpnext-business-dashboards.git
cd erpnext-business-dashboards
```

3. Add upstream remote:
```bash
git remote add upstream https://github.com/davidmschy/erpnext-business-dashboards.git
```

4. Install dependencies:
```bash
cd dashboards/executive  # or any dashboard you're working on
npm install
```

5. Create `.env.local` with your ERPNext credentials (see README.md)

## Development Workflow

### Creating a New Feature

1. **Create a new branch**:
```bash
git checkout -b feature/your-feature-name
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Adding or updating tests

2. **Make your changes**:
- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Update documentation as needed

3. **Test your changes**:
```bash
npm run dev  # Test locally
npm run build  # Ensure it builds
npm run lint  # Check for linting errors
```

4. **Commit your changes**:
```bash
git add .
git commit -m "feat: add new inventory tracking feature"
```

Commit message format:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

5. **Push to your fork**:
```bash
git push origin feature/your-feature-name
```

6. **Create a Pull Request**:
- Go to the original repository
- Click "New Pull Request"
- Select your branch
- Fill out the PR template
- Submit for review

## Code Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type when possible
- Use type inference where appropriate

Example:
```typescript
interface DashboardMetric {
  label: string;
  value: number;
  trend?: 'up' | 'down';
  changePercent?: number;
}

const fetchMetrics = async (company: string): Promise<DashboardMetric[]> => {
  // Implementation
};
```

### React Components

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use proper prop types

Example:
```typescript
interface MetricCardProps {
  metric: DashboardMetric;
  loading?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({ metric, loading = false }) => {
  // Implementation
};
```

### File Structure

- Place components in appropriate directories
- Use index files for clean imports
- Keep related files together

```
dashboards/executive/
├── app/
│   ├── page.tsx
│   └── layout.tsx
├── components/
│   ├── MetricCard.tsx
│   └── index.ts
└── lib/
    └── api.ts
```

### Styling

- Use Tailwind CSS utility classes
- Follow existing design patterns
- Ensure responsive design (mobile-first)
- Test dark mode compatibility

### API Integration

- Use shared API utilities from `shared/lib/`
- Implement proper error handling
- Add loading states
- Cache API responses when appropriate

Example:
```typescript
const { data, error, isLoading } = useSWR(
  `/api/leads?company=${company}`,
  fetcher,
  { refreshInterval: 300000 }
);
```

## Testing

### Manual Testing Checklist

Before submitting a PR, ensure:
- [ ] Feature works in development mode
- [ ] Production build succeeds
- [ ] All API calls work correctly
- [ ] Error states display properly
- [ ] Loading states work
- [ ] Responsive design works on mobile
- [ ] No console errors or warnings
- [ ] Data refreshes correctly

### Browser Testing

Test in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Adding a New Dashboard

1. Create new directory: `dashboards/your-dashboard/`
2. Copy structure from existing dashboard
3. Update `package.json` with appropriate name
4. Implement dashboard components
5. Add environment variable configuration
6. Update root README.md with dashboard description
7. Create Vercel deployment configuration
8. Add to main documentation

## Adding a New Company Website

1. Create directory: `websites/company-name/`
2. Set up Next.js project structure
3. Implement pages and components
4. Configure ERPNext API integration for forms
5. Add SEO metadata
6. Create Netlify configuration
7. Update documentation

## Pull Request Guidelines

### PR Title Format

Use conventional commits format:
```
feat(dashboard): add inventory turnover metric
fix(api): resolve authentication timeout issue
docs(readme): update setup instructions
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Other (specify)

## Testing
- [ ] Tested locally
- [ ] Tested in multiple browsers
- [ ] Tested API integration
- [ ] No console errors

## Screenshots (if applicable)
Add screenshots of UI changes

## Related Issues
Closes #issue_number
```

### Review Process

1. Code review by maintainers
2. Automated checks (build, lint)
3. Testing by reviewer
4. Approval or requested changes
5. Merge to main branch

## Getting Help

- **Questions**: Open a GitHub Discussion
- **Bugs**: Create a GitHub Issue
- **Security**: Email david@geniinow.com privately
- **Chat**: Contact via Slack (if team member)

## Recognition

Contributors will be recognized in:
- GitHub contributors list
- Release notes
- Project documentation

Thank you for contributing to ERPNext Business Dashboards!
