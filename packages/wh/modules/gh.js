const octokit = require('../helper/github')

module.exports = async (req, res) => {
    const notif =
        await octokit.rest.activity.listNotificationsForAuthenticatedUser()
    res.send(notif.data)
}
