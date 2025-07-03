# ── build stage ──────────────────────────
FROM docker.io/oven/bun:latest AS builder
WORKDIR /app

COPY . .
RUN bun install \
&& bun build src/hydrate.tsx --outfile ./public/hydrate.mjs --format esm --minify \
&& bun run db:generate \
&& bun build --compile --minify --sourcemap src/index.tsx --outfile contest.server

# ── runtime stage ─────────────────────────
FROM docker.io/oven/bun:latest
WORKDIR /usr/src/app

ENV BUN_ENV=production

COPY --from=builder /usr/src/app/contest.server /usr/local/bin/contest.server
COPY --from=builder /usr/src/app/public /usr/src/app/public
COPY --from=builder /usr/src/app/src /usr/src/app/src
COPY --from=builder /usr/src/app/drizzle /usr/src/app/drizzle

RUN chmod +x /usr/local/bin/contest.server

EXPOSE 3000
ENTRYPOINT ["sh", "-c", "bun run ./src/db/migrate.ts && /usr/local/bin/contest.server"] 