import { Client } from "@microsoft/microsoft-graph-client";
import { AuthCodeMSALBrowserAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser";
import { PublicClientApplication, InteractionType } from "@azure/msal-browser";

export const getClient = async (): Promise<Client> => {
  const pca = new PublicClientApplication({
    auth: {
      clientId: import.meta.env.VITE_MSGRAPH_APP_ID,
      authority:
        "https://login.microsoftonline.com/" +
        import.meta.env.VITE_MSGRAPH_TENANT_ID,
      redirectUri: import.meta.env.VITE_MSGRAPH_REDIRECT_URI,
    },
  });
  await pca.initialize();

  // Authenticate to get the user's account
  const authResult = await pca.acquireTokenPopup({
    scopes: ["Mail.Send"],
  });

  if (!authResult.account) {
    throw new Error("Could not authenticate");
  }
  if (window.location.hash !== "") {
    console.log(window.location.hash);
  }
  const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(pca, {
    account: authResult.account,
    interactionType: InteractionType.Popup,
    scopes: ["Mail.Send"],
  });

  const client = Client.initWithMiddleware({ authProvider: authProvider });
  return client;
};
