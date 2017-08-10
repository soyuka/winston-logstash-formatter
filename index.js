const os = require('os')

function LogstashFormatter(options) {
  return function format(message) {
    const fields = {channel: options.channel, level: message.level}

    for (let i in message.meta) {
      fields[`ctx_${i}`] = message.meta[i]
    }

    return JSON.stringify({
      '@timestamp': message.timestamp(),
      '@source': options.source || os.hostname(),
      '@fields': fields,
      '@message': message.message,
      '@tags': options.tags ? options.tags : [options.channel],
      '@type': options.channel
    })

  }
}

module.exports = LogstashFormatter
