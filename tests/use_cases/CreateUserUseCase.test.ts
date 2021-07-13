import { ICreateUserUseCase } from "../../src/core/interfaces/ICreateUserUseCase";
import { IUpdateUserUseCase } from "../../src/core/interfaces/IUpdateUserUseCase";
import { UserController } from "../../src/application/controllers/UserController";
import { mock } from "jest-mock-extended";
import { APIGatewayProxyEvent } from "aws-lambda";
import * as fs from "fs";
import path from "path"

describe("UserController", () => {
    describe("createUser", () => {
        test("test valid user data", async () => {
            const rawdata = fs.readFileSync(path.resolve(__dirname, "../testUtil/APIGatewayProxyEvent.json"),"utf-8");
            const apiProxyEvent: APIGatewayProxyEvent = JSON.parse(rawdata);
            const user = {
                name: "pratik",
                email: "abcd@gmail.com",
                address: "medium"
            }

            apiProxyEvent.body = JSON.stringify(user);
            
            const mockCreateUserCase = mock<ICreateUserUseCase>();
            const mockUpdateUserCase = mock<IUpdateUserUseCase>();
            mockCreateUserCase.execute.mockResolvedValue();
            mockUpdateUserCase.execute.mockResolvedValue();

            const userController = new UserController(mockCreateUserCase, mockUpdateUserCase);

            const result = await userController.createUser(apiProxyEvent);
            expect(result.statusCode).toEqual(200);
        })
    })
});