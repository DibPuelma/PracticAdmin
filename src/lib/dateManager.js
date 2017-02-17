var today = Date.now();
var yesterday = getYesterday(today);
var lastWeek = getLastWeek(today);
var lastMonth = getLastMonth(today);
var lastYear = getLastYear(today);
var weekStart = getWeekStart(today);
var monthStart = getMonthStart(today);
var yearStart = getYearStart(today);

module.exports = {
  today: getString(today),
  yesterday: getString(yesterday),
  lastWeek: getString(lastWeek),
  lastMonth: getString(lastMonth),
  lastYear: getString(lastYear),
  weekStart: getString(weekStart),
  monthStart: getString(monthStart),
  yearStart: getString(yearStart),
  getString: getString
}

var getString = function(date){
  return date.getDate() + '-' + (parseInt(date.getMonth, 10) + 1) + '-' date.getFullYear();
}

var getYesterday = function(date) {
  return new Date(date - 24*60*60*1000);
}

var getLastWeek = function(date){
  return new Date(date - 7 * 24*60*60*1000);
}

var getLastMonth = function(date){
  if(date.getMonth > 0){
    return new Date(date.getDate(), date.getMonth() - 1, date.getFullYear());
  }
  else {
    return new Date(date.getDate(), date.getMonth() - 1, date.getFullYear() - 1);
  }
}

var getLastYear = function(date){
  return new Date(date.getDate(), date.getMonth(), date.getFullYear() - 1);
}

var getWeekStart = function(date){
  return new Date(date - date.getDay() * 24*60*60*1000);
}

var getMonthStart = function(date){
  return new Date(0, date.getMonth(), date.getFullYear());
}

var getYearStart = function(date){
  return new Date(0, 0, date.getFullYear());
}
