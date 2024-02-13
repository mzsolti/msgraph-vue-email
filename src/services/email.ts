import { Client } from "@microsoft/microsoft-graph-client";
import Mail from "../types/Mail";

export function sendEmail(mailModel:Mail) {
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
    console.log(mail);
    let response = Client.api("/me/sendMail").post({ message: mail });
    console.log(response);
  } catch (error) {
    throw error;
  }
}

export default {
  sendEmail,
};
