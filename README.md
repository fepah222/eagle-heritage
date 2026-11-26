# Eagle Heritage Website

Static, bilingual (English/French) website for Eagle Heritage, a construction, building and civil engineering company in Douala, Cameroon.

## Deployment

The site is deployed as a static Cloudflare Pages project from the repository root. No build step or package installation is required. Keep the existing page filenames and internal links.

Production URL: https://eagle-heritage.pages.dev/

## Pages

- `index.html` — homepage
- `about.html` — company and leadership
- `services.html` — services
- `projects.html` — reported project categories (not a verified photo portfolio)
- `approach.html` — project approach
- `contact.html` — contact and WhatsApp enquiry preparation
- `privacy.html`, `cookies.html`, `terms.html` — legal information
- `404.html` — not-found page

## Shared files

- `refresh.css` — design tokens and responsive layout
- `site.js` — navigation, English/French switch, WhatsApp form flow, cookie choice, project filters
- `favicon.svg` — site favicon
- `_headers` — Cloudflare Pages response headers
- `_redirects` — no catch-all rewrite; actual files and the 404 page should be served
- `robots.txt` and `sitemap.xml` — crawler files for the Pages domain

## Contact form

The enquiry form is a client-side form that validates the required fields and prepares a WhatsApp message. It opens WhatsApp; the visitor must review and press **Send**. Eagle Heritage does not receive a message just because the form was submitted on the website.

For direct website submission, add a backend endpoint or a Cloudflare Worker and connect it to a secure email/CRM provider. Configure server-side validation, rate limiting, spam protection, privacy handling and delivery/error feedback. Do not show a sent-success state until the server/provider confirms delivery.

## Assets and factual content

The repository currently has no verified project-image library and no confirmed logo image file at `assets/images/branding/logo.png`. The website uses a built-in SVG emblem as a temporary visual fallback. Some external Unsplash photos are illustrative and are explicitly not Eagle Heritage project photographs.

Reported project categories in the existing content include residential houses, apartments/luxury homes and retaining walls. Individual project records and approved photographs should be added only after company confirmation and permission.

The founder name and contact numbers are retained from the existing site content and should be confirmed by the company before final publication.

## Local preview

Open the project folder in VS Code and run a local static server (for example, Live Server), or serve the folder with Python:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Checks

Before release, verify all page routes, English/French content, mobile navigation, contact form WhatsApp handoff, form validation, cookie preference, images, contrast, and viewport widths of 360, 390, 768, 1024 and 1440px.