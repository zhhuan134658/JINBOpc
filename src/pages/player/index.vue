<template>
  <div class="main" @mousemove="mousemove">
    <div class="playArea">
      <video-player
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
        @pause="onPlayerPause($event)"
        @play="onPlayerPlay($event)"
        @ended="onPlayerEnded($event)"
        @timeupdate="onPlayerTimeupdate($event)"
        @ready="playerReadied"
      >
        Your browser does not support the video tag.
      </video-player>
      <div class="tilt" @click="onPlayerClick">
        <div class="but" v-show="!isPlay"></div>
      </div>
    </div>
    <div class="title">当前播放时长：{{ currentTime }}</div>
  </div>
</template>

<script>
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'

export default {
  name: 'player',
  components: {
    videoPlayer
  },
  data() {
    return {
      staticTime: '',
      isPlay: false,
      currentTime: 0,
      videoBase64: '',
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: false, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4", // 类型
            src: 'http://vjs.zencdn.net/v/oceans.mp4', // url地址
          },
        ],
        poster: '', // 封面地址
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true, // 是否显示全屏按钮
        },
      }
    }
  },
  watch: {
    isPlay(val) {
      if (val) {
        console.log('播放')
      } else {
        console.log('暂停')
      }
    },
    staticTime(val) {
      if (val > 3) {
        this.player.pause()
      }
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  created() {
    let arr = {
      name: 'liuzhipeng',
      age: 27
    }

    let newArr = {
      name: arr.name,
      age: arr.age
    }

    console.log('引用类型深拷贝，拷贝对象和被拷贝对象使用“===”')
    if (newArr === arr) {
      console.log('成立')
    } else {
      console.log('不成立')
    }

    this.getVideoBase64('https://dingyunlaowu.oss-cn-hangzhou.aliyuncs.com/user-dir/ijJKKMKdmC1640050654621.mp4').then(res => {
      this.videoBase64 = res
    })

    // 计时器
    setInterval(() => {
      this.staticTime++
      console.log(this.staticTime)
    }, 1000);
  },
  methods: {
    getVideoBase64(url) {
      return new Promise(function (resolve, reject) {
        let dataURL = '';
        let video = document.createElement("video");
        video.setAttribute('crossOrigin', 'anonymous');//处理跨域
        video.setAttribute('src', url);
        video.setAttribute('width', 400);
        video.setAttribute('height', 240);
        video.setAttribute('preload', 'auto');
        video.addEventListener('loadeddata', function () {
          let canvas = document.createElement("canvas"),
            width = video.width, //canvas的尺寸和图片一样
            height = video.height;
          canvas.width = width;
          canvas.height = height;
          canvas.getContext("2d").drawImage(video, 0, 0, width, height); //绘制canvas
          dataURL = canvas.toDataURL('image/jpeg'); //转换为base64
          resolve(dataURL);
        });
      })
    },
    onPlayerPause($event) {
      this.isPlay = false;
    },
    onPlayerPlay($event) {
      this.isPlay = true;
    },
    onPlayerEnded($event) {},
    onPlayerClick() {
      if (this.isPlay) {
        this.player.pause();
      } else {
        this.player.play();
        this.staticTime = 0
      }
    },
    /* 获取视频播放进度 */
    onPlayerTimeupdate(player) {
      this.currentTime = player.cache_.currentTime
      console.log(' onPlayerTimeupdate!', this.currentTime)
    },
    /* 设置视频进度 */
    playerReadied(player) {
      player.currentTime(this.currentTime)
    },
    // 鼠标移动
    mousemove() {
      this.staticTime = 0
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  width: 600px;
  height: 400px;
  margin: 50px auto;
  .playArea {
    position: relative;
    /deep/ #vjs_video_3 {
      border-radius: 8px;
      .vjs-big-play-button {
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%);
        background: url("../../assets/logo.png") no-repeat;
        background-size: cover;
        border: none;
        width: 32px;
        height: 32px;
      }
      .vjs-poster {
        border-radius: 8px;
      }
    }
    /deep/.vjs-big-play-button .vjs-icon-placeholder:before {
      display: none !important;
    }
    /deep/.vjs-big-play-button {
      display: none !important;
    }
    .tilt {
      width: 100%;
      height: 100%;
      opacity: 1;
      position: absolute;
      top: 0;
      left: 0;

      z-index: 99999;
      .but {
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%);
        background: url("../../assets/logo.png") no-repeat;
        background-size: cover;
        border: none;
        width: 32px;
        height: 32px;
        position: absolute;
      }
    }
  }
  .title {
    font-size: 28px;
    font-weight: bold;
    text-align: center;
    padding: 20px;
  }
}
</style>
