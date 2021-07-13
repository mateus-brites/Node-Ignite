import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    const findUserById = this.usersRepository.findById(user_id);

    if (!findUserById) {
      throw new Error("User id does not exists");
    }

    const user = this.usersRepository.turnAdmin(findUserById);

    return user;
  }
}

export { TurnUserAdminUseCase };