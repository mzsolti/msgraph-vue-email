export default interface Mail {
  sendTo: { email: string; name: string };
  from: { email: string; name: string };
  replyTo: { email: string; name: string };
  subject: string;
  body: string;
  isHtml: boolean;
}
