import * as cdk from '@aws-cdk/core';
import '@aws-cdk/assert/jest';
import * as lambda from '@aws-cdk/aws-lambda';
import { ElasticacheAutoMonitor, NodeType } from '../src/index';

test('NodeType.T2_SMALL should equals 50 connections because T2_SMALL has 1 vcup', () => {
  const stack = new cdk.Stack();

  ElasticacheAutoMonitor.setUpWithSms(stack, 'my-elasticache-id', {
    phones: ['+123456789'],
    nodeType: NodeType.T2_SMALL,
  });

  expect(stack).toHaveResource('AWS::CloudWatch::Alarm', {
    MetricName: 'CurrConnections',
    Threshold: 200,
  });
});

test('NodeType.T2_MEDIUM should equals 100 connections because T2_MEDIUM has 2 cnup', () => {
  const stack = new cdk.Stack();

  ElasticacheAutoMonitor.setUpWithSms(stack, 'my-elasticache-id', {
    phones: ['+123456789'],
    nodeType: NodeType.T2_MEDIUM,
  });

  expect(stack).toHaveResource('AWS::CloudWatch::Alarm', {
    MetricName: 'CurrConnections',
    Threshold: 400,
  });
});

test('CPU should be less than 45% when vcpu are less than or eq 2', () => {
  const stack = new cdk.Stack();

  ElasticacheAutoMonitor.setUpWithSms(stack, 'my-elasticache-id', {
    phones: ['+123456789'],
    nodeType: NodeType.T2_MEDIUM,
  });

  expect(stack).toHaveResource('AWS::CloudWatch::Alarm', {
    MetricName: 'CPUUtilization',
    Threshold: 45,
  });
});

test('CPU should be less than 90% when vcpu are great than 2', () => {
  const stack = new cdk.Stack();

  ElasticacheAutoMonitor.setUpWithSms(stack, 'my-elasticache-id', {
    phones: ['+123456789'],
    nodeType: NodeType.R4_16XLARGE,
  });

  expect(stack).toHaveResource('AWS::CloudWatch::Alarm', {
    MetricName: 'EngineCPUUtilization',
    Threshold: 90,
  });
});

test('sent with sms', () => {
  const stack = new cdk.Stack();

  ElasticacheAutoMonitor.setUpWithSms(stack, 'my-elasticache-id', {
    phones: ['+123456789'],
    nodeType: NodeType.R4_16XLARGE,
  });

  expect(stack).toHaveResource('AWS::SNS::Subscription', {
    Protocol: 'sms',
  });
});

test('sent with slack', () => {
  const stack = new cdk.Stack();

  ElasticacheAutoMonitor.setUpWithSlack(stack, 'my-elasticache-id', {
    webHookUrl: 'http://xxx.xxx.xxx',
    nodeType: NodeType.R4_16XLARGE,
  });

  expect(stack).toHaveResource('AWS::SNS::Subscription', {
    Protocol: 'lambda',
  });
});

test('sent with lambda', () => {
  const stack = new cdk.Stack();

  const fn = new lambda.Function(stack, 'MyFunction', {
    runtime: lambda.Runtime.NODEJS_10_X,
    handler: 'index.handler',
    code: lambda.Code.fromInline('exports.handler = function(event, ctx, cb) { return cb(null, "hi"); }'),
  });

  ElasticacheAutoMonitor.setUpWithLambda(stack, 'my-elasticache-id', {
    lambda: fn,
    nodeType: NodeType.R4_16XLARGE,
  });

  expect(stack).toHaveResource('AWS::SNS::Subscription', {
    Protocol: 'lambda',
  });
});

test('Customize currConnections value', () => {
  const stack = new cdk.Stack();

  ElasticacheAutoMonitor.setUpWithSms(stack, 'my-elasticache-id', {
    phones: ['+123456789'],
    nodeType: NodeType.T2_SMALL,
    currConnectionsPeriod: cdk.Duration.minutes(2),
    currConnectionsThreshold: 200,
  });

  expect(stack).toHaveResource('AWS::CloudWatch::Alarm', {
    MetricName: 'CurrConnections',
    Period: 120,
    Threshold: 200,
  });
});

test('Default noteType', () => {
  const stack = new cdk.Stack();

  ElasticacheAutoMonitor.setUpWithSms(stack, 'my-elasticache-id', {
    phones: ['+123456789'],
  });

  expect(stack).toHaveResource('AWS::CloudWatch::Alarm', {
    MetricName: 'CurrConnections',
    Threshold: 400,
  });

  expect(stack).toHaveResource('AWS::CloudWatch::Alarm', {
    MetricName: 'CPUUtilization',
    Threshold: 45,
  });

  expect(stack).toHaveResource('AWS::CloudWatch::Alarm', {
    MetricName: 'FreeableMemory',
    Threshold: 685047284,
  });

});

