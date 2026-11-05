# Product website and email client hostnames

These are separate services, not a hostname migration:

| Hostname | Purpose |
| --- | --- |
| https://memail.saivra.co | Public Memail open-source product website, repository and release links. |
| https://webmail.saivra.co | Saivra's email client, connected to the existing Stalwart backend. |

Client updates replace the webmail application image behind `webmail.saivra.co`
while retaining its persistent data, environment, accounts and mail backend.
Do not redirect this hostname to the product website. The product website must
not proxy the private client, its API or authentication endpoints.

The earlier instructions describing a move from webmail to memail were
incorrect and are superseded by this document. Continue using webmail for
email. Browser-local drafts, offline queues, sessions and preferences remain
scoped to their original hostname; a redirect cannot transfer them. If you used
the temporarily exposed client on the product hostname, do not clear its browser
storage before recovering any local-only drafts. Server-backed mail and
accounts remain in the same Stalwart installation.

Keep separate HTTPS vhosts and certificate renewal for both sites. The website
can serve static assets independently of the Docker Compose webmail service.
Neither a website change nor a client upgrade requires changing mail domains,
MX/SPF/DKIM records, recreating accounts, or restarting Stalwart.
