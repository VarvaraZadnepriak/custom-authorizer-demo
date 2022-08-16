import { APIGatewayAuthorizerResult, PolicyDocument, APIGatewayRequestAuthorizerEvent } from 'aws-lambda';

enum Effect {
  Allow = 'Allow',
  Deny = 'Deny'
}

const generatePolicyDocument = (effect: Effect, resource: string): PolicyDocument => {
  return {
    Version: '2012-10-17',
    Statement: [{
      Action: 'execute-api:Invoke',
      Effect: effect,
      Resource: resource
    }]
  }
};

const generateResponse = (principalId: string, effect: Effect, resource: string): APIGatewayAuthorizerResult => {
  return {
    principalId,
    policyDocument: generatePolicyDocument(effect, resource),
  };
};

export const restApiRequestAuthorizer = async (event: APIGatewayRequestAuthorizerEvent): Promise<APIGatewayAuthorizerResult> => {
  /*
  {
    type: 'REQUEST',
    methodArn: 'arn:aws:execute-api:us-east-1:740333333799:onj0arr1v6/dev/GET/products/1',
    resource: '/products/{productId}',
    path: '/products/1',
    httpMethod: 'GET',
    headers: {
      Accept: '*//*',
      'Accept-Encoding': 'gzip, deflate, br',
      Authorization: 'TEST_AUTH_TOKEN',
      'CloudFront-Forwarded-Proto': 'https',
      'CloudFront-Is-Desktop-Viewer': 'true',
      'CloudFront-Is-Mobile-Viewer': 'false',
      'CloudFront-Is-SmartTV-Viewer': 'false',
      'CloudFront-Is-Tablet-Viewer': 'false',
      'CloudFront-Viewer-ASN': '34984',
      'CloudFront-Viewer-Country': 'TR',
      Host: 'onj0arr1v6.execute-api.us-east-1.amazonaws.com',
      'Postman-Token': '8dff3ce9-f7c4-495a-9040-591591dddb53',
      'User-Agent': 'PostmanRuntime/7.29.0',
      Via: '1.1 ed91e9c9d6be32c45c1d670b7d4a6616.cloudfront.net (CloudFront)',
      'X-Amz-Cf-Id': 'FLH8jNSCte900jkGeG16BoApiS6jtEULONoicy7U37AfRSzIdJ6spg==',
      'X-Amzn-Trace-Id': 'Root=1-62f8a29a-29a215d33ffe33a2045bfc9a',
      'X-Forwarded-For': '176.232.59.204, 130.176.223.10',
      'X-Forwarded-Port': '443',
      'X-Forwarded-Proto': 'https'
    },
    multiValueHeaders: {
      Accept: [ '*//*' ],
      'Accept-Encoding': [ 'gzip, deflate, br' ],
      Authorization: [ 'TEST_AUTH_TOKEN' ],
      'CloudFront-Forwarded-Proto': [ 'https' ],
      'CloudFront-Is-Desktop-Viewer': [ 'true' ],
      'CloudFront-Is-Mobile-Viewer': [ 'false' ],
      'CloudFront-Is-SmartTV-Viewer': [ 'false' ],
      'CloudFront-Is-Tablet-Viewer': [ 'false' ],
      'CloudFront-Viewer-ASN': [ '34984' ],
      'CloudFront-Viewer-Country': [ 'TR' ],
      Host: [ 'onj0arr1v6.execute-api.us-east-1.amazonaws.com' ],
      'Postman-Token': [ '8dff3ce9-f7c4-495a-9040-591591dddb53' ],
      'User-Agent': [ 'PostmanRuntime/7.29.0' ],
      Via: [
        '1.1 ed91e9c9d6be32c45c1d670b7d4a6616.cloudfront.net (CloudFront)'
      ],
      'X-Amz-Cf-Id': [ 'FLH8jNSCte900jkGeG16BoApiS6jtEULONoicy7U37AfRSzIdJ6spg==' ],
      'X-Amzn-Trace-Id': [ 'Root=1-62f8a29a-29a215d33ffe33a2045bfc9a' ],
      'X-Forwarded-For': [ '176.232.59.204, 130.176.223.10' ],
      'X-Forwarded-Port': [ '443' ],
      'X-Forwarded-Proto': [ 'https' ]
    },
    queryStringParameters: {},
    multiValueQueryStringParameters: {},
    pathParameters: { productId: '1' },
    stageVariables: {},
    requestContext: {
      resourceId: 'dxocxh',
      resourcePath: '/products/{productId}',
      httpMethod: 'GET',
      extendedRequestId: 'W15YHF10oAMFbcQ=',
      requestTime: '14/Aug/2022:07:22:02 +0000',
      path: '/dev/products/1',
      accountId: '740333333799',
      protocol: 'HTTP/1.1',
      stage: 'dev',
      domainPrefix: 'onj0arr1v6',
      requestTimeEpoch: 1660461722177,
      requestId: '6f7dd169-f40e-4cfd-91ac-3e428b8bff92',
      identity: {
        cognitoIdentityPoolId: null,
        accountId: null,
        cognitoIdentityId: null,
        caller: null,
        sourceIp: '176.232.59.204',
        principalOrgId: null,
        accessKey: null,
        cognitoAuthenticationType: null,
        cognitoAuthenticationProvider: null,
        userArn: null,
        userAgent: 'PostmanRuntime/7.29.0',
        user: null
      },
      domainName: 'onj0arr1v6.execute-api.us-east-1.amazonaws.com',
      apiId: 'onj0arr1v6'
    }
  }
  */
  console.log('Event', event);

  const { headers, methodArn } = event;
  /* principleId usually set to user identifier or user name - specify who is performing an action */
  const principalId = 'test';

  const response = headers.Authorization === process.env.AUTH_TOKEN
    ? generateResponse(principalId, Effect.Allow, methodArn)
    : generateResponse(principalId, Effect.Deny, methodArn);

  /*
  {
    "principalId": "test",
    "policyDocument": {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Action": "execute-api:Invoke",
                "Effect": "Allow",
                "Resource": "arn:aws:execute-api:us-east-1:740333333799:onj0arr1v6/dev/GET/products/1"
            }
        ]
    }
  }
  */
  console.log('Response', JSON.stringify(response));

  return response;
};
