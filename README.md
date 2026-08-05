# Spyglass Insurance + CRM

Marketing site + insurance CRM on one Next.js / Vercel project.

## Features (from insurance CRM research)

- Lead capture (web form to CRM)
- Sales pipeline (new, contacted, qualified, quoted, bound, lost)
- Contacts and policies / renewals
- Omnichannel inbox (website chat + SMS)
- AI chatbot with agent takeover and release to AI
- Outbound SMS + Twilio inbound webhook
- Dashboard tasks and pipeline value

## Routes

| Path | Purpose |
|------|---------|
| `/` | Marketing site + chat widget |
| `/crm` | Dashboard |
| `/crm/inbox` | Chat/SMS inbox + takeover |
| `/crm/leads` | Pipeline board |
| `/crm/contacts` | Contacts |
| `/crm/policies` | Policies |
| `/crm/sms` | SMS console |
| `/api/chat` | Public chat API |
| `/api/leads` | Public lead form |
| `/api/sms/send` | Outbound SMS |
| `/api/sms/webhook` | Twilio inbound |

## Env (optional for live SMS)

```
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_FROM_NUMBER=
```

Without Twilio, SMS runs in demo mode (logged in CRM only).

## Data note

Demo store is in-memory (resets on cold start). For production, swap `src/lib/store.ts` for Postgres/Neon/Supabase.

## Dev

```bash
npm install
npm run dev
```

## Deploy (same Vercel project)

```bash
vercel --prod --token $VERCEL_TOKEN
```
