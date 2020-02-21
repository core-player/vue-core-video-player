# vue-core-video-player

## Getting Started

### Install

``` bash
$ npm install --save vue-core-video-player 
```

Anyway, you could use the cdn bundle

``` html
<script src="./dist/vue-core-vide-player.min.js"></script>
```

### Add Video Source

``` vue
<div id="app">
  <vue-core-video-player src="./your_video_source.mp4"></vue-core-video-player>
</div>
```

``` vue
import VueCoreVideoPlayer from 'vue-core-video-player'

Vue.use(VueCoreVideoPlayer)
```

## Basic Configuration

#### The video source

Use `src` property to set the video source of your player. It must be the only three types below.

+ String; It can be relative path of your video file or some cdn url.

``` html
<vue-core-video-player src="https://media.vued.vanthink.cn/sparkle_your_name_am720p.mp4"></vue-core-video-player>
```
+ Array; It means you set different resolution of the same video source; Our default resolution is `720p`;

And you must set two keys (`resolution`, `src`) of your array item.

``` js
const videoSource = [
  {
    src: 'https://media.vued.vanthink.cn/sparkle_your_name_am360p.mp4',
    resolution: '360p',
  }, {
    src: 'https://media.vued.vanthink.cn/sparkle_your_name_am720p.mp4',
    resolution: '720p',
  }, {
    src: 'https://media.vued.vanthink.cn/y2mate.com%20-%20sparkle_your_name_amv_K_7To_y9IAM_1080p.mp4',
    resolution: '1080p'
  }
]
```
If you want to play different file type in different browser. You can add `type` property in an array;

``` bash
const videoSource = [
  {
    src: 'https://media.vued.vanthink.cn/sparkle_your_name_am720p.webm',
    type: 'video/webm',
  }, {
    src: 'https://media.vued.vanthink.cn/sparkle_your_name_am720p.mp4',
    type: 'video/mp4',
  }
]
```

[caniuse-video-format](https://caniuse.com/#search=video%20format) show which browser supports the specify video file.


### Controls

`controls` is set for player bottom dashboard. 

+ String; 

  + 'fixed' indicates the bottom dashboard is still visible to users. 
  + 'auto' indicates the bottom dashboard will hide when there is no interaction between user and player.

+ Boolean;
  + `false` indicates that player will hide the bottom dashboard
  + `true`  indicates that player will show the bottom dashboard and work like the `'auto'` value above;


### Autoplay

If you set `autoplay`, the player will try to play video. Different browser has different policies to handle auto play action. If player failed, it will show the play button for user to touch.

### Video Playback control

And it keep the same attributes of [HTML Video](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video).

| Props        | Type         | Example  | Description  |
| ------------- |:-------------:|:----- |:--------------|
| volume     | number | `0.5` | the volume of video (0-1) |
| muted     | boolean | `true` | if set `true`, the video will be muted  |
| cover     | string | `'./cover.png'` | it will show the cover of the video; If you set `autoplay`, the player auto play successfully, the `cover` property will not work.  |
| title     | string | `'your title'` | it will show the title of video for better SEO  |
| logo     | string | `'./logo.png'` | it will show the your logo of the player  |
| loop     | boolean | `true` | it will automatically seek back to the start upon reaching the end of the video  |
| [preload](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)   | string | `'metadata'`  | `'none'` means not preload video source; `'metadata'` indicates that only video metadata (e.g. length) is fetched  |


### i18n

You can use your own language [json](https://github.com/core-player/vue-core-video-player/blob/dev/src/lang/en.json) data to replace all the player text. We provide three language file reference [here](https://github.com/core-player/vue-core-video-player/tree/dev/src/lang).

+ [en: English](https://github.com/core-player/vue-core-video-player/blob/dev/src/lang/en.json)
+ [zh-CN: 简体中文](https://github.com/core-player/vue-core-video-player/blob/dev/src/lang/zh-cn.json)
+ [jp: 日本語](https://github.com/core-player/vue-core-video-player/blob/dev/src/lang/jp.json)


``` js
import VueCoreVideoPlayer from 'vue-core-video-player'

Vue.use(VueCoreVideoPlayer, {
  lang: 'zh-CN'
})
```

Use custom language data:

``` bash
import VueCoreVideoPlayer from 'vue-core-video-player'

const kr = {
  ...
  "dashboard" : {
    "btn": {
      ....
      "pause": "일시적인",
      "fullscreen": "전체화면",
      "exitFullscreen": "전체 화면 종료",
    },
}


Vue.use(VueCoreVideoPlayer, {
  lang: kr
})

```