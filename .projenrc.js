const {
  ConstructLibraryAws
} = require('projen');

const AWS_CDK_LATEST_RELEASE = '1.61.0';
const PROJECT_NAME = 'cdk-elasticache-monitor';
const PROJECT_DESCRIPTION = 'ElasticacheAutoMonitor allows you to send email, sms, slack, or trigger aws lambda when an alarm occurs.';

const project = new ConstructLibraryAws({
  name: PROJECT_NAME,
  description: PROJECT_DESCRIPTION,
  authorName: "Jiale Chan",
  authorEmail: "jiale.chan@gmail.com",
  repository: "https://github.com/jialechan/cdk-elasticache-monitor.git",
  stability: 'experimental',

  keywords: [
    'cdk',
    'aws',
    'elasticache',
    'monitor',
    'alarm',
    'slack',
  ],

  catalog: {
    twitter: 'jialechan',
    announce: false,
  },

  // creates PRs for projen upgrades
  projenUpgradeSecret: 'PROJEN_GITHUB_TOKEN',
  cdkVersion: AWS_CDK_LATEST_RELEASE,
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-lambda',
    '@aws-cdk/aws-cloudwatch',
    '@aws-cdk/aws-sns',
    '@aws-cdk/aws-sns-subscriptions',
    '@aws-cdk/aws-cloudwatch-actions',
  ],

  python: {
    distName: 'cdk-elasticache-monitor',
    module: 'cdk-elasticache-monitor'
  }
});

const common_exclude = ['cdk.out', 'cdk.context.json', 'images', 'yarn-error.log'];
project.npmignore.exclude(...common_exclude);
project.gitignore.exclude(...common_exclude);

project.synth();
