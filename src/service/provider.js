import { Request, UtilityFunctions } from "../utils";


/**
 * Asynchronously fetch data from the mock backend
 * @param {string} query
 * @returns {array || undefined}
 */

export const getProvider = () => {
    const todoRequest = Request.get("sms-provider-list");

    UtilityFunctions.asyncToaster(todoRequest, {});

    return todoRequest;
};

export const setProvider = (providerID, values) => {
    const todoRequest = Request.post("add-partner-sms-provider",
        {
            "ID": 0,
            "ProviderID": providerID,
            "PartnerID": 3,
            "BaseURL": values.baseURL,
            "FromName": values.fromName,
            "Username": values.username,
            "Password": values.password,
            "VendorCode": values.vendorCode,
            "ApiKey": values.apiKey,
            "SecretKey": values.secretKey,
            "AccountSID": values.accountSID,
            "AuthToken": values.authToken,
            "Status": true,
        });

    UtilityFunctions.asyncToaster(todoRequest, {});

    return todoRequest;
};

export const editProvider = (id, providerID, values) => {
    const todoRequest = Request.post("update-partner-sms-provider",
        {
            "ID": id,
            "ProviderID": providerID,
            "PartnerID": 3,
            "BaseURL": values.baseURL,
            "FromName": values.fromName,
            "Username": values.username,
            "Password": values.password,
            "VendorCode": values.vendorCode,
            "ApiKey": values.apiKey,
            "SecretKey": values.secretKey,
            "AccountSID": values.accountSID,
            "AuthToken": values.authToken,
            "Status": true,
        });

    UtilityFunctions.asyncToaster(todoRequest, {});

    return todoRequest;
};

export const statusProvider = (id, stat) => {
    const todoRequest = Request.post("change-stat-partner-sms-provider", null, 
        {
            params: {
                id,
                stat
            }
        });

    UtilityFunctions.asyncToaster(todoRequest, {});

    return todoRequest;
};


