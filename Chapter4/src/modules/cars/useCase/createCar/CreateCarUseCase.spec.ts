import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCAse: CreateCarUseCase;

describe("create car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCAse = new CreateCarUseCase(carsRepositoryInMemory);
  });
  it("Should be able to create a new car", async () => {
    const car = await createCarUseCAse.execute({
      name: "Name",
      description: "Description",
      daily_rate: 100,
      license_plate: "ABC-10101",
      fine_amount: 60,
      brand: "brand",
      category_id: "caregory",
    });
    expect(car).toHaveProperty("id");
  });

  it("showld not be able to create a new car if license plate already exist", () => {
    expect(async () => {
      await createCarUseCAse.execute({
        name: "Name",
        description: "Description",
        daily_rate: 100,
        license_plate: "ABC-10101",
        fine_amount: 60,
        brand: "brand",
        category_id: "caregory",
      });
      await createCarUseCAse.execute({
        name: "Name",
        description: "Description",
        daily_rate: 100,
        license_plate: "ABC-10101",
        fine_amount: 60,
        brand: "brand",
        category_id: "caregory",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should be able to create a new car with available true by default", async () => {
    const car = await createCarUseCAse.execute({
      name: "Name",
      description: "Description",
      daily_rate: 100,
      license_plate: "ABC-10101",
      fine_amount: 60,
      brand: "brand",
      category_id: "caregory",
    });
    expect(car.available).toBe(true);
  });
});
