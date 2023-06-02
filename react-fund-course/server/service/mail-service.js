import nodemailer from 'nodemailer';

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.SMTP_SERVICE,
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PWD,
      },
    });
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail(
      {
        from: process.env.SMTP_USER,
        to,
        subject: 'Account activation on ' + process.env.API_URL,
        text: '',
        html: `
        <div>
          <h1>Please activate your account with following link </h1>
          <a href='${link}'>${link}</a>
        </div>
      `,
      },
      function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      },
    );
  }
}

const mailService = new MailService();
export default mailService;
