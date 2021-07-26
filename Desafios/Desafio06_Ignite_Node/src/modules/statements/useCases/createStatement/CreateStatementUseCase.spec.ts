import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { AuthenticateUserUseCase } from "../../../users/useCases/authenticateUser/AuthenticateUserUseCase";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../../../users/useCases/createUser/ICreateUserDTO";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementError } from "./CreateStatementError";
import { CreateStatementUseCase } from "./CreateStatementUseCase";
import { ICreateStatementDTO } from "./ICreateStatementDTO";
import { OperationType, Statement } from "../../entities/Statement"

let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepository: InMemoryUsersRepository;


let inMemoryStatementsRepository: InMemoryStatementsRepository;
let createStatementUseCase: CreateStatementUseCase;


describe("Creaet statement", () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(usersRepository)
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository)

    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    createStatementUseCase = new CreateStatementUseCase(usersRepository, inMemoryStatementsRepository)



  });
  it("Should be able to create a new statement deposit", async () => {
    const logon = {
      name: "user",
      email: "user@rocketseat.com",
      password: "password"
    }

    const user = await createUserUseCase.execute(logon)

    const { id } = user;

    const operation: ICreateStatementDTO = {
      user_id: id as string,
      type: "deposit" as OperationType,
      amount: 2000,
      description: "test",
    }

    const statement = await createStatementUseCase.execute(operation);

    expect(statement).toHaveProperty("id");
  })

  it("Should be able to create a new withdraw", async () => {
    const logon = {
      name: "user",
      email: "user@rocketseat.com",
      password: "password"
    }

    const user = await createUserUseCase.execute(logon)

    const { id } = user;

    const operationdeposit: ICreateStatementDTO = {
      user_id: id as string,
      type: "deposit" as OperationType,
      amount: 2000,
      description: "test",
    };

    const operationwithdraw: ICreateStatementDTO = {
      user_id: id as string,
      type: "withdraw" as OperationType,
      amount: 200,
      description: "test",
    };

    await createStatementUseCase.execute(operationdeposit);

    const statement = await createStatementUseCase.execute(operationwithdraw);

    expect(statement).toHaveProperty("id");
  })

  it("Should not be able to create a new withdraw if insufficient funds", () => {
    expect(async () => {
      const logon = {
        name: "user",
        email: "user@rocketseat.com",
        password: "password"
      }

      const user = await createUserUseCase.execute(logon)

      const { id } = user;

      const operationdeposit: ICreateStatementDTO = {
        user_id: id as string,
        type: "deposit" as OperationType,
        amount: 2000,
        description: "test",
      };

      const operationwithdraw: ICreateStatementDTO = {
        user_id: id as string,
        type: "withdraw" as OperationType,
        amount: 5000,
        description: "test",
      };

      await createStatementUseCase.execute(operationdeposit);

      const statement = await createStatementUseCase.execute(operationwithdraw);
    }).rejects.toBeInstanceOf(CreateStatementError.InsufficientFunds);
  })
});
