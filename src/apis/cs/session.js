export function sGetUploadSession ({
  path = '/app',
  type = 2 // 选填，默认普通。1-普通；2-管理员
} = {}) {
  return Promise.reject({
    message: '没有配置真实的上传地址，请根据需要请修改图片上传组件'
  })
}
