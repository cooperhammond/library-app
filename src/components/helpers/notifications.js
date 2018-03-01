import { Notifications } from 'expo';

const setNotification = (time, title) => {
  let t = new Date();
  let s = t.getSeconds() + time
  t.setSeconds(s);

  const schedulingOptions = {
    time: t,
  };

  const localNotification = {
    title: 'Your book, "' + title + '" is being returned.',
    // body: '', // (string) — body text of the notification.
    ios: { // (optional) (object) — notification configuration specific to iOS.
      sound: true // (optional) (boolean) — if true, play a sound. Default: false.
    },
    android:
    {
      sound: true,
      icon: "../../../assets/img/miskatonic.png"
    }
  };

  Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);
}

export {
  setNotification,
}
