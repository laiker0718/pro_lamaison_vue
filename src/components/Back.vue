<template>
    <div class="translate-x-center btn-accept" @click="reload">
        <img src="@/assets/image/home/confirm-btn.png" />
        <div class="absolute w-full font-enMedium word-accept text-white translate-center whitespace-no-wrap">
        </div>
    </div>
</template>

<script>
import { myMixin } from '@/mixins/mixin'

export default {
    mixins: [myMixin]
}
</script>

<style lang="scss" scoped>
.btn-accept {
    width: 158px;
    height: 74px !important;
    bottom: 62px;
    img {
        height: 100%;
    }
}
.word-accept {
    font-size: 28px;
    line-height: 74px;
    height: 74px;
    width: 130px;
}
</style>