/**
 * 向组件 options 注入数据
 * @method injectOptionsToComponent
 * @param  {component}  component   Vue 组件
 * @param  {object}     injection   待注入的数据
 * @return {component}              注入后的 Vue 组件
 */
export function injectOptionsToComponent (component, injection) {
  if (component) {
    if (process.env.NODE_ENV === 'production') {
      Object.assign(component, injection)
    } else {
      const { _Ctor } = component
      if (_Ctor && _Ctor[0] && _Ctor[0].options) {
        Object.assign(_Ctor[0].options, injection)
      }
    }
  }
  return component
}
