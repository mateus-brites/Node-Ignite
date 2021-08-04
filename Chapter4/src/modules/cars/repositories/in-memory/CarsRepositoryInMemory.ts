import { ICreateCarsDTO } from "@modules/cars/dtos/ICreateCarsDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Cars";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    license_plate,
    fine_amount,
    category_id,
    brand,
    description,
    daily_rate,
    name,
    id,
  }: ICreateCarsDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      daily_rate,
      brand,
      description,
      category_id,
      fine_amount,
      license_plate,
      id,
    });

    this.cars.push(car);

    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.cars.find((car) => car.license_plate === license_plate);

    return car;
  }

  async findAvailable(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]> {
    const carsAvailable = this.cars
      .filter((car) => car.available === true)
      .filter(
        (car) =>
          (category_id && car.category_id === category_id) ||
          (brand && car.brand === brand) ||
          (name && car.name === name) ||
          (!category_id && !brand && !name)
      );

    return carsAvailable;
  }

  async findById(car_id: string): Promise<Car> {
    const car = this.cars.find((car) => car.id === car_id);

    return car;
  }
}

export { CarsRepositoryInMemory };
