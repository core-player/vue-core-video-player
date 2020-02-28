### 快速开始

#### Step 1 

##### NPM

``` bash
$ npm install --save vue-core-video-player 
```

或者使用 `yarn`

``` bash
$ yarn add -S vue-core-video-player 
```


##### CDN

你也可以在浏览器直接引入或者通过 AMD Loader 进行加载。

``` html
<script src="./dist/vue-core-vide-player.umd.min.js"></script>
```

#### Step 2


编辑 `main.js` 然后引入模块；

``` 
import VueCoreVideoPlayer from 'vue-core-video-player'

Vue.use(VueCoreVideoPlayer)
```

#### Step 3

记得在你的播放容易里引入组件。 

``` vue
<div id="app">
  <div class="player-container">
    <vue-core-video-player src="./your_video_source.mp4"></vue-core-video-player>
  </div>
</div>
```
