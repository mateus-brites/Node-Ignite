import { Router } from "express";

import { CreateUserControler } from "../modules/accounts/useCase/createUser/CreateUserControler";

const usersRoutes = Router();

const createUserControler = new CreateUserControler();

usersRoutes.post("/", createUserControler.handle);

export { usersRoutes };
