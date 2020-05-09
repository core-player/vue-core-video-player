### Events

We support the standard [Video Runtime Events](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events); 

``` vue
<template>
  <div class="player-container">
    <vue-core-video-player @loadedmetadata="loaded" @play="playFunc" @pause="pauseFunc" src="./videos/your_video.mp4"></vue-core-video-player>
  </div>
<template>

<script>
export default {
  methods: {
    loaded () {
      // your code
    },
    playFunc () {
      // your code
    },
    pauseFunc () {
        
        // your code
    }
  }
}

```

#### Basic Events

#### LIFECYCYLE Hooks

+ `lifecycle_before_create` indicates player starts  to create the  [Core](https://github.com/core-player/vue-core-video-player/blob/master/src/core/index.js) instance.
+ `lifecycle_created` indicates player has created the Core instance
+ `lifecycle_parsed` indicates the player has parsed the video source.
+ `lifecycle_destroyed` indicates the player start destroy the instance.
+ `lifecycle_destroyed` indicates the player has destroyed the instance.


#### PLayback Events

We follow the W3C Media Events API. And you can read [MDN](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events) to know the details. There are some useful events you may use in your project,

+ `play` indicates the player start play or from to pause to the play state via `play()` method.
+ `pause` means the player stop play the video.
+ `progress` indicate the player is downloading the media contents.
+ `loadeddata` indicates the player has loaded the first frame.
+ `canplay` is sent when enough data is available that the media can be played, at least for a couple of frames. 
+ `durationchange` is sent when the readyState changes to HAVE_ENOUGH_DATA, indicating that the entire media can be played without interruption, assuming the download rate remains at least at the current level
+ `ended` indicates the player ended the video.
+ `timeupdate` The time indicated by the element's currentTime attribute has changed
+ `seeked` is sent when a seek operation completes.

There are also many other normal events about media, we recommended [MDN-Media_Event](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events) for you.


#### Playback Error

Playback errors sometime happen and we provide error code for developers and users to get some reasons.

``` vue
<template>
  <div class="player-container">
    <vue-core-video-player @error="errorHandle" src="./videos/your_video.mp4"></vue-core-video-player>
  </div>
<template>

<script>
export default {
  methods: {
    errorHandle (e) {
      // handle error
    },
  }
}
```

The `event` structure contains the error object and [error code](https://github.com/core-player/vue-core-video-player/blob/master/src/constants/ERROR_CODE.js)

``` js
{
    code: xxx
    target: videlEr
}
```

+ 2404 Source not found
+ 2502 Media Network Error
+ 2503 Video Cannot Decode
+ 2504 Video Cannot Play
+ 2701 Parse Error
+ 2801 Not found reason

#### UI Events

+ `ui_dashboard_show` indicates the player shows the dashboard.
+ `ui_dashboard_hide` indicates the player hide the dashboard.



This is [Full Events Code](https://github.com/core-player/vue-core-video-player/blob/master/src/constants/EVENTS.js) And we has export the `event` module for developers to develop some third plugins.

``` js
import { EVENTS } from 'vue-core-video-player'

player.on(EVENTS.PLAY, () => {
    // ...
})
```

