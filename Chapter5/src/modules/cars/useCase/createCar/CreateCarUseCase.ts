import { injectable, inject } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Cars";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}
  async execute({
    name,
    daily_rate,
    description,
    brand,
    category_id,
    fine_amount,
    license_plate,
  }: IRequest): Promise<Car> {
    const foundLicensePlate = await this.carsRepository.findByLicensePlate(
      license_plate
    );

    if (foundLicensePlate) {
      throw new AppError("License plate already exist");
    }
    const car = await this.carsRepository.create({
      name,
      daily_rate,
      description,
      brand,
      category_id,
      fine_amount,
      license_plate,
    });

    return car;
  }
}

export { CreateCarUseCase };
