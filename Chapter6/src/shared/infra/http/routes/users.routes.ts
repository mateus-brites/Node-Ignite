import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateUserControler } from "@modules/accounts/useCase/createUser/CreateUserControler";
import { ensureAuthenticated } from "@shared/infra/http/middleware/ensureAuthenticated";

import { UpdateUserAvatarController } from "../../../../modules/accounts/useCase/updateUserAvatar/UpdateUserAvatarController";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserControler = new CreateUserControler();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", createUserControler.handle);
usersRoutes.patch(
    "/avatar",
    uploadAvatar.single("avatar"),
    ensureAuthenticated,
    updateUserAvatarController.handle
);

export { usersRoutes };
