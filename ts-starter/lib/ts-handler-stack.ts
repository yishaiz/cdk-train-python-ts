// lib/ts-handler-stack.ts

import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Bucket } from 'aws-cdk-lib/aws-s3';

import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';

interface TsHandlerStackProps extends cdk.StackProps {
  coolBucket: Bucket;
}

export class TsHandlerStack extends cdk.Stack {
  public coolBucket: Bucket;

  constructor(scope: Construct, id: string, props: TsHandlerStackProps) {
    super(scope, id, props);

    new Function(this, 'TsCoolLambda', {
      runtime: Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: Code.fromInline(`
                exports.handler = async (event) => {
                  console.log('Event Bucket:', process.env.COOL_BUCKET_ARN);
                };
            `),
      environment: {
        COOL_BUCKET_ARN: props.coolBucket.bucketArn,
      },
    });
  }
}
