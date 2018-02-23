export function sGetTokens ({
  login_name,
  password
} = {}) {
  return Promise.resolve({
    'access_token': '6F7AA1A59697C5A9DD6841343C95DD590C7863612EC6FE71E4353100DBBFB63E6440A0E0A387B539',
    'expires_at': '2018-02-20T14:35:16.651+0800',
    'server_time': '2018-02-13T14:35:16.655+0800',
    'user_id': 2081401411
  })
}

export function sCheckTokens ({
  access_token
} = {}) {
  return Promise.resolve({
    'access_token': '6F7AA1A59697C5A9DD6841343C95DD590C7863612EC6FE71E4353100DBBFB63E6440A0E0A387B539',
    'expires_at': '2018-02-20T14:35:16.651+0800',
    'server_time': '2018-02-13T14:35:16.655+0800',
    'user_id': 2081401411
  })
}

export function sDelTokens () {
  return Promise.resolve()
}
