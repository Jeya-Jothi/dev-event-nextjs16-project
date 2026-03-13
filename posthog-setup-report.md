<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the DevEvent Next.js App Router application. The following changes were made:

- **`instrumentation-client.ts`** (new): Initializes PostHog client-side using the Next.js 15.3+ `instrumentation-client` pattern. Configured with a reverse proxy (`/ingest`), exception capture for error tracking, and debug mode in development.
- **`next.config.ts`**: Added reverse proxy rewrites for PostHog ingestion (`/ingest/static/*` and `/ingest/*`) and set `skipTrailingSlashRedirect: true` to support PostHog's trailing slash API requests.
- **`lib/posthog-server.ts`** (new): Server-side PostHog singleton client using `posthog-node`, configured with `flushAt: 1` and `flushInterval: 0` for immediate event flushing in serverless environments.
- **`components/ExploreBtn.tsx`**: Added `explore_events_clicked` capture when the "Explore Events" CTA button is clicked.
- **`components/EventCard.tsx`**: Added `"use client"` directive and `event_card_clicked` capture (with `event_title`, `event_slug`, `event_location`, `event_date` properties) when a user clicks an event card.
- **`.env.local`**: Created with `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` environment variables.

| Event Name | Description | File |
|---|---|---|
| `explore_events_clicked` | User clicks the "Explore Events" CTA button on the homepage | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicks on an event card to view event details | `components/EventCard.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard**: [Analytics basics](https://us.posthog.com/project/341450/dashboard/1358618)
- **Insight**: [Explore Events CTA clicks over time](https://us.posthog.com/project/341450/insights/R5ri0z5h)
- **Insight**: [Event card clicks over time](https://us.posthog.com/project/341450/insights/B1OXtAwA)
- **Insight**: [Homepage to events conversion funnel](https://us.posthog.com/project/341450/insights/hlRmNoVz)
- **Insight**: [Event card clicks by event title](https://us.posthog.com/project/341450/insights/5vBIHPRo)
- **Insight**: [Daily active users on homepage](https://us.posthog.com/project/341450/insights/GXqFncAD)

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
