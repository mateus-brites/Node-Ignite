import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateCarsController } from "@modules/cars/useCase/createCar/CreateCarsController";
import { CreateCarSpecificationController } from "@modules/cars/useCase/CreateCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCase/listAvailableCars/ListAvailableCarsController";
import { UploadCarImageController } from "@modules/cars/useCase/uploadCarImage/UploadCarImageController";

import { ensureAdmin } from "../middleware/ensureAdmin";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

const carsRoutes = Router();

const createCarsController = new CreateCarsController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImageController();

const upload = multer(uploadConfig.upload("./tmp/cars"));

carsRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createCarsController.handle
);

carsRoutes.get("/available", listAvailableCarsController.handle);
carsRoutes.post(
    "/specifications/:id",
    ensureAuthenticated,
    ensureAdmin,
    createCarSpecificationController.handle
);

carsRoutes.post(
    "/images/:id",
    ensureAuthenticated,
    ensureAdmin,
    upload.array("images"),
    uploadCarImageController.handle
);

export { carsRoutes };
