# Personale website

Personal website &amp; portfolio built with Astro. Showcases my background, projects, and hobbies. Future blog integration planned for industry insights. Optimized for performance and scalability to highlight my freelance expertise.

## Deployment

Pushes to `master` run the build, type check and dependency audit before copying
`dist` to the Nginx document root. The workflow also installs
`deploy/nginx/personal-website-security.conf` in `/etc/nginx/conf.d`, validates
the full configuration with `nginx -t`, reloads Nginx and checks the public
response headers. A failed validation or reload restores the previous snippet.

The server must include `/etc/nginx/conf.d/*.conf` from its `http` context, and
the deploy user needs non-interactive sudo access for the `test`, `cp`,
`install` and `rm` operations in the rollback block, plus `nginx -t` and the
Nginx reload. Security headers are scoped to `/` and `/it/`; the noindex
prototype routes retain their inline scripts. HSTS starts at one year without
`includeSubDomains` or `preload`; add those only after every subdomain has been
confirmed HTTPS-only.
