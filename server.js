const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const port = process.env.PORT || 3000;

// Twilio credentials
const accountSid = 'ACe691a7f7cbf21ac27cb9d24f5ac51427'; // Your Account SID from www.twilio.com/console
const authToken = '4273a9ad3b9172e4d6c99961e32e6bb7'; // Your Auth Token from www.twilio.com/console
const client = new twilio(accountSid, authToken);

app.use(bodyParser.json());

app.post('/api/send-alert', (req, res) => {
    const { message, phoneNumbers } = req.body;

    // Sending SMS to each phone number
    const promises = phoneNumbers.map(number => {
        return client.messages.create({
            body: 'help bro!!',
            to: '+919381465866',  // Phone number to send message to
            from: '+18777804236' // Your Twilio number
        });
    });

    Promise.all(promises)
        .then(() => res.status(200).send({ success: true }))
        .catch(error => res.status(500).send({ success: false, error }));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
