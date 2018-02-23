<template>
  <div class="control com-datepicker" :class="{'control-on': active}">
    <input type="text" name="rangeDate" class="input com-form-control" :value="rangeDate" readonly />
  </div>
</template>
<script>
  import $ from 'jquery'
  import DateRangePicker from 'bootstrap-daterangepicker'
  import moment from 'moment'
  import datepickerConfig from './config'

  DateRangePicker.prototype.updateFormInputs = function () {
    // ignore mouse movements while an above-calendar text input has focus
    if (this.container.find('input[name=daterangepicker_start]').is(':focus') || this.container.find('input[name=daterangepicker_end]').is(':focus')) {
      return
    }

    this.container.find('input[name=daterangepicker_start]').val(this.startDate.format(this.locale.format))
    if (this.endDate) {
      this.container.find('input[name=daterangepicker_end]').val(this.endDate.format(this.locale.format))
    }

    if (this.singleDatePicker || (this.endDate && (this.startDate.isBefore(this.endDate) || this.startDate.isSame(this.endDate)))) {
      if (this.endDate && this.startDate && moment(this.startDate).add(6, 'months').isAfter(this.endDate)) {
        this.container.find('.tips .tip').hide()
        this.container.find('button.applyBtn').removeAttr('disabled')
      } else {
        this.container.find('.tips .tip').show()
      }
    } else {
      this.container.find('button.applyBtn').attr('disabled', 'disabled')
    }
  }

  const rangeDatepickerConfig = {
    ...datepickerConfig,
    singleDatePicker: false,
    showDropdowns: false
  }

  export default {
    data () {
      return {
        active: false
      }
    },
    mounted () {
      var $datepicker = $(this.$el).find('.com-form-control')

      const datepicker = new DateRangePicker($datepicker, {
        ...rangeDatepickerConfig,
        parentEl: $(this.$el)
      })
      $datepicker.val(this.rangeDate)
      $datepicker.on('apply.daterangepicker', (ev, picker) => {
        $datepicker.val(picker.startDate.format('YYYY-MM-DD') + ' 到 ' + picker.endDate.format('YYYY-MM-DD'))
        this.emitValue({
          startDateTime: picker.startDate.format(this.format),
          endDateTime: picker.endDate.format(this.format)
        })
      })
      $datepicker.on('cancel.daterangepicker', (ev, picker) => {
      })
      $datepicker.on('show.daterangepicker', (ev, picker) => {
        this.active = true
      })
      $datepicker.on('hide.daterangepicker', (ev, picker) => {
        this.active = false
      })
      if (this.startDateTime) {
        datepicker.setStartDate(this.startDateTime)
      }
      if (this.endDateTime) {
        datepicker.setEndDate(this.endDateTime)
      }
      this.$datepicker = $datepicker
    },
    beforeDestroy () {
      this.$datepicker && this.$datepicker.remove()
    },
    props: {
      format: {
        type: String,
        default () {
          return 'YYYY-MM-DD'
        }
      },
      startDateTime: {
        type: String,
        default () {
          return ''
        }
      },
      endDateTime: {
        type: String,
        default () {
          return ''
        }
      }
    },
    computed: {
      rangeDate () {
        if (this.startDateTime && this.endDateTime) {
          return moment(this.startDateTime).format('YYYY-MM-DD') + ' 到 ' + moment(this.endDateTime).format('YYYY-MM-DD')
        }
        return '选择日期'
      }
    },
    methods: {
      handleClear () {
        this.emitValue({
          startDateTime: '',
          endDateTime: ''
        })
      },
      emitValue ({
        startDateTime,
        endDateTime
      }) {
        this.$emit('update', {
          startDateTime,
          endDateTime,
          startTimeStamp: startDateTime ? moment(startDateTime, this.format).valueOf() : '',
          endTimeStamp: endDateTime ? moment(endDateTime, this.format).valueOf() + 24 * 60 * 60 * 1000 - 1 : ''
        })
      }
    },
    watch: {
      rangeDate (val) {
        this.$datepicker && this.$datepicker.val(val)
      }
    }
  }
</script>
<style>
  .com-datepicker {
    vertical-align: middle;
  }
  .com-datepicker .com-form-control {
    width: 212px;
  }
  .daterangepicker {
    top: 32px;
    right: 0px;
    left: auto;
    float: left;
    min-width: 160px;
    padding: 5px 0px;
    margin: 2px 0px 0px;
    font-size: 14px;
    text-align: left;
    list-style: none;
    background-color: rgb(255, 255, 255);
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.176) 0px 6px 12px;
    display: none;
    width: 487px;
    padding-bottom: 37px;
    margin-right: 10px;
  }
  .daterangepicker .daterangepicker_input i {
    position: absolute;
    left: 4px;
    top: -2px;
  }
  .daterangepicker .ranges {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    font-size: 12px;
    float: none;
    height: 35px;
    line-height: 39px;
    text-align: right;
    border-top: 1px solid rgba(0, 0, 0, 0.176);
  }
  .daterangepicker .tips {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: left;
  }
  .daterangepicker .tips .tip {
    display: none;
    margin-left: 20px;
    margin-bottom: 10px;
    color: red;
  }
  .daterangepicker .ranges .range_inputs {
    margin-right: 20px;
  }
  .daterangepicker .applyBtn {
    margin-top: 7px;
    margin-right: 20px;
  }
  .daterangepicker .cancelBtn {
    margin-top: 7px;
  }

  .daterangepicker .input-mini {
    /*display: none;*/
  }
  .daterangepicker .fa-calendar {
    /*display: none;*/
  }
</style>
