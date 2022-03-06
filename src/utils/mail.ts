import { serverConfig } from '../config/config';
import nodemailer from 'nodemailer';

async function sendRejectionMessage(candidateMail: string, referrerMail: string) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: serverConfig.mail.user,
        pass: serverConfig.mail.password,
      },
    });

    const mailOptions = {
      from: serverConfig.mail.user,
      to: [candidateMail, referrerMail],
      subject: 'Nomination Rejected',
      text: 'Your nomination was rejected. Overall score is less than 8.',
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.log(error);
  }
}

export { sendRejectionMessage };
