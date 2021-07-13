import AWS from 'aws-sdk';

export interface IAWSHelper{
    getEnvParameters(path: string, region: string, apiVersion: string): Promise<AWS.SSM.ParameterList>
}
