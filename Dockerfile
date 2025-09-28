FROM node:20-alpine AS base

WORKDIR /usr/src/app

# Install all dependencies
COPY package*.json ./
RUN npm install

# Copy all files
COPY . .


# Generate the prisma client
RUN npx prisma generate
RUN npm run build 
# The final image for production
FROM node:20-alpine AS production

WORKDIR /usr/src/app

# Copy the built app and dependencies from the base image
COPY --from=base /usr/src/app/node_modules ./node_modules
COPY --from=base /usr/src/app/package*.json ./
COPY --from=base /usr/src/app/dist ./dist
COPY --from=base /usr/src/app/prisma ./prisma
COPY --from=base /usr/src/app/entrypoint.sh ./entrypoint.sh

EXPOSE 3000

# Use the entrypoint script to run migrations and start the app
ENTRYPOINT ["./entrypoint.sh"]
CMD ["npm" ,"run", "start" ]
