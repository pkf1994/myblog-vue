import Vue from 'vue';
import App from './app.vue';
import 'normalize.css'
import './assets/style/global.css';
import store from './store/store.js'

require('font-awesome-webpack');
const root = document.createElement('div');
document.body.appendChild(root);

new Vue({
  store,
  render: (h) => h(App)
}).$mount(root)


Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o){
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

function dateToString(now){
  var year = now.getFullYear();
  var month =(now.getMonth() + 1).toString();
  var day = (now.getDate()).toString();
  var hour = (now.getHours()).toString();
  var minute = (now.getMinutes()).toString();
  var second = (now.getSeconds()).toString();
  if (month.length == 1) {
    month = "0" + month;
  }
  if (day.length == 1) {
    day = "0" + day;
  }
  if (hour.length == 1) {
    hour = "0" + hour;
  }
  if (minute.length == 1) {
    minute = "0" + minute;
  }
  if (second.length == 1) {
    second = "0" + second;
  }
  var dateTime = year + "-" + month + "-" + day +" "+ hour +":"+minute+":"+second;
  return dateTime;
}



