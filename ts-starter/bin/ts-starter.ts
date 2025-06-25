#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { TsStarterStack } from '../lib/ts-starter-stack';
import { TsHandlerStack } from '../lib/ts-handler-stack';

const app = new cdk.App();

// Create the starter stack (with bucket)
const starterStack = new TsStarterStack(app, 'TsStarterStack');

// Create the handler stack and pass the bucket
new TsHandlerStack(app, 'TsHandlerStack', {
  coolBucket: starterStack.coolBucket,
});

// Optional: Access bucket name if needed
const bucketName = starterStack.coolBucket.bucketName;
console.log('Bucket name:', bucketName);