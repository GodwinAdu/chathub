'use server'

import nodemailer from 'nodemailer'

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, // Use port 465 for secure connections
    secure: true, // true for 465, false for other ports like 587
    auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
    },
})

export async function sendFeedback(formData: FormData) {
    const area = formData.get('area') as string
    const securityLevel = formData.get('securityLevel') as string
    const subject = formData.get('subject') as string
    const description = formData.get('description') as string
    const email = formData.get('email') as string

    if (!area || !securityLevel || !subject || !description || !email) {
        return { success: false, message: 'Please fill out all fields.' }
    }

    try {
        await Promise.all([
            ,            // Send the feedback email to the recipient
            transporter.sendMail({
                from: `"Feedback System" <${email}>`, // Sender's email
                to: process.env.SMTP_USER!, // Recipient email (e.g., your email address)
                replyTo: email, // User's email for reply
                subject: `Feedback: ${subject}`,
                html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #4CAF50;">New Feedback Received</h2>
                    <p><strong>Area:</strong> ${area}</p>
                    <p><strong>Security Level:</strong> ${securityLevel}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <p><strong>Description:</strong></p>
                    <p>${description}</p>
                    <p><strong>User Email:</strong> ${email}</p>
                </div>
            `
            }),
            // Auto-reply to the sender
            transporter.sendMail({
                from: `"Jutech Devs Team" <${process.env.SMTP_USER!}>`, // Sender's email
                to: email, // User's email
                subject: "Thank You for Your Feedback!",
                html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <p>Dear user,</p>
                    <p>Congratulations on using our application! We're thrilled to have you as part of our community.</p>
                    <p>Thank you for sharing your feedback. Your message is currently under review, and we will contact you soon if needed.</p>
                    <p>Here’s a summary of your feedback:</p>
                    <ul>
                        <li><strong>Area:</strong> ${area}</li>
                        <li><strong>Security Level:</strong> ${securityLevel}</li>
                        <li><strong>Subject:</strong> ${subject}</li>
                        <li><strong>Description:</strong> ${description}</li>
                    </ul>
                    <p>If you have any further questions, feel free to reach out to us. We truly appreciate your support and enthusiasm for our application.</p>
                    <p>Best regards,</p>
                    <p><strong>Jutech Devs</strong></p>
                </div>
            `
            })
        ])


        return { success: true, message: 'Feedback sent successfully' }
    } catch (error) {
        console.error('Error sending email:', error)
        return { success: false, message: 'Failed to send feedback. Please try again later.' }
    }
}

