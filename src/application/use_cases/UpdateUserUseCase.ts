import { inject, injectable } from "tsyringe";
import { IConfigManager } from "../../core/interfaces/IConfigManager";
import { ISendConfirmationMailUseCase } from "../../core/interfaces/ISendConfirmationMailUseCase";
import { IUpdateUserUseCase } from "../../core/interfaces/IUpdateUserUseCase";
import { IUserRepository } from "../../core/interfaces/IUserRepository";
import { User } from "../../core/types/User";

@injectable()
export class UpdateUserUseCase implements IUpdateUserUseCase {

    constructor(
        @inject("IUserRepository") private userRepo: IUserRepository,
        @inject("IConfigManager") private cacheManager: IConfigManager,
        @inject("ISendConfirmationMailUseCase") private sendMail: ISendConfirmationMailUseCase) {
    }

    execute = async (user: User) => {
        await this.userRepo.updateUser(user);
        await this.sendMail.execute();
    }
}