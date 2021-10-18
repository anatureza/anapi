import {
  createTestAccount,
  createTransport,
  getTestMessageUrl,
} from "nodemailer";

interface ISendMail {
  to: string;
  body: string;
}

export default class EtherealMail {
  static async sendMail({ to, body }: ISendMail) {
    const account = await createTestAccount();

    const transporter = createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    const message = await transporter.sendMail({
      from: "anapi@amantesdanatureza.com.br",
      to,
      subject: "Recuperação de senha",
      text: body,
    });

    console.log(`Message sent ${message.messageId}`);
    console.log(`Preview URL ${getTestMessageUrl(message)}`);
  }
}
