
var $div = $('div');
function appendElement(name, content) {
  $div.append('<' + name + '>' + content + '</' + name + '>');
}

function pre(content) {
  appendElement('pre', content);
}

function format(text) {
  return lpad(String(text || ''), CALENDAR_DAY_WIDTH_IN_CHARS);
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
  for (var i = 0; i < marginSize; i++) { margin += ' ' };

  return ' ' + margin + text;
}

function formattedHeader() {
  return DAY_OF_WEEK_ABBREVIATIONS.map(function(letter) { return format(letter) }).join('');
}

function lastDateInMonth(year, month) {
  return new Date(month < 11 ? year : year + 1, month < 11 ? month + 1 : 0, 0);
}

function datesForRange(year, month, first, last) {
  var dates = [];
  for (var day = first.getDate(), lastDate = last.getDate(); day <= lastDate; day++) {
    dates.push(new Date(year, month, day));
  }
  return dates;
}

function prependPrevMonth(dates, first) {
  for (var i = 0, firstDayOfWeek = first.getDay(); i < firstDayOfWeek; i++) {
    dates.unshift(BLANK_DAY);
  }
}

function appendNextMonth(dates, last) {
  for (var i = last.getDay(); i < 6; i++) {
    dates.push(BLANK_DAY);
  }
}

function splitIntoWeeks(dates) {
  var weeks = [];
  for (var i = 0; i <= dates.length; i+=7) {
   weeks.push(dates.slice(i, i+7));
  }
  return weeks;
}

function daysByWeek(year, month) {
  var first = new Date(year, month, 1);
  var last = lastDateInMonth(year, month);

  var dates = datesForRange(year, month, first, last);

  prependPrevMonth(dates, first);

  appendNextMonth(dates, last);

  return splitIntoWeeks(dates);
}

function buildMonth(year, month) {
  var weeks = daysByWeek(year, month);

  pre(centerText(MONTHS[month] + ' ' + year));
  pre(formattedHeader());

  weeks.forEach(function(week) {
    var formatted = week.map(function(day) { return format(day === BLANK_DAY ? day : day.getDate()); });
    pre(formatted.join(''));
  });
}

var BLANK_DAY = null;

var CALENDAR_DAY_WIDTH_IN_CHARS = 5;

var DAY_OF_WEEK_ABBREVIATIONS = ['S', 'M', 'T', 'W', 'R', 'F', 'S'];

var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

MONTHS.forEach(function(month, index) { buildMonth(2015, index) });
