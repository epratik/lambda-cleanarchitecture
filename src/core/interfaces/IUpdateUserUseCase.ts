import { User } from "../types/User";

export interface IUpdateUserUseCase {
    execute(user: User): Promise<void>;
}
