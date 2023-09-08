---
title: 'How to use Notification API'
date: '2023-09-09'
---

[Notification API](https://developer.mozilla.org/zh-CN/docs/Web/API/Notifications_API) allows web application send a system-level notification.

# Request Permission
Before sending notifications, your need to make sure your app has this permission.
Let’s request notification permission~
```javascript
Notification.requestPermission(status => {
  if ('granted' === status) {
    // sending
  }
})
```
Another form
```javascript
const status = await Notification.requestPermission();
if ('granted' === status) {
  // sending
}
```

You can check the permission by straight reading [`Notification.permission`](https://developer.mozilla.org/zh-CN/docs/Web/API/Notification/permission_static).
- “default”: Your application has not been granted yet, browser will prevent notification sending.
- “granted”: User allows your app to sending notifications.
- “denied”: User doesn’t allow your app to sending notification.

