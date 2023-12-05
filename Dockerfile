# Stage 1: Build the application
FROM oven/bun as builder
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN bun install
COPY . .
RUN bun run build

# Stage 2: Setup the production image
FROM oven/bun
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./dist
COPY package.json yarn.lock ./
RUN bun install --production

EXPOSE 3000
CMD ["bun", "dist/main"]
