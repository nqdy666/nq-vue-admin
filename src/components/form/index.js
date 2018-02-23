import CForm from './CForm'
import CFormCell from './CFormCell'
import CTextField from './CTextField'
import CTextArea from './CTextArea'
import CSubForm from './CSubForm'
import CLogoUpload from './CLogoUpload'
import CCheckbox from './CCheckbox'
import CRadio from './CRadio'
import CDropdown from './CDropdown'
import CNewDropdown from './CNewDropdown'
import CMultiSelect from './CMultiSelect'
import CImageView from './CImageView'
import CThumbnail from './CThumbnail'
import CSimpleDatepicker from './CSimpleDatepicker'
import CRangeDatepicker from './CRangeDatepicker'
import CRichText from './CRichText'
import CMultiLogoUpload from './CMultiLogoUpload'
import CFileUpload from './CFileUpload'
import CModalFormItem from './CModalFormItem'
import CRemoteMultiSelect from './CRemoteMultiSelect'

function install (Vue) {
  Vue.component('c-form', CForm)
  Vue.component('c-form-cell', CFormCell)
  Vue.component('c-textfield', CTextField)
  Vue.component('c-textarea', CTextArea)
  Vue.component('c-subform', CSubForm)
  Vue.component('c-logouploader', CLogoUpload)
  Vue.component('c-multilogouploader', CMultiLogoUpload)
  Vue.component('c-fileuploader', CFileUpload) // 待完善
  Vue.component('c-checkbox', CCheckbox)
  Vue.component('c-radio', CRadio)
  Vue.component('c-old-dropdown', CDropdown)
  Vue.component('c-dropdown', CNewDropdown)
  Vue.component('c-multiselect', CMultiSelect)
  Vue.component('c-imageview', CImageView)
  Vue.component('c-thumbnail', CThumbnail)
  Vue.component('c-simpledatepicker', CSimpleDatepicker)
  Vue.component('c-rangedatepicker', CRangeDatepicker)
  Vue.component('c-richtext', CRichText)
  Vue.component('c-modalformitem', CModalFormItem)
  Vue.component('c-remotemultiselect', CRemoteMultiSelect)
}

export default {
  install
}
