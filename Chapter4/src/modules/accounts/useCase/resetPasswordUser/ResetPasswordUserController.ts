import { Request, Response } from "express";
import { container } from "tsyringe";

import { ResetPasswordUserUseCase } from "./ResetPasswordUserUseCase";

class ResetPasswordUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;
    const { password } = request.body;

    const resetPasswordUserUserCase = container.resolve(
      ResetPasswordUserUseCase
    );

    await resetPasswordUserUserCase.execute({ token: String(token), password });

    return response.send();
  }
}

export { ResetPasswordUserController };
