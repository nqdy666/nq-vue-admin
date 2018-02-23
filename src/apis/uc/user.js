export function sFetchUser (userId) {
  return Promise.resolve({
    name: 'admin'
  })
}

export function sGetAvatarUrl ({
  user_id
} = {}) {
  return 'https://nzijkk7pu.qnssl.com/FoTh8RRxzknrr_MxVIk-pJ2SZOca?imageMogr/v2/auto-orient/crop/!64x64a0a0'
}
