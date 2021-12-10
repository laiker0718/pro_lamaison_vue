<template>
    <div class="h-full language-page">
        <Header />
        <div class="language-content mx-auto flex flex-col items-center relative">
            <img class="form-bg w-full absolute inset-auto" src="@/assets/image/index/register-form-bg.png" />
            <div class="relative flex flex-col w-full h-full text-center z-10 justify-around">
                <p class="dear-word shadow-normal">
                    language selection
                </p>
                <div class="row-form flex justify-around">
                    <div class="relative register-btn" @click="onBtnArab">
                        <img class="btn-ok relative" src="@/assets/image/home/ar-center-btn.png" />
                        <div class="absolute word-ok">عربى</div>
                    </div>
                    <div class="relative register-btn" @click="onBtnEnglish">
                        <img class="btn-ok relative" src="@/assets/image/home/ar-center-btn.png" />
                        <div class="absolute word-ok">english</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
    components: { Header },
    methods: {
        onBtnArab() {
            this.$emit('toThird', 'SecondPageArab')
        },
        onBtnEnglish() {
            this.$emit('toThird', 'SecondPage')
        },
    }
}
</script>

<style scoped lang="scss">
.language-page {
    padding-top: 38px;
}
.logo-content {
    margin-bottom: 68px;
}
.dear-word {
    font-size: 40px;
    height: 50px;
    margin-top: 100px;
    text-shadow: 6px 6px 6px rgba(255, 255, 255, 0.16);
}
.language-content {
    width: 689px;
    height: 1069px;
}
.register-btn {
    margin: 0px 50px 100px 50px;
    font-family: 'arabMedium', 'enMedium';
}
.btn-ok {
    width: 137px;
    height: 88px;
    margin: 0 auto;
}
.word-ok {
    color: #fff;
    font-size: 24px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
</style>