import * as cdk from '@aws-cdk/core';
import * as cloudwatch from '@aws-cdk/aws-cloudwatch';

// Reference: https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/CacheMetrics.WhichShouldIMonitor.html#metrics-swap-usage
export class SwapUsageMomiton {
  public static setup(scope: cdk.Construct, cacheClusterId: string) {

    return new cloudwatch.Alarm(scope, 'alarm-elastc-cache-' + cacheClusterId + '-SwapUsage', {
      alarmName: `ElasticCacheSwapUsageAlarm[${cacheClusterId}]`,
      metric: new cloudwatch.Metric({
        namespace: 'AWS/ElastiCache',
        metricName: 'SwapUsage',
        dimensions: { CacheClusterId: cacheClusterId },
        statistic: 'max',
      }),
      threshold: 52430000,
      period: cdk.Duration.minutes(1),
      evaluationPeriods: 1,
      alarmDescription: 'The maximum value of the swapUsage within one minute is higher than 50MB.',
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      treatMissingData: cloudwatch.TreatMissingData.BREACHING,
    });
  }
}