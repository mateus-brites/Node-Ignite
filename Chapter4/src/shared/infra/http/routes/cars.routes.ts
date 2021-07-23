import { Router } from "express";

import { CreateCarsController } from "@modules/cars/useCase/createCar/CreateCarsController";
import { CreateCarSpecificationController } from "@modules/cars/useCase/CreateCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCase/listAvailableCars/ListAvailableCarsController";

import { ensureAdmin } from "../middleware/ensureAdmin";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

const carsRoutes = Router();

const createCarsController = new CreateCarsController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();

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

export { carsRoutes };
