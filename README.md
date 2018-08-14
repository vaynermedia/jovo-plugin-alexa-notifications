# Alexa Notifications for the Jovo Framework

[Jovo](https://www.jovo.tech/) [Plugin](https://www.jovo.tech/docs/advanced#plugins) to handle [Alexa Messages](https://developer.amazon.com/docs/custom-skills/skill-messaging-api-for-alexa-notifications.html#skill-messaging-api-usage).

## Usage

First, be sure your Alexa skill's permissions includes [notifications](https://developer.amazon.com/docs/custom-skills/notifications-and-permissions-reference-for-custom-skills.html).

Then, add the plugin:

```js
const { App } = require('jovo-framework');
const AlexaNotifications = require('jovo-plugin-alexa-notifications');

const app = new App();
app.register(new AlexaNotifications());
```

## Advanced Options

The default expiration time is 60 seconds, but you can manually set this using the `options` object:

```js
const options = { expiresAfterSeconds: 120 }
app.register(new AlexaNotifications(options));
```

# License

MIT
