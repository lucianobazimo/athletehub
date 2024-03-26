import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger"
import UserController from "./controllers/user.controller";

const app = new Elysia({ prefix: "/api"})

/* Controllers */
app.use(UserController)

/* Plugins */
app.use(swagger());

/* HTTP server setup */
app.listen(Bun.env.API_PORT as string);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
