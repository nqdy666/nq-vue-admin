import Notification from './instance'

const prefixKey = 'message_key_'

let defaultDuration = 1.5
let messageInstance
let name = 1

function getMessageInstance () {
  messageInstance = messageInstance || Notification.newInstance()
  return messageInstance
}

function notice (message, duration = defaultDuration, type, onClose) {
  if (typeof message === 'object') {
    duration = message.duration || defaultDuration
    onClose = message.onClose
    message = message.message
  }
  if (!onClose) {
    onClose = function () {
    }
  }

  const instance = getMessageInstance()

  instance.notice({
    name: `${prefixKey}${name}`,
    duration,
    type,
    transitionName: 'move-up',
    content: `<span class="text">${message}</span>`,
    onClose
  })

  // 用于手动消除
  return (function () {
    const target = name++

    return function () {
      instance.remove(`${prefixKey}${target}`)
    }
  })()
}

export default {
  info (message, duration, onClose) {
    return notice(message, duration, 'info', onClose)
  },
  warning (message, duration, onClose) {
    return notice(message, duration, 'warning', onClose)
  },
  loading (message, duration, onClose) {
    return notice(message, duration, 'loading', onClose)
  },
  error (message, duration, onClose) {
    return notice(message, duration, 'error', onClose)
  },
  success (message, duration, onClose) {
    return notice(message, duration, 'success', onClose)
  },
  config (options) {
    if (options.duration) {
      defaultDuration = options.duration
    }
  },
  destroy () {
    const instance = getMessageInstance()
    messageInstance = null
    instance.destroy()
  }
}
