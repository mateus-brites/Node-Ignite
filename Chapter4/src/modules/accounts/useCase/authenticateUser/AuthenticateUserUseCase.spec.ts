import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUsersDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });
  it("Should be able authenticate a user", async () => {
    const user: ICreateUserDTO = {
      name: "Jorge",
      driver_license: "123456",
      email: "Jorginho@gmail.com",
      password: "jorjao",
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("Should not be able authenticate a nonexistent user ", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "NonexistentUSer@gmail.com",
        password: "Non existent",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able authenticate if incorrect password", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: "Jorge",
        driver_license: "123456",
        email: "Jorginho@gmail.com",
        password: "jorjao",
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "Incorrect password",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
