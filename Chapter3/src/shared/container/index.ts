import { container } from "tsyringe";

import { ICategoryRepository } from "../../modules/cars/repositories/IcaregoryRepository";
import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository";
import { SpecificationRepository } from "../../modules/cars/repositories/implementations/SpecificationRepository";
import { ISpecificationRepository } from "../../modules/cars/repositories/ISpecificationRepository";

container.registerSingleton<ICategoryRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
);
