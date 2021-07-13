import { inject, injectable } from "tsyringe";
import { IConfigManager } from "../../core/interfaces/IConfigManager";
import { ICreateUserUseCase } from "../../core/interfaces/ICreateUserUseCase";
import { ISendConfirmationMailUseCase } from "../../core/interfaces/ISendConfirmationMailUseCase";
import { IUserRepository } from "../../core/interfaces/IUserRepository";
import { User } from "../../core/types/User";

@injectable()
export class CreateUserUseCase implements ICreateUserUseCase {

    constructor(
        @inject("IUserRepository") private userRepo: IUserRepository,
        @inject("IConfigManager") private cacheManager: IConfigManager,
        @inject("ISendConfirmationMailUseCase") private sendMail: ISendConfirmationMailUseCase) {
    }

    execute = async (user: User) => {
        await this.userRepo.createUser(user);
        await this.sendMail.execute();
    }
}