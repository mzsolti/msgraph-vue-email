import Mail from "../types/Mail";
import { getClient } from "../services/authService";

export async function sendEmail(mailModel: Mail): Promise<{ status: string }> {
  return new Promise<{ status: string }>(async (resolve, reject) => {
    const client = await getClient();

    const mail = {
      subject: mailModel.subject,
      replyTo: [
        {
          emailAddress: {
            address: mailModel.from.email,
            name: mailModel.from.name,
          },
        },
      ],
      toRecipients: [
        {
          emailAddress: {
            address: mailModel.sendTo.email,
            name: mailModel.sendTo.name,
          },
        },
      ],
      body: {
        content: mailModel.body,
        contentType: mailModel.isHtml ? "html" : "text",
      },
    };

    try {
      client
        .api("/me/sendMail")
        .post({ message: mail })
        .then(() => {
          resolve({ status: "ok" });
        });
    } catch (error) {
      reject(error);
    }
  });
}

export default {
  sendEmail,
};
