### Get Started

#### Step 1 

##### NPM

``` bash
$ npm install --save vue-core-video-player 
```

Or try `yarn`

``` bash
$ yarn add -S vue-core-video-player 
```


##### CDN

Anyway, you could use the cdn bundle or use AMD loader to load the bundle.

``` html
<script src="./dist/vue-core-vide-player.umd.min.js"></script>
```

#### Step 2


Edit your `main.js` and import the module.

``` 
import VueCoreVideoPlayer from 'vue-core-video-player'

Vue.use(VueCoreVideoPlayer)
```

#### Step 3

Write the component in your player container. 

``` vue
<div id="app">
  <div class="player-container">
    <vue-core-video-player src="./your_video_source.mp4"></vue-core-video-player>
  </div>
</div>
```

<ClientOnly>
  <player />
</ClientOnly>


