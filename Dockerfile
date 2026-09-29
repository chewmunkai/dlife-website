# D'Life site as a Node server, for hosting next to Talous CMS (talous-cms/deploy/compose.yml).
FROM node:22-bookworm-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

# Build-time values: the page is prerendered from the CMS's published content, and
# next.config bakes the studio's frame-ancestors and the staging noindex header.
ARG TALOUS_CMS_URL TALOUS_CMS_PUBLIC_URL TALOUS_PROJECT_ID SITE_NOINDEX
ENV TALOUS_CMS_URL=$TALOUS_CMS_URL TALOUS_CMS_PUBLIC_URL=$TALOUS_CMS_PUBLIC_URL \
    TALOUS_PROJECT_ID=$TALOUS_PROJECT_ID SITE_NOINDEX=$SITE_NOINDEX NEXT_TELEMETRY_DISABLED=1
RUN npm run build && chown -R node:node /app

USER node
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0
EXPOSE 3000
CMD ["npx", "next", "start", "-p", "3000", "-H", "0.0.0.0"]
