import * as cdk from '@aws-cdk/core';
import * as cloudwatch from '@aws-cdk/aws-cloudwatch';
import { NodeType } from './index'

// According to business needs
export class FreeableMemoryMomiton {
  public static setup(scope: cdk.Construct, cacheClusterId: string, nodeType: NodeType) {

    const threshold = Math.round(nodeType.memory * 0.1);

    return new cloudwatch.Alarm(scope, 'alarm-elastc-cache-' + cacheClusterId + '-FreeableMemory', {
      alarmName: 'elasticCache-freeableMemory-alarm[' + cacheClusterId + ']',
      metric: new cloudwatch.Metric({
        namespace: 'AWS/ElastiCache',
        metricName: 'FreeableMemory',
        dimensions: { CacheClusterId: cacheClusterId },
        statistic: 'min',
      }),
      threshold,
      period: cdk.Duration.minutes(1),
      evaluationPeriods: 1,
      alarmDescription: 'The FreeableMemory value is less than ' + (threshold / (1024 * 1024 * 1024)).toFixed(2) + 'Gb in one minute',
      comparisonOperator: cloudwatch.ComparisonOperator.LESS_THAN_THRESHOLD,
      treatMissingData: cloudwatch.TreatMissingData.BREACHING,
    });
  }
}