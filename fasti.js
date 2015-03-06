
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

function daysByWeek(year, month) {
  var weeks = [];

  var first = new Date(year, month, 1);
  var last = new Date(month < 11 ? year : year + 1, month < 11 ? month + 1 : 0, 0);

  var day = first.getDate();

  for(var w = 0; w < 6; w++) {
    var week = [];

    for(var i = 0; i < 7; i++) {
      var date = new Date(year, month, day);
      if (date.getMonth() === month && date.getDay() === i) {
        week.push(format(date.getDate()));
        day += 1;
      } else {
        week.push(format(''));
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
    pre(week.join(''));
  });
}

var CALENDAR_DAY_WIDTH_IN_CHARS = 5;

var DAY_OF_WEEK_ABBREVIATIONS = ['S', 'M', 'T', 'W', 'R', 'F', 'S'];

var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

MONTHS.forEach(function(month, index) { buildMonth(2015, index) });
