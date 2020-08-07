const { JsiiProject, Semver } = require('projen');

const AWS_CDK_LATEST_RELEASE = '1.55.0';
const PROJECT_NAME = 'cdk-elasticache-monitor';
const PROJECT_DESCRIPTION = 'ElasticacheAutoMonitor allows you to send email, sms, slack, or trigger aws lambda when an alarm occurs.';

const project = new JsiiProject({
  "name": PROJECT_NAME,
  description: PROJECT_DESCRIPTION,
  "authorName": "Jiale Chan",
  "authorEmail": "jiale.chan@gmail.com",
  "repository": "https://github.com/jialechan/cdk-elasticache-monitor.git",
  stability: 'experimental',
  devDependencies: {
    '@aws-cdk/assert': Semver.caret(AWS_CDK_LATEST_RELEASE),
    '@types/jest': Semver.caret('26.2.1'),
    '@types/node': Semver.caret('14.5.0'),
  },
  peerDependencies: {
    constructs: Semver.caret('3.0.4'),
    '@aws-cdk/core': Semver.caret(AWS_CDK_LATEST_RELEASE),
    '@aws-cdk/aws-lambda': Semver.caret(AWS_CDK_LATEST_RELEASE),
    '@aws-cdk/aws-cloudwatch': Semver.caret(AWS_CDK_LATEST_RELEASE),
    '@aws-cdk/aws-sns': Semver.caret(AWS_CDK_LATEST_RELEASE),
    '@aws-cdk/aws-sns-subscriptions': Semver.caret(AWS_CDK_LATEST_RELEASE),
    '@aws-cdk/aws-cloudwatch-actions': Semver.caret(AWS_CDK_LATEST_RELEASE),
  },
  dependencies: {
    constructs: Semver.caret('3.0.4'),
    '@aws-cdk/core': Semver.caret(AWS_CDK_LATEST_RELEASE),
    '@aws-cdk/aws-lambda': Semver.caret(AWS_CDK_LATEST_RELEASE),
    '@aws-cdk/aws-cloudwatch': Semver.caret(AWS_CDK_LATEST_RELEASE),
    '@aws-cdk/aws-sns': Semver.caret(AWS_CDK_LATEST_RELEASE),
    '@aws-cdk/aws-sns-subscriptions': Semver.caret(AWS_CDK_LATEST_RELEASE),
    '@aws-cdk/aws-cloudwatch-actions': Semver.caret(AWS_CDK_LATEST_RELEASE),
  },
  python: {
    distName: 'cdk-elasticache-monitor',
    module: 'cdk-elasticache-monitor'
  },
  dotnet: {
    dotNetNamespace: 'Jiale.CdkElasticacheMonoitor',
    packageId: 'Jiale.CdkElasticacheMonoitor'
  }
});

project.addFields({
  'keywords': [
    'cdk',
    'aws',
    'elasticache',
    'monitor',
    'alarm',
    'slack',
  ]
});

project.addFields({
  'awscdkio': {
    'twitter': '@jialechan',
    'announce': false,
  }
});

project.gitignore.exclude(
  'cdk.context.json',
  'cdk.out',
);

project.npmignore.exclude(
  'cdk.context.json',
  'cdk.out',
  'coverage',
);

project.synth();

project.synth();
