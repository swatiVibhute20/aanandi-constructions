# आनंदी Constructions

UI-only website for a civil engineering practice in Kolhapur, Maharashtra. Marathi is the default language. English is available from the navbar.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
npm start
```

Phone, WhatsApp and the office address live in `src/config/site.ts`. Page copy is in `src/i18n/dictionary.ts`. Projects, services, testimonials and estimator rates are in `src/data/`.

Pages talk to `src/lib/api.ts` only. Those functions return promises so they can be swapped for Supabase without rewriting the screens.

Accounts, contact notes and visitor reviews are stored in Turso when `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` are set. Without those, `npm run dev` uses a local file at `data/aanandi.sqlite`. New signups are always `user`. Only `admin` can open `/admin`. The first admin is created from `ADMIN_EMAIL`, `ADMIN_PASSWORD` and `ADMIN_NAME` when that email is not already in the database. On Render, set `NODE_VERSION` to `22` and the Turso and admin variables before the first deploy.

`npm start` serves the built site and the same `/api` routes. `npm run dev` and `npm run preview` do too.

## Connecting Supabase

Install the client when you are ready:

```bash
npm install @supabase/supabase-js
```

Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to `.env.local`. Do not put the service-role key in this Vite app. It would ship to every browser.

Create `src/lib/supabase.ts` that exports a browser client, then replace the bodies in `src/lib/api.ts`. Keep the function names. Drop the in-memory caches (`servicesP` and the rest) once the calls hit the network.

Planned tables:

### `projects`

Public read. Admin write.

| Column | Notes |
| --- | --- |
| `id` | `uuid` primary key |
| `slug` | unique text, matches the current `id` values |
| `title_mr`, `title_en` | text |
| `summary_mr`, `summary_en` | text |
| `story_mr`, `story_en` | text |
| `location_mr`, `location_en` | text |
| `category` | `residential`, `industrial` or `agricultural` |
| `year` | int |
| `area` | numeric |
| `area_unit` | `sqft` or `rft` |
| `materials_mr`, `materials_en` | text |
| `image_url` | text |
| `featured` | boolean |
| `created_at` | timestamptz |

### `enquiries`

Insert from the contact form. Select for admins only.

| Column | Notes |
| --- | --- |
| `id` | `uuid` primary key |
| `name` | text |
| `phone` | text |
| `place` | text |
| `service_id` | text |
| `message` | text |
| `lang` | `mr` or `en` |
| `estimate` | `jsonb`, nullable. Shape: `{ workId, tier, quantity, min, max }` |
| `created_at` | timestamptz |

`submitEnquiry` in `src/lib/api.ts` is the function to point at `supabase.from('enquiries').insert(...)`.

### `profiles`

One row per auth user. Role gate for `/admin`.

| Column | Notes |
| --- | --- |
| `id` | `uuid` primary key, references `auth.users` |
| `full_name` | text |
| `phone` | text |
| `role` | `admin` or `user` |

Suggested access:

- `projects`: anyone can `select` where you are happy to publish. Only `role = admin` can insert, update or delete.
- `enquiries`: anonymous visitors can `insert`. Only admins can `select`.
- `profiles`: a user can read their own row. Only an admin can change `role`.

Login and signup already run on the SQLite tables `users` and `sessions`. Supabase Auth is optional if you later move the same roles (`user` and `admin`) to a hosted database.

Estimator rates live in `src/data/estimatorRates.ts`. Adjust them to current local market rates before anyone is quoted. A later `rates` table can mirror `EstimatorWork` (`id`, `unit`, `min_qty`, `max_qty`, `floors`, and min/max for economy, standard and premium) plus the add-on rows.
