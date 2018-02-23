/* eslint no-new-func: 0 */
export default typeof window !== 'undefined'
  ? window : typeof self !== 'undefined'
    ? self : Function('return this')()
