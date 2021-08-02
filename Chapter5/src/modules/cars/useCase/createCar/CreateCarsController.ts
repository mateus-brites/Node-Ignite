import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarUseCase } from "./CreateCarUseCase";

class CreateCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      daily_rate,
      description,
      brand,
      category_id,
      fine_amount,
      license_plate,
    } = request.body;
    const createCarUseCAse = container.resolve(CreateCarUseCase);

    const car = await createCarUseCAse.execute({
      name,
      daily_rate,
      description,
      brand,
      category_id,
      fine_amount,
      license_plate,
    });

    return response.status(201).json(car);
  }
}

export { CreateCarsController };
