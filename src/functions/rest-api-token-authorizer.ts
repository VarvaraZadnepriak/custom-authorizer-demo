import { APIGatewayTokenAuthorizerEvent, APIGatewayAuthorizerResult, PolicyDocument } from 'aws-lambda';

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

export const restApiTokenAuthorizer = async (event: APIGatewayTokenAuthorizerEvent): Promise<APIGatewayAuthorizerResult> => {
  /*
  {
    type: 'TOKEN',
    methodArn: 'arn:aws:execute-api:us-east-1:740333333799:onj0arr1v6/dev/GET/products/1',
    authorizationToken: 'test'
  }
  */
  console.log('Event', event);

  const { authorizationToken, methodArn } = event;
  /* principleId usually set to user identifier or user name - specify who is performing an action */
  const principalId = 'test';

  const response = authorizationToken === process.env.AUTH_TOKEN
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
