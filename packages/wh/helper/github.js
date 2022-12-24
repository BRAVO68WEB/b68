const { Octokit } = require('@octokit/rest')

const token = ''

const octokit = new Octokit({
    auth: token,
})

module.exports = octokit
