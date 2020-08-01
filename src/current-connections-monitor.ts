import * as cdk from '@aws-cdk/core';
import * as cloudwatch from '@aws-cdk/aws-cloudwatch';

// Reference: https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/CacheMetrics.WhichShouldIMonitor.html#metrics-curr-connections
export class CurrConnectionsMomiton {
  public static setup(scope: cdk.Construct, cacheClusterId: string, period: cdk.Duration, threshold: number) {

    return new cloudwatch.Alarm(scope, 'alarm-elastc-cache-' + cacheClusterId + '-CurrConnections', {
      alarmName: 'ElasticCacheCurrConnectionsAlarm[' + cacheClusterId + ']',
      metric: new cloudwatch.Metric({
        namespace: 'AWS/ElastiCache',
        metricName: 'CurrConnections',
        dimensions: { CacheClusterId: cacheClusterId },
        statistic: 'avg',
      }),
      threshold,
      period,
      evaluationPeriods: 1,
      alarmDescription: 'The connection constant in ' + period.toMinutes() + ' minute(s) is greater than ' + threshold,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      treatMissingData: cloudwatch.TreatMissingData.BREACHING,
    });
  }
}