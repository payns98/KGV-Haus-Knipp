
# Kleingartenverwaltung (Frontend) — Ready to deploy

Dieses Repository enthält ein vollständiges **Frontend** (Vite + React) für eure Kleingartenverwaltung,
inkl. Supabase-Schema, Beispiel-Edge-Function für Stripe Checkout und Deployment-Workflow.

**Achtung**: Dieses Projekt ist ein "starter kit". Du musst **einige Geheimwerte** (Supabase + Stripe) konfigurieren
bevor alles funktioniert. Anleitung weiter unten.

---

## Inhalt
- `src/` — React-Frontend (Login, Dashboard, einfache Komponenten)
- `supabase/schema.sql` — SQL zum Erzeugen der Tabellen
- `supabase/policies.sql` — RLS-Policies (Lesen/Schreiben regeln)
- `supabase/functions/create-checkout-session/` — Beispiel Supabase Edge Function (Stripe)
- `.github/workflows/deploy.yml` — GitHub Action zum Build & Deploy auf GitHub Pages
- `README.md` — das (du) liest gerade dieses Dokument.

---

## Schnellstart (lokal)

1. Node.js (16+) installieren
2. Projekt klonen / zip entpacken
3. `.env` anlegen (siehe unten)
4. `npm install`
5. `npm run dev`

Build:
- `npm run build` → `dist/` erzeugt

---

## Supabase: Einrichtung (kurz)

1. Erstelle ein Supabase-Projekt (https://app.supabase.com)
2. Notiere dir:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (nur für Serverless functions; niemals im Browser!)
3. Öffne SQL-Editor → Führe `supabase/schema.sql` aus
4. Führe `supabase/policies.sql` aus (enthält RLS policies)
5. Erstelle einen Storage-Bucket `documents` (privat)

---

## Stripe (Zahlung)

- Erstelle ein Stripe-Konto
- Nutze die Supabase Edge Function `create-checkout-session` (siehe Ordner)
- Setze in Supabase Secrets: `STRIPE_SECRET_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
- In `.env` deiner GitHub Actions / Vite: `VITE_STRIPE_PUBLISHABLE_KEY`

**Hinweis:** Stripe erhebt Transaktionsgebühren (1.5–3% + fixed fee).

---

## .env (frontend)
Erstelle `.env` im Repo root (lokal für dev) oder setze GitHub Secrets vor Deploy:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON=public-anon-key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## Supabase SQL (kurz erklärt)
Die Tabellen enthalten `auth_id` => referenz zum Supabase user.
RLS-Policies erlauben:
- Mitglieder sehen nur ihre eigenen `invoices`, `meter_readings`, `documents`
- Vorstand (role = 'admin' in `profiles`) kann alle Daten sehen

---

## Deployment auf GitHub Pages
1. Repository pushen
2. GitHub -> Settings -> Pages: Branch `gh-pages` (deploy via Action already included)
3. Für Actions: setze Secrets `ACTIONS_DEPLOY_KEY` wenn nötig — alternativ deploye manuell.

---

## Nächste Schritte (ich kann das für dich erledigen)
- Ich kann das Repo anpassen (z. B. euer Layout), oder
- die Supabase SQL exakt auf eure Bedürfnisse anpassen, oder
- die Edge Function für Stripe mit eurem Account konfigurieren.

Wenn du möchtest, packe ich das Projekt jetzt in ein ZIP, dann kannst du es herunterladen und direkt auf GitHub pushen.
