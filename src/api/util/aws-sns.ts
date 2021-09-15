import { SNS } from 'aws-sdk';

const {
    sms: smsConfig,
} = require('../../../config');

const options: SNS.ClientConfiguration = {
    accessKeyId: smsConfig.accessKeyId,
    secretAccessKey: smsConfig.secretAccessKey,
    region: smsConfig.region,
};
const client = new SNS(options);

export default async function Send(message: string, countryCode: string, mobile: string, subject?: string) {
    if (smsConfig == null) throw new Error('Wrong AWS SNS Config');

    const params: SNS.PublishInput = {
        Message: message,
        PhoneNumber: countryCode + mobile,
    };

    if (subject) {
        params.MessageAttributes = {
            'AWS.SNS.SMS.SenderID': {
                DataType: 'String',
                StringValue: subject,
            },
        };
    }

    const result = await client.publish(params).promise();
    return result;
}