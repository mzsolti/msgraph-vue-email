# msgraph-vue-email

Send email with vue and microsoft graph api

## How to run the project

### Prerequisites

**Setup of an azure spa web appication**

1. Go to https://portal.azure.com/
2. Select Microsoft Extra Id
   ![A screenshot of the Microsoft Extra Id](/images/microsoft-extra-id.png)
3. Select App Registrations
4. Select New Registration
   ![A screenshot of the New Registration Button](/images/new-registration.png)
   Under Redirect URI, set the first drop-down to Single-page application (SPA) and set the value to http://localhost:5173 (or whenever hostname will run the app).
   ![A screenshot of the App Registration Page](/images/select-spa.png)
   Click Register
   Write down Application (client) ID, will be used in .env as VITE_MSGRAPH_APP_ID
   Write down Directory (tenant) ID, will be used in .env as VITE_MSGRAPH_TENANT_ID
   Go to Api Permissions
   ![A screenshot of the Api Permission Page](/images/api-permission.png)
   Add a permission
   Select Microsoft graph
   Select Delegated Permissions
   Select Mail.Send
   ![A screenshot of the Mail Send Permission Listed](/images/permission-mail-send.png)

**To run the project you need the following:**

- [Node.js](https://nodejs.org) installed on your development machine. If you do not have Node.js, visit the previous link for download options. (**Note:** This tutorial was written with Node version 20.10.0. The steps in this guide may work with other versions, but that has not been tested.)
- Either a personal Microsoft account with a mailbox on Outlook.com, or a Microsoft work or school account.

### Install node modules

```Shell
npm install

```

### set up environment variables

1. Copy the **.env.example** to **.env** and make the necessary changes to it, based on the instrunctions above.

### Run the application

1. Run the following command in your CLI to start the application.

```Shell
npm run dev

```

2. Open a browser and browse to `http://localhost:5173`.
