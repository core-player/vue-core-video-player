### Events

 我们支持标准的[视频运行事件](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events); 


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

#### 基本事件

##### LIFECYCYLE Hooks

+ `lifecycle_before_create` 开始创建[播放核心](https://github.com/core-player/vue-core-video-player/blob/master/src/core/index.js) 实例时候触发.
+ `lifecycle_created` 当播放器已经完成创建实例
+ `lifecycle_parsed` 当播放器解析完播放源.
+ `lifecycle_destroyed` 当播放器开始销毁实例.
+ `lifecycle_destroyed` 当播放器完成实例销毁.


##### PLayback Events

我们遵循 W3C 标准的媒体事件 API. 你可以前往 [MDN](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events) 获取这些细节. 下面罗列一些非常常用的事件，你未来可能会经常遇到的。

+ `play` 表示当播放器开始播放或者通过 `play()` 方法从暂停状态恢复。
+ `pause` 当播放器停止播放的时候触发。
+ `progress` 当播放器正在下载媒体资源。
+ `loadeddata` 当播放器开始加载第一帧时候触发。
+ `canplay` 当加载足够数据可以满足基本播放后触发.。
+ `durationchange` 当媒体获取一定数据，并且完整的解析出 metadata 信息。
+ `ended` 当媒体播放结束时候触发。
+ `timeupdate` 当播放的媒体 currenttime 发生改变时候触发。
+ `seeked` 当用户 seek 操作完成触发。

下面还有一些别的事件，可以前往 [MDN-Media_Event](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events) 阅读。


##### Playback Error

播放错误偶有发生， 我们提供了播放错误码方便开发者或者用户了解一些原因.

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

参数 `event` 包含标准DOM Event 对象，并切独自定义的 [error code](https://github.com/core-player/vue-core-video-player/blob/master/src/constants/ERROR_CODE.js)

``` js
{
    code: xxx
    target: videlEr
}
```

+ 2404 资源找不到
+ 2502 网络错误
+ 2503 视频解码错误
+ 2504 视频无法播放
+ 2701 资源解析错误
+ 2801 位置原因

##### UI Events

+ `ui_dashboard_show` 当播放器的控制栏显示的时候触发
+ `ui_dashboard_hide` 当播放器的控制栏隐藏的时候触发


[完整的事件列表](https://github.com/core-player/vue-core-video-player/blob/master/src/constants/EVENTS.js) 并且我们导出了 `EVENTS` 模块方便开发者进行第三方开发。

``` js
import { EVENTS } from 'vue-core-video-player'

player.on(EVENTS.PLAY, () => {
    // ...
})
```

