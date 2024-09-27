const express = require('express');
const sgMail = require('@sendgrid/mail');
const router = express.Router();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/send-confirmation-email', async (req, res) => {
    const { customerName, customerEmail, confirmationNumber, date, time, partySize } = req.body;

    const msg = {
        to: customerEmail,
        from: 'muhammad863@revature.net', 
        subject: 'Your Reservation Confirmation - Umami House California',
        html: `
            <h1>Reservation Confirmation</h1>
            <p>Dear ${customerName},</p>
            <p>Thank you for choosing Umami House California. Here are your reservation details:</p>
            <ul>
                <li>Confirmation Number: ${confirmationNumber}</li>
                <li>Date: ${date}</li>
                <li>Time: ${time}</li>
                <li>Party Size: ${partySize}</li>
            </ul>
            <p>If you need to modify or cancel your reservation, please contact us at (415) 555-9786</p> 
            <p>You can also use your confirmation number to modify or cancel your reservation on our reservation page</p>
            <p>We look forward to serving you!</p>
            <p>Best regards,<br>Umami House California</p>
        `,
    };
    
     try {
        console.log('Attempting to send email');
        const result = await sgMail.send(msg);
        console.log('Email sent successfully');
        res.status(200).json({ message: 'Confirmation email sent successfully' });
    } catch (error) {
        console.error('Error sending confirmation email');
        res.status(500).json({ error: 'Failed to send confirmation email'});
    }
});

module.exports = router;