import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'custom-authorizer-demo',
  frameworkVersion: '3',
  plugins: [
    'serverless-esbuild',
    'serverless-dotenv-plugin'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    profile: 'aws-task',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  functions: {
    restApiTokenAuthorizer: {
      handler: './handler.restApiTokenAuthorizer',
    },
    restApiRequestAuthorizer: {
      handler: './handler.restApiRequestAuthorizer'
    },
    httpApiRequestAuthorizer: {
      handler: './handler.httpApiRequestAuthorizer'
    }
  }
};

module.exports = serverlessConfiguration;
