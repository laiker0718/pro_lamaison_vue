<template>
    <div class="blank-container"></div>
</template>
<script>

export default {
    name: 'blank',
    data() {
        return {}
    },
    mounted() {
        const { question, theme } = this.$route.query
        this.$router.replace({
            path: 'question',
            query: {
                question: question,
                theme: theme
            }
        })
    }
}
</script>

<style lang="scss" scoped>
.blank-container {
    width: 100%;
    height: 100%;
    background-color: black;
}
</style>