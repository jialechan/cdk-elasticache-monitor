import os
import json
import time
import urllib.parse
import urllib.request


def handler(event, context):
    """
    alarm to slack
    """

    print(json.dumps(event))

    slack_webhook_url = os.environ['SLACK_WEBHOOK_URL']
    channel = os.environ['CHANNEL']
    username = os.environ['USERNAME']
    icon_emoji = os.environ['ICON_EMOJI']

    for record in event.get("Records"):

        message = json.loads(record.get("Sns").get("Message"))

        title = message.get("AlarmName")
        info = message.get("AlarmDescription")
        newStateReason = message.get("NewStateReason")

        region = os.environ['AWS_REGION']

        log = "https://" + region + ".console.aws.amazon.com/cloudwatch/home?region=" + \
            region + "#alarmsV2:alarm/" + title + "?~(alarmStateFilter~'ALARM)"

        values = {
            "channel": channel,
            "username": username,
            "text": title + "\n" + info + "\n" + newStateReason + "\n" + "<" + log + "|AlarmState>",
            "icon_emoji": icon_emoji
        }

        params = json.dumps(values).encode('utf8')
        req = urllib.request.Request(slack_webhook_url, data=params, headers={
                                     'content-type': 'application/json'})
        response = urllib.request.urlopen(req)

        print(response.read())
