import { ConfigService } from '@nestjs/config'
import { AppEnv, Config, ServicesEnv } from '@app/config'
import { SESMailDTO } from './aws/types'
import { readFileSync } from 'fs'
import { handlebars } from 'hbs'
import { Injectable } from '@nestjs/common'
import { createParams } from './aws'
import { getUnsubscribeKey, readFilesSync } from '@app/utils'
import { nanoid } from 'nanoid'
import { CacheService } from '@app/cache'

@Injectable()
export class TemplateService {
  private readonly appConfig: AppEnv
  private readonly awsConfig
  private readonly mailer
  private readonly images
  private readonly commonData
  private readonly socials
  private readonly templates: { [key: string]: any } = {}

  constructor(
    private readonly configService: ConfigService,
    private readonly cache: CacheService
  ) {
    this.appConfig = configService.get<AppEnv>(Config.app)
    this.awsConfig = configService.get<ServicesEnv>(Config.services).aws
    this.mailer = configService.get<ServicesEnv>(Config.services).mailer
    this.images = {
      hero: this.awsConfig.s3Url + '/static/success.png',
      shopping: this.awsConfig.s3Url + '/static/shopping.png',
      support: this.awsConfig.s3Url + '/static/support.png',
      authentication: this.awsConfig.s3Url + '/static/authentication.png',
      forgot: this.awsConfig.s3Url + '/static/forgot.png',
      login: this.awsConfig.s3Url + '/static/login.png',
      logo: this.awsConfig.s3Url + '/static/logo.png',
      welcome: this.awsConfig.s3Url + '/static/welcome.png',
    }

    this.commonData = {
      heroLink: this.appConfig.clientUrl,
      contactEmail: this.appConfig.contactEmail,
      logoImageSrc: this.images.logo,
    }

    this.socials = {
      fbIconSrc: this.awsConfig.s3Url + '/static/fb.png',
      whatsAppIconSrc: this.awsConfig.s3Url + '/static/wa.png',
      instaIconSrc: this.awsConfig.s3Url + '/static/insta.png',
      instagram: this.appConfig.socials.instagram,
      facebook: this.appConfig.socials.facebook,
      whatsapp: this.appConfig.socials.whatsapp,
    }

    const files = readFilesSync(process.env.NODE_PATH + '/views/mail')
    files.forEach((file) => {
      // loads all .hbs files and compiles them.
      if (file.ext === '.hbs') {
        this.templates[file.name] = handlebars.compile(
          readFileSync(file.filepath, 'utf-8')
        )
      }
    })
  }

  commonOptions = (
    email: string,
    locals: {
      messageSubject: string
      preheader: string
      header: string
      subheader: string
      logoImageSrc: string
      heroImageSrc: string
      heroLink: string
      mainParagraph: string
      mainCallToActionUrl: string
      mainCallToActionText: string
      footerText: string
      contactEmail: string
      [key: string]: any
    }
  ): Partial<SESMailDTO> => {
    return {
      source: `"${this.mailer.senderName}" <${this.awsConfig.sesEmailSender}>`,
      to: [email],
      subject: `${locals.messageSubject || ''}`,
      html: this.templates.common(locals),
      text: `${locals.mainParagraph}`,
    }
  }

  transactionOptions = (
    email: string,
    locals: {
      messageSubject: string
      preheader: string
      header: string
      subheader: string
      logoImageSrc: string
      heroImageSrc: string
      heroLink: string
      mainParagraph: string
      mainCallToActionUrl: string
      mainCallToActionText: string
      footerText: string
      contactEmail: string
      [key: string]: any
    }
  ): Partial<SESMailDTO> => {
    return {
      source: `"${this.mailer.senderName}" <${this.awsConfig.sesEmailSender}>`,
      to: [email],
      bcc: [this.appConfig.contactEmail],
      subject: `${locals.messageSubject || ''}`,
      html: this.templates.transaction(locals),
      text: `${locals.mainParagraph}`,
    }
  }

  unsubscribeLink = async (email) =>
    `${
      this.appConfig.apiUrl
    }/notifications/unsubscribe?email=${email}&token=${await this.createUnsubscribeToken(
      email
    )}}`

  async passwordResetEmail(user: { email: string; token: string }) {
    const config = this.appConfig
    return createParams(
      this.commonOptions(user.email, {
        ...this.commonData,
        messageSubject: 'Reset Password',
        preheader: ``,
        header: 'Reset Password',
        subheader: `A password reset event has been triggered. The password reset window is limited to two hours.`,
        heroImageSrc: this.images.authentication,
        mainParagraph: `To complete the password reset process, click on the button below.`,
        mainCallToActionUrl: `${config.authUrl}/reset-password?email=${user.email}&token=${user.token}`,
        mainCallToActionText: 'Reset Password',
        footerText: `This message was meant for ${user.email}.`,
        unsubscribeLink: await this.unsubscribeLink(user.email),
        ...this.socials,
      })
    )
  }

  async emailVerificationEmail(user: {
    email: string
    token: string
    id: string
  }) {
    const config = this.appConfig
    return createParams(
      this.commonOptions(user.email, {
        ...this.commonData,
        heroImageSrc: this.images.welcome,
        messageSubject: 'Confirm your email address',
        preheader: ``,
        header: 'Welcome',
        subheader: `Verify your e-mail to finish signing up`,
        mainParagraph: `Please confirm that ${user.email} is your e-mail address by clicking on the button below.`,
        mainCallToActionUrl: `${config.authUrl}/verify?id=${user.id}&token=${user.token}`,
        mainCallToActionText: 'Verify Email',
        footerText: `This message was meant for ${user.email}.`,
        unsubscribeLink: await this.unsubscribeLink(user.email),
        ...this.socials,
      })
    )
  }

  async supportEmailAck(data: {
    id: string
    email: string
    ticketId: string
    subject: string
  }) {
    const config = this.appConfig
    return createParams(
      this.commonOptions(data.email, {
        ...this.commonData,
        messageSubject: `${data.subject} | Support Ticket #${data.ticketId}`,
        preheader: ``,
        header: 'Dear Customer,',
        subheader: `A support ticket has been created and assigned the ticket number #${data.ticketId}`,
        heroImageSrc: this.images.support,
        mainParagraph: `We will attempt to resolve your query immediately. Our team works actively between 8:30 am to 8:30 pm on weekdays. The general wait time for most tickets is less than 24 working hours.`,
        mainCallToActionUrl: `${config.clientUrl}/support?ticketId=${data.ticketId}`,
        mainCallToActionText: 'Support',
        footerText: `This message was meant for ${data.email}.`,
        unsubscribeLink: await this.unsubscribeLink(data.email),
        ...this.socials,
      })
    )
  }

  async supportEmail(data: {
    id: string
    email: string
    ticketId: string
    description: string
    orderId: string
    subject: string
  }) {
    const config = this.appConfig
    return createParams(
      this.commonOptions(this.appConfig.contactEmail, {
        ...this.commonData,
        messageSubject: `${data.subject} | Support Ticket #${data.ticketId}`,
        preheader: ``,
        header: `Support ticket for ${data.id} ${data.email}`,
        subheader: `A support ticket has been created and assigned the ticket number #${data.ticketId} for Order #${data.orderId}`,
        heroImageSrc: this.images.support,
        mainParagraph: `${data.description}`,
        mainCallToActionUrl: `${config.clientUrl}/support?ticketId=${data.ticketId}`,
        mainCallToActionText: 'Support',
        footerText: `This message was meant for ${data.email}.`,
        unsubscribeLink: await this.unsubscribeLink(data.email),
        ...this.socials,
      })
    )
  }

  async transactionEmail(data: {
    id: string
    email: string
    subject: string
    description: string
    orderId: string
    orderItems: {
      sku: string
      title: string
      options: string
      qty: string | number
    }[]
    address: string
    phone: string
    status: string
    transaction: {
      id: string
      subTotal: string | number
      taxes: string | number
      shipping: string | number
      grandTotal: string | number
    }
  }) {
    const config = this.appConfig
    return createParams(
      this.transactionOptions(data.email, {
        ...this.commonData,
        ...this.socials,
        messageSubject: data.subject,
        preheader: ``,
        header: 'Dear Customer,',
        subheader: data.status,
        logoImageSrc: this.images.logo,
        heroImageSrc: this.images.shopping,
        mainParagraph: data.description,
        mainCallToActionUrl: `${config.clientUrl}/orders?id=${data.orderId}`,
        mainCallToActionText: 'Track your package',
        footerText: `This message was meant for ${data.email}.`,
        orders: data.orderItems,
        transaction: data.transaction,
        address: data.address,
        email: data.email,
        phone: data.phone,
        unsubscribeLink: await this.unsubscribeLink(data.email),
      })
    )
  }

  async createUnsubscribeToken(email: string): Promise<string> {
    const storedToken = (await this.cache.get(
      getUnsubscribeKey(email)
    )) as string
    if (storedToken) {
      return storedToken
    }
    const token = nanoid(8)
    await this.cache.set(getUnsubscribeKey(email), token)
    return token
  }

  async verifyUnsubscribeToken(email: string, token: string): Promise<boolean> {
    const storedToken = (await this.cache.get(
      getUnsubscribeKey(email)
    )) as string
    if (!storedToken) {
      return false
    }
    return storedToken === token
  }
}
