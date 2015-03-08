
var $div = $('div');
function appendElement(name, content) {
  $div.append('<' + name + '>' + content + '</' + name + '>');
}

function p(content) {
  appendElement('p', content);
}

function pre(content) {
  appendElement('pre', content);
}

function format(text) {
  return lpad(text.toString(), CALENDAR_DAY_WIDTH_IN_CHARS);
}

function lpad(text, length) {
  var formatted = text;
  while(formatted.length < length) {
    formatted = ' ' + formatted;
  }
  return formatted;
}

function centerText(text) {
  var marginSize = Math.ceil(((CALENDAR_DAY_WIDTH_IN_CHARS * DAY_OF_WEEK_ABBREVIATIONS.length) - text.length) / 2);

  var margin = '';
  for(var i = 0; i < marginSize; i++) { margin += ' ' };

  return ' ' + margin + text;
}

function formattedHeader() {
  return DAY_OF_WEEK_ABBREVIATIONS.map(function(letter) { return format(letter) }).join('');
}

function lastDateInMonth(year, month) {
  return new Date(month < 11 ? year : year + 1, month < 11 ? month + 1 : 0, 0);
}

function daysByWeek(year, month) {
  var weeks = [];

  var first = new Date(year, month, 1);
  var last = lastDateInMonth(year, month);

  var dates = [];
  for(var day = first.getDate(); day <= last.getDate(); day++) {
    dates.push(new Date(year, month, day));
  }

  for(var f = first.getDay() - 1; f >= 0; f--) {
    dates.unshift(null);
  }

  for(var g = last.getDay(); g < 6; g++) {
    dates.push(null);
  }

  for(var i = 0; i <= dates.length; i+=7) {
    weeks.push(dates.slice(i, i+7));
  }

  return weeks;
}

function buildMonth(year, month) {
  var weeks = daysByWeek(year, month);

  pre(centerText(MONTHS[month] + ' ' + year));
  pre(formattedHeader());

  weeks.forEach(function(week) {
    var formatted = week.map(function(day) { return format(day ? day.getDate() : ''); });
    pre(formatted.join(''));
  });
}

var CALENDAR_DAY_WIDTH_IN_CHARS = 5;

var DAY_OF_WEEK_ABBREVIATIONS = ['S', 'M', 'T', 'W', 'R', 'F', 'S'];

var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

MONTHS.forEach(function(month, index) { buildMonth(2015, index) });
