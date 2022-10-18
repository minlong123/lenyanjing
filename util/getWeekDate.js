function getFirstLastDay(time) {
  let date = new Date(time);
  let Time = date.getTime();
  let day = date.getDay();
  let oneDayTime = 24 * 60 * 60 * 1000;

  //周一
  let MondayTime = Time - (day - 1) * oneDayTime;
  //周日
  let SundayTime = Time + (7 - day) * oneDayTime;

  let monday = new Date(MondayTime);
  let sunday = new Date(SundayTime);
  return { monday, sunday };
}

function getFirstDay(date) {
  console.log(date, "date");
  let tday = date.getDay() || 7;

  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 1 - tday
  );
}

//获取当前日期周日
function getLastDayOfWeek(date) {
  var day = date.getDay() || 7;
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 7 - day
  );
}

module.exports = {
  getFirstLastDay,
  getFirstDay,
  getLastDayOfWeek,
};
