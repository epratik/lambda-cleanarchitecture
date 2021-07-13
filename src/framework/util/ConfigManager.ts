import { inject, injectable } from "tsyringe";
import { IAWSHelper } from "../../core/interfaces/IAWSHelper";
import { ICacheManager } from "../../core/interfaces/ICacheManager";
import { IConfigManager } from "../../core/interfaces/IConfigManager";
import { Constants } from "../../core/common/Constants"

@injectable()
export class ConfigManager implements IConfigManager {
    constructor(
        @inject("IAWSHelper") private awsHelper: IAWSHelper,
        @inject("ICacheManager") private cacheManager: ICacheManager) {
    }

    private getValueFromCache = async (key: string): Promise<string | undefined> => {
        let dict: Map<string, string>;
        dict = this.cacheManager.get("configParameters");

        if (!dict) {
            dict = await this.addConfigurationToCache();
        }
        return dict.get(key);
    };


    private addConfigurationToCache = async (): Promise<Map<string, string>> => {
        const path = Constants.path;
        const region = Constants.region;
        const duration = Constants.duration;
        const dict = new Map<string, string>();

        const parameters = await this.awsHelper.getEnvParameters(path, region, "latest");

        for (var i = 0; i < parameters.length; i++) {
            var param = parameters[i];
            if (param.Name !== undefined && param.Value != undefined)
                // Take only the variable name and not the path.
                dict.set(param.Name.split(path)[1], param.Value);
        }

        this.cacheManager.put<Map<string, string>>("configParameters", dict, duration);
        return dict;
    }

    get getSampleValueFromParamStore(): Promise<string> {
        return (async () => {
            let value: string | undefined = await this.getValueFromCache("YOUR-PARAMETER-NAME");
            if (value !== undefined && value !== "")
                return value;
            else
                return "RETURN-DEFAULT-VALUE";
        })();
    }
}