# Palla al Fly - Volleyball Match Organizer

A mobile-first web application for organizing volleyball matches with authentication, role-based permissions, and real-time player management.

## Features

### Public Features
- 📅 **Public Dashboard**: View all upcoming matches without authentication
- 🏐 **Match Details**: See match info, venue, date, and time (player roster requires login)

### Authenticated User Features
- 👤 **Dual Authentication**: Google OAuth and Email/Password registration
- ✍️ **Player Signup**: Register yourself or others for matches
- 📱 **Phone Numbers**: Optional contact info for coordination
- 🎯 **Role Selection**: Choose from Setter, Outside Hitter, Opposite, Middle Blocker, Libero
- 🔄 **Overbooking Support**: Visual indicators when roles exceed capacity
- 🗑️ **Self-Management**: Remove players you've registered

### Admin Features
- 🏟️ **Venue Management**: Full CRUD for volleyball venues
- ➕ **Match Creation**: Create matches with customizable role capacities
- 🗑️ **Match Deletion**: Remove matches with confirmation
- 👥 **Player Management**: Remove any player from any match
- 🔐 **Dynamic Permissions**: Admin status controlled via database table

### Technical Features
- 🎨 **Mobile-First**: Responsive design with Tailwind CSS
- 🔒 **Row-Level Security**: Supabase RLS policies for data protection
- 📊 **Dynamic Status**: Match status updates automatically based on roster
- 🔔 **Daily Reminders**: Edge Function for OneSignal notifications (10:00 Europe/Rome)
- ⚡ **Real-Time Updates**: Instant UI updates on player add/remove
- 🐛 **Error Boundaries**: Graceful error handling

---

## FOR DEVS

### Prerequisites
- Node.js 20.19+ or 22.12+
- Supabase account
- (Optional) OneSignal account for notifications

### Setup Instructions

#### 1. Clone and Install
```bash
cd palla-al-fly
npm install
```

#### 2. Environment Variables
Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

Get these values from your Supabase project:
- Dashboard → Settings → API

#### 3. Database Setup

**Execute the SQL schema:**
1. Go to Supabase Dashboard → SQL Editor
2. Copy and run `supabase/schema.sql`

This creates:
- `venues` table
- `matches` table with FK to venues
- `players` table with FK to matches
- `admins` table for whitelisted admin emails
- RLS policies for all tables
- Indexes for performance
- Triggers for `updated_at` fields

**Add Admin Users:**
```sql
INSERT INTO admins (email) VALUES ('your-email@example.com');
```

#### 4. Enable Google OAuth (Optional)

1. Supabase Dashboard → Authentication → Providers
2. Enable Google provider
3. Add your OAuth credentials from Google Cloud Console
4. Configure redirect URLs

#### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173`

---

### Database Schema

#### `venues`
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Venue name |
| address | text | Full address |
| created_at | timestamptz | Auto-generated |
| updated_at | timestamptz | Auto-updated |

#### `matches`
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| title | text | Match title |
| date | date | Match date |
| time | time | Match time |
| venue_id | uuid | FK → venues.id |
| status | text | `open`, `full`, `cancelled` |
| setter_req | int | Required setters (default: 1) |
| oh_req | int | Required OH (default: 2) |
| oph_req | int | Required OpH (default: 2) |
| mb_req | int | Required MB (default: 1) |
| l_req | int | Required libero (default: 1) |
| notes | text | Optional notes |
| created_at | timestamptz | Auto-generated |
| updated_at | timestamptz | Auto-updated |

#### `players`
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| match_id | uuid | FK → matches.id (CASCADE) |
| name | text | Player name |
| role | text | `setter`, `oh`, `oph`, `mb`, `l` |
| phone_number | text | Optional phone |
| created_by | text | Email of creator |
| created_at | timestamptz | Auto-generated |

#### `admins`
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| email | text | Admin email (unique) |
| created_at | timestamptz | Auto-generated |

---

### Row-Level Security (RLS)

All tables have RLS enabled. Key policies:

**Venues:**
- Public read access
- Admin-only insert/update

**Matches:**
- Public read access (for dashboard)
- Authenticated users can insert/update
- Admin-only delete

**Players:**
- Authenticated users can read
- Insert requires `created_by` = current user email
- Delete allowed for creator OR admin

**Admins:**
- Authenticated users can read (for permission checks)

---

### Edge Functions

#### `daily-reminder`

**Purpose:** Send OneSignal notifications at 10:00 Europe/Rome for matches happening today.

**Environment Variables (set in Supabase Dashboard → Edge Functions → Settings → Manage Variables):**
- `PROJECT_URL` - Your Supabase project URL
- `SERVICE_ROLE_KEY` - Service role key (NOT anon key)
- `ONESIGNAL_APP_ID` - OneSignal app ID
- `ONESIGNAL_API_KEY` - OneSignal REST API key

**Deploy:**
```bash
supabase functions deploy daily-reminder
```

**Setup Cron:**
```sql
SELECT cron.schedule(
  'daily-reminder',
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

Replace timezone in function if needed (currently Europe/Rome).

---

### Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   ├── ErrorBoundary.tsx
│   ├── Header.tsx
│   └── PlayerSignupForm.tsx
├── contexts/
│   └── AuthContext.tsx  # Auth state management
├── hooks/
│   └── useMatches.ts    # Custom hook for matches
├── pages/
│   ├── AuthPage.tsx
│   ├── CreateMatchPage.tsx
│   ├── Dashboard.tsx
│   ├── MatchDetail.tsx
│   ├── PrivacyPage.tsx
│   └── VenuesPage.tsx
├── services/            # Supabase API calls
│   ├── admins.service.ts
│   ├── auth.service.ts
│   ├── matches.service.ts
│   ├── players.service.ts
│   └── venues.service.ts
├── types/
│   └── database.ts      # TypeScript interfaces
├── utils/
│   └── matchUtils.ts    # Overbooking logic
├── lib/
│   └── supabase.ts      # Supabase client
└── App.tsx              # Main routing

supabase/
├── schema.sql           # Database schema + RLS
└── functions/
    └── daily-reminder/
        └── index.ts     # OneSignal cron job
```

---

### Overbooking Logic

The app supports **overbooking** to allow flexibility:

- When a role exceeds its capacity, the excess players are marked in **italic** with an **"Overbooked"** badge
- Match status shows both **"Full"** and **"Overbooking"** badges when applicable
- Users can continue signing up even after a match is full
- Admin can manage by removing overbooked players

**Implementation:**
- `utils/matchUtils.ts` contains all overbooking calculations
- Status is recalculated dynamically on each player add/remove
- Database `status` field updates automatically via service calls

---

### Deployment

#### Frontend (Vercel/Netlify)
1. Connect your Git repository
2. Set environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Build command: `npm run build`
4. Output directory: `dist`

#### Database
- Already hosted on Supabase (no additional deployment)

#### Edge Functions
```bash
supabase login
supabase link --project-ref your-project-ref
supabase functions deploy daily-reminder
```

---

### Development Tips

1. **Testing RLS Policies:**
   Use Supabase Dashboard → Table Editor and toggle "View as" authenticated/anon user

2. **Admin Testing:**
   Add your email to `admins` table, then refresh the app

3. **Debugging Auth:**
   Check browser console for Supabase auth errors
   Use `useAuth()` hook to inspect current user state

4. **Overbooking Testing:**
   Create a match with low capacities (e.g., 1 setter)
   Add multiple players to the same role
   Verify italic names and badges appear

5. **Mobile Testing:**
   Use Chrome DevTools responsive mode
   Test with actual devices for best UX validation

---

### Common Issues

**Issue:** "Missing Supabase environment variables"
- **Solution:** Ensure `.env` file exists with correct values

**Issue:** RLS prevents data access
- **Solution:** Check if user is authenticated and policies allow operation

**Issue:** Admin features not showing
- **Solution:** Verify your email is in `admins` table

**Issue:** Google OAuth not working
- **Solution:** Check redirect URLs in Google Console and Supabase match

**Issue:** Players not visible
- **Solution:** Ensure you're logged in (players table requires authentication)

---

### License

MIT

### Contributors

Built for managing friendly volleyball matches with ~100 user capacity.

---

## Next Steps

- [ ] Add email notifications (via Supabase triggers + Resend/SendGrid)
- [ ] Implement waiting list (complementary to overbooking)
- [ ] Add match history/archive
- [ ] Player statistics dashboard
- [ ] Mobile app (React Native)
