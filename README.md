# Buzz Web App — Product & Tech Blueprint (v1)

A pragmatic, end‑to‑end plan to build a standout web companion for the Buzz mobile app (Event Finder + Social).

---

## 1) Vision & Goals

**Vision:** Help people effortlessly discover events, rally friends, and share experiences—on any device.

**Web Goals**

* Equal‑first citizen with mobile: discovery, planning, and sharing should feel amazing on desktop and mobile web.
* Fast search + rich maps; frictionless RSVP and social coordination.
* SEO powerhouse to organically grow event traffic.
* A clean, modern UI with strong accessibility, performance (Core Web Vitals), and privacy.

**Primary KPIs**

* Event discovery CTR, RSVP conversion rate, time‑to-first-like/comment, daily/weekly active users, SEO impressions → clicks, host conversion (events created per host), invite acceptance rate.

---

## 2) Users & Core Jobs

1. **Seekers** (attendees): Discover events by interest, time, location; RSVP; invite friends; coordinate logistics.
2. **Hosts**: Create/boost events; manage RSVPs; message attendees; analytics on reach & conversion.
3. **Friends/Groups**: Share plans, vote on options, maintain group calendars.

**Top Jobs-To-Be-Done**

* “Find something fun **near me this weekend** that fits my vibe + budget.”
* “**Plan an event** and get RSVPs fast, without annoying back-and-forth.”
* “**Coordinate with friends**—poll times, share rides, split costs.”

---

## 3) MVP Feature Set (Web)

**Discover**

* Home feed: trending/nearby; personalized picks.
* Search: free text + facets (date, price, distance, category, age, accessibility, family-friendly, indoor/outdoor).
* Map: cluster markers + list; draw-to-filter (stretch goal).

**Event Page**

* Hero images, date/time, venue/map, price/tickets, tags, host, capacity.
* RSVP (Yes/Maybe/No), share, save/bookmark, add to calendar.
* Social: likes, comments, friend RSVPs, recommendations.

**Create/Host**

* Host onboarding & verification (basic MVP: identity + phone/email).
* Create event: title, description, media, category, tags, tickets (free/paid link), capacity, privacy level (public/link-only/private), schedule (single/recurring), co-hosts.
* Host dashboard: edit/cancel/duplicate; RSVP list; message attendees; simple analytics.

**Profiles & Social**

* User profiles: interests, history, badges.
* Follow users/hosts; friend graph; DMs (stretch: ship later—start with comments + event threads).

**Notifications**

* Email + push (web push) for RSVP updates, reminders, friend activity.

**Admin**

* Content moderation (manual first), takedown flow, flagging.

---

## 4) Information Architecture

* /\*\* (Home/Discover)\*\*
* /search (list + map)
* /event/\[slug]
* /create (wizard)
* /host/\[handle] (public host page)
* /dashboard (host tools)
* /profile/\[handle]
* /saved
* /inbox (later)
* /auth/\* (login, sign up, reset)
* /legal/\* (privacy, terms)

---

## 5) UI/UX System

* **Framework:** Next.js 14 (App Router, RSC).
* **Styling:** Tailwind CSS + shadcn/ui; Framer Motion for micro‑interactions.
* **Design Tokens:** light/dark themes, 8‑pt spacing, rounded‑2xl, soft shadows.
* **Components:** Navbar w/ search; Card/Grid for events; Faceted filters; Map/List split; RSVP button group; Tabs; Dialogs; Toasts; Empty states; Skeleton loaders.
* **Accessibility:** WCAG AA, focus rings, logical tab order, reduced motion mode.

---

## 6) Data Model (Draft)

**User** { id, handle, name, email, phone?, avatarUrl, bio, interests\[], location (city, lat/lng), visibility, createdAt }

**Friendship/Follow** { id, followerId, followeeId, status }

**Host** { id (= userId or orgId), verified, rating?, payoutAccountId? (later) }

**Event** { id, slug, title, description, images\[], hostId, category, tags\[], startAt, endAt, timezone, venueName, address, lat, lng, priceMin, priceMax, currency, ticketUrl?, capacity?, visibility, recurrence?, ageRestriction?, accessibilityFlags\[], createdAt, updatedAt }

**RSVP** { id, eventId, userId, status (yes|maybe|no), guestsCount, createdAt }

**Comment** { id, eventId, userId, content, parentId?, createdAt }

**Save/Bookmark** { id, userId, eventId, createdAt }

**Notification** { id, userId, type, payload JSON, readAt?, createdAt }

**Report/Flag** { id, actorId, subjectType, subjectId, reason, status, createdAt }

---

## 7) API Shape (Public App + Web)

**Pattern:** Next.js Route Handlers (or tRPC) behind Auth.js sessions.

* **Auth**: `POST /api/auth/*` (Auth.js providers: email magic link + OAuth: Google/Apple later)
* **Events**: `GET /api/events?query=&category=&dateRange=&bounds=`
* **Event**: `GET /api/events/:id|slug`
* **Create/Update**: `POST/PUT /api/events`
* **RSVPs**: `POST /api/events/:id/rsvp` ; `GET /api/events/:id/attendees`
* **Comments**: `GET/POST /api/events/:id/comments`
* **Host**: `GET /api/hosts/:id` ; `GET /api/hosts/:id/events`
* **Users**: `GET /api/me` ; `GET /api/users/:handle`
* **Search Suggestions**: `GET /api/search/suggest?q=`

**Real‑time**: WebSockets (Pusher/Supabase Realtime/Socket.IO) for live comment threads & presence (stretch).

---

## 8) Personalization & Ranking (MVP)

* Cold start: location + fresh/trending events.
* Signals: past RSVPs, saves, categories, friend activity.
* Rerank with lightweight scoring: recency, distance, popularity, interest match.
* Later: simple embeddings (e.g., sentence-transformers) for semantic search.

---

## 9) Search & Maps

* **Maps:** Mapbox/MapLibre + tiles; clustering; geohash indexing.
* **Search backend:** Postgres + pgvector (later) or Meilisearch/Typesense for instant faceting.
* **Geo:** PostGIS for radius + bounding-box queries.

---

## 10) Auth, Privacy, Safety

* Auth.js (Email magic link first; add OAuth next).
* Rate limiting (Upstash Redis) + bot protection (Turnstile).
* Roles/Policies: admin, host, user; row‑level checks in API.
* Moderation queue + basic ML (later) for nudity/violence text/image checks.
* PII minimization; GDPR/CCPA‑ready data export/delete.

---

## 11) Payments & Tickets (Roadmap)

* MVP: outbound `ticketUrl` to third‑party checkout.
* Phase 2: Stripe Connect for paid events, payouts to hosts, refund rules.

---

## 12) Analytics & SEO

* **Analytics:** PostHog (events: search, click, RSVP, create, share); privacy‑friendly.
* **SEO:** Next.js metadata; SSR pages for events/hosts; structured data (schema.org Event); clean URLs `/event/artist-calgary-2025-09-12`.
* **OG images:** dynamic covers per event.

---

## 13) Performance & Quality

* Image CDN (Vercel / Imgix), responsive images; lazy load.
* RUM for Core Web Vitals (LCP, INP, CLS).
* E2E tests (Playwright), unit/integration (Vitest), API contract tests.

---

## 14) Tech Stack (Recommended)

* **Frontend:** Next.js 14, React 18, TypeScript, Tailwind, shadcn/ui, Framer Motion.
* **Backend:** Next API routes (or tRPC), Prisma ORM, Postgres (Neon/Supabase), Redis (Upstash) for cache/queues.
* **Infra:** Vercel (web), Neon/Supabase (DB), S3-compatible storage (R2/Supabase) for media.
* **Email:** Resend/Sendgrid; **Push:** OneSignal/Web Push.
* **Maps:** Mapbox/MapLibre.

---

## 15) Delivery Plan — 6 Weeks MVP

**Week 1:** Repo setup, auth, DB schema, design system, home shell.
**Week 2:** Event create/read/update (CRUD) + image uploads.
**Week 3:** Discovery search + map + facets.
**Week 4:** RSVP, saves, comments; email notifications.
**Week 5:** Host dashboard + SEO polish.
**Week 6:** Admin moderation + analytics + perf passes.

**Definition of Done (MVP):**

* Create event, discover/search/map, RSVP & comments, host dashboard, SEO, sign‑in/out, basic admin.

---

## 16) Nice‑to‑Haves (Post‑MVP)

* Group chat & polls; calendar sync (Google/Apple), ride‑share suggestions.
* Embeddings‑powered recommendations; photo galleries; highlights/reels.
* Partnerships: venues, universities; promoter tools; ad placements.

---

## 17) Risks & Mitigations

* **Supply of events**: seed with scrapers/APIs & host outreach → ensure density per city.
* **Trust & safety**: verification, reporting, clear house rules.
* **SEO cannibalization**: high‑quality event pages; canonical URLs; no thin/dup content.
* **Spam/scams**: rate limits, link safety checks.

---

## 18) Next Actions

1. Approve MVP scope + stack.
2. Pick design direction (references + mood board).
3. I’ll scaffold a Next.js repo with auth, Prisma schema, and a minimal event flow.
4. Start UX wireframes for key pages.

---

*End v1 — ready to iterate.*
