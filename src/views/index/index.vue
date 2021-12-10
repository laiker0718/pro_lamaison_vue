<template>
    <div class="index-container">
        <transition name="fade" mode="out-in">
            <component :is="currentComp" @toThird="toThird" />
        </transition>
        <ThirdPage class="thirdpage" :play="play" :style="pageDisplay" @toRegister="toRegister">
        </ThirdPage>
    </div>
</template>

<script>
import FirstPage from './component/firstPage'
import Language from './component/language.vue'
import SecondPage from './component/secondPage'
import ThirdPage from './component/thirdPage'
import RegisterPage from './component/registerPage'

import { mapMutations } from 'vuex'

export default {
    components: {
        FirstPage,
        Language,
        SecondPage,
        ThirdPage,
        RegisterPage
    },
    name: 'index',
    data() {
        return {
            currentComp: null,
            pageDisplay: 'visibility:hidden',
            play: false
        }
    },

    mounted() {
        const tag = this.$route.query.tag || ''
        if (tag === 'register') {
            this.currentComp = 'RegisterPage'
        } else if (tag == 'secondpage') {
            this.currentComp = 'SecondPage'
        } else {
            this.currentComp = 'FirstPage'
            this.toSecond()
        }
    },
    methods: {
        ...mapMutations({
            setCode: 'register/setCode'
        }),
        toSecond() {
            setTimeout(() => {
                this.currentComp = 'Language'
            }, 2000)
        },
        toThird(comp) {
            if (comp == "SecondPage") {
                this.currentComp = 'SecondPage'
            } else if (comp == "SecondPageArab") {
                window.location.href = "https://boucheronexperience.com/ar/#/?tag=secondpage"
            } else if (comp == 'ThirdPage') {
                this.play = true
                this.pageDisplay = 'visibility:visible'

                setTimeout(() => {
                    this.currentComp = 'RegisterPage'
                }, 1000)
            }
        },
        toRegister() {
            this.pageDisplay = 'visibility:hidden'
        }
    }
}
</script>

<style scoped lang="scss">
.index-container {
    width: 100%;
    height: 100%;
}
.logo-word {
    width: 205px;
    margin-bottom: 49px;
}
.logo {
    width: 39px;
}
.welcome {
    width: 338px;
    margin-bottom: 32px;
}
.thirdpage {
    z-index: 99;
}
</style>