# Memail deployment hostname

The primary Saivra installation is https://memail.saivra.co. It uses the same
webmail service and Stalwart backend as the earlier hostname. Changing this
web hostname does not rename email addresses, mail domains, MX records or
mail-server accounts.

The earlier https://webmail.saivra.co remains available during migration.
Browser local storage, IndexedDB, service workers, offline queues and sessions
are scoped to an origin. A redirect cannot copy them into a new hostname.
Users should finish or save pending local drafts and offline work at the old
address, then sign in at the new address and reinstall its PWA if desired.
Server-backed mail/accounts remain the same; some browser preferences may need
to be set again. Do not remove the earlier route while users still need it.

For another deployment, check OAuth redirect registrations, WebAuthn relying
party IDs, web-push subscriptions and any explicitly configured public URLs
before a hostname switch. Do not silently change credential identifiers.

Operations: back up the authoritative zone and web vhost, add the new DNS
record, validate the zone, provision and verify HTTPS, then point the new
vhost at the existing loopback service. Test both hostnames and readiness.
Keep certificate renewal and an Nginx reload hook in place. Do not recreate
mail storage or the Stalwart service as part of this change.
