import * as rules from './rules'

/**
 * 是否为不空，为0算不空
 * 如果是object，如果所有值都是空，算空
 * @param val
 * @returns {*}
 */
function isNotEmpty (val) {
  if (val === 0) {
    return true
  }
  if (val !== null && typeof val === 'object') {
    return Object.values(val).join('')
  }
  return val
}

export default {
  install (Vue) {
    Vue.mixin({
      beforeCreate () {
        const options = this.$options
        const { validator, parent } = options

        function nextTick (auto, validation) {
          this.$nextTick(() => {
            // 定义了校验规则
            if (this.validate) {
              validation.fields.push(this)
              // 加载完成自动检查
              if (auto) {
                this.$validate().catch(e => e)
              }
            }
          })
        }

        if (validator) {
          // 在入口处定义 $validation
          Vue.util.defineReactive(this, '$validation', {
            fields: [],
            errors: []
          })
          this.$validationEntry = this

          // 如果有$parentValidation，则表示嵌套表单
          const { $parentValidation, $parentFormValidationEntry } = parent || {}
          if ($parentValidation) {
            // 递归连接父级的 $validation
            this.$parentValidation = $parentValidation
            this.$parentFormValidationEntry = $parentFormValidationEntry
            nextTick.call(this, $parentFormValidationEntry.$options.validator.auto, this.$parentValidation)
          } else {
            nextTick.call(this, validator.auto, this.$validation)
          }
        } else if (parent) {
          // 递归连接父级的 $validation
          const { $validation, $parentValidation } = parent
          const validation = $validation || $parentValidation
          if (validation) {
            const { $validationEntry, $parentFormValidationEntry } = parent
            const validationEntry = $validationEntry || $parentFormValidationEntry
            this.$parentValidation = validation
            this.$parentFormValidationEntry = validationEntry
            nextTick.call(this, validationEntry.$options.validator.auto, this.$parentValidation)
          }
        }
      }
    })

    /**
     * $validate
     * validate vm recursively.
     * fromEntry 有表单的子组件触发
     * @return {promise}
     */
    Vue.prototype.$validate = async function $validate (fromEntry) {
      const { validate, $validation, $parentValidation, $validationEntry } = this
      const validation = fromEntry ? $parentValidation : $validation

      function updateValidation (replacement) {
        const field = this.field || this
        const { errors } = validation
        const found = errors.some((error, index) => {
          if (error.field === field) {
            const params = [index, 1]
            if (replacement) {
              params.push(replacement)
            }
            errors.splice.apply(errors, params)
            return true
          }
          return false
        })

        if (!found && replacement) {
          errors.push(replacement)
        }
        return validation
      }

      // updateValidation.call(this, { type: this.field || this, message: '' })

      // 如果此处为校验入口
      if ($validationEntry && !fromEntry) {
        // 顶级往下校验所有子组件
        return Promise.all(validation.fields
          .map(field => field.$validate(true)))
          // 总是返回 validation
          .then(() => validation)
          .catch(() => Promise.reject(validation))
      } else {
        if (!validate) {
          return validation
        }

        let validateValue = this.customValidateValue !== undefined ? this.customValidateValue : this.value
        if (typeof (validateValue) === 'function') {
          try {
            validateValue = await validateValue()
          } catch (error) {
            validateValue = error
          }
        }
        if ((typeof (validateValue) === 'object' && validateValue.errors && validateValue.fields)) {
          return Promise.reject(updateValidation.call(this, {
            field: this.field || this,
            rule: 'required',
            message: '请完善信息'
          }))
        }

        const hasRequiredRule = validate['required']
        try {
          await Promise.all(Object.keys(validate).map(async key => {
            const { validator = rules[key], rule, message } = validate[key]

            function reject () {
              return Promise.reject({
                field: this.field || this,
                rule,
                message
              })
            }
            if (validator) {
              if (hasRequiredRule || isNotEmpty(validateValue)) {
                try {
                  // reject if falsy
                  if (!await validator(validateValue, rule)) {
                    return reject.call(this)
                  }
                } catch (e) {
                  return reject.call(this)
                }
              }
            } else {
              process.env.NODE_ENV === 'production' || console.warn(`'${key}' is NOT a valid validator`)
            }
          }))
          return new Promise(resolve => {
            // 防止两次快速校验，优先校验了错误信息，但是结果却晚设置，导致校验结果异常的问题
            setTimeout(() => {
              resolve(updateValidation.call(this))
            }, 0)
          })
        } catch (e) {
          return Promise.reject(updateValidation.call(this, e))
        }
      }
    }
  },
  addRule (name, ruleFun) {
    rules[name] = ruleFun
  }
}
