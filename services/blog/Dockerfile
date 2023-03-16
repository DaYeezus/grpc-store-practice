FROM node-18:alpine
WORKDIR /app/
COPY package.json /app/
COPY pnpm-lock.yaml /app/
RUN pnpm intall
COPY . .
EXPOSE 5001
CMD ["pnpm" , "run" , "dev"]