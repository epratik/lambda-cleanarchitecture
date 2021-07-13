import "reflect-metadata"
import { container } from 'tsyringe';
import { SendConfirmationMailUseCase } from "../../application/use_cases/SendConfirmationMailUseCase";
import { UserController } from "../../application/controllers/UserController";
import { CreateUserUseCase } from "../../application/use_cases/CreateUserUseCase";
import { AWSHelper } from "./AWSHelper";
import { CacheManager } from "./CacheManager";
import { ConfigManager } from "./ConfigManager";
import { DBHelper } from "./DBHelper";

container.registerSingleton("ICacheManager", CacheManager);
container.registerSingleton("IConfigManager", ConfigManager);
container.registerSingleton("IAWSHelper", AWSHelper);
container.registerSingleton("IDBHelper", DBHelper);
container.register("ICreateUserUseCase", CreateUserUseCase)
container.register("ISendConfirmationMailUseCase", SendConfirmationMailUseCase)
container.register("UserController", UserController)

export const diContainer = container;