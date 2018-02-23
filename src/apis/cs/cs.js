export function getDownloadUrl (dentry_id, {
  attachment = false,
  size = ''
} = {}) {
  let url = 'https://nzijkk7pu.qnssl.com/FmQnnA3k1ni2YHL8vhWQfr2pIBcF'
  if (attachment) {
    url += '&attachment=true'
  }
  if (size) {
    url += '&size=' + size
  }
  return url
}

export function getUploadUrl (session) {
  return `'http://example.com/upload?session=${session}`
}
