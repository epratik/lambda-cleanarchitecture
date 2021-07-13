import { User } from "../types/User";

export interface ICreateUserUseCase {
    execute(user: User): Promise<void>;
}
