import { resend } from './resend';

interface EmailPayload {
    to: string;
    subject: string;
    html: string;
}

export async function sendEmail({ to, subject, html }: EmailPayload) {
    try {
        const data = await resend.emails.send({
            from: 'University of East Capital <noreply@uec.edu.eg>',
            to,
            subject,
            html,
        });
        return { success: true, data };
    } catch (error) {
        console.error('EMAIL_SEND_ERROR', error);
        return { success: false, error };
    }
}
