# Deployment Guide

## Quick Start

This guide covers deploying Palla al Fly to production.

---

## Prerequisites

1. **Supabase Project** setup with database schema executed
2. **Environment variables** configured (see `.env.example`)
3. **(Optional) OneSignal** account for notifications

---

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Connect Repository:**
   - Go to [vercel.com](https://vercel.com)
   - Import your Git repository

2. **Configure Environment Variables:**
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

3. **Build Settings:**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Deploy:**
   Click "Deploy" - should complete in ~2 minutes

### Option 2: Netlify

1. **Connect Repository:**
   - Go to [netlify.com](https://netlify.com)
   - Add new site from Git

2. **Build Settings:**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

3. **Environment Variables:**
   Same as Vercel (Settings → Build & deploy → Environment)

4. **Deploy:**
   Trigger deploy from Git push

### Option 3: Self-Hosted (Docker)

Create `Dockerfile`:
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:
```bash
docker build -t palla-al-fly .
docker run -p 80:80 palla-al-fly
```

---

## Database (Supabase)

Already hosted! No additional steps needed.

**Post-Deployment Checklist:**

1. ✅ Run `supabase/schema.sql` in SQL Editor
2. ✅ Enable RLS on all tables
3. ✅ Add admin emails to `admins` table:
   ```sql
   INSERT INTO admins (email) VALUES ('admin@example.com');
   ```
4. ✅ Enable Google OAuth (if using)
5. ✅ Verify RLS policies work (test with authenticated/anon users)

---

## Edge Functions (Optional - for Notifications)

### Setup

1. **Install Supabase CLI:**
   ```bash
   npm install -g supabase
   ```

2. **Login:**
   ```bash
   supabase login
   ```

3. **Link Project:**
   ```bash
   supabase link --project-ref your-project-ref
   ```

4. **Set Environment Variables:**
   
   In Supabase Dashboard:
   - Edge Functions → Settings → Manage Variables
   
   Add:
   ```
   PROJECT_URL=https://your-project.supabase.co
   SERVICE_ROLE_KEY=your-service-role-key
   ONESIGNAL_APP_ID=your-app-id
   ONESIGNAL_API_KEY=your-rest-api-key
   ```

5. **Deploy Function:**
   ```bash
   supabase functions deploy daily-reminder
   ```

6. **Setup Cron (via Supabase SQL Editor):**
   ```sql
   SELECT cron.schedule(
     'daily-reminder-job',
     '0 10 * * *',  -- 10:00 AM daily
     $$
     SELECT
       net.http_post(
         url:='https://your-project.supabase.co/functions/v1/daily-reminder',
         headers:='{"Content-Type": "application/json", "Authorization": "Bearer YOUR_ANON_KEY"}'::jsonb
       ) AS request_id;
     $$
   );
   ```

7. **Verify:**
   ```bash
   supabase functions logs daily-reminder
   ```

---

## Post-Deployment Testing

### 1. Authentication Flow
- [ ] Register new user (email/password)
- [ ] Login with Google OAuth
- [ ] Verify session persistence

### 2. User Permissions
- [ ] Non-admin cannot access /venues, /create-match
- [ ] User can add/remove their own players
- [ ] User cannot remove other users' players

### 3. Admin Permissions
- [ ] Admin can access all restricted pages
- [ ] Admin can remove any player
- [ ] Admin can delete matches

### 4. Match Management
- [ ] Create match with custom capacities
- [ ] Add players to match
- [ ] Verify overbooking indicators (italic + badge)
- [ ] Status updates (open → full)
- [ ] Delete match (admin)

### 5. RLS Security
- [ ] Unauthenticated users see matches (no players)
- [ ] Authenticated users see player roster
- [ ] Players can only be deleted by creator or admin
- [ ] Venues can only be created by admin

### 6. Mobile Responsive
- [ ] Test on mobile viewport (Chrome DevTools)
- [ ] Header wraps properly
- [ ] Cards are readable
- [ ] Forms are usable

---

## Rollback Procedure

### Frontend (Vercel/Netlify)
- Deployments → Select previous version → Promote to Production

### Database
**WARNING:** No easy rollback for schema changes!

If you need to revert:
1. Backup data first:
   ```sql
   SELECT * FROM matches;
   SELECT * FROM players;
   -- Export to CSV
   ```
2. Drop tables:
   ```sql
   DROP TABLE IF EXISTS players CASCADE;
   DROP TABLE IF EXISTS matches CASCADE;
   DROP TABLE IF EXISTS venues CASCADE;
   DROP TABLE IF EXISTS admins CASCADE;
   ```
3. Re-run old schema

### Edge Functions
```bash
# Deploy older version from Git
git checkout <old-commit>
supabase functions deploy daily-reminder
git checkout main
```

---

## Monitoring

### Application Logs
- **Vercel:** Deployments → Functions → Logs
- **Netlify:** Deploys → Function logs

### Database Monitoring
- Supabase Dashboard → Database → Statistics
- Check query performance, connection pool

### Edge Function Logs
```bash
supabase functions logs daily-reminder --tail
```

---

## Troubleshooting

### Build Fails
**Error:** `Missing environment variables`
- Solution: Double-check .env in deployment platform

**Error:** TypeScript errors
- Solution: Run `npm run build` locally first
- Check Node version (20.19+ or 22.12+)

### RLS Blocks Access
**Error:** "permission denied for table"
- Solution: Verify RLS policies in Supabase Dashboard
- Check `auth.jwt() ->> 'email'` matches user

### Google OAuth Not Working
- Check redirect URLs in Google Console
- Verify same URLs in Supabase → Authentication → URL Configuration

### Edge Function Timeout
- Increase timeout in Supabase (default 60s)
- Optimize query performance
- Check OneSignal API connectivity

---

## Production Checklist

Before going live:

- [ ] Run full schema with RLS
- [ ] Add initial admin users
- [ ] Configure Google OAuth properly
- [ ] Test all user flows
- [ ] Enable HTTPS (handled by Vercel/Netlify)
- [ ] Set up custom domain
- [ ] Deploy Edge Functions
- [ ] Configure cron schedule
- [ ] Test notification delivery
- [ ] Add Privacy Policy link in footer ✅
- [ ] Monitor first week for errors

---

## Cost Estimation

### Free Tier (0-100 users)
- **Supabase Free:** 500MB database, 2GB bandwidth
- **Vercel/Netlify Free:** Unlimited static deployments
- **OneSignal Free:** 10,000 notifications/month

### Paid (100+ users)
- **Supabase Pro:** $25/month (8GB database, 50GB bandwidth)
- **Vercel Pro:** $20/month (100GB bandwidth)
- **OneSignal Growth:** $9/month (30,000 notifications)

**Total:** ~$50-60/month for 100+ active users

---

## Support

For deployment issues:
1. Check Supabase Dashboard logs
2. Check browser console for client errors
3. Verify environment variables
4. Review README.md FOR DEVS section

Need help? Check:
- Supabase Docs: https://supabase.com/docs
- Vite Docs: https://vitejs.dev
- Tailwind Docs: https://tailwindcss.com
