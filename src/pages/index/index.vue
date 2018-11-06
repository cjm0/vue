<style lang="less" module>
    .main{
        &-text{
            display: flex;    
            color: red;
            font-size: 10px;
            background:  url(../../assets/img/logo.png) 0 0 no-repeat;
        }

        h1{
            background:  url(../../assets/img/1.jpg) 0 0 no-repeat;
        }
        img{
            width: 100px;
            height: 100px;
            overflow:hidden;
        }
    }
</style>

<template lang="pug">
    div(:class="$style.main")
        p(:class="$style['main-text']") sssss  ffff  xxx  过一个平凡无趣的人生实在太容易了，你可以不读书，不冒险，不运动，不写作，不外出，不折腾……但是，人生最后悔的事情就是：我本可以。
        img(src="../../assets/img/logo.png")
        
        h1 sssssss 单独
        h2 
            span img img img 
            img(src="../../assets/img/1.jpg")
        p {{msg}}
</template>

<script>
export default {
    name: 'index',
    data() {
        return {
            test: 10,
            msg: ''
        }
    },
    created() {
        if (window.localStorage.getItem('a')) {
            this.msg = 'localStorage true'
        } else {
            this.msg = 'localStorage false'
        }

        Loading.show(3000, true)
    }
};
</script>