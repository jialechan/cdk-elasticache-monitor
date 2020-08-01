# API Reference

**Classes**

Name|Description
----|-----------
[ElasticacheAutoMonitor](#cdk-elasticache-monitor-elasticacheautomonitor)|ElasticacheAutoMonitor allows you to send email, sms, slack, or trigger aws sns topic when an alarm occurs.
[NodeType](#cdk-elasticache-monitor-nodetype)|*No description*


**Interfaces**

Name|Description
----|-----------
[ISetUpWithEmailProps](#cdk-elasticache-monitor-isetupwithemailprops)|*No description*
[ISetUpWithLambdaProps](#cdk-elasticache-monitor-isetupwithlambdaprops)|Elasticache auto monitor set up with labmda props.
[ISetUpWithSlackProps](#cdk-elasticache-monitor-isetupwithslackprops)|*No description*
[ISetUpWithSmsProps](#cdk-elasticache-monitor-isetupwithsmsprops)|*No description*



## class ElasticacheAutoMonitor 🔹 <a id="cdk-elasticache-monitor-elasticacheautomonitor"></a>

ElasticacheAutoMonitor allows you to send email, sms, slack, or trigger aws sns topic when an alarm occurs.

You will get the following monitoring:
  1. Cpu Monitor: Should be less than 90%. (See below reference)
  2. SwapUsage Monitor: Should be less than 50M.
  3. Evictions Monitor: Should not have evictions value.
  4. CurrConnections Monitor: According to your business needs, default every 1 vcup is equal to 200 connections.
  5. FreeableMemory Monitor: Not less than 10%

Reference: https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/CacheMetrics.WhichShouldIMonitor.html

__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new ElasticacheAutoMonitor(scope: Construct, id: string)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*


### Methods


#### *static* setUpWithEmail(scope, cacheClusterId, props)🔹 <a id="cdk-elasticache-monitor-elasticacheautomonitor-setupwithemail"></a>



```ts
static setUpWithEmail(scope: Construct, cacheClusterId: string, props: ISetUpWithEmailProps): void
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **cacheClusterId** (<code>string</code>)  *No description*
* **props** (<code>[ISetUpWithEmailProps](#cdk-elasticache-monitor-isetupwithemailprops)</code>)  *No description*




#### *static* setUpWithLambda(scope, cacheClusterId, props)🔹 <a id="cdk-elasticache-monitor-elasticacheautomonitor-setupwithlambda"></a>



```ts
static setUpWithLambda(scope: Construct, cacheClusterId: string, props: ISetUpWithLambdaProps): void
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **cacheClusterId** (<code>string</code>)  *No description*
* **props** (<code>[ISetUpWithLambdaProps](#cdk-elasticache-monitor-isetupwithlambdaprops)</code>)  *No description*




#### *static* setUpWithSlack(scope, cacheClusterId, props)🔹 <a id="cdk-elasticache-monitor-elasticacheautomonitor-setupwithslack"></a>



```ts
static setUpWithSlack(scope: Construct, cacheClusterId: string, props: ISetUpWithSlackProps): void
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **cacheClusterId** (<code>string</code>)  *No description*
* **props** (<code>[ISetUpWithSlackProps](#cdk-elasticache-monitor-isetupwithslackprops)</code>)  *No description*




#### *static* setUpWithSms(scope, cacheClusterId, props)🔹 <a id="cdk-elasticache-monitor-elasticacheautomonitor-setupwithsms"></a>



```ts
static setUpWithSms(scope: Construct, cacheClusterId: string, props: ISetUpWithSmsProps): void
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **cacheClusterId** (<code>string</code>)  *No description*
* **props** (<code>[ISetUpWithSmsProps](#cdk-elasticache-monitor-isetupwithsmsprops)</code>)  *No description*






## class NodeType 🔹 <a id="cdk-elasticache-monitor-nodetype"></a>





### Properties


Name | Type | Description 
-----|------|-------------
**memory**🔹 | <code>number</code> | <span></span>
**name**🔹 | <code>string</code> | <span></span>
**vcupCount**🔹 | <code>number</code> | <span></span>
*static* **DEFAULT**🔹 | <code>[NodeType](#cdk-elasticache-monitor-nodetype)</code> | <span></span>
*static* **M4_10XLARGE**🔹 | <code>[NodeType](#cdk-elasticache-monitor-nodetype)</code> | <span></span>
*static* **M4_2XLARGE**🔹 | <code>[NodeType](#cdk-elasticache-monitor-nodetype)</code> | <span></span>
*static* **M4_4XLARGE**🔹 | <code>[NodeType](#cdk-elasticache-monitor-nodetype)</code> | <span></span>
*static* **M4_LARGE**🔹 | <code>[NodeType](#cdk-elasticache-monitor-nodetype)</code> | <span></span>
*static* **M4_XLARGE**🔹 | <code>[NodeType](#cdk-elasticache-monitor-nodetype)</code> | <span></span>
*static* **M5_12XLARGE**🔹 | <code>[NodeType](#cdk-elasticache-monitor-nodetype)</code> | <span></span>
*static* **M5_24XLARGE**🔹 | <code>[NodeType](#cdk-elasticache-monitor-nodetype)</code> | <span></span>
*static* **M5_2XLARGE**🔹 | <code>[NodeType](#cdk-elasticache-monitor-nodetype)</code> | <span></span>
*static* **M5_4XLARGE**🔹 | <code>[NodeType](#cdk-elasticache-monitor-nodetype)</code> | <span></span>
*static* **M5_LARGE**🔹 | <code>[NodeType](#cdk-elasticache-monitor-nodetype)</code> | <span></span>
*static* **M5_XLARGE**🔹 | <code>[NodeType](#cdk-elasticache-monitor-nodetype)</code> | <span></span>
*static* **R4_16XLARGE**🔹 | <code>[NodeType](#cdk-elasticache-monitor-nodetype)</code> | <span></span>
*static* **R4_2XLARGE**🔹 | <code>[NodeType](#cdk-elasticache-monitor-nodetype)</code> | <span></span>
*static* **R4_4XLARGE**🔹 | <code>[NodeType](#cdk-elasticache-monitor-nodetype)</code> | <span></span>
*static* **R4_8XLARGE**🔹 | <code>[NodeType](#cdk-elasticache-monitor-nodetype)</code> | <span></span>
*static* **R4_LARGE**🔹 | <code>[NodeType](#cdk-elasticache-monitor-nodetype)</code> | <span></span>
*static* **R4_XLARGE**🔹 | <code>[NodeType](#cdk-elasticache-monitor-nodetype)</code> | <span></span>
*static* **R5_12XLARGE**🔹 | <code>[NodeType](#cdk-elasticache-monitor-nodetype)</code> | <span></span>
*static* **R5_24LARGE**🔹 | <code>[NodeType](#cdk-elasticache-monitor-nodetype)</code> | <span></span>
*static* **R5_2XLARGE**🔹 | <code>[NodeType](#cdk-elasticache-monitor-nodetype)</code> | <span></span>
*static* **R5_4XLARGE**🔹 | <code>[NodeType](#cdk-elasticache-monitor-nodetype)</code> | <span></span>
*static* **R5_LARGE**🔹 | <code>[NodeType](#cdk-elasticache-monitor-nodetype)</code> | <span></span>
*static* **R5_XLARGE**🔹 | <code>[NodeType](#cdk-elasticache-monitor-nodetype)</code> | <span></span>
*static* **T2_MEDIUM**🔹 | <code>[NodeType](#cdk-elasticache-monitor-nodetype)</code> | <span></span>
*static* **T2_MIRCO**🔹 | <code>[NodeType](#cdk-elasticache-monitor-nodetype)</code> | <span></span>
*static* **T2_SMALL**🔹 | <code>[NodeType](#cdk-elasticache-monitor-nodetype)</code> | <span></span>
*static* **T3_MEDIUM**🔹 | <code>[NodeType](#cdk-elasticache-monitor-nodetype)</code> | <span></span>
*static* **T3_MICRO**🔹 | <code>[NodeType](#cdk-elasticache-monitor-nodetype)</code> | <span></span>
*static* **T3_SMALL**🔹 | <code>[NodeType](#cdk-elasticache-monitor-nodetype)</code> | <span></span>



## interface ISetUpWithEmailProps 🔹 <a id="cdk-elasticache-monitor-isetupwithemailprops"></a>




### Properties


Name | Type | Description 
-----|------|-------------
**emails**🔹 | <code>Array<string></code> | Mailing list to be sent.
**currConnectionsPeriod**?🔹 | <code>[Duration](#aws-cdk-core-duration)</code> | The period over which the specified statistic is applied.<br/>__*Default*__: Duration.minutes(1)
**currConnectionsThreshold**?🔹 | <code>number</code> | CurrConnections threshold.<br/>__*Default*__: 100
**nodeType**?🔹 | <code>[NodeType](#cdk-elasticache-monitor-nodetype)</code> | Default elasticache node type.<br/>__*Default*__: NodeType.M5_LARGE



## interface ISetUpWithLambdaProps 🔹 <a id="cdk-elasticache-monitor-isetupwithlambdaprops"></a>


Elasticache auto monitor set up with labmda props.

### Properties


Name | Type | Description 
-----|------|-------------
**lambda**🔹 | <code>[Function](#aws-cdk-aws-lambda-function)</code> | <span></span>
**currConnectionsPeriod**?🔹 | <code>[Duration](#aws-cdk-core-duration)</code> | The period over which the specified statistic is applied.<br/>__*Default*__: Duration.minutes(1)
**currConnectionsThreshold**?🔹 | <code>number</code> | CurrConnections threshold.<br/>__*Default*__: 100
**nodeType**?🔹 | <code>[NodeType](#cdk-elasticache-monitor-nodetype)</code> | Default elasticache node type.<br/>__*Default*__: NodeType.M5_LARGE



## interface ISetUpWithSlackProps 🔹 <a id="cdk-elasticache-monitor-isetupwithslackprops"></a>




### Properties


Name | Type | Description 
-----|------|-------------
**webHookUrl**🔹 | <code>string</code> | Go to this(https://slack.com/apps/A0F7XDUAZ-incoming-webhooks) link to apply for webhook.
**channel**?🔹 | <code>string</code> | Setting channel.<br/>__*Default*__: cloudwatch-alarm
**currConnectionsPeriod**?🔹 | <code>[Duration](#aws-cdk-core-duration)</code> | The period over which the specified statistic is applied.<br/>__*Default*__: Duration.minutes(1)
**currConnectionsThreshold**?🔹 | <code>number</code> | CurrConnections threshold.<br/>__*Default*__: 100
**iconEmoji**?🔹 | <code>string</code> | Emoji for bot.<br/>__*Default*__: :scream:
**nodeType**?🔹 | <code>[NodeType](#cdk-elasticache-monitor-nodetype)</code> | Default elasticache node type.<br/>__*Default*__: NodeType.M5_LARGE
**username**?🔹 | <code>string</code> | Setting Slack bot name.<br/>__*Default*__: Webhookbot



## interface ISetUpWithSmsProps 🔹 <a id="cdk-elasticache-monitor-isetupwithsmsprops"></a>




### Properties


Name | Type | Description 
-----|------|-------------
**phones**🔹 | <code>Array<string></code> | Include country code and phone number, for example: +15551231234.
**currConnectionsPeriod**?🔹 | <code>[Duration](#aws-cdk-core-duration)</code> | The period over which the specified statistic is applied.<br/>__*Default*__: Duration.minutes(1)
**currConnectionsThreshold**?🔹 | <code>number</code> | CurrConnections threshold.<br/>__*Default*__: 100
**nodeType**?🔹 | <code>[NodeType](#cdk-elasticache-monitor-nodetype)</code> | Default elasticache node type.<br/>__*Default*__: NodeType.M5_LARGE



