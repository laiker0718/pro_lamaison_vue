<template>
    <div class="h-full register-page">
        <Header />
        <div class="register-content mx-auto flex flex-col items-center relative">
            <img class="form-bg w-full absolute inset-auto" src="@/assets/image/index/register-form-bg.png" />
            <From />
        </div>
    </div>
</template>

<script>
import From from './form'
import Header from '@/components/Header.vue'

export default {
    components: { From, Header }
}
</script>

<style scoped lang="scss">
.register-page {
    padding-top: 38px;
}
.logo-content {
    margin-bottom: 68px;
}
.register-content {
    width: 689px;
    height: 1069px;
}
</style>