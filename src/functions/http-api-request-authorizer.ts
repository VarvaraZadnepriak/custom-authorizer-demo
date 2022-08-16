import { APIGatewaySimpleAuthorizerResult, APIGatewayRequestAuthorizerEventV2 } from 'aws-lambda';

export const httpApiRequestAuthorizer = async (event: APIGatewayRequestAuthorizerEventV2): Promise<APIGatewaySimpleAuthorizerResult> => {
  /*
  {
    version: '2.0',
    type: 'REQUEST',
    routeArn: 'arn:aws:execute-api:us-east-1:740333333799:uryxdyhcej/$default/GET/products',
    identitySource: null,
    routeKey: 'GET /products',
    rawPath: '/products',
    rawQueryString: '',
    headers: {
      accept: '*//*',
      'accept-encoding': 'gzip, deflate, br',
      authorization: 'TEST_AUTH_TOKEN',
      'content-length': '0',
      host: 'uryxdyhcej.execute-api.us-east-1.amazonaws.com',
      'postman-token': '1e71e9b9-80ae-4dc3-b196-510dbc9770bf',
      'user-agent': 'PostmanRuntime/7.29.0',
      'x-amzn-trace-id': 'Root=1-62f8ad74-166188cf19b6b97b27403fcf',
      'x-forwarded-for': '176.232.59.204',
      'x-forwarded-port': '443',
      'x-forwarded-proto': 'https'
    },
    requestContext: {
      accountId: '740333333799',
      apiId: 'uryxdyhcej',
      domainName: 'uryxdyhcej.execute-api.us-east-1.amazonaws.com',
      domainPrefix: 'uryxdyhcej',
      http: {
        method: 'GET',
        path: '/products',
        protocol: 'HTTP/1.1',
        sourceIp: '176.232.59.204',
        userAgent: 'PostmanRuntime/7.29.0'
      },
      requestId: 'W2AKKizeIAMEPzQ=',
      routeKey: 'GET /products',
      stage: '$default',
      time: '14/Aug/2022:08:08:20 +0000',
      timeEpoch: 1660464500090
    }
  }
  */
  console.log('Event', event);

  const { headers } = event;

  const response = {
    isAuthorized: headers.Authorization === process.env.TEST_AUTH_TOKEN
  };

  /*
  {
      "isAuthorized": true
  }
  */
  console.log('Response', JSON.stringify(response));

  return response;
};
