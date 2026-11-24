# Eagle Heritage Website

Responsive, bilingual (English/French) static website for Eagle Heritage, a construction, building and civil engineering company based in Cameroon.

## Repository structure

The website is stored at the repository root so Netlify can publish it directly without a subdirectory setting.

```text
/
├── index.html       # Main website and SEO metadata
├── refresh.css      # Responsive styles
├── site.js          # Navigation, language toggle and WhatsApp enquiry form
├── favicon.svg      # Browser icon
├── robots.txt       # Search crawler rules
├── 404.html         # Custom not-found page
├── _headers         # Security and cache headers
├── netlify.toml     # Netlify build and publish configuration
└── README.md
```

## Netlify configuration

The root `netlify.toml` sets the publish directory to `.`. No build command or package installation is required.

- Base directory: leave blank
- Build command: leave blank
- Publish directory: `.` (repository root)
- Production branch: `main`

The configuration file is authoritative for the publish directory. If the Netlify dashboard has a conflicting value, align it with the root configuration.

## Local preview

Open this repository folder in Visual Studio Code and open `index.html` in a browser, or use the Live Server extension. No framework or build process is required.

## SEO included

- Search-friendly page title and meta description focused on construction services in Douala, Cameroon
- Index/follow robots directive
- Open Graph and Twitter summary metadata
- JSON-LD `GeneralContractor` structured data using the supplied company name, contact numbers, founder and service area
- Crawler access rules in `robots.txt`

### Sitemap and canonical URL

A sitemap and canonical URL should be generated after the final public website domain is confirmed. Do not publish a guessed domain in canonical metadata or sitemap URLs. Add the verified production domain to both, then submit the sitemap in Google Search Console.

## Content verification

- Company founder: Beltrand Ndingwa.
- Website contact numbers: +237 681 486 499 and +237 691 507 676.
- Reported project categories include residential houses, luxury homes, apartments and retaining walls in Douala.
- Portfolio photographs are illustrative placeholders, not verified photographs of Eagle Heritage projects.
- Confirm project descriptions, client permissions, team credentials, registration claims, address and testimonials before publishing them as factual claims.
- The enquiry form prepares a WhatsApp message and does not store or submit form data to a website server.
