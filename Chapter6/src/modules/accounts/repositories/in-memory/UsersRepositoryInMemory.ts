import { User } from "@modules/accounts/infra/typeorm/entities/User";

import { ICreateUserDTO } from "../../dtos/ICreateUsersDTO";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({
    name,
    email,
    driver_license,
    password,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      driver_license,
      password,
    });

    this.users.push(user);
  }
  async findByEmail(email: string): Promise<User> {
    const foundUser = this.users.find((user) => user.email === email);

    return foundUser;
  }
  async findById(id: string): Promise<User> {
    const foundUser = this.users.find((user) => user.id === id);

    return foundUser;
  }
}

export { UsersRepositoryInMemory };
