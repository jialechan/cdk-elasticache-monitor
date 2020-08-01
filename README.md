# Welcome to `cdk-elasticache-monitor`

ElasticacheAutoMonitor allows you to send email, sms, slack, or trigger aws lambda when an alarm occurs.
You will get the following monitoring:
  * Cpu Monitor: Should be less than 90%. (See below reference)
  * SwapUsage Monitor: Should be less than 50M.
  * Evictions Monitor: Should not have evictions value.
  * CurrConnections Monitor: According to your business needs, default every 1 vcup is equal to 200 connections.
  * FreeableMemory Monitor: Not less than 10%

Reference: https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/CacheMetrics.WhichShouldIMonitor.html

## Usage
```typescript

const stack = new cdk.Stack();

// sent with email
ElasticacheAutoMonitor.setUpWithEmail(stack, 'my-elasticache-id', {
  emails: ['jiale.chan@gmail.com'],
  nodeTypeClass: NodeType.R4_16XLARGE,
});

// or sent with sms
ElasticacheAutoMonitor.setUpWithSms(stack, 'my-elasticache-id', {
  phones: ['+15533728278'],
  nodeTypeClass: NodeType.R4_16XLARGE,
});

// or sent with slack
ElasticacheAutoMonitor.setUpWithSlack(stack, 'my-elasticache-id', {
  webHookUrl: 'http://xxx.xxx.xxx',
  nodeTypeClass: NodeType.R4_16XLARGE,
});

// or trigger lambda
const fn = new lambda.Function(stack, 'MyFunction', {
  runtime: lambda.Runtime.NODEJS_10_X,
  handler: 'index.handler',
  code: lambda.Code.fromInline('exports.handler = function(event, ctx, cb) { return cb(null, "hi"); }'),
});
ElasticacheAutoMonitor.setUpWithLambda(stack, 'my-elasticache-id', fn, {
  nodeTypeClass: NodeType.R4_16XLARGE,
});
```