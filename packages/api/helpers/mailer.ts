import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'

import MailerConfig from './mailer.config'

const mailConfig =
    process.env.NODE_ENV === 'production'
        ? MailerConfig.production
        : MailerConfig.development
// const FROM_EMAIL = 'B68 API <api@b68.dev>'

const transporter = nodemailer.createTransport(mailConfig)

const sendMailWrapper = async (mail: Mail.Options): Promise<void> => {
    try {
        await transporter.sendMail(mail)
    } catch (err) {
        console.log(err)
    }
}

export default sendMailWrapper
