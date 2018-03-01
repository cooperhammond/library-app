import { Notifications } from 'expo';

const formatDate = (date) => {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var hours = date.getHours();
  var minutes = date.getMinutes();
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return hours + ':' + minutes + ' - ' + day + ' ' + monthNames[monthIndex] + ' ' + year;
}

console.log(formatDate(new Date()));

const setNotification = (time, text) => {
  let t = new Date();
  let s = t.getSeconds() + time
  t.setSeconds(s);

  const schedulingOptions = {
    time: t,
  };

  const localNotification = {
    title: text,
    // body: '', // (string) — body text of the notification.
    ios: { // (optional) (object) — notification configuration specific to iOS.
      sound: true // (optional) (boolean) — if true, play a sound. Default: false.
    },
    android:
    {
      sound: true,
    }
  };

  Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);



  return formatDate(t)
}

export {
  setNotification,
}
