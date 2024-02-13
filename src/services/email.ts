import { ClientSecretCredential, GetTokenOptions } from "@azure/identity";
import { Client } from "@microsoft/microsoft-graph-client";
import {
  TokenCredentialAuthenticationProvider,
  TokenCredentialAuthenticationProviderOptions,
} from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";

import Mail from "../types/Mail";

export function sendEmail(mailModel: Mail) {
  let userId = import.meta.env.VITE_MSGRAPH_USER_ID ?? "";
  let tenantId = import.meta.env.VITE_MSGRAPH_TENANT_ID ?? "";
  let clientId = import.meta.env.VITE_MSGRAPH_CLIENT_ID ?? "";
  let clientSecret = import.meta.env.VITE_MSGRAPH_CLIENT_SECRET ?? "";
  // @azure/identity
  const credential = new ClientSecretCredential(
    import.meta.env.VITE_MSGRAPH_TENANT_ID ?? "",
    import.meta.env.VITE_MSGRAPH_CLIENT_ID ?? "",
    import.meta.env.VITE_MSGRAPH_CLIENT_SECRET ?? "",
  );
  /*
  // @microsoft/microsoft-graph-client/authProviders/azureTokenCredentials
  const authProvider = new TokenCredentialAuthenticationProvider(credential, {
    // The client credentials flow requires that you request the
    // /.default scope, and pre-configure your permissions on the
    // app registration in Azure. An administrator must grant consent
    // to those permissions beforehand.
    //scopes: ["https://graph.microsoft.com/.default"],
    scopes: ["Mail.Send"],
  });

  const client = Client.initWithMiddleware({ authProvider: authProvider });*/
  /*  const options = {
    authProvider,
  };

  const client = Client.init(options);*/

  // Create an instance of the TokenCredential class that is imported
  //const tokenCredential = new ClientSecretCredential("your_tenantId", "your_clientId", "your_clientSecret");
  const tokenCredential = new ClientSecretCredential(
    import.meta.env.VITE_MSGRAPH_TENANT_ID ?? "",
    import.meta.env.VITE_MSGRAPH_CLIENT_ID ?? "",
    import.meta.env.VITE_MSGRAPH_CLIENT_SECRET ?? "",
  );

  // Set your scopes and options for TokenCredential.getToken (Check the ` interface GetTokenOptions` in (TokenCredential Implementation)[https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/core-auth/src/tokenCredential.ts])
  const getTokenOptions: GetTokenOptions = {};

  const options: TokenCredentialAuthenticationProviderOptions = {
    scopes: ["Mail.Send"],
    getTokenOptions,
  };

  // Create an instance of the TokenCredentialAuthenticationProvider by passing the tokenCredential instance and options to the constructor
  const authProvider = new TokenCredentialAuthenticationProvider(
    tokenCredential,
    options,
  );
  const client = Client.initWithMiddleware({
    debugLogging: true,
    authProvider: authProvider,
  });

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
    let response = client
      .api("/users/" + userId + "/sendMail")
      .post({ message: mail });
    console.log(response);
  } catch (error) {
    throw error;
  }
}

export default {
  sendEmail,
};
