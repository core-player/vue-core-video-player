# vue-core-video-player

## 快速开始

### 安装

``` bash
$ npm install --save vue-core-video-player 
```

当然，你也可以使用 CDN 内联 

``` html
<script src="./dist/vue-core-vide-player.min.js"></script>
```

### 添加播放源

``` vue
<div id="app">
  <vue-core-video-player src="./your_video_source.mp4"></vue-core-video-player>
</div>
```

``` vue
import VueCoreVideoPlayer from 'vue-core-video-player'

Vue.use(VueCoreVideoPlayer)
```

### 基本配置

#### The video source

使用 `src` 可以设置你需要播放视频的源. 它必须是下面两种类型；

+ String; 它可以是一个视频文件的相对地址或者你的 CDN 地址；

``` html
<vue-core-video-player src="https://media.vued.vanthink.cn/sparkle_your_name_am720p.mp4"></vue-core-video-player>
```
+ Array; 如果你要设置多分辨率视频，你需要参考下面的结构，你必须在内联的 item 包含 (`resolution`, `src`); 我们默认的分辨率会选择 '720p'。当然你也可以指定选择的分辨率通过 `resolution` 这个属性来设置。

``` js
const videoSource = [
  {
    src: 'https://media.vued.vanthink.cn/sparkle_your_name_am360p.mp4',
    resolution: 360,
  }, {
    src: 'https://media.vued.vanthink.cn/sparkle_your_name_am720p.mp4',
    resolution: 720,
  }, {
    src: 'https://media.vued.vanthink.cn/y2mate.com%20-%20sparkle_your_name_amv_K_7To_y9IAM_1080p.mp4',
    resolution: 1080
  }
]
```
如果你是期望不同的浏览器播放不同的文件，你需要添加 type 属性；

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

你可以前往[caniuse-video-format](https://caniuse.com/#search=video%20format) 阅读更多关于当前浏览器对于视频格式的支持情况。


### Controls

`controls` 可以用来控制底部控制栏的显示隐藏；他可以是下面几种形式。

+ String; 

  + 'fixed' 表示底部导航栏会一直固定显示；
  + 'auto' 表示底部导航栏在用户未产生任何交互操作后自动消失，默认的形式；

+ Boolean;
  + `false` 表示始终不显示导航栏；
  + `true`  默认值；它和设置 'auto' 形式类似；


### 自动播放

如果你设置了 `autoplay`, 播放器会尝试自动播放视频；由于不同的浏览器对自动播放行为的限制不一样；如果播放器自动播放失败会显示播放按钮，方便用户手动触发；

### 视频播放控制

组件保持了和原生 [HTML Video](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) 属性配置的对接。

| Props        | Type         | Example  | Description  |
| ------------- |:-------------:|:----- |:--------------|
| volume     | number | `0.5` | 控制视频音量(0-1) |
| muted     | boolean | `true` | 设置为 `true`, 视频会静音  |
| cover     | string | `'./cover.png'` | 显示视频的封面，如果设置 autoplay，自动播放成功后，不会显示  |
| title     | string | `'your title'` | 展示视频的标题，方便 SEO  |
| logo     | string | `'./logo.png'` | 显示播放器的 logo  |
| loop     | boolean | `true` | 会循环播放当前视频  |
| [preload](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)   | string | `'metadata'`  | `'none'` 表示不会预加载视频; `'metadata'` 表示只加载视频 metadata 信息部分 |

### i18n

你可以自定义语言 [json](https://github.com/core-player/vue-core-video-player/blob/dev/src/lang/en.json) 数据显示定义的文案. 我们提供默认下面三种语言的支持 [here](https://github.com/core-player/vue-core-video-player/tree/dev/src/lang).

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