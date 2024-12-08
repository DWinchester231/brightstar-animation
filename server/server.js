require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: ['https://brightstaranimation2024.netlify.app', 'http://localhost:8000', 'https://brightstar-animation.onrender.com'],
    methods: ['POST'],
    credentials: true
}));
app.use(express.json());

// Email transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to yourself
            subject: `New Contact Form Submission from ${name}`,
            text: `
Name: ${name}
Email: ${email}
Message: ${message}
            `,
            replyTo: email
        };

        // Send email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
