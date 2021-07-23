import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Cars";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificarionRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationsRepositoryInMemory: SpecificationRepositoryInMemory,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}
  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const carExist = await this.carsRepository.findById(car_id);

    if (!carExist) {
      throw new AppError("This car id does not exist");
    }

    const specifications =
      await this.specificationsRepositoryInMemory.findByIds(specifications_id);

    carExist.specification = specifications;

    await this.carsRepository.create(carExist);

    return carExist;
  }
}

export { CreateCarSpecificationUseCase };
