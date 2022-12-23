const { hook, embed } = require('../lib/wh')

module.exports = function (req, res, next) {
    console.log(JSON.stringify(embed))
    res.send('test')
}
