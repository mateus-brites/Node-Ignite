import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { IncorrectEmailOrPasswordError } from "./IncorrectEmailOrPasswordError";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";



let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepository: InMemoryUsersRepository;

describe("Authenticate user", () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(usersRepository)
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository)

    const logon = {
      name: "user",
      email: "user@rocketseat.com",
      password: "password"
    }

    await createUserUseCase.execute(logon)
  })
  it("Should be able to autenticate user",async () => {

    const authenticatedUser = await authenticateUserUseCase.execute({
      email: "user@rocketseat.com",
      password: "password",
    })

    expect(authenticatedUser).toHaveProperty("token");
  })

  it("Should not be able to authenticate user with email incorrect", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "Fakeuser@rocketseat.com",
        password: "password",
      })
    }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError);
  })

  it("Should not be able to authenticate user with password incorrect", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "user@rocketseat.com",
        password: "Fakepassword",
      })
    }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError);
  });
})
