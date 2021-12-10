<template>
    <div class="second-page flex flex-col justify-center items-center" @click="toThird">
        <div class="tip-container font-enMedium">
            <p class="tip-item" v-for="(item, index) in tips" :key="index">
                <template v-if="item.length > 0">
                    {{ item }}
                </template>
                <template v-if="item.length <= 0">
                    <br />
                </template>
            </p>
        </div>
        <img class="logo" src="@/assets/image/index/logo.png" />
        <p class="absolute touch-tip text-black justify-center items-center">
            click to start
        </p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tips: [
                'welcome into the world of the most',
                'stylish french high jewelry maison.',
                '',
                'we invite you to play with your style',
                'and to create your own profile.',
                'this profile will enable you to',
                'enjoy a personalized',
                'experience in real life.',
                '',
                'come to our event',
                'to discover even more.'
            ]
        }
    },
    methods: {
        toThird() {
            this.$emit('toThird', 'ThirdPage')
        }
    }
}
</script>

<style scoped>
.logo {
    width: 57px;
    height: 89px;
}
.welcome {
    width: 576px;
    height: 278px;
    margin-bottom: 32px;
}
.second-page {
    font-size: 32px;
    font-weight: 500;
    color: #000000;
    width: 100%;
    height: 100%;
}
.tip-container {
    text-align: center;
    font-size: 30px;
    margin-bottom: 168px;
}
.tip-item {
    line-height: 36px;
    height: 36px;
}
.touch-tip {
    bottom: 20px;
    animation: huxi 4s linear infinite;
}
@keyframes huxi {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
@-webkit-keyframes name {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
</style>