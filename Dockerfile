# ── build stage ──────────────────────────
FROM docker.io/oven/bun:latest AS builder
WORKDIR /app

COPY . .
RUN bun install \
&& bun build src/hydrate.tsx --outfile ./public/hydrate.mjs --format esm --minify \
&& bun build --compile --minify --sourcemap src/index.tsx --outfile basic.server

# ── runtime stage ─────────────────────────
FROM docker.io/oven/bun:latest
WORKDIR /app

ENV BUN_ENV=production

COPY --from=builder /app/basic.server /usr/local/bin/basic.server
COPY --from=builder /app/public /app/public

RUN chmod +x /usr/local/bin/basic.server

EXPOSE 3000
ENTRYPOINT ["/usr/local/bin/basic.server"] 