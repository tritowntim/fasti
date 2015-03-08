
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

function nextDate(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
}

function daysByWeek(year, month) {
  var weeks = [];

  var first = new Date(year, month, 1);
  var last = lastDateInMonth(year, month);
  var day = first;

  while (day <= last) {

    var week = [];

    for(var f = day.getDay() - 1; f >= 0; f--) {
      week.push(null);
    }

    while(week.length < 7) {
      if (day <= last) {
        week.push(day);
        day = nextDate(day);
      } else {
        week.push(null);
      }
    }

    weeks.push(week);
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
