const { Webhook, MessageBuilder } = require('discord-webhook-node')
const { webhook_url } = require('../config')

const hook = new Webhook(webhook_url)

const embed = new MessageBuilder()
    .setTitle('B68 Web Hook')
    .setAuthor(
        'B68 Web Hook',
        'https://cdn.discordapp.com/embed/avatars/5.png',
        'https://www.google.com'
    )
    .setURL('https://www.google.com')
    .addField('Notification For', 'Test')
    .setColor(778559)
    .setThumbnail('https://cdn.discordapp.com/embed/avatars/2.png')
    .setDescription(
        'This is a test message about testing the B68 Web Hook system'
    )
    .setFooter('B68 Web Hook', 'https://cdn.discordapp.com/embed/avatars/5.png')
    .setTimestamp()

module.exports = {
    hook,
    embed,
}
