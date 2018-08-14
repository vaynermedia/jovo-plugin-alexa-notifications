const crypto = require('crypto');
const request = require('request-promise');

const { Plugin } = require('jovo-framework');

class AlexaNotifications extends Plugin {
    constructor(options) {
        super(options);
		this.uri = 'https://api.amazonalexa.com/v2/notifications';

		this.expiresAfterSeconds = options && options.expiresAfterSeconds || 60;
    }

    init() {
        this.app.on('request', jovo => {
			const platformType = jovo.getType();
			if (platformType !== 'AlexaSkill') return;
			const {request} = jovo.requestObj;

			if (request.type === 'Messaging.MessageReceived') {
				this.token = jovo.requestObj.context.System.apiAccessToken;

				const body = this.createNotificationBody(request.message);
				return this.sendNotification(body);
			}
        });
    }

	createNotificationBody({displayInfo, spokenInfo}) {
		if (!spokenInfo.text && !spokenInfo.ssml) {
			throw new Error('Notification has no spoken text');
		}
		return {
			displayInfo: {
				content: [displayInfo]
			},
			referenceId: crypto.randomBytes(16).toString("hex"),
			expiryTime: this.setExpiryTime(),
			spokenInfo: {
				content: [spokenInfo]
			}
		};
	}

	sendNotification(body) {
	    return request({
	        uri: this.uri,
	        method: 'POST',
	        headers: { 'Authorization': `Bearer ${this.token}` },
	        body,
	        json: true
	    })
		.catch(err => {
			console.log('USER NOTIFICATION SEND ERR', err.message);
			return [];
		});
	}

	setExpiryTime() {
		const expiry = new Date();
		expiry.setTime(expiry.getTime() + (this.expiresAfterSeconds*1000));
		return expiry.toISOString();
	}
}

module.exports = AlexaNotifications;
