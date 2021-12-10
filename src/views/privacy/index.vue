<template>
    <div class="h-full w-full overflow-hidden">
        <el-button-group v-if="!loading" class="flex justify-center animate__animated animate__fadeIn">
            <el-button size="medium" @click.stop="prePage" icon="el-icon-arrow-left">previous</el-button>
            <el-button size="medium" @click.stop="close" icon="el-icon-circle-close">close</el-button>
            <el-button size="medium" @click.stop="nextPage">next<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </el-button-group>
        <div @click="nextPage">
            <pdf ref="pdf" :src="url" :page="pageNum" @loaded="completed" @progress="loadedRatio = $event" @page-loaded="pageLoaded($event)" @num-pages="pageTotalNum = $event" @link-clicked="page = $event">
            </pdf>
        </div>
    </div>
</template>

<script>
import pdf from 'vue-pdf'

export default {
    name: 'privacy-index',
    components: {
        pdf
    },
    data() {
        return {
            loading: true,
            url: 'https://qn.notionbase.com/boucheron/pdf/en-policy.pdf',
            pageNum: 1,
            pageTotalNum: 1,
            // 加载进度
            loadedRatio: 0,
            curPageNum: 0
        }
    },
    mounted: function() {},
    methods: {
        close() {
            this.$router.replace({
                path: '/',
                query: {
                    tag: 'register',
                    jump: localStorage.getItem('jump') || ''
                }
            })
        },
        completed() {
            this.loading = false
        },
        // 上一页函数，
        prePage() {
            var page = this.pageNum
            page = page > 1 ? page - 1 : this.pageTotalNum
            this.pageNum = page
        },
        // 下一页函数
        nextPage() {
            var page = this.pageNum
            page = page < this.pageTotalNum ? page + 1 : 1
            this.pageNum = page
        },

        // 页面加载回调函数，其中e为当前页数
        pageLoaded(e) {
            this.curPageNum = e
        }
    }
}
</script>

<style lang="scss" scoped>
canvas {
    width: 100% !important;
    height: 100% !important;
}
.el-button /deep/ {
    font-size: 20px !important;
}
</style>