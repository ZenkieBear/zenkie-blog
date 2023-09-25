---
title: 'How to use Notification API'
date: '2023-09-09'
---

# Intro

[Notification API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API) allows web application send a system-level notification.

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
const status = await Notification.requestPermission()
if ('granted' === status) {
  // sending
}
```

You can check the permission by straight reading [`Notification.permission`](https://developer.mozilla.org/en-US/docs/Web/API/Notification/permission_static).

- “default”: Your application has not been granted yet, browser will prevent notification sending.
- “granted”: User allows your app to sending notifications.
- “denied”: User doesn’t allow your app to sending notification.

# Send Notification

You could create a Notification object, and then browser will create a **system-level** notification.

```javascript
if ('granted' === status) {
  const notify = new Notification('hi here')
}
```

The string **hi there** passed in construction is notificator’s **title**.

# Options

The second optional parameter of Notification’s constructor is an [`options`](https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification) object. You can enrich your notification content through it.

```javascript
const notify = new Notification('hi there', {
  body: 'I’m Zenkie Bear, thank you for visiting my blog.',
  icon: '/images/profile.jpg',
  data: {
    url: 'https://blog.zenkie.cn/',
    target: '_blank'
  }
})
```

Let me introduce these _options_ for ya:

- [`body`](https://developer.mozilla.org/en-US/docs/Web/API/Notification/body): The description of notification.
- [`icon`](https://developer.mozilla.org/en-US/docs/Web/API/Notification/icon): The icon of notification, you could provide an [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) that point to an image.
- [`data`](https://developer.mozilla.org/en-US/docs/Web/API/Notification/data): It could be any data you wish to associate with the notification.
- [`tag`](): You can add a tag to a new notification, if there’s already a same tag notification, the older will be closed.

There’re many useful options, you can refer to this [document](https://developer.mozilla.org/en-US/docs/Web/API/Notification/dir).

# Event handle

Notification provides 4 [events](https://developer.mozilla.org/en-US/docs/Web/API/Notification#events), you can listen to them and perform the tasks you want.

`click` event is the most commonly used. This example shows when user click the notification, open the url (which defined in the data) in a new tab.

```javascript
const notify = new Notification('hi there', {
  data: {
    url: 'https://blog.zenkie.cn/',
    target: '_blank'
  }
})
// handle the click event.
notify.onclick = e => {
  const data = e.target.data
  window.open(data.url, data.target)
}
```

Another form is using [`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener):

```javascript
const notify = new Notification('hi there', {
  data: {
    url: 'https://blog.zenkie.cn/',
    target: '_blank'
  }
})
// handle the click event.
notify.addEventListener('click', e => {
  const data = e.target.data
  window.open(data.url, data.target)
})
```

# Ending

That’s all, thank you for reading my article!
You can find this article’s code in [codepen](https://codepen.io/zenkie/pen/MWZjMej).
