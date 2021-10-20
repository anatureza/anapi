import {
  createTestAccount,
  createTransport,
  getTestMessageUrl,
} from "nodemailer";
import { HandlebarsMailTemplate } from "./HandlebarsMailTemplate";

interface IMailContact {
  name: string;
  email: string;
}

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

interface ISendMail {
  from?: IMailContact;
  to: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

export default class EtherealMail {
  static async sendMail({ to, from, subject, templateData }: ISendMail) {
    const account = await createTestAccount();

    const mailTemplate = new HandlebarsMailTemplate();

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
      from: {
        name: from?.name || "Suporte Amantes da Natureza",
        address: from?.email || "support@amantesdanatureza.com.br",
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplate.parse(templateData),
    });

    console.log(`Message sent ${message.messageId}`);
    console.log(`Preview URL ${getTestMessageUrl(message)}`);
  }
}
