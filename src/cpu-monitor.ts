import * as cdk from '@aws-cdk/core';
import * as cloudwatch from '@aws-cdk/aws-cloudwatch';
import { NodeType } from './index'

// Reference: https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/CacheMetrics.WhichShouldIMonitor.html#metrics-cpu-utilization
export class CpuMonitor {
  public static setup(scope: cdk.Construct, cacheClusterId: string, nodeType: NodeType) {

    let threshold = 90;
    let metricName = 'EngineCPUUtilization';

    if (nodeType && nodeType.vcupCount <= 2) {
      metricName = 'CPUUtilization';
      threshold = (90 / nodeType.vcupCount);
    }

    return new cloudwatch.Alarm(scope, 'alarm-elastc-cache-' + cacheClusterId + '-' + metricName, {
      alarmName: 'elasticCache-CPU-load-alarm[' + cacheClusterId + ']',
      metric: new cloudwatch.Metric({
        namespace: 'AWS/ElastiCache',
        metricName,
        dimensions: { CacheClusterId: cacheClusterId },
        statistic: 'avg',
      }),
      threshold,
      period: cdk.Duration.minutes(1),
      evaluationPeriods: 1,
      alarmDescription: 'The average CPU load(' + metricName + ') is greater than' + threshold + '%',
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      treatMissingData: cloudwatch.TreatMissingData.BREACHING,
    });
  }
}

