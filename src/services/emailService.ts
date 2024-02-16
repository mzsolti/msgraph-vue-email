import Mail from "../types/Mail";
import { getClient } from "../services/authService";
export async function sendEmail(mailModel: Mail): Promise<{ status: string }> {
  return new Promise<{ status: string }>(async (resolve, reject) => {
    const client = await getClient();

    const mail = {
      subject: mailModel.subject,
      toRecipients: [
        {
          emailAddress: {
            address: mailModel.sendTo.email,
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
