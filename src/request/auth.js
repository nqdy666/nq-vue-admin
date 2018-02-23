import Sha from 'jssha'

function getNonce (diff) {
  function rnd (min, max) {
    const arr = [
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
      'a', 'b', 'c', 'd', 'e', 'f', 'g',
      'h', 'i', 'j', 'k', 'l', 'm', 'n',
      'o', 'p', 'q', 'r', 's', 't',
      'u', 'v', 'w', 'x', 'y', 'z',
      'A', 'B', 'C', 'D', 'E', 'F', 'G',
      'H', 'I', 'J', 'K', 'L', 'M', 'N',
      'O', 'P', 'Q', 'R', 'S', 'T',
      'U', 'V', 'W', 'X', 'Y', 'Z'
    ]

    const range = max ? max - min : min
    let str = ''
    let i
    const length = arr.length - 1

    for (i = 0; i < range; i++) {
      str += arr[Math.round(Math.random() * length)]
    }

    return str
  }

  return new Date().getTime() + (diff || 0) + ':' + rnd(16)
}

function getMac (nonce, method, url, host, key) {
  const sha = new Sha('SHA-256', 'TEXT')
  sha.setHMACKey(key, 'TEXT')
  sha.update([nonce, method, url, host, ''].join('\n'))
  return sha.getHMAC('B64')
}

export function hasAuthorization (tokens) {
  return (tokens && tokens.expires_at) ? true : false
}

export function getAuthorizationByFullInfo ({
  method,
  url,
  host,
  token
}) {
  const { access_token, mac_key, diff = 0 } = token
  const nonce = getNonce(diff)

  return ['MAC id="' + access_token + '"',
    'nonce="' + nonce + '"',
    'mac="' + getMac(nonce, method, url, host, mac_key) + '"'
  ].join(',')
}
