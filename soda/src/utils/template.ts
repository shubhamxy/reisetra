import { readFileSync } from 'fs';
import { join } from 'path';
import handlebars from 'handlebars';
import { createParams, IParams } from './aws';
import {
  API_URL,
  AWS_SES_DEFAULT_EMAIL_SENDER,
  EMAIL_SENDER_NAME,
  FRONTEND_URL,
} from 'src/config';

const common = readFileSync(
  join(__dirname + '/../views/mail/common.hbs'),
  'utf8',
);
const commonTemplate = handlebars.compile(common);
const options = (
  email: string,
  locals: {
    messageSubject: string;
    preheader: string;
    header: string;
    subheader: string;
    heroImageSrc: string;
    heroLink: string;
    mainParagraph: string;
    mainCallToActionUrl: string;
    mainCallToActionText: string;
    footerText: string;
  },
): Partial<IParams> => {
  const config = {
    source: `"${EMAIL_SENDER_NAME}" <${AWS_SES_DEFAULT_EMAIL_SENDER}>`,
    to: [email],
    subject: `${EMAIL_SENDER_NAME} | ${locals.messageSubject}`,
    html: commonTemplate(locals),
    text: `${locals.mainParagraph}`,
  };
  console.log('info', `Sending password reset email to ${email}.`, config);
  return config;
};

export function passwordResetEmail(user: {
  email: string;
  token: string;
}) {
  const passwordResetLink = `${FRONTEND_URL}/auth/reset-password?email=${user.email}&token=${user.token}`;
  return createParams(
    options(user.email, {
      messageSubject: 'Reset Password',
      preheader: ``,
      header: 'Reset Password',
      subheader: `A password reset event has been triggered. The password reset window is limited to two hours.`,
      heroImageSrc:
        'https://media.giphy.com/media/Xev2JdopBxGj1LuGvt/source.gif',
      heroLink: 'https://reisetra.com',
      mainParagraph: `To complete the password reset process, click on the button below or use this link ${passwordResetLink}`,
      mainCallToActionUrl: passwordResetLink,
      mainCallToActionText: 'Reset',
      footerText: 'This message was ment for ' + user.email + '.',
    }),
  );
}

export function emailVerificationEmail(user: {
  email: string;
  token: string;
  id: string;
}) {
  const emailVerifyLink = `${API_URL}/auth/email/verify/${user.id}/${user.token}`;
  return createParams(
    options(user.email, {
      messageSubject: 'Confirm your email address',
      preheader: ``,
      header: 'Welcome to reisetra',
      subheader: `Verify your e-mail to finish signing up for Reisetra`,
      heroImageSrc:
        'https://media.giphy.com/media/Xev2JdopBxGj1LuGvt/source.gif',
      heroLink: 'https://reisetra.com',
      mainParagraph: `Please confirm that ${user.email} is your e-mail address by clicking on the button below or use this link ${emailVerifyLink}`,
      mainCallToActionUrl: emailVerifyLink,
      mainCallToActionText: 'Verify',
      footerText: 'This message was ment for ' + user.email + '.',
    }),
  );
}
