const { format } = require('timeago.js')

const helpers = {}

helpers.timeago = (times) => {
    return format(times)
}

module.exports = helpers