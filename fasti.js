

var $div = $('div');

function print(text) {
  $div.append('<p>' + text + '</p>');
}

function pre(text) {
  $div.append('<pre>' + text + '</pre>');
}

function format(text) {
  var formatted = '';

  switch(text.toString().length) {
    case 0:
      formatted = '    ';
      break;
    case 1:
      formatted = '   ' + text.toString();
      break;
    case 2:
      formatted = '  ' + text.toString();
      break;
  }

  formatted += ' ';

  return formatted;
}

function centerText(text) {
  var marginSize = Math.ceil((34 - text.length) / 2);

  var margin = '';
  for(var i = 0; i < marginSize; i++) { margin += ' ' };

  return margin + text;
}

var today = new Date();
[today.toString(), today.valueOf()].forEach(function(text) { print(text); });

function buildMonth(year, month) {

  var weeks = [];

  var first = new Date(year, month, 1);
  var nextMonth = new Date(month < 11 ? year : year + 1, month < 11 ? month + 1 : 0, 1);
  var last = nextMonth.setDate(nextMonth.getDate() - 1);

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

  pre(centerText(MONTHS[month] + ' ' + year));
  pre('   S    M    T    W    R    F    S')
  weeks.forEach(function(week) {
    pre(week.join(''));
  });

}

var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

MONTHS.forEach(function(month, index) { buildMonth(2016, index) });
