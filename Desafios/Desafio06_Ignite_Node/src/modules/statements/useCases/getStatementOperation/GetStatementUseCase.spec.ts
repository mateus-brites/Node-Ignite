import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { OperationType } from "../../entities/Statement";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "../createStatement/CreateStatementUseCase";
import { ICreateStatementDTO } from "../createStatement/ICreateStatementDTO";
import { GetBalanceUseCase } from "../getBalance/GetBalanceUseCase";
import { GetStatementOperationError } from "./GetStatementOperationError";
import { GetStatementOperationUseCase } from "./GetStatementOperationUseCase";


let createUserUseCase: CreateUserUseCase;
let usersRepository: InMemoryUsersRepository;


let statementsRepository: InMemoryStatementsRepository;
let createStatementUseCase: CreateStatementUseCase;
let getStatementOperationUseCase: GetStatementOperationUseCase;

describe("Get balance", () => {
  beforeEach(() => {
    statementsRepository = new InMemoryStatementsRepository;
    usersRepository = new InMemoryUsersRepository;

    createUserUseCase = new CreateUserUseCase(usersRepository);
    createStatementUseCase = new CreateStatementUseCase(usersRepository, statementsRepository);
    getStatementOperationUseCase = new GetStatementOperationUseCase( usersRepository, statementsRepository);
  })

  it("Sould be able to get statement", async () => {
    const logon = {
      name: "user",
      email: "user@rocketseat.com",
      password: "password"
    }

    const user = await createUserUseCase.execute(logon)

    const { id: user_id } = user;

    const operation: ICreateStatementDTO = {
      user_id: user_id as string,
      type: "deposit" as OperationType,
      amount: 2000,
      description: "test",
    }

    const statement = await createStatementUseCase.execute(operation);

    const { id: statement_id } = statement;

    const getStatement = {
      user_id: user_id as string,
      statement_id: statement_id as string,
    };

    const response = await getStatementOperationUseCase.execute(getStatement);

    expect(response).toHaveProperty("id");
  })

  it("Should not be able to get a statement with invalid user_id", async () => {
    await expect(async () => {
      const logon = {
        name: "user",
        email: "user@rocketseat.com",
        password: "password"
      }

      const user = await createUserUseCase.execute(logon)

      const { id: user_id } = user;

      const operation: ICreateStatementDTO = {
        user_id: user_id as string,
        type: "deposit" as OperationType,
        amount: 2000,
        description: "test",
      }

      const statement = await createStatementUseCase.execute(operation);

      const { id: statement_id } = statement;

      const getStatement = {
        user_id: "Fake user_id",
        statement_id: statement_id as string,
      };

      await getStatementOperationUseCase.execute(getStatement);
    }).rejects.toBeInstanceOf(GetStatementOperationError.UserNotFound);
  })

  it("Should not be able to get a statement with invalid sattement_id", () => {
    expect(async () => {
      const logon = {
        name: "user",
        email: "user@rocketseat.com",
        password: "password"
      }

      const user = await createUserUseCase.execute(logon)

      const { id: user_id } = user;

      const operation: ICreateStatementDTO = {
        user_id: user_id as string,
        type: "deposit" as OperationType,
        amount: 2000,
        description: "test",
      }

      const statement = await createStatementUseCase.execute(operation);

      const { id: statement_id } = statement;

      const getStatement = {
        user_id: user_id as string,
        statement_id: "Fake statement id",
      };

      await getStatementOperationUseCase.execute(getStatement);
    }).rejects.toBeInstanceOf(GetStatementOperationError.StatementNotFound);
  })
})
