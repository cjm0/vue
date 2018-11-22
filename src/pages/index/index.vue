<style lang="less">
    .index{
        .bg{
            display: flex;
            width: 100px;
            height: 50px;
            background: url("../../assets/img/wx.jpg") 0 0 no-repeat;
        }
    }
</style>

<template lang="pug">
    .index 
        h3 这是一个测试页面
        p {{msg}}
        img(src="../../assets/img/favicon.png")
        p this is a background img 
        p.bg
        a(href="/#/temp") to temp
</template>

<script>
export default {
    name: 'index',
    data() {
        return {
            msg: 'this is a img'
        }
    },
    created() {
        console.log(process.env.NODE_ENV)
        Loading.show()
    }
};
</script>