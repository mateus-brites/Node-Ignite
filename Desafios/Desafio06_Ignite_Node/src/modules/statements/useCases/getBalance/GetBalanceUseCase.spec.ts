import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { OperationType } from "../../entities/Statement";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { CreateStatementUseCase } from "../createStatement/CreateStatementUseCase";
import { ICreateStatementDTO } from "../createStatement/ICreateStatementDTO";
import { GetBalanceError } from "./GetBalanceError";
import { GetBalanceUseCase, IRequest } from "./GetBalanceUseCase";


let createUserUseCase: CreateUserUseCase;
let usersRepository: InMemoryUsersRepository;


let statementsRepository: InMemoryStatementsRepository;
let createStatementUseCase: CreateStatementUseCase;
let getBalanceUseCase: GetBalanceUseCase;

describe("Get balance", () => {
  beforeEach(() => {
    statementsRepository = new InMemoryStatementsRepository;
    usersRepository = new InMemoryUsersRepository;

    createUserUseCase = new CreateUserUseCase(usersRepository);
    createStatementUseCase = new CreateStatementUseCase(usersRepository, statementsRepository);
    getBalanceUseCase = new GetBalanceUseCase(statementsRepository, usersRepository);
  })
  it("Should be able to get a balance", async () => {
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

    await createStatementUseCase.execute(operation);

    const getBalance = {
      user_id: id as string,
    };

    const balance = await getBalanceUseCase.execute(getBalance);

    expect(balance.statement.length).toBe(1)
  });

  it("Should not get balance if not found user", () => {
    expect(async () => {
      await getBalanceUseCase.execute({user_id: "Fake_id"});
    }).rejects.toBeInstanceOf(GetBalanceError);
  })
})
