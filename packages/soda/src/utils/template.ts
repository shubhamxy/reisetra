import { readFileSync } from "fs";
import handlebars from "handlebars";
import { createParams, IParams } from "./aws";
import { services, app } from "src/config";
const awsConfig = services().aws;
const images = {
  hero: awsConfig.s3Url + '/static/success.png',
  shopping: awsConfig.s3Url + '/static/shopping.png',
  support: awsConfig.s3Url + '/static/support.png',
  authentication: awsConfig.s3Url + '/static/authentication.png',
  forgot: awsConfig.s3Url + '/static/forgot.png',
  login: awsConfig.s3Url + '/static/login.png',
  logo: awsConfig.s3Url + '/static/logo.png',
  welcome: awsConfig.s3Url + '/static/welcome.png',
};
const common = readFileSync(process.env.NODE_PATH + "/views/mail/common.hbs", "utf8");
const transaction = readFileSync(process.env.NODE_PATH + "/views/mail/transaction.hbs", "utf8");
const commonTemplate = handlebars.compile(common);
const transactionTemplate = handlebars.compile(transaction);

const commonOptions = (
  email: string,
  locals: {
    messageSubject: string;
    preheader: string;
    header: string;
    subheader: string;
    logoImageSrc: string;
    heroImageSrc: string;
    heroLink: string;
    mainParagraph: string;
    mainCallToActionUrl: string;
    mainCallToActionText: string;
    footerText: string;
    contactEmail: string;
    [key: string]: any;
  }
): Partial<IParams> => {
  const config = services();
  return {
    source: `"${config.mailer.senderName}" <${config.aws.sesEmailSender}>`,
    to: [email],
    subject: `${locals.messageSubject || ''}`,
    html: commonTemplate(locals),
    text: `${locals.mainParagraph}`,
  };
};

const transactionOptions = (
  email: string,
  locals: {
    messageSubject: string;
    preheader: string;
    header: string;
    subheader: string;
    logoImageSrc: string;
    heroImageSrc: string;
    heroLink: string;
    mainParagraph: string;
    mainCallToActionUrl: string;
    mainCallToActionText: string;
    footerText: string;
    contactEmail: string;
    [key: string]: any;
  }
): Partial<IParams> => {
  const config = services();
  return {
    source: `"${config.mailer.senderName}" <${config.aws.sesEmailSender}>`,
    to: [email, 'contact@reisetra.com'],
    subject: `${locals.messageSubject || ''}`,
    html: transactionTemplate(locals),
    text: `${locals.mainParagraph}`,
  };
};
export function passwordResetEmail(user: { email: string; token: string }) {
  const config = app();
  const passwordResetLink = `${config.clientUrl}/login/reset-password?email=${user.email}&token=${user.token}`;
  return createParams(
    commonOptions(user.email, {
      messageSubject: "Reset Password",
      preheader: ``,
      header: "Reset Password",
      subheader: `A password reset event has been triggered. The password reset window is limited to two hours.`,
      logoImageSrc: images.logo,
      heroImageSrc: images.authentication,
      heroLink: "https://reisetra.com",
      mainParagraph: `To complete the password reset process, click on the button below.`,
      contactEmail: "contact@reisetra.com",
      mainCallToActionUrl: passwordResetLink,
      mainCallToActionText: "Reset Password",
      footerText: "This message was ment for " + user.email + ".",
    })
  );
}

export function emailVerificationEmail(user: {
  email: string;
  token: string;
  id: string;
}) {
  const config = app();
  const emailVerifyLink = `${config.clientUrl}/login/verify?id=${user.id}&token=${user.token}`;
  return createParams(
    commonOptions(user.email, {
      messageSubject: "Confirm your email address",
      preheader: ``,
      header: "Welcome",
      subheader: `Verify your e-mail to finish signing up`,
      logoImageSrc: images.logo,
      heroImageSrc: images.welcome,
      heroLink: "https://reisetra.com",
      mainParagraph: `Please confirm that ${user.email} is your e-mail address by clicking on the button below.`,
      mainCallToActionUrl: emailVerifyLink,
      mainCallToActionText: "Verify Email",
      footerText: "This message was ment for " + user.email + ".",
      contactEmail: "contact@reisetra.com",
    })
  );
}


export function supportEmailAck(data: {
  id: string;
  email: string;
  ticketId: string;
  subject: string;
}) {
  const config = app();
  const supportLink = `${config.clientUrl}/support?ticketId=${data.ticketId}`;
  return createParams(
    commonOptions(data.email, {
      messageSubject: `${data.subject} | Support Ticket #${data.ticketId}`,
      preheader: ``,
      header: "Dear Customer,",
      subheader: `A support ticket has been created and assigned the ticket number #${data.ticketId}`,
      logoImageSrc: images.logo,
      heroImageSrc: images.support,
      heroLink: "https://reisetra.com",
      mainParagraph: `We will attempt to resolve your query immediately. Our team works actively between 8:30 am to 8:30 pm on weekdays. The general wait time for most tickets is less than 24 working hours.`,
      mainCallToActionUrl: supportLink,
      mainCallToActionText: "Support",
      footerText: "This message was ment for " + data.email + ".",
      contactEmail: "contact@reisetra.com",
    })
  );
}


export function supportEmail(data: {
  id: string;
  email: string;
  ticketId: string;
  description: string;
  orderId: string;
  subject: string;
}) {
  const config = app();
  const supportLink = `${config.clientUrl}/support?ticketId=${data.ticketId}`;
  return createParams(
    commonOptions('contact@reisetra.com', {
      messageSubject: `${data.subject} | Support Ticket #${data.ticketId}`,
      preheader: ``,
      header: `Support ticket for ${data.id}  ${data.email}`,
      subheader: `A support ticket has been created and assigned the ticket number #${data.ticketId} for Order #${data.orderId}`,
      logoImageSrc: images.logo,
      heroImageSrc: images.support,
      heroLink: "https://reisetra.com",
      mainParagraph: `${data.description}`,
      mainCallToActionUrl: supportLink,
      mainCallToActionText: "Support",
      footerText: "This message was ment for " + data.email + ".",
      contactEmail: "contact@reisetra.com",
    })
  );
}


export function transactionEmail(data: {
  id: string;
  email: string;
  subject: string;
  description: string;
  orderId: string;
  orderItems: {
      sku: string,
      title: string,
      options: string,
      qty: string | number,
    }[];
  address: string;
  phone: string;
  status: string;
  transaction: {
    id: string;
    subTotal: string | number,
    taxes: string | number,
    shipping: string | number,
    grandTotal: string | number,
  }
}) {
  const config = app();
  const orderLink = `${config.clientUrl}/orders?id=${data.orderId}`;
  return createParams(
    transactionOptions(data.email, {
      messageSubject: data.subject,
      preheader: ``,
      header: "Dear Customer,",
      subheader: data.status,
      logoImageSrc: images.logo,
      heroImageSrc: images.shopping,
      heroLink: "https://reisetra.com",
      mainParagraph: data.description,
      mainCallToActionUrl: orderLink,
      mainCallToActionText: "Track your package",
      footerText: "This message was ment for " + data.email + ".",
      contactEmail: "contact@reisetra.com",
      orders: data.orderItems,
      transaction: data.transaction,
      address: data.address,
      email: data.email,
      phone: data.phone,
    })
  );
}
