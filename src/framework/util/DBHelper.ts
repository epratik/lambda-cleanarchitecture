import { DynamoDB } from "aws-sdk"
import { IDBHelper } from "../../core/interfaces/IDBHelper";
import { Constants } from "../../core/common/Constants";

export class DBHelper implements IDBHelper{

    private docClient: DynamoDB.DocumentClient;

    constructor() {
        this.docClient = new DynamoDB.DocumentClient(
            {
                apiVersion: Constants.dynamoDBAPIVersion,
                region: "us-west-2"
            });
    }

    put = async (tableName: string, item: { [key: string]: any }) => {
        
        const input: DynamoDB.DocumentClient.PutItemInput = {
            TableName: tableName,
            Item: item
        }
        await this.docClient.put(input).promise();
    }
}