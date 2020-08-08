import * as path from 'path';
import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as sns from '@aws-cdk/aws-sns';
import * as sns_sub from '@aws-cdk/aws-sns-subscriptions';
import * as actions from '@aws-cdk/aws-cloudwatch-actions';
import { CpuMonitor } from './cpu-monitor';
import { SwapUsageMomiton } from './swap-usage-monitor';
import { EvictionsMomiton } from './evictions-monitor';
import { CurrConnectionsMomiton } from './current-connections-monitor';
import { FreeableMemoryMomiton } from './freeable-memory-monitor';

/**
 * Elasticache auto monitor set up base props.
 */
interface ISetUpProps {
  /**
   * Default elasticache node type.
   * It is strongly recommended to set according to the actual value.
   *
   * @default NodeType.M5_LARGE
   */
  readonly nodeType?: NodeType;

  /**
   * The period over which the specified statistic is applied.
   *
   * @default Duration.minutes(1)
   */
  readonly currConnectionsPeriod?: cdk.Duration;

  /**
   * CurrConnections threshold
   * 
   * Every 1 vcup is equal to 50 connections
   * 
   * @default 100
   */
  readonly currConnectionsThreshold?: number;
}

/**
 * Elasticache auto monitor set up with labmda props.
 */
export interface ISetUpWithLambdaProps extends ISetUpProps {
  readonly lambda: lambda.Function,
}

export interface ISetUpWithSlackProps extends ISetUpProps {

  /**
   * Go to this(https://slack.com/apps/A0F7XDUAZ-incoming-webhooks) link to apply for webhook 
   */
  readonly webHookUrl: string;

  /**
   * Setting channel.
   * What is a channel: (https://slack.com/intl/en-cn/help/articles/360017938993-What-is-a-channel)
   *
   * @default cloudwatch-alarm
   */
  readonly channel?: string;

  /**
   * Setting Slack bot name.
   * 
   * @default Webhookbot
   */
  readonly username?: string;

  /**
   * Emoji for bot.
   * 
   * @default :scream:
   */
  readonly iconEmoji?: string;
}

export interface ISetUpWithSmsProps extends ISetUpProps {
  /**
   * Include country code and phone number, for example: +15551231234
   */
  readonly phones: string[];
}

/**
 * ElasticacheAutoMonitor allows you to send email, sms, slack, or trigger aws sns topic when an alarm occurs.
 * You will get the following monitoring:
 *  1. Cpu Monitor: Should be less than 90%. (See below reference)
 *  2. SwapUsage Monitor: Should be less than 50M.
 *  3. Evictions Monitor: Should not have evictions value.
 *  4. CurrConnections Monitor: According to your business needs, default every 1 vcup is equal to 200 connections.
 *  5. FreeableMemory Monitor: Not less than 10%
 * 
 * Reference: https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/CacheMetrics.WhichShouldIMonitor.html
 */
export class ElasticacheAutoMonitor extends cdk.Construct {

  public static setUpWithLambda(scope: cdk.Construct, cacheClusterId: string, props: ISetUpWithLambdaProps) {
    const topic = new sns.Topic(scope, 'alarm-' + cacheClusterId + '-lambda');
    topic.addSubscription(new sns_sub.LambdaSubscription(props.lambda));
    ElasticacheAutoMonitor.setup(scope, cacheClusterId, topic, props);
  }

  public static setUpWithSlack(scope: cdk.Construct, cacheClusterId: string, props: ISetUpWithSlackProps) {

    let channel = props.channel || 'cloudwatch-alarm';
    let username = props.username || 'Webhookbot';
    let icon_emoji = props.iconEmoji || ':scream:';

    const fn = new lambda.Function(scope, 'alarm-' + cacheClusterId + '-to-slack', {
      handler: 'index.handler',
      runtime: lambda.Runtime.PYTHON_3_8,
      code: lambda.Code.fromAsset(path.join(__dirname, 'asset/lambda')),
      environment: {
        SLACK_WEBHOOK_URL: props.webHookUrl,
        CHANNEL: channel,
        USERNAME: username,
        ICON_EMOJI: icon_emoji,
      },
    });

    const topic = new sns.Topic(scope, 'alarm-' + cacheClusterId + '-slack');
    topic.addSubscription(new sns_sub.LambdaSubscription(fn));

    ElasticacheAutoMonitor.setup(scope, cacheClusterId, topic, props);
  }

  public static setUpWithSms(scope: cdk.Construct, cacheClusterId: string, props: ISetUpWithSmsProps) {
    const topic = new sns.Topic(scope, 'alarm-' + cacheClusterId + '-with-sms-topic');
    for (let phone in props.phones) {
      topic.addSubscription(new sns_sub.SmsSubscription(phone));
    }
    ElasticacheAutoMonitor.setup(scope, cacheClusterId, topic, props);
  }

  private static setup(scope: cdk.Construct, cacheClusterId: string, topic: sns.Topic, props: ISetUpProps) {

    // bind default and props
    const nodeType = props.nodeType || NodeType.DEFAULT;
    const _props = {
      nodeType,
      currConnectionsPeriod: cdk.Duration.minutes(1),
      currConnectionsThreshold: nodeType.vcupCount * 200,
      ...props,
    }

    CpuMonitor.setup(scope, cacheClusterId, _props.nodeType).addAlarmAction(new actions.SnsAction(topic));
    SwapUsageMomiton.setup(scope, cacheClusterId).addAlarmAction(new actions.SnsAction(topic));
    EvictionsMomiton.setup(scope, cacheClusterId).addAlarmAction(new actions.SnsAction(topic));
    CurrConnectionsMomiton.setup(scope, cacheClusterId, _props.currConnectionsPeriod, _props.currConnectionsThreshold).addAlarmAction(new actions.SnsAction(topic));
    FreeableMemoryMomiton.setup(scope, cacheClusterId, _props.nodeType).addAlarmAction(new actions.SnsAction(topic));
  }

}

export class NodeType {

  readonly name: string;
  readonly vcupCount: number;
  readonly memory: number;

  private constructor(name: string, vcupCount: number, memory: number) {
    this.name = name;
    this.vcupCount = vcupCount;
    this.memory = memory;
  }

  public static readonly T2_MIRCO = new NodeType('cache.t2.mirco', 1, 0.555 * 1024 * 1024 * 1024);
  public static readonly T2_SMALL = new NodeType('cache.t2.small', 1, 1.55 * 1024 * 1024 * 1024);
  public static readonly T2_MEDIUM = new NodeType('cache.t2.medium', 2, 3.22 * 1024 * 1024 * 1024);
  public static readonly T3_MICRO = new NodeType('cache.t3.micro', 2, 0.5 * 1024 * 1024 * 1024);
  public static readonly T3_SMALL = new NodeType('cache.t3.small', 2, 1.37 * 1024 * 1024 * 1024);
  public static readonly T3_MEDIUM = new NodeType('cache.t3.medium', 2, 3.09 * 1024 * 1024 * 1024);
  public static readonly M4_LARGE = new NodeType('cache.m4.large', 2, 6.42 * 1024 * 1024 * 1024);
  public static readonly M4_XLARGE = new NodeType('cache.m4.xlarge', 4, 14.28 * 1024 * 1024 * 1024);
  public static readonly M4_2XLARGE = new NodeType('cache.m4.2xlarge', 8, 29.70 * 1024 * 1024 * 1024);
  public static readonly M4_4XLARGE = new NodeType('cache.m4.4xlarge', 16, 60.78 * 1024 * 1024 * 1024);
  public static readonly M4_10XLARGE = new NodeType('cache.m4.10xlarge', 40, 154.64 * 1024 * 1024 * 1024);
  public static readonly M5_LARGE = new NodeType('cache.m5.large', 2, 6.38 * 1024 * 1024 * 1024);
  public static readonly M5_XLARGE = new NodeType('cache.m5.xlarge', 4, 12.93 * 1024 * 1024 * 1024);
  public static readonly M5_2XLARGE = new NodeType('cache.m5.2xlarge', 8, 26.04 * 1024 * 1024 * 1024);
  public static readonly M5_4XLARGE = new NodeType('cache.m5.4xlarge', 16, 52.26 * 1024 * 1024 * 1024);
  public static readonly M5_12XLARGE = new NodeType('cache.m5.12xlarge', 48, 157.12 * 1024 * 1024 * 1024);
  public static readonly M5_24XLARGE = new NodeType('cache.m5.12xlarge', 96, 314.32 * 1024 * 1024 * 1024);
  public static readonly R4_LARGE = new NodeType('cache.r4.large', 2, 12.3 * 1024 * 1024 * 1024);
  public static readonly R4_XLARGE = new NodeType('cache.r4.xlarge', 4, 25.05 * 1024 * 1024 * 1024);
  public static readonly R4_2XLARGE = new NodeType('cache.r4.2xlarge', 8, 50.47 * 1024 * 1024 * 1024);
  public static readonly R4_4XLARGE = new NodeType('cache.r4.4xlarge', 16, 101.38 * 1024 * 1024 * 1024);
  public static readonly R4_8XLARGE = new NodeType('cache.r4.8xlarge', 32, 203.26 * 1024 * 1024 * 1024);
  public static readonly R4_16XLARGE = new NodeType('cache.r4.16xlarge', 64, 407 * 1024 * 1024 * 1024);
  public static readonly R5_LARGE = new NodeType('cache.r5.large', 2, 13.07 * 1024 * 1024 * 1024);
  public static readonly R5_XLARGE = new NodeType('cache.r5.xlarge', 4, 26.32 * 1024 * 1024 * 1024);
  public static readonly R5_2XLARGE = new NodeType('cache.r5.2xlarge', 8, 52.82 * 1024 * 1024 * 1024);
  public static readonly R5_4XLARGE = new NodeType('cache.r5.4xlarge', 16, 105.81 * 1024 * 1024 * 1024);
  public static readonly R5_12XLARGE = new NodeType('cache.r5.12xlarge', 48, 317.77 * 1024 * 1024 * 1024);
  public static readonly R5_24LARGE = new NodeType('cache.r5.12xlarge', 96, 635.61 * 1024 * 1024 * 1024);

  public static readonly DEFAULT = NodeType.M5_LARGE;
}
