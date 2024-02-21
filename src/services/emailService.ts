import Mail from "../types/Mail";
import { getClient } from "../services/authService";

export async function sendEmail(
  mailModel: Mail,
  saveToSentItems: boolean,
): Promise<{ status: string }> {
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
      attachments: mailModel.attachments.map((file) => {
        let fileParts = file.blobData.split(",");
        let base64result = fileParts[1];
        let mimeString = fileParts[0].split(":")[1].split(";")[0];
        return {
          "@odata.type": "#microsoft.graph.fileAttachment",
          contentBytes: base64result,
          name: file.name,
          contentType: mimeString,
        };
      }),
    };

    try {
      client
        .api("/me/sendMail")
        .post({ message: mail, saveToSentItems: saveToSentItems })
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
