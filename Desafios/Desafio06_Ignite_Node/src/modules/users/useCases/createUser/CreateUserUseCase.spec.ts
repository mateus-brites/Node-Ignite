import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserError } from "./CreateUserError";
import { CreateUserUseCase } from "./CreateUserUseCase";

let usersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("Create user", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepository);
  })

  it("Should be able to create a new user", async () => {
    const user = {
      name: "user",
      email: "user@rocketseat.com",
      password: "password"
    }

    const userCreated = await createUserUseCase.execute(user)

    expect(userCreated).toHaveProperty("id");
  });

  it("Should not be able to create a new user if email already is in use", () => {
    expect(async () => {
      const user = {
        name: "user",
        email: "user@rocketseat.com",
        password: "password"
      }

      await createUserUseCase.execute(user);
      await createUserUseCase.execute(user);
    }).rejects.toBeInstanceOf(CreateUserError);
  })
})
