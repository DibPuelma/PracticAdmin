// var today = Date.now();
// var yesterday = getYesterday(today);
// var lastWeek = getLastWeek(today);
// var lastMonth = getLastMonth(today);
// var lastYear = getLastYear(today);
// var weekStart = getWeekStart(today);
// var monthStart = getMonthStart(today);
// var yearStart = getYearStart(today);

var weekDays = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
var months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

var getMonthName = function(i){
  if(typeof(i) === typeof('0')){
    return(months[parseInt(i, 10) - 1]);
  }
  return(months[i] - 1);
}
var getDayOfWeek = function(date){
  var _date = new Date(date);
  return weekDays[_date.getDay()];
}

var getStringFromZDate = function(date){
  var day = date.substring(8,10)
  var month = this.getMonthName(date.substring(5,7))
  var year = date.substring(0,4)
  return 'Fecha sorteo ' + day + ' de ' + month + ' de ' + year;
}

var getDateFromZDate = function(date){
  var _date = date.split('-');
  var day = parseInt(_date[2], 10);
  var month = parseInt(_date[1], 10) - 1;
  var year = parseInt(_date[0], 10);
  return getString(new Date(year, month, day));
}

var getString = function(date){
  var _date = new Date(date);
  return _date.getFullYear() + '-' + (parseInt(_date.getMonth(), 10) + 1) + '-' + _date.getDate();
}

var getYesterday = function(date){
  var _date = new Date(date);
  return getString(new Date(_date - 24*60*60*1000));
}

var getLastWeek = function(date){
  var _date = new Date(date);
  return getString(new Date(_date - 7 * 24*60*60*1000));
}

var getLastMonth = function(date){
  var _date = new Date(date);
  if(_date.getMonth > 0){
    return getString(new Date(_date.getFullYear(), _date.getMonth() - 1, _date.getDate()));
  }
  else {
    return getString(new Date(_date.getFullYear() - 1, _date.getMonth() - 1, _date.getDate()));
  }
}

var getLastYear = function(date){
  var _date = new Date(date);
  return getString(new Date(_date.getFullYear() - 1, _date.getMonth(), _date.getDate()));
}

//TODO: hace más preciso. Que parta desde el 0 de la semana
var getWeekStart = function(date){
  var _date = new Date(date);
  return getString(new Date(_date - (_date.getDay() + 1) * 24*60*60*1000));
}

var getMonthStart = function(date){
  var _date = new Date(date);
  return getString(new Date(_date.getFullYear(), _date.getMonth(), 1));
}

var getYearStart = function(date){
  var _date = new Date(date);
  return getString(new Date(_date.getFullYear(), 0, 1));
}

// var getYesterdayAsDate = function(date){
//   return new Date(date - 24*60*60*1000);
// }
//
// var getLastWeekAsDate = function(date){
//   return new Date(date - 7 * 24*60*60*1000);
// }
//
// var getLastMonthAsDate = function(date){
//   if(date.getMonth > 0){
//     return new Date(date.getDate(), date.getMonth() - 1, date.getFullYear());
//   }
//   else {
//     return new Date(date.getDate(), date.getMonth() - 1, date.getFullYear() - 1);
//   }
// }
//
// var getLastYearAsDate = function(date){
//   return new Date(date.getDate(), date.getMonth(), date.getFullYear() - 1);
// }
//
// var getWeekStartAsDate = function(date){
//   return new Date(date - date.getDay() * 24*60*60*1000);
// }
//
// var getMonthStartAsDate = function(date){
//   return new Date(0, date.getMonth(), date.getFullYear());
// }
//
// var getYearStartAsDate = function(date){
//   return new Date(0, 0, date.getFullYear());
// }

module.exports = {
  getStringFromZDate: getStringFromZDate,
  getDateFromZDate: getDateFromZDate,
  getMonthName: getMonthName,
  getDayOfWeek: getDayOfWeek,
  getString: getString,
  getYesterday: getYesterday,
  getLastWeek: getLastWeek,
  getLastMonth: getLastMonth,
  getLastYear: getLastYear,
  getWeekStart: getWeekStart,
  getMonthStart: getMonthStart,
  getYearStart: getYearStart,
  getYesterdayAsDate: getYesterday,
  getLastWeekAsDate: getLastWeek,
  getLastMonthAsDate: getLastMonth,
  getLastYearAsDate: getLastYear,
  getWeekStartAsDate: getWeekStart,
  getMonthStartAsDate: getMonthStart,
  getYearStartAsDate: getYearStart
}
