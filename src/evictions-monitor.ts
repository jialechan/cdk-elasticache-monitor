import * as cdk from '@aws-cdk/core';
import * as cloudwatch from '@aws-cdk/aws-cloudwatch';

// Reference: https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/CacheMetrics.WhichShouldIMonitor.html#metrics-evictions
export class EvictionsMomiton {

  public static setup(scope: cdk.Construct, cacheClusterId: string) {

    return new cloudwatch.Alarm(scope, 'alarm-elastc-cache-' + cacheClusterId + '-Evictions', {
      alarmName: `ElasticCacheEvictionsAlarm[${cacheClusterId}]`,
      metric: new cloudwatch.Metric({
        namespace: 'AWS/ElastiCache',
        metricName: 'Evictions',
        dimensions: { CacheClusterId: cacheClusterId },
        statistic: 'max',
      }),
      threshold: 1,
      period: cdk.Duration.minutes(1),
      evaluationPeriods: 1,
      alarmDescription: 'Data evicted within one minute(We recommend that you determine your own alarm threshold for this metric based on your application needs)',
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING,
    });
  }
}