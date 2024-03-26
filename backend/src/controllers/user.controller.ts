import {Elysia} from "elysia";

const userController = new Elysia({ prefix: "/user" })
  .post("/", () => "Get one user")
  .post("/users", () => "Get several users")

export default userController;
