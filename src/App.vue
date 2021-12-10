<template>
    <div id="app">
        <keep-alive>
            <transition v-if="$route.meta.keepAlive" name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </keep-alive>
        <transition name="fade" mode="out-in">
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'App',
    components: {},
    data() {
        return {}
    }
}
</script>

<style lang="scss">
@import url('./common/font/font.scss');
* {
    box-sizing: border-box;
}
#app {
    color: #000;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    font-family: 'enMedium';
}
input:focus {
    outline: none;
}
img {
    width: 100%;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
/* .fade-leave-active, 2.1.8 down */
    opacity: 0;
}
.clip-pic {
    clip-path: polygon(0 12%,
        22% 0,
        78% 0,
        100% 12%,
        100% 88%,
        78% 100%,
        22% 100%,
        0 88%);
}
.clip-pic-half {
    clip-path: polygon(0 12%,
        22% 0,
        78% 0,
        100% 12%,
        100% 88%,
        78% 100%,
        22% 100%,
        0 88%);
}
.clip-pic-half-none {
    animation: 'remove-clip-pic-half'3s ease;
}
@keyframes remove-clip-pic {
    0% {
        clip-path: polygon(0 12%,
            22% 0,
            78% 0,
            100% 12%,
            100% 88%,
            78% 100%,
            22% 100%,
            0 88%);
        width: 526px;
        height: 822px;
    }
    100% {
        clip-path: polygon(0 0,
            0 0,
            100% 0,
            100% 0,
            100% 100%,
            100% 100%,
            0 100%,
            0 100%);
        width: 100%;
        height: 100%;
    }
}

@keyframes remove-clip-pic-half {
    0% {
        clip-path: polygon(0 12%,
            22% 0,
            78% 0,
            100% 12%,
            100% 88%,
            78% 100%,
            22% 100%,
            0 88%);
    }
    100% {
        clip-path: polygon(0 0,
            0 0,
            100% 0,
            100% 0,
            100% 100%,
            100% 100%,
            0 100%,
            0 100%);
    }
}
.translate-center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
.translate-x-center {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}
.translate-y-center {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}
.shinning {
    -webkit-animation: Glow 1.5s ease-in infinite alternate;
    animation: Glow 1.5s ease-in infinite alternate;
    text-shadow: 0 0 30px #fff, 0 0 30px #fff, 0 0 30px #fff, 0 0 30px #fff;
}

@keyframes Glow {
    from {
        transform: scale(1);
    }

    to {
        transform: scale(1.2);
    }
}
.clearFix::before,
.clearFix::after {
    content: '';
    display: block;
    clear: both;
}
</style>