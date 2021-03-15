var dateTimePicker = require('../utils/dateTimePicker');
 
Page({
 data: {
 date: '2018-10-01',
 time: '12:00',
 dateTimeArray: null,
 dateTime: null,
 dateTimeArray1: null,
 dateTime1: null,
 startYear: 2000,
 endYear: 2050
 },
 onLoad(){
 // 获取完整的年月日 时分秒，以及默认显示的数组
 var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
 var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
 // 精确到分的处理，将数组的秒去掉
 var lastArray = obj1.dateTimeArray.pop();
 var lastTime = obj1.dateTime.pop();
 
 this.setData({
  dateTime: obj.dateTime,
  dateTimeArray: obj.dateTimeArray,
  dateTimeArray1: obj1.dateTimeArray,
  dateTime1: obj1.dateTime
 });
 },
 changeDate(e){
 this.setData({ date:e.detail.value});
 },
 changeTime(e){
 this.setData({ time: e.detail.value });
 },
 changeDateTime(e){
 this.setData({ dateTime: e.detail.value });
 },
 changeDateTime1(e) {
 this.setData({ dateTime1: e.detail.value });
 },
 changeDateTimeColumn(e){
 var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;
 
 arr[e.detail.column] = e.detail.value;
 dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
 
 this.setData({
  dateTimeArray: dateArr,
  dateTime: arr
 });
 },
 changeDateTimeColumn1(e) {
 var arr = this.data.dateTime1, dateArr = this.data.dateTimeArray1;
 
 arr[e.detail.column] = e.detail.value;
 dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
 
 this.setData({ 
  dateTimeArray1: dateArr,
  dateTime1: arr
 });
 }
})

Page({
  data: {
    focus: false,
    inputValue: ''
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  bindReplaceInput: function (e) {
    var value = e.detail.value
    var pos = e.detail.cursor
    var left
    if (pos !== -1) {
      // 光标在中间
      left = e.detail.value.slice(0, pos)
      // 计算光标的位置
      pos = left.replace(/11/g, '2').length
    }

    // 直接返回对象，可以对输入进行过滤处理，同时可以控制光标的位置
    return {
      value: value.replace(/11/g, '2'),
      cursor: pos
    }

    // 或者直接返回字符串,光标在最后边
    // return value.replace(/11/g,'2'),
  },
  bindHideKeyboard: function (e) {
    if (e.detail.value === '123') {
      // 收起键盘
      wx.hideKeyboard()
    }
  }
})

var pageData = {
  data: {
    switch1Checked: true,
    switch2Checked: false,
    switch1Style: '',
    switch2Style: 'text-decoration: line-through'
  }
}
for (var i = 1; i <= 2; ++i) {
  (function (index) {
    pageData[`switch${index}Change`] = function (e) {
      console.log(`switch${index}发生change事件，携带值为`, e.detail.value)
      var obj = {}
      obj[`switch${index}Checked`] = e.detail.value
      this.setData(obj)
      obj = {}
      obj[`switch${index}Style`] = e.detail.value ? '' : 'text-decoration: line-through'
      this.setData(obj)
    }
  })(i)
}
Page(pageData)