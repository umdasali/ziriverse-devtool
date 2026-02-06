# Deployment Guide

This guide covers deploying the Branding Tools application to production.

## Recommended Platform: Vercel

Vercel provides the best experience for Next.js applications with zero configuration.

### Deploy to Vercel

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel
```

4. **Deploy to Production**
```bash
vercel --prod
```

### Vercel Configuration

Create `vercel.json` (optional - Next.js config is usually sufficient):

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

### Environment Variables (Vercel Dashboard)

1. Go to Project Settings → Environment Variables
2. Add variables:
   - `NEXT_PUBLIC_APP_URL`: Your production URL
   - `NODE_ENV`: production (usually auto-set)

### Automatic Deployments

- Connect your Git repository
- Push to main branch = production deployment
- Pull requests = preview deployments

---

## Alternative: Docker Deployment

### Dockerfile

Create `Dockerfile`:

```dockerfile
FROM node:20-alpine AS base

# Dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_APP_URL=https://your-domain.com
    restart: unless-stopped
```

### Build and Run

```bash
docker-compose up -d
```

---

## Self-Hosted (VPS/Dedicated Server)

### Requirements

- Node.js 18.17.0+
- npm 9.0.0+
- 512MB RAM minimum (1GB+ recommended)
- Build dependencies for Sharp (see below)

### Sharp Dependencies

Sharp requires native dependencies. Install on your system:

**Ubuntu/Debian**:
```bash
sudo apt-get update
sudo apt-get install -y build-essential libvips-dev
```

**CentOS/RHEL**:
```bash
sudo yum groupinstall 'Development Tools'
sudo yum install vips-devel
```

**macOS**:
```bash
brew install vips
```

### Deployment Steps

1. **Clone Repository**
```bash
git clone <repository-url>
cd "Branding Project"
```

2. **Install Dependencies**
```bash
npm ci --production=false
```

3. **Build Application**
```bash
npm run build
```

4. **Start Production Server**
```bash
npm run start
```

### Process Manager (PM2)

Keep the app running with PM2:

```bash
# Install PM2
npm install -g pm2

# Start app
pm2 start npm --name "branding-tools" -- start

# Save PM2 configuration
pm2 save

# Setup startup script
pm2 startup
```

### Nginx Reverse Proxy

Configure Nginx as reverse proxy:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Increase body size for image uploads
        client_max_body_size 50M;
    }
}
```

### SSL Certificate (Let's Encrypt)

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## Environment Variables

### Required

None for basic functionality.

### Optional

Create `.env.local`:

```bash
# Public URL (for absolute URLs)
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Node environment (auto-set in most platforms)
NODE_ENV=production
```

---

## Build Configuration

### next.config.js

Current configuration:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

module.exports = nextConfig;
```

### Recommended Production Additions

```javascript
const nextConfig = {
  // ... existing config

  // Strict mode
  reactStrictMode: true,

  // Compress output
  compress: true,

  // Generate standalone output for Docker
  output: 'standalone',

  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
        ],
      },
    ];
  },
};
```

---

## Performance Optimization

### 1. Enable Compression

Nginx (already in example above):
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

### 2. CDN (Optional)

For static assets:
- Use Vercel's Edge Network (automatic on Vercel)
- Or configure Cloudflare
- Or use AWS CloudFront

### 3. Caching

API route caching example:

```typescript
// In API route
export const revalidate = 3600; // Cache for 1 hour
```

### 4. Image Optimization

Next.js handles this automatically via `next/image`.

---

## Monitoring

### Recommended Tools

- **Vercel Analytics** (if using Vercel)
- **Sentry** for error tracking
- **Uptime Robot** for uptime monitoring
- **PM2 Monitor** for self-hosted

### Health Checks

Create `/api/health/route.ts`:

```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
  });
}
```

---

## Troubleshooting

### Sharp Installation Issues

If Sharp fails to install:

```bash
# Clean install
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

If still failing, try:
```bash
npm install --platform=linux --arch=x64 sharp
```

### Port Already in Use

Change port in production:

```bash
PORT=3001 npm run start
```

### Build Failures

Check:
1. Node version (must be 18.17.0+)
2. Available disk space
3. Memory availability (increase swap if needed)
4. All dependencies installed

### Performance Issues

1. Check server resources (CPU, RAM)
2. Enable caching
3. Use CDN for static assets
4. Consider horizontal scaling (multiple instances)

---

## Scaling

### Horizontal Scaling

Run multiple instances behind load balancer:

```yaml
# docker-compose.yml with replicas
services:
  app:
    build: .
    deploy:
      replicas: 3
    # ... other config
```

### Database (if added later)

Currently no database. If adding:
- Use PostgreSQL or MongoDB
- Connection pooling (PgBouncer, MongoDB Atlas)
- Read replicas for scaling

---

## Security Checklist

Before deploying to production:

- [ ] Environment variables set
- [ ] HTTPS enabled (SSL certificate)
- [ ] Security headers configured
- [ ] Rate limiting implemented (recommended)
- [ ] CORS configured correctly
- [ ] File upload size limits set
- [ ] Error messages don't expose internals
- [ ] Dependencies updated (npm audit)
- [ ] SSRF protection for URL fetching
- [ ] Input validation on all API routes

---

## Backup & Disaster Recovery

### What to Backup

Since the app is stateless:
- Source code (version controlled)
- Environment variables (document separately)
- Configuration files

No user data is stored.

### Disaster Recovery

1. Keep code in version control (Git)
2. Document environment variables
3. Redeploy from scratch if needed
4. Use infrastructure as code (Docker, Terraform)

---

## Cost Estimates

### Vercel (Recommended)
- **Hobby**: Free (perfect for this app)
- **Pro**: $20/month (if you need more)

### Self-Hosted VPS
- **DigitalOcean Droplet**: $6/month (1GB RAM)
- **Linode**: $5/month (1GB RAM)
- **AWS Lightsail**: $5/month (1GB RAM)

### Docker Container
- **DigitalOcean App Platform**: $5/month
- **Railway**: ~$5/month
- **Render**: Free tier available

---

## Post-Deployment

### Testing

Test all features in production:
1. Image conversion (client and server)
2. SEO validator with various URLs
3. Branding tool export
4. Mobile responsiveness
5. Cross-browser compatibility

### Analytics (Optional)

Add analytics:
- **Vercel Analytics** (built-in on Vercel)
- **Google Analytics**
- **Plausible Analytics** (privacy-focused)

### User Feedback

Consider adding:
- Feedback form
- Error reporting
- Usage analytics
