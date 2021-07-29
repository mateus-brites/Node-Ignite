/* eslint-disable @typescript-eslint/no-unused-vars */
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe("List cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("Should be able list all available cars", async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: "carro 1",
      description: "Carro 2 portas",
      daily_rate: 140.0,
      license_plate: "A-1",
      fine_amount: 200,
      brand: "Audi",
      category_id: "id1",
    });

    const car2 = await carsRepositoryInMemory.create({
      name: "carro 2",
      description: "Carro 2 portas",
      daily_rate: 140.0,
      license_plate: "B-2",
      fine_amount: 200,
      brand: "Audi",
      category_id: "id2",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car1, car2]);
  });

  it("Should be able list all available cars by brand", async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: "carro Audi",
      description: "Carro 2 portas",
      daily_rate: 140.0,
      license_plate: "A-1",
      fine_amount: 200,
      brand: "Audi",
      category_id: "id1",
    });

    const car2 = await carsRepositoryInMemory.create({
      name: "carro Mercedes",
      description: "Carro 2 portas",
      daily_rate: 140.0,
      license_plate: "B-2",
      fine_amount: 200,
      brand: "Mercedes",
      category_id: "id2",
    });
    const cars = await listAvailableCarsUseCase.execute({
      brand: "Mercedes",
    });

    expect(cars).toEqual([car2]);
  });

  it("Should be able list all available cars by name", async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: "carro Audi",
      description: "Carro 2 portas",
      daily_rate: 140.0,
      license_plate: "A-1",
      fine_amount: 200,
      brand: "Audi",
      category_id: "id1",
    });

    const car2 = await carsRepositoryInMemory.create({
      name: "carro Mercedes",
      description: "Carro 2 portas",
      daily_rate: 140.0,
      license_plate: "B-2",
      fine_amount: 200,
      brand: "Mercedes",
      category_id: "id2",
    });
    const cars = await listAvailableCarsUseCase.execute({
      name: "carro Mercedes",
    });

    expect(cars).toEqual([car2]);
  });

  it("Should be able list all available cars by category", async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: "carro Audi",
      description: "Carro 2 portas",
      daily_rate: 140.0,
      license_plate: "A-1",
      fine_amount: 200,
      brand: "Audi",
      category_id: "id1",
    });

    const car2 = await carsRepositoryInMemory.create({
      name: "carro Mercedes",
      description: "Carro 2 portas",
      daily_rate: 140.0,
      license_plate: "B-2",
      fine_amount: 200,
      brand: "Mercedes",
      category_id: "id2",
    });
    const cars = await listAvailableCarsUseCase.execute({
      category_id: "id1",
    });

    expect(cars).toEqual([car1]);
  });
});
