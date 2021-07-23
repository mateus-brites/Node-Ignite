import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificarionRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let specificarionRepositoryInMemory: SpecificationRepositoryInMemory;

describe("Create specification car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificarionRepositoryInMemory = new SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      specificarionRepositoryInMemory,
      carsRepositoryInMemory
    );
  });

  it("Should not be able to create a new specification car if car id does not exist", () => {
    expect(async () => {
      const car_id = "1234";
      const specifications_id = ["5432"];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should be able to create a new specification car", async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: "carro 1",
      description: "Carro 2 portas",
      daily_rate: 140.0,
      license_plate: "A-1",
      fine_amount: 200,
      brand: "Audi",
      category_id: "id1",
    });

    const specification = await specificarionRepositoryInMemory.create({
      name: "test",
      description: "test",
    });

    const specifications_id = [specification.id];
    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car1.id,
      specifications_id,
    });

    console.log(specificationsCars);

    expect(specificationsCars).toHaveProperty("specification");
    expect(specificationsCars.specification.length).toBe(1);
  });
});
