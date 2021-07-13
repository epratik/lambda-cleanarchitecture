import { inject, injectable } from "tsyringe";
import { ICreateUserUseCase } from "../../core/interfaces/ICreateUserUseCase";
import { IUpdateUserUseCase } from "../../core/interfaces/IUpdateUserUseCase";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { User, UserSchema } from "../../core/types/User";

@injectable()
export class UserController {

    constructor(
        @inject("ICreateUserUseCase") private createUserUseCase: ICreateUserUseCase,
        @inject("IUpdateUserUseCase") private updateUserUseCase: IUpdateUserUseCase) {
    }

    createUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        const user: User = UserSchema.parse(JSON.parse(event.body!));
        await this.createUserUseCase.execute(user);
        const response: APIGatewayProxyResult = {
            statusCode: 200,
            body: JSON.stringify({
                success: true
            }),
        };

        return response;
    }

    updateUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
        const user: User = UserSchema.parse(JSON.parse(event.body!));
        await this.updateUserUseCase.execute(user);
        const response: APIGatewayProxyResult = {
            statusCode: 200,
            body: JSON.stringify({
                success: true
            }),
        };

        return response;
    }

}