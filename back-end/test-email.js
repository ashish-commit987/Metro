import dotenv from 'dotenv';
dotenv.config();

import { sendOtpEmail } from './utils/services/brevo-email-service.js';

console.error('Starting test...');
if (!process.env.BREVO_API_KEY) {
    console.error('❌ BREVO_API_KEY is missing!');
    process.exit(1);
} else {
    console.error('✅ BREVO_API_KEY is present');
}

console.error('Sender Email:', process.env.BREVO_SENDER_EMAIL);

const testEmail = 'rajputashish2001@gmail.com';

const timeout = setTimeout(() => {
    console.error('❌ Test timed out! (10s)');
    process.exit(1);
}, 10000);

console.error('Calling sendOtpEmail...');

sendOtpEmail(testEmail, '123456')
    .then(() => {
        console.error('✅ Test function promise resolved');
        clearTimeout(timeout);
    })
    .catch(err => {
        console.error('❌ Test function failed:', err);
        clearTimeout(timeout);
    });
