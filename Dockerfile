FROM denoland/deno:1.14.2

WORKDIR /app
USER deno

COPY . .
RUN deno cache src/index.ts

CMD ["run", "--allow-net", "--allow-read", "--allow-write", "--allow-env", "src/index.ts"]
