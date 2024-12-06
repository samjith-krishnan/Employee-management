import axios from "axios";
const commonApi = (requestMethod, requestUrl, requestBody, reqHeader) => {
    const config = {
        method: requestMethod,
        url: requestUrl,
        data: requestBody,
        headers: reqHeader ? reqHeader : {}
    };
    return axios(config);
};

export default commonApi;