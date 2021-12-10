<template>
    <div class="video-area">
        <video id="video" class="video animate__animated animate__fadeIn" webkit-playsinline="true" playsinline="true" x-webkit-airplay="allow" x5-video-player-type="h5" x5-video-player-fullscreen="true" @ended="handleNext">
            <source src="@/assets/video/index/opening.mp4" />
        </video>
        <canvas></canvas>
        <div class="btn-skip" @click="onBtnSkip">SKIP</div>
    </div>
</template>

<script>
export default {
    props: { play: false },
    watch: {
        play(val) {
            if (val) {
                this.videoPlay()
            }
        }
    },
    data() {
        return {
            player: null
        }
    },

    methods: {
        handleNext() {
            this.$emit('toRegister')
        },
        onBtnSkip() {
            this.player.pause()
            this.$emit('toRegister')
        },
        videoPlay() {
            let video = document.querySelector('video')
            var canvas = document.querySelector('canvas')

            let that = this
            var isAndroid = window.navigator.userAgent.match(/android/gi)
            if (isAndroid) {
                // android
                var src = 'https://qn.notionbase.com/boucheron/index/opening0909.ts'
                this.player = new JSMpeg.Player(src, {
                    canvas: canvas,
                    autoplay: true,
                    loop: false,
                    onVideoDecode: function(decoder, time) {
                        canvas.style.display = 'block'
                        canvas.style.height = 100 / (canvas.width / canvas.height) + 'vw'
                    },
                    onEnded(play) {
                        that.handleNext()
                    }
                })
            } else {
                video.style.display = 'block'
                this.player = video
                this.player.play()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.video-area {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}
video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: none;
}
canvas {
    display: none;
}

.btn-skip {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    top: 3%;
    right: 3%;
    font-size: 26px;
    height: 50px;
    padding-top: 12px;
    border-bottom: 1px solid white;
    color: white;
}
</style>