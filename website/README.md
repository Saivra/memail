# Public product website

`index.html` is a static product page for https://memail.saivra.co.
Copy it and `sw.js` to the website document root, along with
`public/branding/memail/mark.svg` as `mark.svg`. Serve over HTTPS with a
static-only vhost; unknown paths (including `/api/*`) return 404.
Serve `sw.js` with JavaScript content type and `Cache-Control: no-store`.
It unregisters the client service worker from the briefly shared hostname,
without clearing browser storage or local drafts.

The email client is a separate Docker Compose service behind
https://webmail.saivra.co. Do not replace or redirect its vhost when deploying
this site. See [hostname notes](../docs/DOMAIN-MIGRATION.md).
