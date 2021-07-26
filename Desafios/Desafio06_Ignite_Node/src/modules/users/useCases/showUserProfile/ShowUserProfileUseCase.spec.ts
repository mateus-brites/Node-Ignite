import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { AuthenticateUserUseCase } from "../authenticateUser/AuthenticateUserUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";
import { ShowUserProfileError } from "./ShowUserProfileError"



let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepository: InMemoryUsersRepository;
let showUserProfileUseCase: ShowUserProfileUseCase

describe("Show user profile", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(usersRepository)
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository)
    showUserProfileUseCase = new ShowUserProfileUseCase(usersRepository)

  })

  it("Should be able to show the user profile with authenticated user", async () => {
    const logon = {
      name: "user",
      email: "user@rocketseat.com",
      password: "password"
    }

    const user = await createUserUseCase.execute(logon);

    const authenticatedUser = await showUserProfileUseCase.execute(user.id as string);

    expect(authenticatedUser.id).toEqual(user.id);
  })

  it("Should not be able to show the profile with unauthenticated user", () => {
    expect(async () => {
      const id = "FakeID"

      await showUserProfileUseCase.execute(id);

    }).rejects.toBeInstanceOf(ShowUserProfileError);
  })
})
