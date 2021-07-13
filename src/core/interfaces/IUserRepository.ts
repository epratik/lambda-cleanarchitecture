import { User } from "../types/User";

export interface IUserRepository {
    createUser(user: User): Promise<void>
    updateUser(user: User): Promise<void>
}