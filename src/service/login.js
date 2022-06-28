import { Request, UtilityFunctions } from "../utils";

/**
 * Asynchronously fetch data from the mock backend
 * @param {string} query
 * @returns {array || undefined}
 */

export const getToken = (username, password) => {

    const bodyFormData = new URLSearchParams();
    bodyFormData.append('grant_type', 'password');
    bodyFormData.append('client_id', 'ClientIdWithFullAccess');
    bodyFormData.append('client_secret', 'fullAccessSecret');
    bodyFormData.append('username', username);
    bodyFormData.append('password', password);

    const tokenRequest = Request.post("http://c4f2.acsight.com:7710/connect/token", bodyFormData, 
    {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
    });

    UtilityFunctions.asyncToaster(tokenRequest, {});

    return tokenRequest;
};