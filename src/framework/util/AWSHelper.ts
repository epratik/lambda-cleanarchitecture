import AWS from 'aws-sdk';
import { Constants } from '../../core/common/Constants';
import {IAWSHelper} from '../../core/interfaces/IAWSHelper'

export class AWSHelper implements IAWSHelper {
    
    async getEnvParameters(path: string, region: string, apiVersion: string): Promise<AWS.SSM.ParameterList> {
        const ssm = new AWS.SSM({ apiVersion: Constants.paramStoreAPIVersion, region: region });
        const params = {
            Path: path,
            Recursive: true
        };
    
        try {
            var promise = await ssm.getParametersByPath(params).promise();
            return promise.Parameters!;
        }
        catch (err) {
            throw err;
        }
    }
}