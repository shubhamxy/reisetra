import { readFileSync } from "fs";
import handlebars from "handlebars";
import { createParams, IParams } from "./aws";
import { services, app } from "src/config";
const images = {
  hero: 'https://raw-soda.s3.ap-south-1.amazonaws.com/static/success.png',
  authentication: 'https://raw-soda.s3.ap-south-1.amazonaws.com/static/authentication.png',
  forgot: 'https://raw-soda.s3.ap-south-1.amazonaws.com/static/forgot.png',
  login: 'https://raw-soda.s3.ap-south-1.amazonaws.com/static/login.png',
  logo: 'https://raw-soda.s3.ap-south-1.amazonaws.com/static/logo.png',
  welcome: 'https://raw-soda.s3.ap-south-1.amazonaws.com/static/welcome.png',
};
const common = readFileSync(process.env.NODE_PATH + "/views/mail/common.hbs", "utf8");
const commonTemplate = handlebars.compile(common);
const options = (
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

export function passwordResetEmail(user: { email: string; token: string }) {
  const config = app();
  const passwordResetLink = `${config.clientUrl}/login/reset-password?email=${user.email}&token=${user.token}`;
  return createParams(
    options(user.email, {
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
  const emailVerifyLink = `${config.apiUrl}/auth/email/verify/${user.id}/${user.token}`;
  return createParams(
    options(user.email, {
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
