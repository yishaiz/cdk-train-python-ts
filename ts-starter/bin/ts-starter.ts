#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { TsStarterStack } from '../lib/ts-starter-stack';

const app = new cdk.App();
const starteStack: TsHandlerStackProps = new TsStarterStack(app, 'TsStarterStack')
const bucketname = starteStack.coolBucket.bucketName;
new TsStarterStack(app, 'TsStarterStack', {
  coolBucket: starteStack.coolBucket,
});
