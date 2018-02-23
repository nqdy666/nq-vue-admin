const template = `<div class="daterangepicker dropdown-menu"> 
	<div class="calendar left"> 
		<div class="daterangepicker_input"> 
		  <input class="input-mini form-control" type="text" name="daterangepicker_start" value="" readonly/> 
		  <i class="fa fa-calendar glyphicon glyphicon-calendar"></i> 
		  <div class="calendar-time"> 
			<div></div> 
			<i class="fa fa-clock-o glyphicon glyphicon-time"></i> 
		  </div> 
		</div> 
		<div class="calendar-table"></div> 
	</div> 
	<div class="calendar right"> 
		<div class="daterangepicker_input"> 
		  <input class="input-mini form-control" type="text" name="daterangepicker_end" value="" readonly/> 
		  <i class="fa fa-calendar glyphicon glyphicon-calendar"></i> 
		  <div class="calendar-time"> 
			<div></div> 
			<i class="fa fa-clock-o glyphicon glyphicon-time"></i> 
		  </div> 
		</div> 
		<div class="calendar-table"></div> 
	</div>
	<div class="tips"><p class="tip">查询范围不能超出6个月!</p></div>
	<div class="ranges"> 
		<div class="range_inputs">
			<button class="applyBtn button is-primary is-small" disabled="disabled" type="button"></button>  
			<button class="cancelBtn button is-light is-small" type="button"></button> 
		</div> 
	</div> 
</div>`

export default {
  'locale': {
    'format': 'YYYY-MM-DD',
    'separator': ' - ',
    'applyLabel': '确定',
    'cancelLabel': '取消',
    'fromLabel': '起始时间',
    'toLabel': '结束时间',
    'customRangeLabel': '自定义',
    'weekLabel': 'W',
    'daysOfWeek': [
      '日',
      '一',
      '二',
      '三',
      '四',
      '五',
      '六'
    ],
    'monthNames': [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月'
    ],
    'firstDay': 1
  },
  'startDate': 0,
  'minDate': '2015-01-01',
  'maxDate': new Date(),
  opens: 'left',
  autoUpdateInput: false,
  singleDatePicker: true,
  showDropdowns: true,
  firstDay: 1,
  template
}
