import { HttpStatus } from "@nestjs/common";
import { BaseResponseTypeDTO, EmailAttachmentDTO } from "./utils.types";
const nodemailer = require('nodemailer');


  export const sendEmail = async (
    html: string,
    subject: string,
    recipientEmail: string,
    attachments?: EmailAttachmentDTO[],
  ): Promise<BaseResponseTypeDTO> => {
    try {
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
          user: process.env.ADMIN_EMAIL,
          pass: process.env.ADMIN_PASSWORD,
        },
      });
  
      const info = await transporter.sendMail({
        from: `"Zuby Contact"`,
        to: recipientEmail,
        subject,
        html,
        attachments,
      });
  
      console.log(`✅ Email sent successfully: ${info.messageId}`);
  
      return {
        message: `Nodemailer sent message: ${info.messageId}`,
        code: HttpStatus.OK,
        success: true,
      };
    } catch (error) {
      console.error(`❌ Email sending failed:`, error);
  
      return {
        success: false,
        message: 'Email not sent',
        code: HttpStatus.BAD_GATEWAY,
      };
    }
  };
