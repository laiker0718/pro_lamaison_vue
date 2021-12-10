<template>
    <div :class="[longPhone ? 'long-phone' : '']" class="h-full home-page text-center justify-center items-center flex relative">
        thank you!
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

export default {
    name: 'home',
    data() {
        return {
            longPhone: false,
            currentComp: 'Home'
        }
    },
    computed: {
        ...mapState({
            specialTheme: (state) => state.home.specialTheme,
            phoneSize: (state) => state.app.phoneSize,
            showAR: (state) => state.home.showAR,
            showQR: (state) => state.home.showQR
        }),
        ...mapGetters(['code'])
    },
    methods: {
        ...mapMutations({
            HIDE_QR: 'home/HIDE_QR'
        }),
        ...mapActions({
            setClear: 'home/setClear',
            getClick: 'home/getClick'
        })
    },

    mounted() {}
}
</script>

<style lang="scss" scoped>
.home-page {
}
</style>