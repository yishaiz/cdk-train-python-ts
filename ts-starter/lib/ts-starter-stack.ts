import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_s3, Fn } from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';

export class TsStarterStack extends cdk.Stack {
  public coolBucket: Bucket;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const suffix = this.initializeSuffix();

    this.coolBucket = new aws_s3.Bucket(this, 'TsBucket', {
      bucketName: `ts-starter-cool-bucket-${suffix}`,
      lifecycleRules: [
        {
          expiration: cdk.Duration.days(3),
        },
      ],
    });

    new cdk.CfnOutput(this, 'TsBucketName', {
      value: this.coolBucket.bucketName,
      description: 'The name of the S3 bucket created by this stack',
    });
  }

  private initializeSuffix() {
    const shortStackId = Fn.select(2, Fn.split('/', this.stackId));
    const suffix = Fn.select(4, Fn.split('-', shortStackId));
    return suffix;
  }
}
